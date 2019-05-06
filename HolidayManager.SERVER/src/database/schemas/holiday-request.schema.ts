import * as Mongoose from "mongoose";
import { IHolidayRequest } from "../../models/models";

export interface IHolidayRequestModel extends IHolidayRequest, Mongoose.Document { }

export const HolidayRequestSchema = new Mongoose.Schema({
    dates: [Date],
    unitManagerRef: Mongoose.Schema.Types.ObjectId,
    unitManagerApproved: Boolean || undefined,
    projectManageRef: Mongoose.Schema.Types.ObjectId,
    projectManagerApproved: Boolean || undefined,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "HolidayRequests" });

export default Mongoose.model<IHolidayRequestModel>("HolidayRequest", HolidayRequestSchema);
