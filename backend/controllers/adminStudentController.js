const bcrypt = require("bcrypt");

const db = require("../database/db");

const adminStudentModel =
    require("../models/adminStudentModel");


// ============================================================
// ADMIN CHECK
// ============================================================

const ensureAdmin = (
    req,
    res
) => {

    if (!req.user) {

        res.status(401).json({
            success: false,
            message: "Authentication required."
        });

        return false;
    }


    if (
        req.user.role !== "admin"
    ) {

        res.status(403).json({
            success: false,
            message: "Admin access required."
        });

        return false;
    }


    return true;
};


// ============================================================
// NORMALIZE OPTIONAL VALUES
// ============================================================

const valueOrNull = (
    value
) => {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return null;
    }

    return value;
};


// ============================================================
// CREATE STUDENT
// ============================================================

exports.createStudent = async (
    req,
    res
) => {

    if (!ensureAdmin(req, res)) {
        return;
    }


    const {

        full_name,

        email,

        password,

        batch_id,

        admission_date,

        education,

        college_name,

        graduation_year,

        phone,

        address,

        city,

        state,

        country,

        linkedin_url,

        github_url,

        resume_url,

        profile_image,

        certificate_status,

        placement_status

    } = req.body;


    // --------------------------------------------------------
    // REQUIRED FIELDS
    // --------------------------------------------------------

    if (
        !full_name ||
        !email ||
        !password
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Full name, email and password are required."

        });

    }


    // --------------------------------------------------------
    // PASSWORD VALIDATION
    // --------------------------------------------------------

    if (
        password.length < 6
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Password must be at least 6 characters."

        });

    }


    // --------------------------------------------------------
    // EMAIL NORMALIZATION
    // --------------------------------------------------------

    const normalizedEmail =
        String(email)
            .trim()
            .toLowerCase();


    // --------------------------------------------------------
    // CONNECTION
    // --------------------------------------------------------

    db.getConnection
        ? createWithPool(
            req,
            res,
            {
                full_name,
                normalizedEmail,
                password,
                batch_id,
                admission_date,
                education,
                college_name,
                graduation_year,
                phone,
                address,
                city,
                state,
                country,
                linkedin_url,
                github_url,
                resume_url,
                profile_image,
                certificate_status,
                placement_status
            }
        )
        : createWithConnection(
            req,
            res,
            {
                full_name,
                normalizedEmail,
                password,
                batch_id,
                admission_date,
                education,
                college_name,
                graduation_year,
                phone,
                address,
                city,
                state,
                country,
                linkedin_url,
                github_url,
                resume_url,
                profile_image,
                certificate_status,
                placement_status
            }
        );
};


// ============================================================
// CREATE WITH CURRENT SINGLE CONNECTION
// ============================================================

const createWithConnection = async (
    req,
    res,
    data
) => {

    try {

        const hashedPassword =
            await bcrypt.hash(
                data.password,
                10
            );


        db.beginTransaction(
            async (transactionError) => {

                if (transactionError) {

                    console.error(
                        "CREATE STUDENT TRANSACTION ERROR:",
                        transactionError
                    );

                    return res.status(500).json({

                        success: false,

                        message:
                            "Unable to start student creation."

                    });

                }


                adminStudentModel.createUser(
                    data.full_name,
                    data.normalizedEmail,
                    hashedPassword,
                    async (
                        userError,
                        userResult
                    ) => {

                        if (userError) {

                            return rollbackCreate(
                                res,
                                userError
                            );

                        }


                        const userId =
                            userResult.insertId;


                        const profileData = {

                            user_id:
                                userId,

                            batch_id:
                                valueOrNull(
                                    data.batch_id
                                ),

                            admission_date:
                                valueOrNull(
                                    data.admission_date
                                ),

                            education:
                                valueOrNull(
                                    data.education
                                ),

                            college_name:
                                valueOrNull(
                                    data.college_name
                                ),

                            graduation_year:
                                valueOrNull(
                                    data.graduation_year
                                ),

                            phone:
                                valueOrNull(
                                    data.phone
                                ),

                            address:
                                valueOrNull(
                                    data.address
                                ),

                            city:
                                valueOrNull(
                                    data.city
                                ),

                            state:
                                valueOrNull(
                                    data.state
                                ),

                            country:
                                valueOrNull(
                                    data.country
                                ),

                            linkedin_url:
                                valueOrNull(
                                    data.linkedin_url
                                ),

                            github_url:
                                valueOrNull(
                                    data.github_url
                                ),

                            resume_url:
                                valueOrNull(
                                    data.resume_url
                                ),

                            profile_image:
                                valueOrNull(
                                    data.profile_image
                                ),

                            certificate_status:
                                valueOrNull(
                                    data.certificate_status
                                ) ||
                                "Pending",

                            placement_status:
                                valueOrNull(
                                    data.placement_status
                                ) ||
                                "Training"

                        };


                        adminStudentModel.createStudentProfile(
                            db,
                            profileData,
                            (
                                profileError
                            ) => {

                                if (profileError) {

                                    return rollbackCreate(
                                        res,
                                        profileError
                                    );

                                }


                                db.commit(
                                    (
                                        commitError
                                    ) => {

                                        if (
                                            commitError
                                        ) {

                                            return rollbackCreate(
                                                res,
                                                commitError
                                            );

                                        }


                                        return sendCreatedStudent(
                                            res,
                                            userId
                                        );

                                    }
                                );

                            }
                        );

                    }
                );

            }
        );

    } catch (error) {

        console.error(
            "CREATE STUDENT ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to create student."

        });

    }

};


// ============================================================
// CREATE WITH POOL
//
// Kept for compatibility if database/db.js is later changed
// to a mysql2 pool.
// ============================================================

const createWithPool = async (
    req,
    res,
    data
) => {

    return res.status(500).json({

        success: false,

        message:
            "Student creation database configuration requires review."

    });

};


// ============================================================
// ROLLBACK CREATE
// ============================================================

const rollbackCreate = (
    res,
    error
) => {

    console.error(
        "CREATE STUDENT DATABASE ERROR:",
        error
    );


    db.rollback(
        () => {

            if (
                error.code ===
                "ER_DUP_ENTRY"
            ) {

                return res.status(409).json({

                    success: false,

                    message:
                        "A student with this email already exists."

                });

            }


            if (
                error.code ===
                "ER_NO_REFERENCED_ROW_2"
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "The selected batch does not exist."

                });

            }


            return res.status(500).json({

                success: false,

                message:
                    "Failed to create student."

            });

        }
    );

};


// ============================================================
// SEND CREATED STUDENT
// ============================================================

const sendCreatedStudent = (
    res,
    userId
) => {

    adminStudentModel.getStudentById(
        userId,
        (
            error,
            rows
        ) => {

            if (error) {

                console.error(
                    "GET CREATED STUDENT ERROR:",
                    error
                );

                return res.status(201).json({

                    success: true,

                    message:
                        "Student created successfully.",

                    studentId:
                        userId

                });

            }


            return res.status(201).json({

                success: true,

                message:
                    "Student created successfully.",

                student:
                    rows[0] || null

            });

        }
    );

};


// ============================================================
// GET ALL STUDENTS
// ============================================================

exports.getAllStudents = (
    req,
    res
) => {

    if (!ensureAdmin(req, res)) {
        return;
    }


    adminStudentModel.getAllStudents(
        (
            error,
            students
        ) => {

            if (error) {

                console.error(
                    "GET STUDENTS ERROR:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to load students."

                });

            }


            return res.status(200).json({

                success: true,

                students:
                    students || [],

                count:
                    students
                        ? students.length
                        : 0

            });

        }
    );

};


// ============================================================
// GET ONE STUDENT
// ============================================================

exports.getStudent = (
    req,
    res
) => {

    if (!ensureAdmin(req, res)) {
        return;
    }


    const studentId =
        Number(req.params.id);


    if (
        !Number.isInteger(studentId) ||
        studentId <= 0
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid student ID."

        });

    }


    adminStudentModel.getStudentById(
        studentId,
        (
            error,
            rows
        ) => {

            if (error) {

                console.error(
                    "GET STUDENT ERROR:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to load student."

                });

            }


            if (
                !rows ||
                rows.length === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found."

                });

            }


            return res.status(200).json({

                success: true,

                student:
                    rows[0]

            });

        }
    );

};


// ============================================================
// UPDATE STUDENT
// ============================================================

exports.updateStudent = async (
    req,
    res
) => {

    if (!ensureAdmin(req, res)) {
        return;
    }


    const studentId =
        Number(req.params.id);


    if (
        !Number.isInteger(studentId) ||
        studentId <= 0
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid student ID."

        });

    }


    const {

        full_name,

        email,

        password,

        batch_id,

        admission_date,

        education,

        college_name,

        graduation_year,

        phone,

        address,

        city,

        state,

        country,

        linkedin_url,

        github_url,

        resume_url,

        profile_image,

        certificate_status,

        placement_status

    } = req.body;


    if (
        !full_name ||
        !email
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Full name and email are required."

        });

    }


    const normalizedEmail =
        String(email)
            .trim()
            .toLowerCase();


    try {

        // ----------------------------------------------------
        // First verify the student exists
        // ----------------------------------------------------

        adminStudentModel.getStudentById(
            studentId,
            async (
                findError,
                rows
            ) => {

                if (findError) {

                    console.error(
                        "FIND STUDENT UPDATE ERROR:",
                        findError
                    );

                    return res.status(500).json({

                        success: false,

                        message:
                            "Failed to find student."

                    });

                }


                if (
                    !rows ||
                    rows.length === 0
                ) {

                    return res.status(404).json({

                        success: false,

                        message:
                            "Student not found."

                    });

                }


                db.beginTransaction(
                    async (
                        transactionError
                    ) => {

                        if (
                            transactionError
                        ) {

                            console.error(
                                "UPDATE TRANSACTION ERROR:",
                                transactionError
                            );

                            return res.status(500).json({

                                success: false,

                                message:
                                    "Unable to start update."

                            });

                        }


                        // ------------------------------------
                        // PASSWORD PRESENT?
                        // ------------------------------------

                        if (
                            password &&
                            String(password).trim()
                        ) {

                            if (
                                password.length < 6
                            ) {

                                db.rollback(
                                    () => {}
                                );

                                return res.status(400).json({

                                    success: false,

                                    message:
                                        "Password must be at least 6 characters."

                                });

                            }


                            const hashedPassword =
                                await bcrypt.hash(
                                    password,
                                    10
                                );


                            adminStudentModel.updateUserWithPassword(
                                db,
                                studentId,
                                full_name,
                                normalizedEmail,
                                hashedPassword,
                                (
                                    userError,
                                    userResult
                                ) => {

                                    if (
                                        userError
                                    ) {

                                        return rollbackUpdate(
                                            res,
                                            userError
                                        );

                                    }


                                    if (
                                        userResult.affectedRows ===
                                        0
                                    ) {

                                        return rollbackUpdate(
                                            res,
                                            {
                                                message:
                                                    "Student was not updated."
                                            }
                                        );

                                    }


                                    continueStudentProfileUpdate(
                                        res,
                                        studentId,
                                        req.body
                                    );

                                }
                            );

                        } else {

                            adminStudentModel.updateUser(
                                db,
                                studentId,
                                full_name,
                                normalizedEmail,
                                (
                                    userError,
                                    userResult
                                ) => {

                                    if (
                                        userError
                                    ) {

                                        return rollbackUpdate(
                                            res,
                                            userError
                                        );

                                    }


                                    if (
                                        userResult.affectedRows ===
                                        0
                                    ) {

                                        return rollbackUpdate(
                                            res,
                                            {
                                                message:
                                                    "Student was not updated."
                                            }
                                        );

                                    }


                                    continueStudentProfileUpdate(
                                        res,
                                        studentId,
                                        req.body
                                    );

                                }
                            );

                        }

                    }
                );

            }
        );

    } catch (error) {

        console.error(
            "UPDATE STUDENT ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Failed to update student."

        });

    }

};


// ============================================================
// CONTINUE PROFILE UPDATE
// ============================================================

const continueStudentProfileUpdate = (
    res,
    studentId,
    body
) => {

    const profileData = {

        user_id:
            studentId,

        batch_id:
            valueOrNull(
                body.batch_id
            ),

        admission_date:
            valueOrNull(
                body.admission_date
            ),

        education:
            valueOrNull(
                body.education
            ),

        college_name:
            valueOrNull(
                body.college_name
            ),

        graduation_year:
            valueOrNull(
                body.graduation_year
            ),

        phone:
            valueOrNull(
                body.phone
            ),

        address:
            valueOrNull(
                body.address
            ),

        city:
            valueOrNull(
                body.city
            ),

        state:
            valueOrNull(
                body.state
            ),

        country:
            valueOrNull(
                body.country
            ),

        linkedin_url:
            valueOrNull(
                body.linkedin_url
            ),

        github_url:
            valueOrNull(
                body.github_url
            ),

        resume_url:
            valueOrNull(
                body.resume_url
            ),

        profile_image:
            valueOrNull(
                body.profile_image
            ),

        certificate_status:
            valueOrNull(
                body.certificate_status
            ) ||
            "Pending",

        placement_status:
            valueOrNull(
                body.placement_status
            ) ||
            "Training"

    };


    adminStudentModel.upsertStudentProfile(
        db,
        profileData,
        (
            profileError
        ) => {

            if (
                profileError
            ) {

                return rollbackUpdate(
                    res,
                    profileError
                );

            }


            db.commit(
                (
                    commitError
                ) => {

                    if (
                        commitError
                    ) {

                        return rollbackUpdate(
                            res,
                            commitError
                        );

                    }


                    adminStudentModel.getStudentById(
                        studentId,
                        (
                            getError,
                            rows
                        ) => {

                            if (
                                getError
                            ) {

                                return res.status(200).json({

                                    success: true,

                                    message:
                                        "Student updated successfully."

                                });

                            }


                            return res.status(200).json({

                                success: true,

                                message:
                                    "Student updated successfully.",

                                student:
                                    rows[0] || null

                            });

                        }
                    );

                }
            );

        }
    );

};


// ============================================================
// ROLLBACK UPDATE
// ============================================================

const rollbackUpdate = (
    res,
    error
) => {

    console.error(
        "UPDATE STUDENT DATABASE ERROR:",
        error
    );


    db.rollback(
        () => {

            if (
                error.code ===
                "ER_DUP_ENTRY"
            ) {

                return res.status(409).json({

                    success: false,

                    message:
                        "A student with this email already exists."

                });

            }


            if (
                error.code ===
                "ER_NO_REFERENCED_ROW_2"
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "The selected batch does not exist."

                });

            }


            return res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Failed to update student."

            });

        }
    );

};


// ============================================================
// DELETE STUDENT
// ============================================================

exports.deleteStudent = (
    req,
    res
) => {

    if (!ensureAdmin(req, res)) {
        return;
    }


    const studentId =
        Number(req.params.id);


    if (
        !Number.isInteger(studentId) ||
        studentId <= 0
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid student ID."

        });

    }


    adminStudentModel.deleteStudent(
        studentId,
        (
            error,
            result
        ) => {

            if (error) {

                console.error(
                    "DELETE STUDENT ERROR:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to delete student."

                });

            }


            if (
                result.affectedRows === 0
            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found."

                });

            }


            return res.status(200).json({

                success: true,

                message:
                    "Student deleted successfully."

            });

        }
    );

};


// ============================================================
// GET BATCHES
// ============================================================

exports.getBatches = (
    req,
    res
) => {

    if (!ensureAdmin(req, res)) {
        return;
    }


    adminStudentModel.getBatches(
        (
            error,
            batches
        ) => {

            if (error) {

                console.error(
                    "GET BATCHES ERROR:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to load batches."

                });

            }


            return res.status(200).json({

                success: true,

                batches:
                    batches || []

            });

        }
    );

};