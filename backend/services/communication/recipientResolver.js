const {
  pool: db,
} = require("./communicationDb");

// ============================================================
// RECIPIENT RESOLVER
//
// Responsibilities:
// 1. Resolve recipients from a business event.
// 2. Load contact information from existing LMS tables.
// 3. Respect communication preferences.
// 4. Respect transactional / marketing consent.
// 5. Never return another student's private contact data unless
//    the automation explicitly targets that recipient.
//
// Supported event targeting:
//
// 1. Direct USER:
//    payload.user_id
//
// 2. Direct STUDENT:
//    payload.student_id
//
// 3. Batch-based STUDENT:
//    payload.batch_id
//
// Batch-based targeting is required for live-class reminders.
// The event aggregate_id represents the LIVE_CLASS id and must
// NOT be interpreted as a student id.
// ============================================================

const recipientResolver = {

  // ==========================================================
  // NORMALIZE CHANNEL
  // ==========================================================

  normalizeChannel(
    channel
  ) {

    if (!channel) {
      return null;
    }

    return String(channel)
      .trim()
      .toUpperCase();
  },

  // ==========================================================
  // NORMALIZE RECIPIENT TYPE
  // ==========================================================

  normalizeRecipientType(
    recipientType
  ) {

    if (!recipientType) {
      return null;
    }

    return String(recipientType)
      .trim()
      .toUpperCase();
  },

  // ==========================================================
  // CHECK CHANNEL CONSENT
  //
  // Transactional communication requires the base channel
  // consent.
  //
  // Marketing communication requires both:
  // - base channel consent
  // - marketing channel consent
  // ==========================================================

  hasChannelConsent(
    preferences,
    channel,
    category = "TRANSACTIONAL"
  ) {

    if (!preferences) {
      return false;
    }

    const normalizedChannel =
      this.normalizeChannel(
        channel
      );

    const normalizedCategory =
      String(
        category || "TRANSACTIONAL"
      )
        .trim()
        .toUpperCase();

    if (
      normalizedChannel === "EMAIL"
    ) {

      if (
        Number(
          preferences.email_consent
        ) !== 1
      ) {

        return false;
      }

      if (
        normalizedCategory ===
        "MARKETING"
      ) {

        return (
          Number(
            preferences.marketing_email_consent
          ) === 1
        );
      }

      return true;
    }

    if (
      normalizedChannel === "WHATSAPP"
    ) {

      if (
        Number(
          preferences.whatsapp_consent
        ) !== 1
      ) {

        return false;
      }

      if (
        normalizedCategory ===
        "MARKETING"
      ) {

        return (
          Number(
            preferences.marketing_whatsapp_consent
          ) === 1
        );
      }

      return true;
    }

    return false;
  },

  // ==========================================================
  // GET USER CONTACT + PREFERENCES
  //
  // student_profiles and communication_preferences are
  // optional, therefore both use LEFT JOIN.
  //
  // A student must not disappear from recipient resolution merely
  // because a profile or communication-preference row is missing.
  // ==========================================================

  getUserContact(
    userId,
    callback
  ) {

    const sql = `
      SELECT
        u.id,
        u.full_name,
        u.email,
        u.role,
        sp.phone,
        cp.email_consent,
        cp.whatsapp_consent,
        cp.marketing_email_consent,
        cp.marketing_whatsapp_consent,
        cp.preferred_channel,
        cp.consent_source,
        cp.consent_at
      FROM users u
      LEFT JOIN student_profiles sp
        ON sp.user_id = u.id
      LEFT JOIN communication_preferences cp
        ON cp.user_id = u.id
      WHERE u.id = ?
      LIMIT 1
    `;

    db.query(
      sql,
      [userId],
      (error, rows) => {

        if (error) {

          return callback(
            error
          );

        }

        if (
          !rows ||
          rows.length === 0
        ) {

          return callback(
            null,
            null
          );

        }

        callback(
          null,
          rows[0]
        );

      }
    );
  },

  // ==========================================================
  // RESOLVE CONTACT CHANNEL
  //
  // Returns only channels for which:
  // - a contact address exists
  // - consent exists
  // ==========================================================

  resolveContactChannels(
    contact,
    category = "TRANSACTIONAL"
  ) {

    const channels = [];

    // --------------------------------------------------------
    // EMAIL
    // --------------------------------------------------------

    if (
      contact.email &&
      this.hasChannelConsent(
        contact,
        "EMAIL",
        category
      )
    ) {

      channels.push({
        channel: "EMAIL",

        address:
          String(
            contact.email
          )
            .trim()
            .toLowerCase(),
      });

    }

    // --------------------------------------------------------
    // WHATSAPP
    // --------------------------------------------------------

    if (
      contact.phone &&
      this.hasChannelConsent(
        contact,
        "WHATSAPP",
        category
      )
    ) {

      channels.push({
        channel: "WHATSAPP",

        address:
          String(
            contact.phone
          ).trim(),
      });

    }

    return channels;
  },

  // ==========================================================
  // RESOLVE PREFERRED CHANNEL
  //
  // If a preferred channel exists and is eligible, use it first.
  // Other eligible channels remain available for automation rules
  // that explicitly support multiple channels.
  // ==========================================================

  prioritizeChannels(
    channels,
    preferredChannel
  ) {

    if (
      !preferredChannel ||
      !Array.isArray(channels) ||
      channels.length <= 1
    ) {

      return channels;

    }

    const normalizedPreferred =
      this.normalizeChannel(
        preferredChannel
      );

    return [
      ...channels.filter(
        (item) =>
          item.channel ===
          normalizedPreferred
      ),

      ...channels.filter(
        (item) =>
          item.channel !==
          normalizedPreferred
      ),
    ];
  },

  // ==========================================================
  // BUILD RECIPIENT
  //
  // Centralizes the recipient object shape so direct and
  // batch-based resolution return the same structure.
  // ==========================================================

  buildRecipient(
    contact,
    channel,
    recipientType
  ) {

    return {

      user_id:
        contact.id,

      recipient_type:
        recipientType,

      recipient_name:
        contact.full_name,

      channel:
        channel.channel,

      address:
        channel.address,

      role:
        contact.role,

      preferred_channel:
        contact.preferred_channel,

      consent_source:
        contact.consent_source,

      consent_at:
        contact.consent_at,

    };
  },

  // ==========================================================
  // RESOLVE USER
  // ==========================================================

  resolveUser(
    userId,
    options = {},
    callback
  ) {

    this.getUserContact(
      userId,
      (error, contact) => {

        if (error) {

          return callback(
            error
          );

        }

        if (!contact) {

          return callback(
            null,
            []
          );

        }

        const category =
          options.category ||
          "TRANSACTIONAL";

        const channels =
          this.resolveContactChannels(
            contact,
            category
          );

        const prioritized =
          this.prioritizeChannels(
            channels,
            contact.preferred_channel
          );

        const requestedChannel =
          this.normalizeChannel(
            options.channel
          );

        const finalChannels =
          requestedChannel
            ? prioritized.filter(
                (item) =>
                  item.channel ===
                  requestedChannel
              )
            : prioritized;

        callback(
          null,
          finalChannels.map(
            (item) =>
              this.buildRecipient(
                contact,
                item,
                "USER"
              )
          )
        );

      }
    );
  },

  // ==========================================================
  // RESOLVE STUDENT
  // ==========================================================

  resolveStudent(
    studentId,
    options = {},
    callback
  ) {

    this.getUserContact(
      studentId,
      (error, contact) => {

        if (error) {

          return callback(
            error
          );

        }

        if (!contact) {

          return callback(
            null,
            []
          );

        }

        if (
          contact.role &&
          String(
            contact.role
          ).toLowerCase() !==
            "student"
        ) {

          return callback(
            null,
            []
          );

        }

        const category =
          options.category ||
          "TRANSACTIONAL";

        const channels =
          this.resolveContactChannels(
            contact,
            category
          );

        const prioritized =
          this.prioritizeChannels(
            channels,
            contact.preferred_channel
          );

        const requestedChannel =
          this.normalizeChannel(
            options.channel
          );

        const finalChannels =
          requestedChannel
            ? prioritized.filter(
                (item) =>
                  item.channel ===
                  requestedChannel
              )
            : prioritized;

        callback(
          null,
          finalChannels.map(
            (item) =>
              this.buildRecipient(
                contact,
                item,
                "STUDENT"
              )
          )
        );

      }
    );
  },

  // ==========================================================
  // RESOLVE STUDENTS FROM BATCH
  //
  // Used by live-class reminders and other batch-based
  // automations.
  //
  // IMPORTANT:
  // batch_students.student_id references users.id.
  //
  // student_profiles and communication_preferences are optional
  // and therefore use LEFT JOIN.
  //
  // This query intentionally resolves all batch students in one
  // database call to avoid N+1 queries.
  // ==========================================================

  resolveBatchStudents(
    batchId,
    options = {},
    callback
  ) {

    const normalizedBatchId =
      Number(
        batchId
      );

    if (
      !Number.isInteger(
        normalizedBatchId
      ) ||
      normalizedBatchId <= 0
    ) {

      return callback(
        null,
        []
      );

    }

    const sql = `
      SELECT
        u.id,
        u.full_name,
        u.email,
        u.role,
        sp.phone,
        cp.email_consent,
        cp.whatsapp_consent,
        cp.marketing_email_consent,
        cp.marketing_whatsapp_consent,
        cp.preferred_channel,
        cp.consent_source,
        cp.consent_at
      FROM batch_students bs
      INNER JOIN users u
        ON u.id = bs.student_id
      LEFT JOIN student_profiles sp
        ON sp.user_id = u.id
      LEFT JOIN communication_preferences cp
        ON cp.user_id = u.id
      WHERE
        bs.batch_id = ?
        AND LOWER(u.role) = 'student'
      ORDER BY
        u.id ASC
    `;

    db.query(
      sql,
      [normalizedBatchId],
      (
        error,
        rows
      ) => {

        if (error) {

          return callback(
            error
          );

        }

        if (
          !Array.isArray(
            rows
          ) ||
          rows.length === 0
        ) {

          return callback(
            null,
            []
          );

        }

        const category =
          options.category ||
          "TRANSACTIONAL";

        const requestedChannel =
          this.normalizeChannel(
            options.channel
          );

        const recipients = [];

        for (
          const contact of rows
        ) {

          let channels =
            this.resolveContactChannels(
              contact,
              category
            );

          channels =
            this.prioritizeChannels(
              channels,
              contact.preferred_channel
            );

          if (
            requestedChannel
          ) {

            channels =
              channels.filter(
                (item) =>
                  item.channel ===
                  requestedChannel
              );

          }

          for (
            const channel
              of channels
          ) {

            recipients.push(
              this.buildRecipient(
                contact,
                channel,
                "STUDENT"
              )
            );

          }

        }

        callback(
          null,
          recipients
        );

      }
    );
  },

  // ==========================================================
  // RESOLVE ADMIN RECIPIENTS
  //
  // Admin notifications are transactional by default.
  // We still require the configured channel consent rather than
  // bypassing the communication-preference system.
  // ==========================================================

  resolveAdmins(
    options = {},
    callback
  ) {

    const sql = `
      SELECT
        u.id,
        u.full_name,
        u.email,
        u.role,
        sp.phone,
        cp.email_consent,
        cp.whatsapp_consent,
        cp.marketing_email_consent,
        cp.marketing_whatsapp_consent,
        cp.preferred_channel,
        cp.consent_source,
        cp.consent_at
      FROM users u
      LEFT JOIN student_profiles sp
        ON sp.user_id = u.id
      LEFT JOIN communication_preferences cp
        ON cp.user_id = u.id
      WHERE
        LOWER(u.role) = 'admin'
      ORDER BY
        u.id ASC
    `;

    db.query(
      sql,
      (
        error,
        rows
      ) => {

        if (error) {

          return callback(
            error
          );

        }

        const category =
          options.category ||
          "TRANSACTIONAL";

        const requestedChannel =
          this.normalizeChannel(
            options.channel
          );

        const recipients = [];

        for (
          const contact of rows
        ) {

          let channels =
            this.resolveContactChannels(
              contact,
              category
            );

          channels =
            this.prioritizeChannels(
              channels,
              contact.preferred_channel
            );

          if (
            requestedChannel
          ) {

            channels =
              channels.filter(
                (item) =>
                  item.channel ===
                  requestedChannel
              );

          }

          for (
            const channel
              of channels
          ) {

            recipients.push(
              this.buildRecipient(
                contact,
                channel,
                "ADMIN"
              )
            );

          }

        }

        callback(
          null,
          recipients
        );

      }
    );
  },

  // ==========================================================
  // RESOLVE RECIPIENT
  //
  // Supported recipient types:
  //
  // USER
  // STUDENT
  // ADMIN
  //
  // A future PARENT recipient type can be added here once the
  // parent/guardian relationship model is introduced.
  // ==========================================================

  resolveRecipient(
    recipientType,
    recipientId,
    options = {},
    callback
  ) {

    const normalizedType =
      this.normalizeRecipientType(
        recipientType
      );

    // --------------------------------------------------------
    // STUDENT
    // --------------------------------------------------------

    if (
      normalizedType ===
      "STUDENT"
    ) {

      return this.resolveStudent(
        recipientId,
        {
          ...options,

          category:
            options.category ||
            "TRANSACTIONAL",
        },
        callback
      );

    }

    // --------------------------------------------------------
    // USER
    // --------------------------------------------------------

    if (
      normalizedType ===
      "USER"
    ) {

      return this.resolveUser(
        recipientId,
        {
          ...options,

          category:
            options.category ||
            "TRANSACTIONAL",
        },
        callback
      );

    }

    // --------------------------------------------------------
    // ADMIN
    // --------------------------------------------------------

    if (
      normalizedType ===
      "ADMIN"
    ) {

      return this.resolveAdmins(
        options,
        callback
      );

    }

    return callback(
      null,
      []
    );
  },

  // ==========================================================
  // RESOLVE RECIPIENTS FROM EVENT
  //
  // Expected event payload examples:
  //
  // Direct student:
  //
  // {
  //   "student_id": 19
  // }
  //
  // Direct user:
  //
  // {
  //   "user_id": 19
  // }
  //
  // Batch-based live class:
  //
  // {
  //   "live_class_id": 123,
  //   "batch_id": 2
  // }
  //
  // IMPORTANT:
  //
  // event.aggregate_id is intentionally NOT used as a generic
  // student ID.
  //
  // For live-class events:
  //
  // aggregate_type = LIVE_CLASS
  // aggregate_id   = live_classes.id
  //
  // Therefore aggregate_id must never be treated as a student
  // identifier.
  // ==========================================================

  resolveRecipientsFromEvent(
    rule,
    event,
    callback
  ) {

    let payload =
      event &&
      event.payload_json;

    // --------------------------------------------------------
    // PARSE PAYLOAD
    // --------------------------------------------------------

    if (
      typeof payload ===
      "string"
    ) {

      try {

        payload =
          JSON.parse(
            payload
          );

      } catch (
        parseError
      ) {

        return callback(
          parseError
        );

      }

    }

    payload =
      payload || {};

    // --------------------------------------------------------
    // CATEGORY
    // --------------------------------------------------------

    const category =
      rule.category ||
      rule.template_category ||
      "TRANSACTIONAL";

    // --------------------------------------------------------
    // REQUESTED CHANNEL
    //
    // Current automation rules store channels_json rather than
    // a singular channel field.
    //
    // If rule.channel exists, respect it.
    // Otherwise channel filtering is performed by the
    // automation engine against the resolved recipient channels.
    // --------------------------------------------------------

    const requestedChannel =
      this.normalizeChannel(
        rule.channel
      );

    // --------------------------------------------------------
    // RECIPIENT TYPE
    // --------------------------------------------------------

    const recipientType =
      this.normalizeRecipientType(
        rule.recipient_type
      );

    // --------------------------------------------------------
    // ADMIN RECIPIENT
    // --------------------------------------------------------

    if (
      recipientType ===
      "ADMIN"
    ) {

      return this.resolveAdmins(
        {
          category,

          channel:
            requestedChannel,
        },

        callback
      );

    }

    // --------------------------------------------------------
    // BATCH-BASED STUDENT RECIPIENT
    //
    // This is the important live-class path.
    //
    // If batch_id exists, resolve all eligible students from
    // that batch.
    // --------------------------------------------------------

    if (
      recipientType ===
        "STUDENT" &&
      payload.batch_id
    ) {

      return this.resolveBatchStudents(
        payload.batch_id,
        {
          category,

          channel:
            requestedChannel,
        },
        callback
      );

    }

    // --------------------------------------------------------
    // DIRECT RECIPIENT ID
    //
    // Only explicit user_id/student_id fields are accepted.
    //
    // We intentionally do NOT fall back to event.aggregate_id.
    // --------------------------------------------------------

    const recipientId =
      payload.user_id ||
      payload.student_id ||
      null;

    if (
      !recipientId
    ) {

      return callback(
        null,
        []
      );

    }

    // --------------------------------------------------------
    // DIRECT STUDENT
    // --------------------------------------------------------

    if (
      recipientType ===
      "STUDENT"
    ) {

      return this.resolveStudent(
        recipientId,
        {
          category,

          channel:
            requestedChannel,
        },
        callback
      );

    }

    // --------------------------------------------------------
    // DIRECT USER
    // --------------------------------------------------------

    return this.resolveUser(
      recipientId,
      {
        category,

        channel:
          requestedChannel,
      },
      callback
    );
  },

  // ==========================================================
  // RESOLVE EXPLICIT RECIPIENT
  //
  // Useful for future lead/enquiry workflows where the contact
  // may not yet exist as a platform user.
  //
  // This method does NOT bypass consent.
  // ==========================================================

  resolveExplicitRecipient(
    recipient,
    options = {}
  ) {

    if (!recipient) {
      return null;
    }

    const channel =
      this.normalizeChannel(
        recipient.channel
      );

    if (
      !channel
    ) {

      return null;

    }

    const category =
      options.category ||
      "TRANSACTIONAL";

    const hasConsent =
      recipient.consent === true ||
      Number(
        recipient.consent
      ) === 1;

    if (
      !hasConsent
    ) {

      return null;

    }

    let address =
      recipient.address ||
      recipient.email ||
      recipient.phone ||
      null;

    if (!address) {

      return null;

    }

    address =
      String(
        address
      ).trim();

    if (!address) {

      return null;

    }

    return {

      user_id:
        recipient.user_id ||
        null,

      recipient_type:
        recipient.recipient_type ||
        "EXTERNAL",

      recipient_name:
        recipient.name ||
        recipient.recipient_name ||
        null,

      channel,

      address,

      category,

      consent_source:
        recipient.consent_source ||
        null,

      consent_at:
        recipient.consent_at ||
        null,

    };
  },

};

// ============================================================
// EXPORT
// ============================================================

module.exports =
  recipientResolver;