import { User } from "../models/User.js";
import "express-async-errors";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res, next) => {
  const { Name, Email, Mobile, Password } = req.body;

  if (!Name || !Email || !Mobile || !Password) {
    return next(new ErrorHandler("Please provide all details", 400));
  }

  const user = await User.findOne({ Email });
  if (user) return next(new ErrorHandler("Email already Exists", 409));

  const data = await User.create({
    Name,
    Email,
    Mobile,
    Password,
  });

  res.status(201).json({
    message: "User Created Successfully",
    data,
  });
};

export const allusers = async (req, res, next) => {
  const data = await User.find();
  if (!data) return next(new ErrorHandler("No user found", 404));

  res.status(200).json({
    data,
  });
};
export const singleUser = async (req, res, next) => {
  const { id } = req.body;
  const data = await User.findOne(id);
  if (!data) return next(new ErrorHandler("No user found", 404));

  res.status(200).json({
    data,
  });
};
export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  const data = await User.findById(id);

  if (!data) return next(new ErrorHandler("no data found", 404));

  const { Name, Email, Mobile, Password, Profile_picture } = req.body;

  data.Name = Name;
  data.Email = Email;
  data.Mobile = Mobile;
  data.Password = Password;
  data.Profile_picture = Profile_picture;

  await data.save();

  res.status(201).json({
    success: true,
    message: `user updated`,
  });
};

export const login = async (req, res, next) => {
  const { Email, Password } = req.body;

  if (!Email || !Password)
    return next(new ErrorHandler("Please provide all details", 400));
  const user = await User.findOne({ Email }).select("+Password");

  if (!user)
    return next(new ErrorHandler("please provide correct details", 401));

  const isMatch = await user.comparePassword(Password);

  if (!isMatch)
    return next(new ErrorHandler("incorrect email and password", 401));

  sendToken(res, user, `Welcome Back, ${user.Name}`, 200);
};

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      mesaage: "Logged out successfully",
    });
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findById(id);

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
