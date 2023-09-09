import express from "express";
import { auth } from "../../middelware/firebaseAuth";
import { upload } from "../../middelware/uploder";

import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  saveFcmToken,
  updateUser,
  updateUserOptionalDetails,
} from "../../controllers/authController/auth";
import { addPeople } from "../../controllers/peopleController/people";
import {
  addRelation,
  getRelations,
  getRelationsAll,
} from "../../controllers/relationController/relation";
import { getNotifications } from "../../controllers/notificationController/notification";

const router = express.Router();

router.post("/user", upload.single("pic"), addUser);
router.put("/user", auth, upload.single("pic"), updateUser);
router.put("/user/optional", auth, updateUserOptionalDetails);

router.post("/user/fcm/token", auth, saveFcmToken);

router.get("/user", auth, getUser);
router.get("/users", auth, getUsers);
router.delete("/user", auth, deleteUser);

router.post("/people", auth, addPeople);
router.post("/relation", auth, addRelation);
router.get("/relation", auth, getRelations);
router.get("/relation/all", auth, getRelationsAll);

router.get("/notifications", auth, getNotifications);

export default router;
