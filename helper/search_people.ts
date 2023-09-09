import User from "../models/User";
import { sendNotification } from "./fcm";
import { notify } from "./notify";

// displayName: string;
//   fatherName:string;
//   motherName:string;
//   email: string; //userEmail
//   photoURL?: string;
//   gender?: string;
//   phoneNumber?: string; //userMobile
//   userDob: string;

//   uid?: string;
//   fcmToken?: string;
//   emailVerified?: boolean;
//   password: string;
//   nativePlace: string;
//   bloodGroup: string;
//   addhar: string;
//   userEducation: string;
//   school: string;
//   ugCollage: string;
//   pgCollage: string;

type searchPeopleType = {
  fatherName: string;
  motherName: string;
  motherMiddleName: string;
  nativePlace: string;
  dob: string;
  bloodGroup: string;
  name: string;
  gender: string;
  occupation: string;
  email: string;
  pic: string;
  uid: string;
  muid: string;
  fcmToken: string;
};

export const searchPeople = async ({
  // people properties
  fatherName,
  motherName,
  nativePlace,
  bloodGroup,
  name,
  gender,
  occupation,
  email,
  pic,
  uid,
  muid,
  fcmToken,
}: searchPeopleType) => {
  const usersF = await User.find({
    $or: [
      {
        $and: [
          // {
          //   displayName: { $ne: name },
          // },
          {
            fatherName,
          },
          {
            motherName,
          },
          {
            gender,
          },
          {
            nativePlace,
          },
          {
            occupation,
          },
          {
            bloodGroup,
          },
        ],
      },
      {
        $and: [
          // {
          //   displayName: { $ne: name },
          // },
          {
            fatherName,
          },
          {
            motherName,
          },
          {
            gender,
          },
          {
            nativePlace,
          },
          {
            occupation,
          },
        ],
      },
      {
        $and: [
          // {
          //   displayName: { $ne: name },
          // },
          {
            fatherName,
          },
          {
            motherName,
          },
          {
            gender,
          },
          {
            nativePlace,
          },
        ],
      },
      {
        $and: [
          // {
          //   displayName: { $ne: name },
          // },
          {
            fatherName,
          },
          {
            motherName,
          },
          {
            gender,
          },
        ],
      },
      {
        $and: [
          // {
          //   displayName: { $ne: name },
          // },
          {
            fatherName,
          },
          {
            motherName,
          },
        ],
      },
      {
        $and: [
          // {
          //   displayName: { $ne: name },
          // },
          {
            fatherName,
          },
          {
            gender,
          },
        ],
      },
      {
        $and: [
          // {
          //   displayName: { $ne: name },
          // },
          {
            motherName,
          },
          {
            gender,
          },
        ],
      },
    ],
  });

  // console.log("usersF", usersF);

  const fcmTokens = usersF
    .map((user) => user.fcmToken)
    .filter((token) => token != fcmToken);
  sendNotification({
    title: "Do you know?",
    message: "Name : " + name,
    tokens: fcmTokens,
    payload: {
      uid,
      pic: "https://picsum.photos/50",
    },
    icon: "",
  });
  const userIds = usersF.map((user) => user.uid).filter((uidn) => uidn != uid);

  notify({
    users_ids: userIds,
    name,
    fatherName,
    motherName,
    pic,
    uid,
    muid,
  });

  // return usersF;
};

// const usersF = await User.find({
//   $or: [
//     {
//       $and: [
//         {
//           displayName: name,
//         },
//         {
//           fatherName,
//         },
//         {
//           motherName,
//         },
//         {
//           gender,
//         },
//         {
//           nativePlace,
//         },
//         {
//           occupation,
//         },
//         {
//           bloodGroup,
//         },
//       ],
//     },
//     {
//       $and: [
//         {
//           displayName: name,
//         },
//         {
//           fatherName,
//         },
//         {
//           motherName,
//         },
//         {
//           gender,
//         },
//         {
//           nativePlace,
//         },
//         {
//           occupation,
//         },
//       ],
//     },
//     {
//       $and: [
//         {
//           displayName: name,
//         },
//         {
//           fatherName,
//         },
//         {
//           motherName,
//         },
//         {
//           gender,
//         },
//         {
//           nativePlace,
//         },
//       ],
//     },
//     {
//       $and: [
//         {
//           displayName: name,
//         },
//         {
//           fatherName,
//         },
//         {
//           motherName,
//         },
//         {
//           gender,
//         },
//       ],
//     },
//     {
//       $and: [
//         {
//           displayName: name,
//         },
//         {
//           fatherName,
//         },
//         {
//           motherName,
//         },
//       ],
//     },
//     {
//       $and: [
//         {
//           displayName: name,
//         },
//         {
//           fatherName,
//         },
//       ],
//     },
//     {
//       $and: [
//         {
//           displayName: name,
//         },
//         {
//           motherName,
//         },
//       ],
//     },
//   ],
// });
