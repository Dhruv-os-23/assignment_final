const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

// Routes
router.post("/upload", fileController.uploadFile);
router.get("/convert/:fileId", fileController.convertFile);

module.exports = router;
