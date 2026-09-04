const notificationModel =
  require("../models/notificationModel");


// ==========================================
// GET NOTIFICATIONS
// ==========================================

exports.getNotifications = (
  req,
  res
) => {

  const userId = req.user.id;

  notificationModel.getUserNotifications(
    userId,
    (err, notifications) => {

      if (err) {

        console.error(
          "GET NOTIFICATIONS ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to load notifications.",

        });

      }

      notificationModel.getUnreadCount(
        userId,
        (countError, countResult) => {

          if (countError) {

            console.error(
              "GET UNREAD COUNT ERROR:",
              countError
            );

            return res.status(500).json({

              success: false,

              message:
                "Failed to load unread count.",

            });

          }

          return res.status(200).json({

            success: true,

            notifications,

            unreadCount:
              countResult[0]?.unreadCount || 0,

          });

        }
      );

    }
  );

};


// ==========================================
// GET UNREAD COUNT
// ==========================================

exports.getUnreadCount = (
  req,
  res
) => {

  const userId = req.user.id;

  notificationModel.getUnreadCount(
    userId,
    (err, result) => {

      if (err) {

        console.error(
          "UNREAD COUNT ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to load unread count.",

        });

      }

      return res.status(200).json({

        success: true,

        unreadCount:
          result[0]?.unreadCount || 0,

      });

    }
  );

};


// ==========================================
// CREATE NOTIFICATION
// ==========================================

exports.createNotification = (
  req,
  res
) => {

  const {
    userId,
    title,
    message,
    type,
  } = req.body;


  if (
    !userId ||
    !title ||
    !message
  ) {

    return res.status(400).json({

      success: false,

      message:
        "userId, title and message are required.",

    });

  }


  notificationModel.createNotification(

    userId,

    title,

    message,

    type,

    (err, result) => {

      if (err) {

        console.error(
          "CREATE NOTIFICATION ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to create notification.",

        });

      }

      return res.status(201).json({

        success: true,

        message:
          "Notification created successfully.",

        notificationId:
          result.insertId,

      });

    }

  );

};


// ==========================================
// MARK AS READ
// ==========================================

exports.markAsRead = (
  req,
  res
) => {

  const notificationId =
    req.params.id;

  const userId =
    req.user.id;


  notificationModel.markAsRead(

    notificationId,

    userId,

    (err, result) => {

      if (err) {

        console.error(
          "MARK NOTIFICATION READ ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to mark notification as read.",

        });

      }


      if (
        result.affectedRows === 0
      ) {

        return res.status(404).json({

          success: false,

          message:
            "Notification not found.",

        });

      }


      return res.status(200).json({

        success: true,

        message:
          "Notification marked as read.",

      });

    }

  );

};


// ==========================================
// MARK ALL AS READ
// ==========================================

exports.markAllAsRead = (
  req,
  res
) => {

  const userId =
    req.user.id;


  notificationModel.markAllAsRead(

    userId,

    (err) => {

      if (err) {

        console.error(
          "MARK ALL READ ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to mark notifications as read.",

        });

      }


      return res.status(200).json({

        success: true,

        message:
          "All notifications marked as read.",

      });

    }

  );

};


// ==========================================
// DELETE NOTIFICATION
// ==========================================

exports.deleteNotification = (
  req,
  res
) => {

  const notificationId =
    req.params.id;

  const userId =
    req.user.id;


  notificationModel.deleteNotification(

    notificationId,

    userId,

    (err, result) => {

      if (err) {

        console.error(
          "DELETE NOTIFICATION ERROR:",
          err
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to delete notification.",

        });

      }


      if (
        result.affectedRows === 0
      ) {

        return res.status(404).json({

          success: false,

          message:
            "Notification not found.",

        });

      }


      return res.status(200).json({

        success: true,

        message:
          "Notification deleted successfully.",

      });

    }

  );

};