const liveClassModel =
  require("../models/liveClassModel");


const {
  createZoomMeeting,
  updateZoomMeeting,
  deleteZoomMeeting,
} =
  require("../services/zoomService");


// ============================================================
// HELPER
// ============================================================

const calculateDuration = (
  startTime,
  endTime
) => {

  if (!endTime) {

    return 60;

  }


  const start =
    String(startTime)
      .slice(0, 5)
      .split(":")
      .map(Number);


  const end =
    String(endTime)
      .slice(0, 5)
      .split(":")
      .map(Number);


  const startMinutes =
    start[0] * 60 +
    start[1];


  const endMinutes =
    end[0] * 60 +
    end[1];


  return endMinutes -
    startMinutes;

};


// ============================================================
// CREATE LIVE CLASS
// + CREATE ZOOM MEETING
// ============================================================

exports.createLiveClass =
  async (req, res) => {

    try {

      const {
        batch_id,
        title,
        description,
        recording_link,
        class_date,
        start_time,
        end_time,
        status,
      } = req.body;


      // ======================================================
      // VALIDATION
      // ======================================================

      if (
        !batch_id ||
        !title ||
        !class_date ||
        !start_time
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Batch, Title, Date and Start Time are required.",

        });

      }


      // ======================================================
      // TIME VALIDATION
      // ======================================================

      if (end_time) {

        const duration =
          calculateDuration(
            start_time,
            end_time
          );


        if (duration <= 0) {

          return res.status(400).json({

            success: false,

            message:
              "End time must be later than start time.",

          });

        }

      }


      // ======================================================
      // ZOOM DURATION
      // ======================================================

      const duration =
        calculateDuration(
          start_time,
          end_time
        );


      // ======================================================
      // ZOOM START TIME
      // ======================================================

      const zoomStartTime =
        `${class_date}T${String(
          start_time
        ).slice(0, 5)}:00`;


      console.log("");
      console.log(
        "======================================"
      );
      console.log(
        "ZOOM MEETING CREATION"
      );
      console.log(
        "======================================"
      );
      console.log(
        "Topic:",
        title
      );
      console.log(
        "Date:",
        class_date
      );
      console.log(
        "Start:",
        start_time
      );
      console.log(
        "End:",
        end_time || "Not provided"
      );
      console.log(
        "Duration:",
        duration,
        "minutes"
      );
      console.log(
        "Timezone:",
        "Asia/Kolkata"
      );
      console.log(
        "======================================"
      );


      // ======================================================
      // CREATE ZOOM MEETING
      // ======================================================

      const zoomMeeting =
        await createZoomMeeting({

          topic:
            title.trim(),

          start_time:
            zoomStartTime,

          duration:
            duration,

          timezone:
            "Asia/Kolkata",

          agenda:
            description || "",

        });


      // ======================================================
      // VERIFY ZOOM RESPONSE
      // ======================================================

      if (
        !zoomMeeting ||
        !zoomMeeting.id ||
        !zoomMeeting.join_url
      ) {

        console.error(
          "INVALID ZOOM RESPONSE:",
          zoomMeeting
        );


        return res.status(502).json({

          success: false,

          message:
            "Zoom meeting was not created correctly.",

        });

      }


      console.log(
        "ZOOM MEETING CREATED:"
      );

      console.log(
        "Meeting ID:",
        zoomMeeting.id
      );

      console.log(
        "Join URL:",
        zoomMeeting.join_url
      );


      // ======================================================
      // SAVE LIVE CLASS TO MYSQL
      // ======================================================

      const liveClass = {

        batch_id:
          Number(batch_id),

        title:
          title.trim(),

        description:
          description || null,

        zoom_link:
          zoomMeeting.join_url,

        meeting_id:
          String(zoomMeeting.id),

        meeting_password:
          zoomMeeting.password || null,

        recording_link:
          recording_link || null,

        class_date:
          class_date,

        start_time:
          start_time,

        end_time:
          end_time || null,

        status:
          status || "Upcoming",

      };


      liveClassModel.createLiveClass(

        liveClass,

        (err, result) => {

          if (err) {

            console.error(
              "SAVE LIVE CLASS ERROR:",
              err
            );


            // =================================================
            // CLEAN UP ZOOM IF MYSQL FAILED
            // =================================================

            deleteZoomMeeting(
              zoomMeeting.id
            )
              .catch(
                (cleanupError) => {

                  console.error(
                    "ZOOM CLEANUP ERROR:",
                    cleanupError
                  );

                }
              );


            return res.status(500).json({

              success: false,

              message:
                err.message,

            });

          }


          return res.status(201).json({

            success: true,

            message:
              "Live Class and Zoom Meeting Created Successfully.",

            liveClass: {

              id:
                result.insertId,

              batch_id:
                liveClass.batch_id,

              title:
                liveClass.title,

              description:
                liveClass.description,

              zoom_link:
                liveClass.zoom_link,

              meeting_id:
                liveClass.meeting_id,

              meeting_password:
                liveClass.meeting_password,

              recording_link:
                liveClass.recording_link,

              class_date:
                liveClass.class_date,

              start_time:
                liveClass.start_time,

              end_time:
                liveClass.end_time,

              status:
                liveClass.status,

            },

          });

        }

      );


    } catch (error) {

      console.error(
        "CREATE LIVE CLASS / ZOOM ERROR:",
        error
      );


      if (error.response) {

        console.error(
          "ZOOM STATUS:",
          error.response.status
        );

        console.error(
          "ZOOM DATA:",
          error.response.data
        );

      }


      return res.status(500).json({

        success: false,

        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to create live class.",

      });

    }

  };


// ============================================================
// GET ALL LIVE CLASSES
// ============================================================

exports.getAllLiveClasses =
  (req, res) => {

    if (
      req.user.role ===
      "student"
    ) {

      liveClassModel
        .getLiveClassesForStudent(

          req.user.id,

          (err, classes) => {

            if (err) {

              return res.status(500).json({

                success: false,

                message:
                  err.message,

              });

            }


            return res.status(200).json({

              success: true,

              total:
                classes.length,

              liveClasses:
                classes,

            });

          }

        );


      return;

    }


    liveClassModel
      .getAllLiveClasses(

        (err, classes) => {

          if (err) {

            return res.status(500).json({

              success: false,

              message:
                err.message,

            });

          }


          return res.status(200).json({

            success: true,

            total:
              classes.length,

            liveClasses:
              classes,

          });

        }

      );

  };


// ============================================================
// GET LIVE CLASS BY ID
// ============================================================

exports.getLiveClassById =
  (req, res) => {

    const liveClassId =
      Number(req.params.id);


    if (!liveClassId) {

      return res.status(400).json({

        success: false,

        message:
          "Valid Live Class ID is required.",

      });

    }


    if (
      req.user.role ===
      "student"
    ) {

      liveClassModel
        .getLiveClassByIdForStudent(

          liveClassId,

          req.user.id,

          (err, result) => {

            if (err) {

              return res.status(500).json({

                success: false,

                message:
                  err.message,

              });

            }


            if (
              !result ||
              result.length === 0
            ) {

              return res.status(403).json({

                success: false,

                message:
                  "You are not authorized to access this live class.",

              });

            }


            return res.status(200).json({

              success: true,

              liveClass:
                result[0],

            });

          }

        );


      return;

    }


    liveClassModel
      .getLiveClassById(

        liveClassId,

        (err, result) => {

          if (err) {

            return res.status(500).json({

              success: false,

              message:
                err.message,

            });

          }


          if (
            !result ||
            result.length === 0
          ) {

            return res.status(404).json({

              success: false,

              message:
                "Live Class Not Found",

            });

          }


          return res.status(200).json({

            success: true,

            liveClass:
              result[0],

          });

        }

      );

  };


// ============================================================
// GET CLASSES BY BATCH
// ============================================================

exports.getClassesByBatch =
  (req, res) => {

    const batchId =
      Number(req.params.batchId);


    if (!batchId) {

      return res.status(400).json({

        success: false,

        message:
          "Valid Batch ID is required.",

      });

    }


    if (
      req.user.role ===
      "student"
    ) {

      liveClassModel
        .getClassesByBatchForStudent(

          batchId,

          req.user.id,

          (err, classes) => {

            if (err) {

              return res.status(500).json({

                success: false,

                message:
                  err.message,

              });

            }


            if (
              !classes ||
              classes.length === 0
            ) {

              return res.status(403).json({

                success: false,

                message:
                  "You are not authorized to access this batch's live classes.",

              });

            }


            return res.status(200).json({

              success: true,

              total:
                classes.length,

              liveClasses:
                classes,

            });

          }

        );


      return;

    }


    liveClassModel
      .getClassesByBatch(

        batchId,

        (err, classes) => {

          if (err) {

            return res.status(500).json({

              success: false,

              message:
                err.message,

            });

          }


          return res.status(200).json({

            success: true,

            total:
              classes.length,

            liveClasses:
              classes,

          });

        }

      );

  };


// ============================================================
// UPDATE LIVE CLASS
// + UPDATE ZOOM MEETING
// ============================================================

exports.updateLiveClass =
  async (req, res) => {

    try {

      const liveClassId =
        Number(req.params.id);


      if (!liveClassId) {

        return res.status(400).json({

          success: false,

          message:
            "Valid Live Class ID is required.",

        });

      }


      liveClassModel.getLiveClassById(

        liveClassId,

        async (getError, rows) => {

          if (getError) {

            return res.status(500).json({

              success: false,

              message:
                getError.message,

            });

          }


          if (
            !rows ||
            rows.length === 0
          ) {

            return res.status(404).json({

              success: false,

              message:
                "Live Class Not Found",

            });

          }


          try {

            const existing =
              rows[0];


            const {
              batch_id,
              title,
              description,
              recording_link,
              class_date,
              start_time,
              end_time,
              status,
            } = req.body;


            if (
              !batch_id ||
              !title ||
              !class_date ||
              !start_time
            ) {

              return res.status(400).json({

                success: false,

                message:
                  "Batch, Title, Date and Start Time are required.",

              });

            }


            // ================================================
            // VALIDATE TIME
            // ================================================

            if (end_time) {

              const duration =
                calculateDuration(
                  start_time,
                  end_time
                );


              if (duration <= 0) {

                return res.status(400).json({

                  success: false,

                  message:
                    "End time must be later than start time.",

                });

              }

            }


            // ================================================
            // UPDATE ZOOM
            // ================================================

            if (
              existing.meeting_id
            ) {

              const duration =
                calculateDuration(
                  start_time,
                  end_time
                );


              const zoomStartTime =
                `${class_date}T${String(
                  start_time
                ).slice(0, 5)}:00`;


              await updateZoomMeeting(

                existing.meeting_id,

                {

                  topic:
                    title.trim(),

                  start_time:
                    zoomStartTime,

                  duration:
                    duration,

                  timezone:
                    "Asia/Kolkata",

                  agenda:
                    description || "",

                }

              );

            }


            // ================================================
            // UPDATE MYSQL
            // ================================================

            liveClassModel.updateLiveClass(

              liveClassId,

              {

                batch_id:
                  Number(batch_id),

                title:
                  title.trim(),

                description:
                  description || null,

                zoom_link:
                  existing.zoom_link,

                meeting_id:
                  existing.meeting_id,

                meeting_password:
                  existing.meeting_password,

                recording_link:
                  recording_link || null,

                class_date:
                  class_date,

                start_time:
                  start_time,

                end_time:
                  end_time || null,

                status:
                  status || "Upcoming",

              },

              (updateError, result) => {

                if (updateError) {

                  return res.status(500).json({

                    success: false,

                    message:
                      updateError.message,

                  });

                }


                if (
                  result &&
                  result.affectedRows === 0
                ) {

                  return res.status(404).json({

                    success: false,

                    message:
                      "Live Class Not Found",

                  });

                }


                return res.status(200).json({

                  success: true,

                  message:
                    "Live Class and Zoom Meeting Updated Successfully.",

                });

              }

            );

          } catch (error) {

            console.error(
              "UPDATE ZOOM ERROR:",
              error
            );


            return res.status(500).json({

              success: false,

              message:
                error.response?.data?.message ||
                error.message ||
                "Failed to update Zoom meeting.",

            });

          }

        }

      );


    } catch (error) {

      console.error(
        "UPDATE LIVE CLASS ERROR:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };


// ============================================================
// DELETE LIVE CLASS
// + DELETE ZOOM MEETING
// ============================================================

exports.deleteLiveClass =
  async (req, res) => {

    try {

      const liveClassId =
        Number(req.params.id);


      if (!liveClassId) {

        return res.status(400).json({

          success: false,

          message:
            "Valid Live Class ID is required.",

        });

      }


      liveClassModel.getLiveClassById(

        liveClassId,

        async (getError, rows) => {

          if (getError) {

            return res.status(500).json({

              success: false,

              message:
                getError.message,

            });

          }


          if (
            !rows ||
            rows.length === 0
          ) {

            return res.status(404).json({

              success: false,

              message:
                "Live Class Not Found",

            });

          }


          const existing =
            rows[0];


          // ================================================
          // DELETE ZOOM MEETING
          // ================================================

          if (
            existing.meeting_id
          ) {

            try {

              await deleteZoomMeeting(

                existing.meeting_id

              );

            } catch (zoomError) {

              console.error(
                "DELETE ZOOM ERROR:",
                zoomError.response?.data ||
                zoomError.message
              );


              return res.status(502).json({

                success: false,

                message:
                  "Unable to delete the Zoom meeting. Live class was not deleted.",

              });

            }

          }


          // ================================================
          // DELETE MYSQL
          // ================================================

          liveClassModel.deleteLiveClass(

            liveClassId,

            (deleteError, result) => {

              if (deleteError) {

                return res.status(500).json({

                  success: false,

                  message:
                    deleteError.message,

                });

              }


              if (
                result &&
                result.affectedRows === 0
              ) {

                return res.status(404).json({

                  success: false,

                  message:
                    "Live Class Not Found",

                });

              }


              return res.status(200).json({

                success: true,

                message:
                  "Live Class and Zoom Meeting Deleted Successfully.",

              });

            }

          );

        }

      );


    } catch (error) {

      console.error(
        "DELETE LIVE CLASS ERROR:",
        error
      );


      return res.status(500).json({

        success: false,

        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete live class.",

      });

    }

  };