import { Document } from "mongoose";


export interface IPermission extends Document {
    uid: string;
    picPermissions:string[]

}