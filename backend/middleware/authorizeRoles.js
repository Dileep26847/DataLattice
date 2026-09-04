// ======================================
// SkillNova LMS - Role Authorization
// ======================================

const authorizeRoles = (...roles) => {

    return (req, res, next) => {

        // ======================================
        // User Authentication Check
        // ======================================

        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });

        }

        // ======================================
        // Role Authorization
        // ======================================

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });

        }

        // ======================================
        // Authorized
        // ======================================

        next();

    };

};

module.exports = authorizeRoles;