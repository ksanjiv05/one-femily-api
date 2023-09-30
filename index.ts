import dotenv from "dotenv";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import "./db";
import router from "./routes/v1";
import "./firebase";

import http from "http";
import { Server, Socket } from "socket.io";
import logging from "./config/logging";
import { startListening } from "./socket_init";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { createSuperAdmin } from "./scripts/createSuperAdmin";
import { csvParser } from "./helper/utils";
import { getTree } from "./controllers/relationController/relation";
import { searchPeople } from "./helper/search_people";
import { sendNotification } from "./helper/fcm";

dotenv.config();

globalThis.__dirname = __dirname;
const app: Express = express();
const port = 4000;
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

//socket io configuration
const server = http.createServer(app);
const io = new Server(server);

declare global {
  var socketObj: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  > | null;
}

// global.socketObj:Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>|null = null;
//socket io connection test
io.on("connection", (socket) => {
  logging.info("SOCKET", "connection established");
  global.socketObj = socket;
  socket.on("disconnect", () => {
    logging.error("SOCKET", "user disconnected");
  });
  startListening(socket);
});
// socket io configuration end
app.use("/static", express.static("uploads"));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

export default io;

// createSuperAdmin();

const runTest = async () => {
  // const pp = await searchPeople({
  //   name: "Dhanashree",
  //   fatherName:"Balkrishna"
  // });
  // console.log("users ", pp);
  // await sendNotification({
  //   title: "test title uyu",
  //   message: "test messagehh state 3 ",
  //   icon: "",
  //   tokens: [
  //     "e7jNhh7qQ4CcQ9AE6QZfr0:APA91bFPH7b3_Q1BlOBwBzBseR5NTylJoujVxa-F_1cq9a34ww-jbMqMdZXNkcyOtRcPbX3fJz0qZuCRla-lNBgaDRR_jlcxYlxLlB3-RTrSr7SLJo4e52KVCeyG2DprG0Q2wuufaBjV",
  //   ],
  // });
  // searchPeople({
  //   name: "kishan",
  //   fatherName: "laxman",
  //   motherName: "phool",
  //   motherMiddleName: "kumari",
  //   email: "sunayna@gmail.com",
  //   pic: "http://localhost:3000/static/undefined",
  //   gender: "m",
  //   dob: "",
  //   nativePlace: "bebye",
  //   occupation: "farmerc",
  //   bloodGroup: "A+",
  //   uid: "nFVzzbrbtLhL1ZLRza4zNwzkmNE3",
  // });

  const tr = await getTree(
    `[{"_id":"650b3663f3c60aea80a78a1d","uid":"wqcMDo4QEcZTnZDrLPdbvm2InrE2","parentId":null,"relationType":"","relationName":"jyoti","relationUid":"650b3663f3c60aea80a78a1d","createdAt":{"$date":"2023-09-20T18:13:55.777Z"},"__v":0},{"_id":"650c11b92b303a2b81e95db7","uid":"wqcMDo4QEcZTnZDrLPdbvm2InrE2","parentId":"650b31e1f3c60aea80a789fe","relationType":"Brother","relationName":"kishan","relationUid":"650b341df3c60aea80a78a0b","createdAt":"2023-09-21T09:49:45.375Z","__v":0},{"_id":"650b36baf3c60aea80a78a2b","uid":"wqcMDo4QEcZTnZDrLPdbvm2InrE2","parentId":"650b3663f3c60aea80a78a1d","relationType":"Brother","relationName":"sanjiv","relationUid":"650b31e1f3c60aea80a789fe","createdAt":"2023-09-20T18:15:22.523Z","__v":0}]`
  );
  console.log("tr ", tr);
};

// runTest();
