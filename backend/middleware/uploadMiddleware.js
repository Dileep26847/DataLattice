const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ======================================
// Create Folder Automatically
// ======================================

const createFolder = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, {
            recursive: true,
        });
    }
};

// ======================================
// Upload Directories
// ======================================

const thumbnailsPath = path.join(
    process.cwd(),
    "uploads",
    "thumbnails"
);

const videosPath = path.join(
    process.cwd(),
    "uploads",
    "videos"
);

const pdfsPath = path.join(
    process.cwd(),
    "uploads",
    "pdfs"
);

// Create folders automatically
createFolder(thumbnailsPath);
createFolder(videosPath);
createFolder(pdfsPath);

// ======================================
// Generate Unique Filename
// ======================================

const generateFilename = (req, file, cb) => {

    const extension =
        path.extname(file.originalname).toLowerCase();

    const uniqueName =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        extension;

    cb(null, uniqueName);
};

// ======================================
// Thumbnail Storage
// ======================================

const thumbnailStorage =
    multer.diskStorage({

        destination: (req, file, cb) => {

            cb(
                null,
                thumbnailsPath
            );

        },

        filename: generateFilename,

    });

// ======================================
// Video Storage
// ======================================

const videoStorage =
    multer.diskStorage({

        destination: (req, file, cb) => {

            cb(
                null,
                videosPath
            );

        },

        filename: generateFilename,

    });

// ======================================
// PDF Storage
// ======================================

const pdfStorage =
    multer.diskStorage({

        destination: (req, file, cb) => {

            cb(
                null,
                pdfsPath
            );

        },

        filename: generateFilename,

    });

// ======================================
// Image File Filter
// ======================================

const imageFilter = (
    req,
    file,
    cb
) => {

    const allowed =
        /\.(jpg|jpeg|png|webp)$/i;

    if (
        !allowed.test(
            path.extname(
                file.originalname
            )
        )
    ) {

        return cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed."
            )
        );

    }

    cb(null, true);
};

// ======================================
// Video File Filter
// ======================================

const videoFilter = (
    req,
    file,
    cb
) => {

    const allowed =
        /\.(mp4|mov|avi|mkv)$/i;

    if (
        !allowed.test(
            path.extname(
                file.originalname
            )
        )
    ) {

        return cb(
            new Error(
                "Only MP4, MOV, AVI and MKV videos are allowed."
            )
        );

    }

    cb(null, true);
};

// ======================================
// PDF File Filter
// ======================================

const pdfFilter = (
    req,
    file,
    cb
) => {

    const extension =
        path.extname(
            file.originalname
        ).toLowerCase();

    if (extension !== ".pdf") {

        return cb(
            new Error(
                "Only PDF files are allowed."
            )
        );

    }

    cb(null, true);
};

// ======================================
// Thumbnail Upload
// Max Size: 5 MB
// ======================================

const uploadThumbnail =
    multer({

        storage:
            thumbnailStorage,

        fileFilter:
            imageFilter,

        limits: {
            fileSize:
                5 * 1024 * 1024,
        },

    });

// ======================================
// Video Upload
// Max Size: 500 MB
// ======================================

const uploadVideo =
    multer({

        storage:
            videoStorage,

        fileFilter:
            videoFilter,

        limits: {
            fileSize:
                500 * 1024 * 1024,
        },

    });

// ======================================
// PDF Upload
// Max Size: 20 MB
// ======================================

const uploadPDF =
    multer({

        storage:
            pdfStorage,

        fileFilter:
            pdfFilter,

        limits: {
            fileSize:
                20 * 1024 * 1024,
        },

    });

// ======================================
// Export
// ======================================

module.exports = {

    uploadThumbnail,

    uploadVideo,

    uploadPDF,

};