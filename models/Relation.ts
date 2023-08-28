import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IRelation } from "../interfaces/IRelation";

const RelationSchema: Schema = new Schema({
  uid: {
    type: String,
    required: true,
  },

  level: Number,
  parentId: {
    type: String,
    required: true,
  }, // parent id of this relation
  parentLevel: Number,
  relationType: {
    type: String,
    required: true,
  }, // like mom dad son etc
  relationName: {
    type: String,
    required: true,
  },
  relationUid: {
    type: String,
    required: true,
  }, // which people you add
  profilePicture: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RelationSchema.index({ uid: 1,parentId:1, relationUid: 1 }, { unique: true });

RelationSchema.post<IRelation>("save", function () {
  logging.info("Mongo", "New Relation just saved: ");
});

export default mongoose.model<IRelation>("Relation", RelationSchema);
