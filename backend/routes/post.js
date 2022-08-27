const express = require("express");
const { createPost, getAllPost } = require("../controller/post");
const { authUser } = require("../middleware/auth");
const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPost", authUser, getAllPost);

module.exports = router;
