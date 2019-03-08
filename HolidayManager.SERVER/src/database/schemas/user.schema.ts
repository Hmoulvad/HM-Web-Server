import * as Mongoose from "mongoose";
import { IUser } from "../../models/models";

export interface IUserModel extends IUser, Mongoose.Document { }

export const UserSchema = new Mongoose.Schema({
    username: String,
    password: String,
    referenceId: Mongoose.Schema.Types.ObjectId,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "Users" });

export default Mongoose.model<IUserModel>("User", UserSchema);