import { Document } from "mongoose";

export interface INotification extends Document {
    uid:string,
    notifications:string[],
    mutualUserId:string,
    mutualUserName:string,
    mutualUserPic:string
}