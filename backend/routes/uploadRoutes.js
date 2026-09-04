const express = require("express");
const router = express.Router();

const {
    uploadThumbnail,
    uploadVideo,
    uploadPDF
} = require("../middleware/uploadMiddleware");

// ==========================
// Upload Thumbnail
// ==========================
router.post(
    "/thumbnail",
    uploadThumbnail.single("thumbnail"),
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Thumbnail Uploaded Successfully",
            file: req.file.filename
        });

    }
);

// ==========================
// Upload Video
// ==========================
router.post(
    "/video",
    uploadVideo.single("video"),
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Video Uploaded Successfully",
            file: req.file.filename
        });

    }
);

// ==========================
// Upload PDF
// ==========================
router.post(
    "/pdf",
    uploadPDF.single("pdf"),
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "PDF Uploaded Successfully",
            file: req.file.filename
        });

    }
);

module.exports = router;