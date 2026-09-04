const dashboardModel = require("../models/adminDashboardModel");

// ======================================
// Admin Dashboard
// ======================================
exports.getDashboard = (req, res) => {

  dashboardModel.getDashboardStats((err, stats) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    dashboardModel.getRecentStudents((err, students) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      dashboardModel.getRecentCourses((err, courses) => {

        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        dashboardModel.getRecentTickets((err, tickets) => {

          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message,
            });
          }

          dashboardModel.getStudentGrowth((err, studentGrowth) => {

            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message,
              });
            }

            dashboardModel.getCourseDistribution((err, courseDistribution) => {

              if (err) {
                return res.status(500).json({
                  success: false,
                  message: err.message,
                });
              }

              dashboardModel.getSupportAnalytics((err, supportAnalytics) => {

                if (err) {
                  return res.status(500).json({
                    success: false,
                    message: err.message,
                  });
                }

                res.status(200).json({

                  success: true,

                  stats: stats[0],

                  recentStudents: students,

                  recentCourses: courses,

                  recentTickets: tickets,

                  studentGrowth,

                  courseDistribution,

                  supportAnalytics,

                });

              });

            });

          });

        });

      });

    });

  });

};