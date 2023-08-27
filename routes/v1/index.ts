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

const router = express.Router();

router.post("/user", upload.single("pic"), (req,res)=>{
  console.log("req", req.body);
  res.json({msg:"ok"})
});
router.get("/user/:id", auth, getUser);
router.get("/users", auth, getUsers);
router.delete("/user", auth, deleteUser);

router.post("/people", auth,addPeople);

export default router;
