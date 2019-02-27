import * as Mongoose from "mongoose";
import { IHolidayRequest } from "../../models/models";

interface IHolidayRequestModel extends IHolidayRequest, Mongoose.Document { }

export const HolidayRequestSchema = new Mongoose.Schema({
    dates: [],
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "HolidayRequests" });

export default Mongoose.model<IHolidayRequestModel>("HolidayRequest", HolidayRequestSchema);
