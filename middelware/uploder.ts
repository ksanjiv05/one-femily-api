import { Request, Response } from "express";
import multer from "multer";
import mkdirp from "mkdirp";
import { v4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    console.log("dirname", req.body);
    mkdirp.sync(globalThis.__dirname + "/uploads/images");
    cb(null, globalThis.__dirname + "/uploads/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = v4();
    console.log("file", file);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
