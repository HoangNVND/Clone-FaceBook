const {
  validateEmail,
  validateLength,
  validateUserName,
} = require("../helpers/validations");

const { generateToken } = require("../helpers/tokens");
const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const Code = require("../models/Code");
const { generateCode } = require("../helpers/generateCode");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({ message: "The email address is already!" });
    }

    if (!validateLength(first_name, 2, 30)) {
      return res
        .status(400)
        .json({ message: "First name must be between 2 and 30 characters" });
    }

    if (!validateLength(last_name, 2, 30)) {
      return res
        .status(400)
        .json({ message: "Last name must be between 2 and 30 characters" });
    }

    if (!validateLength(password, 6, 30)) {
      return res
        .status(400)
        .json({ message: "Password must be between 6 and 30 characters" });
    }

    const cryptPassword = await bcrypt.hash(password, 10);

    let tempUserName = first_name + "" + last_name;
    let newUserName = await validateUserName(tempUserName);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptPassword,
      username: newUserName,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.uerName,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Successfully ! Please active your email",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const valiUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);

    if (valiUser !== user.id) {
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation.",
      });
    }
    if (check.verified === true) {
      return res
        .status(400)
        .json({ message: "This email is already activated" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has been activated successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "the email address you entered is not connected to an account.",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials.Please try again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      return res.status(400).json({
        message: "This account is already activated.",
      });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    return res.status(200).json({
      message: "Email verification link has been sent to your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email }).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "Account does not exists.",
      });
    }
    return res.status(200).json({
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email }).select("-password");
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5);
    const savedCode = await new Code({
      code: code,
      user: user._id,
    }).save();
    sendResetCode(user.email, user.first_name, code);
    return res.status(200).json({
      message: "Reset code has been sent to your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email: email }).select("-password");
    const checkCode = await Code.findOne({ user: user._id });

    if (checkCode.code !== code) {
      return res.status(400).json({
        message: "Wrong code!Please try again.",
      });
    }
    return res.status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const crytedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate({ email }, { password: crytedPassword });
    return res.status(200).json({ message: "Done!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ username: username }).select(
      "-password"
    );
    if (!profile) {
      return res.json({ ok: false });
    }
    const posts = await Post.find({ user: profile._id })
      .populate("user")
      .sort({ createdAt: -1 });
    res.json({ ...profile.toObject(), posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCoverPicture = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      cover: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
