import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";
import { INotification } from "../../interfaces/INotification";
import Notification from "../../models/Notification";
import { deleteNotificationAferAccept } from "../../helper/notify";

export const addNotification = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    const { peopleId } = req.body;
    const { uid } = req.body.user;
    delete req.body._id;
    if (peopleId == "") {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid people id",
        error: null,
        resObj: res,
        data: null,
      });
    }

    // const newNotification: INotification = new Notification({
    //   uid,
    //   ...req.body,
    // });
    // await newNotification.save();
    const newNotification = await Notification.updateOne(
      {
        uid,
      },
      {
        $addToSet: { notifications: peopleId },
      },
      {
        upsert: true,
      }
    );

    // add push notification to notify user
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully posted new Notification",
      error: null,
      resObj: res,
      data: newNotification,
    });
  } catch (error) {
    logging.error("Add Notification", "unable to add Notification", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body.user;
    let notifications = await Notification.find({
      users_ids: { $elemMatch: { $eq: uid } },
    });

    // notifications = notifications.filter(
    //   (notification) => notification.uid != uid
    // );

    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Notifications",
      error: null,
      resObj: res,
      data: notifications,
    });
  } catch (error) {
    logging.error("Get Notifications", "unaable to get Notifications", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};
export const getNotification = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Notification ID",
        error: null,
        resObj: res,
        data: null,
      });
    const notifications = await Notification.findOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Notification",
      error: null,
      resObj: res,
      data: notifications,
    });
  } catch (error) {
    logging.error("Get Notification", "unable to get Notification", error);
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const updateNotification = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.body;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Notification ID",
        error: null,
        resObj: res,
        data: null,
      });

    await Notification.updateOne(
      { _id },
      {
        ...req.body,
      }
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully updated Notification",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error(
      "Update Notification",
      "unaable to update Notification",
      error
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Notification ID",
        error: null,
        resObj: res,
        data: null,
      });
    await Notification.deleteOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Notification is successfully deleted",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error(
      "Delete Notification",
      "unable to delete Notification",
      error
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

// {
//   users_ids: { $elemMatch: { $eq: "nFVzzbrbtLhL1ZLRza4zNwzkmNE3" } },
// }
