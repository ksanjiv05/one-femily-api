import { Document } from "mongoose";

export interface IPeople extends Document {
  name: string; // bm
  fatherName: string; //bm
  motherName: string; //bm
  email: string; //userEmail um
  photoURL?: string;
  phoneNumber?: string; //userMobile um
  gender?: string; //bm
  dob: string; //bm
  state: string; //----
  lastName: string; //----
  city: string; //bm
  nativePlace: string; //bm
  currentPlace: string;
  occupation: string;

  bloodGroup: string; //bm
  addhar: string; //um
  maritalStatus: string;

  userEducation: string;
  school: string; //bm
  ugCollage: string;
  pgCollage: string;

  createdAt?: string;
}
