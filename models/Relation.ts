import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IRelation } from "../interfaces/IRelation";

const RelationSchema: Schema = new Schema({
  uid: {
    type:String,
    required:true,
  },
  mongoUid:{
    type:String,
    required:true,
  },
  relationHierarchy: [
    {
      rid: {
        type:String,
        required:true,
      },
      level: {
        type:Number,
        required:true,
      },
      parentRid: {
        type:String,
        required:true,
      },
      parentLevel: Number,
      relationType: {
        type:String,
        required:true,
      },
      relationName: {
        type:String,
        required:true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RelationSchema.post<IRelation>("save", function () {
  logging.info("Mongo", "New Relation just saved: ");
});

export default mongoose.model<IRelation>("Relation", RelationSchema);
