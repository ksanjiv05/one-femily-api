import express from "express";
import { auth } from "../../middelware/firebaseAuth";
import { upload } from "../../middelware/uploder";

import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
} from "../../controllers/authController/auth";

const router = express.Router();

router.post("/users", upload.single("pic"), addUser);
router.get("/user/:id", auth, getUser);
router.get("/users", auth, getUsers);
router.delete("/user", auth, deleteUser);

export default router;
