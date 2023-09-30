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
  photoURL: {
    type: String,
    default:
      "https://img.freepik.com/free-photo/user-profile-icon-front-side-with-white-background_187299-40010.jpg?w=996&t=st=1696058489~exp=1696059089~hmac=131d72690bd11f4e157b175a495e014b4fb5aa006d69c22c4bcc2ec7de931ff3",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RelationSchema.index({ uid: 1, parentId: 1, relationUid: 1 }, { unique: true });

RelationSchema.post<IRelation>("save", function () {
  logging.info("Mongo", "New Relation just saved: ");
});

export default mongoose.model<IRelation>("Relation", RelationSchema);
