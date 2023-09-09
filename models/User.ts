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
    unique: true,
  }, //userEmail
  photoURL: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  userDob: {
    type: String,
    required: true,
  },
  nativePlace: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
  },
  addhar: {
    type: String,
  },
  userEducation: {
    type: String,
  },
  school: {
    type: String,
  },
  ugCollage: {
    type: String,
  },
  pgCollage: {
    type: String,
  },
  motherMiddleName: {
    type: String,
    required: true,
  }, //----
  state: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  }, //userMobile

  uid: {
    type: String,
    required: true,
    unique: true,
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
