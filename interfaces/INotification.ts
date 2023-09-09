import { Document } from "mongoose";

export interface INotification extends Document {
  // uid:string,
  // notifications:string[],
  // mutualUserId:string,
  // mutualUserName:string,
  // mutualUserPic:string
  name: string;
  fatherName: string;
  motherName: string;
  pic: string;
  uid: string;
  muid: string;
  users_ids: string[];
}
