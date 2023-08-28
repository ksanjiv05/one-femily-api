import express from "express";
import { auth } from "../../middelware/firebaseAuth";
import { upload } from "../../middelware/uploder";

import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
} from "../../controllers/authController/auth";
import { addPeople } from "../../controllers/peopleController/people";
import { addRelation, getRelations, getRelationsAll } from "../../controllers/relationController/relation";

const router = express.Router();

router.post("/user", upload.single("pic"), addUser);
router.get("/user/:id", auth, getUser);
router.get("/users", auth, getUsers);
router.delete("/user", auth, deleteUser);

router.post("/people", auth,addPeople);
router.post("/relation", auth,addRelation);
router.get("/relation", auth,getRelations);
router.get("/relation/all", auth,getRelationsAll);



export default router;
