import axios from "axios";
import { IUser } from "../interfaces/IUser";
import admin from "firebase-admin";
import { adminApp } from "../firebase";

// module.exports = async (data: any) => {
//   const { uids = [], title, message, icon = "" } = data;
//   console.log("call push notification", data);

//   try {
//     [].map(async (user: IUser) => {
//       try {
//         if (!user) return;
//         if (user.fcmToken) {
//           console.log("isTokenExist.expoToken", user?.fcmToken);
//           const responce = await axios.post(
//             "https://fcm.googleapis.com/fcm/send",
//             {
//               to: user?.fcmToken,
//               notification: {
//                 body: message,
//                 title,
//                 content_available: true,
//                 priority: "high",
//                 image: icon.length > 5 ? icon : "",
//               },
//               data: {
//                 body: message,
//                 title,
//                 image: icon.length > 5 ? icon : "",
//                 content_available: true,
//                 priority: "high",
//               },
//             },

//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization:
//                   "Bearer AAAAk97f_j0:APA91bH0LV4tIqdBP7PdYp5uIcg2JrelDDDdjsZtbYeo6tQfBhFV_GOouNaNtqu6PrsoUT7D_POQRQWbSD7SOfw6XDi_GzhfskTFr_wClJSpoIaqxlt0nge7EywM2XWITtO2p9SHDPJr",
//               },
//             }
//           );
//           if (responce.status == 200) {
//             console.log("notification sended", responce.data);
//             if (responce.data.success == 1) {
//               console.log("notification send successfully");
//             } else {
//               console.log("unable to send notification");
//             }
//           } else {
//             console.log("234567890");
//           }
//         }
//       } catch (err) {
//         console.log("send notification error ", err);
//       }
//     });
//     return true;
//   } catch (err) {
//     console.log("getting shipment in notification error", err);
//     return false;
//   }
// };

// const admin = require("firebase-admin");

// ownerId - who owns the picture someone liked
// userId - id of the user who liked the picture
// picture - metadata about the picture
//d1QbG1swQRqaZVrArv6WGm:APA91bGmHgT7K5y69sTnj_hNqMunkTlUrhNy7BURbDYIfa1ICliXlQXmm1TX1ku9-uA6yI7Yq6OJWl_eHqhYH09FkpxdzR7BEynIpEh46YrzGF8e3XJPADnY1d5kvTw3hM-24drdcWzl
export const sendNotification = async (data: any) => {
  const { uids = [], title, message, tokens, icon = "" } = data;
  console.log("call push notification", data);
  await admin
    .messaging(adminApp)
    .sendToDevice(
      tokens,
      {
        data: {
          title: title,
          body: message,
          image: icon.length > 5 ? icon : "",
        },
      },
      {
        // Required for background/quit data-only messages on iOS
        contentAvailable: true,
        // Required for background/quit data-only messages on Android
        priority: "high",
      }
    )
    .then((res: any) => {
      console.log("notification sended", res);
    })
    .catch((err: any) => {
      console.log("notification error", err);
    });
};
