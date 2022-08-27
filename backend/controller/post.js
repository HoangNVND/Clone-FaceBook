const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "first_name last_name username picture gender")
      .sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
