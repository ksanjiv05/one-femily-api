import logging from "../config/logging";
import { INotification } from "../interfaces/INotification";
import Notification from "../models/Notification";

export const notify = async (data: INotification) => {
  try {
    // const notification = new Notification(data);
    // await notification.save();
    logging.info("Notification", "New Notification just saved: ");
  } catch (err) {
    console.log("notify error", err);
    logging.error("Notification", "New Notification just saved: ");
  }
};

export const notifyUpdate = async (data: INotification) => {
  try {
    // console.log("notifyUpdate", data.users_ids, data.uid);

    // bulk = db.items.initializeUnorderedBulkOp();

    const bulk = Notification.collection.initializeUnorderedBulkOp();

    bulk
      .find({ uid: { $in: data.users_ids } })
      .update({ $addToSet: { users_ids: data.uid } });
    const rs = await bulk.execute();
    const updates = await Notification.updateMany(
      {
        uid: { $in: data.users_ids },
      },
      {
        $addToSet: { users_ids: data.uid },
      }
    );
    // console.log("updates", rs);
    // const notification = new Notification(data);
    // await notification.save();
    logging.info("Notification Update", " Notification just updated: ");
  } catch (err) {
    console.log("notify error", err);
    logging.error("Notification Update", "Notification update error: ");
  }
};

export const deleteNotificationAferAccept = async (muid, uid) => {
  // db.survey.updateMany(
  //   { },
  //   { $pull: { results: { $elemMatch: { score: 8 , item: "B" } } } }
  // )
  try {
    // console.log("notifyUpdate", muid, uid);
    const updates = await Notification.updateMany(
      { muid },
      {
        $pull: { users_ids: uid },
      }
    );
    console.log("updates", updates);
    // const notification = new Notification(data);
    // await notification.save();
    logging.info("Notification Update", " Notification  just updated: ");
    return true;
  } catch (err) {
    console.log("notify error", err);
    logging.error("Notification Update", "Notification update error: ");
    return false;
  }
};
