import { getAuth } from "firebase-admin/auth";
import { USER_ROLES } from "../config/enums";
import logging from "../config/logging";
import {
  addUserToFirebase,
  addUserToMongoDB,
  deleteUserFromFirebase,
} from "../controllers/authController/auth";
import { adminApp } from "../firebase";

export const createSuperAdmin = async () => {
  try {
    const userObj: any = {
      displayName: "Admin",
      email: "admin@admin.com",
      phoneNumber: "+911111111247",
      isAdminAccess: true,
      password: "admin@1234",
    };
    const newUserRecord = await getAuth(adminApp).createUser(userObj);
    const isAdded = await addUserToMongoDB({
      ...userObj,
      uid: newUserRecord.uid,
    });
    await getAuth(adminApp).setCustomUserClaims(newUserRecord.uid, {
      // role: role,
      admin: userObj.isAdminAccess,
    });

    if (!isAdded) {
      await deleteUserFromFirebase(newUserRecord.uid);

      logging.error("USER", "Unable to create super admin");
      return;
    }
    logging.info("USER", "Super Admin Created");
  } catch (err) {
    logging.error("USER", "Unable to create super admin", err);
  }
};
