import * as Mongoose from "mongoose";
import { IHolidayRequest } from "../../models/models";

export interface IHolidayRequestModel extends IHolidayRequest, Mongoose.Document { }

export const HolidayRequestSchema = new Mongoose.Schema({
    from: Date,
    to: Date,
    unitManagerRef: Mongoose.Schema.Types.ObjectId,
    unitManagerApproval: Boolean || undefined,
    ref: Mongoose.Schema.Types.ObjectId,
    refApproval: Boolean || undefined,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "HolidayRequests" });

export default Mongoose.model<IHolidayRequestModel>("HolidayRequest", HolidayRequestSchema);
