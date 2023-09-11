import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";
import { IPeople } from "../../interfaces/IPeople";
import People from "../../models/People";

export const addPeople = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    const {
      name = "", // bm
      fatherName = "", //bm
      motherName = "", //bm

      phoneNumber = "", //userMobile um
      gender = "", //bm
      dob = "", //bm

      city = "", //bm
      nativePlace = "", //bm
      currentPlace = "",
      occupation = "",
      maritalStatus = "",
    }: IPeople = req.body;
    const { uid } = req.body.user;
    delete req.body._id;
    if (
      name == "" ||
      fatherName == "" ||
      motherName == "" ||
      phoneNumber == "" ||
      dob == "" ||
      occupation == "" ||
      maritalStatus == "" ||
      gender == ""
    ) {
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid People object/required parameter",
        error: null,
        resObj: res,
        data: null,
      });
    }

    const newPeople: IPeople = new People({ uid, ...req.body });
    await newPeople.save();

    // add push notification to notify user
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully posted new People",
      error: null,
      resObj: res,
      data: newPeople,
    });
  } catch (error) {
    logging.error("Add People", "unable to add People", error);
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

export const getPeoples = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body.user;
    const peoples = await People.find({ uid });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your Peoples",
      error: null,
      resObj: res,
      data: peoples,
    });
  } catch (error) {
    logging.error("Get Peoples", "unaable to get Peoples", error);
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
export const getPeople = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid People ID",
        error: null,
        resObj: res,
        data: null,
      });
    const people = await People.findOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your People",
      error: null,
      resObj: res,
      data: people,
    });
  } catch (error) {
    logging.error("Get People", "unable to get People", error);
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

export const updatePeople = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.body;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid People ID",
        error: null,
        resObj: res,
        data: null,
      });

    await People.updateOne(
      { _id },
      {
        ...req.body,
      }
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully updated People",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Update People", "unaable to update People", error);
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
export const deletePeople = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid People ID",
        error: null,
        resObj: res,
        data: null,
      });
    await People.deleteOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your People is successfully deleted",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Delete People", "unable to delete People", error);
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
