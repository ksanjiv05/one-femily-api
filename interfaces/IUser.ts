import { Document } from "mongoose";

export interface IUser extends Document {
  displayName: string;
  fatherName:string;
  motherName:string;
  email: string; //userEmail
  photoURL?: string;
  gender?: string;
  phoneNumber?: string; //userMobile
  userDob: string;
  
  uid?: string;
  fcmToken?: string;
  emailVerified?: boolean;
  password: string;
  nativePlace: string;
  bloodGroup: string;
  addhar: string;
  userEducation: string;
  school: string;
  ugCollage: string;
  pgCollage: string;


  totalConnections: number;
  isProfilePicBlured: boolean;
  createdAt?: string;
}

