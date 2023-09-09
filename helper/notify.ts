import logging from "../config/logging";
import { INotification } from "../interfaces/INotification";
import Notification from "../models/Notification";

export const notify = async (data: INotification) => {
  try {
    const notification = new Notification(data);
    await notification.save();
    logging.info("Notification", "New Notification just saved: ");
  } catch (err) {
    console.log("notify error", err);
    logging.error("Notification", "New Notification just saved: ");
  }
};
