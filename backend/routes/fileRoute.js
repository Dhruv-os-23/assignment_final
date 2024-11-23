const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");


router.post("/upload", fileController.uploadFile);
router.get("/convert/:fileId", fileController.convertFile);

module.exports = router;
