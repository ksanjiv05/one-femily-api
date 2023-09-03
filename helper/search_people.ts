import User from "../models/User";

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

export const searchPeople = async ({
  // people properties
  fatherName,
  motherName,
  nativePlace,
  bloodGroup,
  name,
  gender,
  currentPlace,
  occupation,
  email,
}) => {
  //   const usersA = await User.find({
  //     $and: [
  //       {
  //         displayName: name,
  //       },
  //       {
  //         fatherName,
  //       },
  //       {
  //         motherName,
  //       },
  //       {
  //         gender,
  //       },
  //       {
  //         nativePlace,
  //       },
  //       {
  //         currentPlace,
  //       },
  //       {
  //         occupation,
  //       },
  //     ],
  //   });

  //   const usersB = await User.find({
  //     $and: [
  //       {
  //         displayName: name,
  //       },
  //       {
  //         fatherName,
  //       },
  //       {
  //         motherName,
  //       },
  //       {
  //         gender,
  //       },
  //       {
  //         nativePlace,
  //       },
  //       {
  //         currentPlace,
  //       },
  //     ],
  //   });

  //   const usersC = await User.find({
  //     $and: [
  //       {
  //         displayName: name,
  //       },
  //       {
  //         fatherName,
  //       },
  //       {
  //         motherName,
  //       },
  //       {
  //         gender,
  //       },
  //       {
  //         nativePlace,
  //       },
  //     ],
  //   });

  //   const usersD = await User.find({
  //     $and: [
  //       {
  //         displayName: name,
  //       },
  //       {
  //         fatherName,
  //       },
  //       {
  //         motherName,
  //       },
  //       {
  //         gender,
  //       },
  //     ],
  //   });

  //   const usersE = await User.find({
  //     $and: [
  //       {
  //         displayName: name,
  //       },
  //       {
  //         fatherName,
  //       },
  //       {
  //         motherName,
  //       },
  //     ],
  //   });

  const usersF = await User.find({
    $or: [
      {
        $and: [
          {
            displayName: name,
          },
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
            currentPlace,
          },
          {
            occupation,
          },
        ],
      },
      {
        $and: [
          {
            displayName: name,
          },
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
            currentPlace,
          },
        ],
      },
      {
        $and: [
          {
            displayName: name,
          },
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
          {
            displayName: name,
          },
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
          {
            displayName: name,
          },
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
          {
            displayName: name,
          },
          {
            fatherName,
          },
        ],
      },
      {
        $and: [
          {
            displayName: name,
          },
          {
            motherName,
          },
        ],
      },
    ],
  });

  return usersF;
};
