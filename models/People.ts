import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IPeople } from "../interfaces/IPeople";

const PeopleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  email: String,
  photoURL: String,
  phoneNumber: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
  },

  city:{
    type: String,
    required: true,
  },
  nativePlace: {
    type: String,
    required: true,
  },
  currentPlace: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },

  bloodGroup: {
    type: String,
  },
  addhar: {
    type: String,
  },
  maritalStatus: {
    type: String,
    required: true,
  },

  userEducation: String,
  school: String,
  ugCollage: String,
  pgCollage: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// PeopleSchema.clearIndexes({ })
PeopleSchema.post<IPeople>("save", function () {
  logging.info("Mongo", "New People just saved: ");
});

export default mongoose.model<IPeople>("People", PeopleSchema);
