// get user details from frontend
// validation -not empty
// check if user already exists with username,email
// check for images , check for avatar
// upload them in cloudinary,avatar
// create user object - create entry in db
// remove password and refreshtoken field from response
// check for user creation
// return response

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { uploadOnCloudinary } from "../utils/cloudinary";

const registerUser = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields required");
  }

  const existedUser = await User.findOne({
    $or: [{ username, email }],
  });

  if (existedUser) {
    throw new ApiError(402, "user already exists");
  }

  const avatarLocalPath = req.files?.avatar[0].path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatara required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(408, "Avatar required");
  }

  const user = User.create({
    email,
    username: username.toLowerCase(),
    fullName,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!existedUser) {
    throw new ApiError(408, "something went wrong while registering the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User registered successfully"));
});

// import { ApiError } from "../utils/ApiError";
// import { asyncHandler } from "../utils/asyncHandler";

// const registerUser = asyncHandler(async (req, res) => {
//   const { fullName, email, username, password } = req.body;

//   if (
//     [fullName.username, password, email].some((field) => field?.trim() === "")
//   ) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existedUser = await User.findOne({
//     $or: [{ username, email }],
//   });

//   if (existedUser) {
//     throw new ApiError(409, "user already exists");
//   }

//   const avatarLocalPath = req.files?.avatar[0].path;

//   if (!avatarLocalPath) {
//     throw new ApiError(400, "avatar required");
//   }

//   const avatar = await uploadOnCloudinary(avatarLocalPath);

//   if (!avatar) {
//     throw new ApiError(400, "avatar file is required");
//   }

//   const user = await User.create({
//     fullName,
//     avatar: avatar.url,
//     username: username.toLowerCase(),
//     password,
//     email,
//     coverImage: coverImage?.url || "",
//   });

//   const createdUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   if (!existedUser) {
//     throw new ApiError(400, "Something went wrong while registering the user");
//   }

//   return;
//   res.status(201).json(new ApiResponse(200, "user registered successfully"));
// });
