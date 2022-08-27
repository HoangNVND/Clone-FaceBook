const express = require("express");
const { uploadImages, listImages } = require("../controller/upload");
const imageUpLoad = require("../middleware/imageUpload");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/uploadImages", authUser, imageUpLoad, uploadImages);
router.post("/listImages", authUser, listImages);

module.exports = router;
