const express = require("express");
const {
  register,
  activateAccount,
  login,
  sendVerification,
  findUser,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  getProfile,
  updateProfilePicture,
  updateCoverPicture,
} = require("../controller/user");

const { authUser } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/activate", authUser, activateAccount);
router.post("/login", login);
router.post("/sendVerification", authUser, sendVerification);
router.post("/findUser", findUser);
router.post("/sendResetCodeVerification", sendResetPasswordCode);
router.post("/sendResetCodeVerification", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);
router.get("/getProfile/:username", authUser, getProfile);
router.put("/updateProfilePicture", authUser, updateProfilePicture);
router.put("/updateCoverPicture", authUser, updateCoverPicture);

module.exports = router;
