import { Request, Response } from "express";
import logging from "../../config/logging";
import { HTTP_RESPONSE } from "../../helper/constants";
import { responseObj } from "../../helper/response";
import { IRelation } from "../../interfaces/IRelation";
import Relation from "../../models/Relation";

type RelationProps={
    uid: string;
    mongoUid:string;
    rid:string;
    level:number;
    parentRid:string;
    parentLevel:number;
    relationType:string; // like mom dad son etc
    relationName:string;
}

export const addRelation = async (req: Request, res: Response) => {
    try {
      const {
        rid="",
        level=-1,
        parentRid="",
        parentLevel=-1,
        relationType="", // like mom dad son etc
        relationName="",
        mongoUid="",
      }: RelationProps = req.body;
      const { uid } = req.body.user;
      delete req.body._id;
      if (
        
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
  
      const newRelation: IRelation = new Relation({ uid, ...req.body });
      await newRelation.save();
  
      // add push notification to notify user
      return responseObj({
        statusCode: HTTP_RESPONSE.SUCCESS,
        type: "success",
        msg: "hey, you are successfully posted new Relation",
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

  //https://www.mongodb.com/docs/manual/core/indexes/index-types/index-text/create-text-index/

//   https://www.mongodb.com/docs/atlas/atlas-search/facet/