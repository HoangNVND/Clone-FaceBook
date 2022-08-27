const fs = require("fs");

module.exports = async (req, res, next) => {
  try {
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/gif"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "File format is incorrect" });
      }
      ``;
      if (file.size > 1024 * 1024 * 5) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: "File size is too large" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
