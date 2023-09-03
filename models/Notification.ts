import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { INotification } from "../interfaces/INotification";

const NotificationSchema: Schema = new Schema({
  uid: {
    type:String,
    required:true,
  },
  notifications:[String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

NotificationSchema.post<INotification>("save", function () {
  logging.info("Mongo", "New Notification just saved: ");
});

export default mongoose.model<INotification>("Notification", NotificationSchema);
