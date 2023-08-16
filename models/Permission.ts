import mongoose, { Schema } from "mongoose";

import logging from "../config/logging";
import { IPermission } from "../interfaces/IPermission";

const PermissionSchema: Schema = new Schema({
  uid: {
    type:String,
    required:true,
  },
 picPermissions:[String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PermissionSchema.post<IPermission>("save", function () {
  logging.info("Mongo", "New Permission just saved: ");
});

export default mongoose.model<IPermission>("Permission", PermissionSchema);
