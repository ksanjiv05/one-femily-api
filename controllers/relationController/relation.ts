import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";
import { IRelation } from "../../interfaces/IRelation";
import Relation from "../../models/Relation";
import User from "../../models/User";
import { deleteNotificationAferAccept } from "../../helper/notify";

type RelationProps = {
  uid: string;
  mongoUid: string;
  rid: string;
  level: number;
  parentRid: string;
  parentLevel: number;
  relationType: string; // like mom dad son etc
  relationName: string;
};

export const addRelation = async (req: Request, res: Response) => {
  try {
    const {
      relationUid = "",
      level = -1,
      parentId = "",
      parentLevel = -1,
      relationType = "",
      relationName = "",
      photoURL = "",
    }: IRelation = req.body;

    const { uid } = req.body.user;
    if (photoURL == "") {
      delete req.body.photoURL;
    }
    if (!req.body.isViaRelation) {
      if (relationUid == "" || relationType == "" || relationName == "") {
        return responseObj({
          statusCode: HTTP_RESPONSE.BED_REQUEST,
          type: "error",
          msg: "please provide a valid Relation object/required parameter",
          error: null,
          resObj: res,
          data: null,
        });
      }
      const user = await User.findOne({ uid });
      req.body.parentId = user?._id;
    } else {
      if (
        relationUid == "" ||
        relationType == "" ||
        parentId == "" ||
        relationName == ""
      ) {
        return responseObj({
          statusCode: HTTP_RESPONSE.BED_REQUEST,
          type: "error",
          msg: "please provide a valid Relation object/required parameter",
          error: null,
          resObj: res,
          data: null,
        });
      }
    }

    const newRelation: IRelation = new Relation({ uid, ...req.body });
    await newRelation.save();

    // console.log(req.body);
    deleteNotificationAferAccept(req.body.relationUid, uid);
    // add push notification to notify user
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully added new Relation",
      error: null,
      resObj: res,
      data: newRelation,
    });
  } catch (error) {
    logging.error("Add Relation", "unable to add Relation", error);
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

export const declineRelation = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body.user;
    console.log("req.body", req.body);
    const status = await deleteNotificationAferAccept(
      req.body.relationUid,
      uid
    );
    // console.log("req", req.body);
    if (!status)
      return responseObj({
        statusCode: HTTP_RESPONSE.INTERNAL_SERVER_ERROR,
        type: "error",
        msg: "unable to process your request",
        error: null,
        resObj: res,
        data: null,
      });
    // add push notification to notify user
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully declined",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Decline Relation", "unable to decline Relation", error);
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

export const updateRelation = async (req: Request, res: Response) => {
  try {
    const { _id = "" } = req.body;
    if (_id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid relation ID",
        error: null,
        resObj: res,
        data: null,
      });

    await Relation.updateOne(
      { _id },
      {
        ...req.body,
      }
    );
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "hey, you are successfully updated relation",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Update Relation", "unable to update relation", error);
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

export const deleteRelation = async (req: Request, res: Response) => {
  try {
    const { id = "" } = req.params;
    if (id == "")
      return responseObj({
        statusCode: HTTP_RESPONSE.BED_REQUEST,
        type: "error",
        msg: "please provide a valid relation ID",
        error: null,
        resObj: res,
        data: null,
      });
    await Relation.deleteOne({ _id: id });
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your relation is successfully deleted",
      error: null,
      resObj: res,
      data: null,
    });
  } catch (error) {
    logging.error("Delete Relation", "unable to delete relation", error);
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

export const getRelations = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body.user;
    const user = await User.findOne({ uid });

    const userObj = {
      _id: user?._id,
      uid: uid,
      parentId: null,
      relationType: "",
      relationName: user?.displayName,
      photoURL: user?.photoURL,
      relationUid: user?._id,
      createdAt: {
        $date: user?.createdAt,
      },
      __v: 0,
    };

    let relations: IRelation[] = await Relation.find({ uid }).sort({
      createdAt: 1,
    });
    const temp = Object.create(null);
    const relationDataArr = [userObj, ...relations];
    // console.log("relations", JSON.stringify([userObj, ...relations]));
    // const relationsBuilder = [userObj, ...relations].filter((value, i, arr) => {
    //   const { relationUid, parentId }: IRelation = value;

    //   temp[relationUid] = value;
    //   // console.log("--",arr)
    //   if (parentId == null) return true;

    //   (temp[parentId].children || (temp[parentId].children = [])).push(value);
    // });

    // console.log("relationDataArr", JSON.stringify(relationDataArr));
    const relationsBuilder = await getTree(JSON.stringify(relationDataArr));

    // console.log("relationsBuilder", JSON.stringify(relationsBuilder));
    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your relations",
      error: null,
      resObj: res,
      data: relationsBuilder,
    });
  } catch (error) {
    logging.error("Get Relations", "unaable to get relations", error);
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

export const getRelationsAll = async (req: Request, res: Response) => {
  try {
    const { uid } = req.body.user;
    const user = await User.findOne({ uid });

    let relations: IRelation[] = await Relation.find({ uid })
      .select("_id")
      .select("relationUid")
      .select("relationName");

    return responseObj({
      statusCode: HTTP_RESPONSE.SUCCESS,
      type: "success",
      msg: "your relations",
      error: null,
      resObj: res,
      data: relations,
    });
  } catch (error) {
    logging.error("Get Relations", "unaable to get relations", error);
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

export const getTree = async (data: string) => {
  const temp = Object.create(null);
  const buildData = JSON.parse(data).filter((value, i, arr) => {
    const { relationUid, parentId } = value;
    temp[relationUid] = value;
    if (parentId == null) return true;
    (temp[parentId].children || (temp[parentId].children = [])).push(value);
  });
  return buildData;
};

//https://www.mongodb.com/docs/manual/core/indexes/index-types/index-text/create-text-index/

//   https://www.mongodb.com/docs/atlas/atlas-search/facet/

//https://github.com/SimformSolutionsPvtLtd/react-native-tree-selection/tree/master

//https://github.com/Johncy1997/react-native-family-tree/blob/master/src/FamilyTree.js

// su 64fdace799c6e4e81ae4fc10  nFVzzbrbtLhL1ZLRza4zNwzkmNE3

//jyoti eYSbyNhfdqZEpyXJw44nA7lmIdW2 64fc42089f79c76a4e576641

/**
 * Paste one or more documents here
 */
// {
//   "uid": "eYSbyNhfdqZEpyXJw44nA7lmIdW2",
//   "parentId": "64fc42089f79c76a4e576641",
//   "relationType": "Sister",
//   "relationName": "sunayna",
//   "relationUid": "64fdace799c6e4e81ae4fc10",
//   "createdAt": {
//     "$date": "2023-09-11T02:32:42.269Z"
//   },
//   "__v": 0
// }

/**
 * Paste one or more documents here
 */
// {
//   "name": "sunayna",
//   "fatherName": "laxman",
//   "motherName": "phool",
//   "pic": "http://localhost:3000/static/undefined",
//   "uid": "nFVzzbrbtLhL1ZLRza4zNwzkmNE3",
//   "muid": "64fdace799c6e4e81ae4fc10",
//   "users_ids": [
//     "ttlEKBdQbSQHoj7vFucR2dQ0bSp1",
//     "LPnYiGFYItamSL2ZFsNeydeLoxH3",
//     "oOnhvNWw6aR82nQ5mr2EsrOIz0I3"
//   ],
//   "createdAt": {
//     "$date": "2023-09-10T11:47:51.949Z"
//   },
//   "__v": 0
// }
