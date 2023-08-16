import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IUser } from "../interfaces/IUser";

const UserSchema: Schema = new Schema({
  displayName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  }, //userEmail
  photoURL: {
    type: String,
    required: true,
  },

  
  phoneNumber: {
    type: String,
    required: true,
  }, //userMobile

  uid: {
    type: String,
    required: true,
  },
  fcmToken: {
    type: String,
  },
  emailVerified: Boolean,
  password: {
    type: String,
    required: true,
  },
  totalConnections: Number,
  isProfilePicBlured: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const salt = 10;

UserSchema.pre<IUser>("save", async function (next) {
  // const user = this;
  // if (user.isModified("password")) {
  //   user.password = await bcryptjs.hash(user.password, salt);
  // }
  next();
});

UserSchema.post<IUser>("save", function () {
  logging.info("Mongo", "New user just saved: ");
});

export default mongoose.model<IUser>("User", UserSchema);
