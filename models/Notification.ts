import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { INotification } from "../interfaces/INotification";

const NotificationSchema: Schema = new Schema({
  // uid: {
  //   type:String,
  //   required:true,
  // },
  // notifications:[String],
  name: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  pic: {
    type: String,
    default:
      "https://img.freepik.com/free-photo/user-profile-icon-front-side-with-white-background_187299-40010.jpg?w=996&t=st=1696058489~exp=1696059089~hmac=131d72690bd11f4e157b175a495e014b4fb5aa006d69c22c4bcc2ec7de931ff3",
  },
  uid: { type: String, required: true },
  muid: { type: String, required: true },
  users_ids: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

NotificationSchema.post<INotification>("save", function () {
  logging.info("Mongo", "New Notification just saved: ");
});

export default mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
