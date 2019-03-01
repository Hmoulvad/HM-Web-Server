import * as Mongoose from "mongoose";
import { IHolidayRequest } from "../../models/models";

export interface IHolidayRequestModel extends IHolidayRequest, Mongoose.Document { }

export const HolidayRequestSchema = new Mongoose.Schema({
    dates: [Object],
    referenceId: Mongoose.Types.ObjectId,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "HolidayRequests" });

export default Mongoose.model<IHolidayRequestModel>("HolidayRequest", HolidayRequestSchema);
