const dashboardModel = require("../models/dashboardModel");

exports.getDashboard = (req, res) => {

    dashboardModel.getDashboardStats(

        (err, stats) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: err.message,

                });

            }

            dashboardModel.getRecentStudents(

                (err2, students) => {

                    if (err2) {

                        return res.status(500).json({

                            success: false,

                            message: err2.message,

                        });

                    }

                    res.json({

                        success: true,

                        stats: stats[0],

                        recentStudents: students,

                    });

                }

            );

        }

    );

};