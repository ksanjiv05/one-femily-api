import { Request, Response } from "express";
import { UserRecord, getAuth } from "firebase-admin/auth";
import logging from "../../config/logging";
import User from "../../models/User";
import { IUser } from "../../interfaces/IUser";
import { adminApp } from "../../firebase";
import { responseObj } from "../../helper/response";
import { HTTP_RESPONSE } from "../../helper/constants";
import { USER_ROLES } from "../../config/enums";
import { HOST } from "../../config/config";

export const addUser = async (req: Request, res: Response) => {
  try {
    req.body.photoURL = HOST + req.file?.filename;
    const {
      displayName = "",
      fatherName = "",
      motherName = "",
      email = "", //userEmail
      photoURL = "",
      phoneNumber = "", //userMobile
      password=""
    }: IUser = req.body;

    if (displayName == "" ||fatherName==""|| email == ""||photoURL=="" ||phoneNumber==""|| password == "") {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide email, name, father name,phoneNumber and password",
        error: null,
        resObj: res,
        data: null,
      });
    }

    const newUserRecord = await getAuth(adminApp).createUser({
      email,
      emailVerified: false,
      phoneNumber,
      password,
      displayName,
      photoURL,
    });
    const isAdded = await addUserToMongoDB({
      ...req.body,
      uid: newUserRecord.uid,
    });

    if (!isAdded) {
      await deleteUserFromFirebase(newUserRecord.uid);
      return responseObj({
        statusCode: HTTP_RESPONSE.ACCEPTED,
        type: "error",
        msg: "unable to add user to MongoDB",
        error: null,
        resObj: res,
        data: null,
      });
    }

    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "user added successfully ",
      error: null,
      resObj: res,
      data: newUserRecord,
    });
  } catch (error: any) {
    logging.error("Add User", "unable to add user", error);
    if (error?.message)
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: error?.message,
        error: null,
        resObj: res,
        data: null,
      });
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: error?.message || "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const deleteUserFromFirebase = async (uid: string) => {
  await getAuth(adminApp).deleteUser(uid);
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid User ID",
        error: null,
        resObj: res,
        data: null,
      });
    await User.deleteOne({ uid: id });
    await deleteUserFromFirebase(id);
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your User is successfully deleted",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error: any) {
    logging.error("Delete User", "unable to delete User", error);
    if (error?.message) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: error.message.includes("Cast to ObjectId failed")
          ? "Please provide valid product id"
          : error?.message,
        error: null,
        resObj: res,
        data: null,
      });
    }
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: error?.message || "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { pageToken } = req.params;
    const usersList = await getAuth(adminApp).listUsers(1000, pageToken);
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "user added successfully ",
      error: null,
      resObj: res,
      data: usersList,
    });
  } catch (err) {
    logging.error("Get Users", "unable to get users", err);
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

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid Course ID",
        error: null,
        resObj: res,
        data: null,
      });
    const user = await User.findOne({ uid: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your User",
      error: null,
      resObj: res,
      data: user,
    });
  } catch (error: any) {
    logging.error("Get User", "unable to get User", error);
    if (error?.message) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: error.message.includes("Cast to ObjectId failed")
          ? "Please provide valid user id"
          : error?.message,
        error: null,
        resObj: res,
        data: null,
      });
    }
    return responseObj({
      statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
      type: "error",
      msg: error?.message || "unable to process your request",
      error: null,
      resObj: res,
      data: null,
    });
  }
};

// to add user to mongo database
export const addUserToMongoDB = async (data: IUser) => {
  try {
    const {
      uid,
      displayName,
      email,
      emailVerified = false,
      photoURL,
      password,
      phoneNumber,
    }: IUser = data;

    await User.updateOne(
      { uid },
      {
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
        displayName,
      },
      { upsert: true }
    );
    return true;
  } catch (error) {
    logging.error("Register", "unable to register", error);
    return false;
  }
};

export const revokeToken = (uid: string) => {
  getAuth(adminApp)
    .revokeRefreshTokens(uid)
    .then(() => {
      return getAuth().getUser(uid);
    })
    .then((userRecord: any) => {
      return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
    })
    .then((timestamp) => {
      console.log(`Tokens revoked at: ${timestamp}`);
    });
};
