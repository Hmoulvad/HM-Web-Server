import * as Mongoose from "mongoose";
import { IHolidayRequest } from "../../models/models";

export interface IHolidayRequestModel extends IHolidayRequest, Mongoose.Document { }

export const HolidayRequestSchema = new Mongoose.Schema({
    from: Date,
    to: Date,
    creatorRef: Mongoose.Schema.Types.ObjectId,
    unitManagerRef: Mongoose.Schema.Types.ObjectId || undefined,
    unitManagerApproval: Boolean || undefined,
    ref: Mongoose.Schema.Types.ObjectId || undefined,
    refApproval: Boolean || undefined,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "HolidayRequests" });

export default Mongoose.model<IHolidayRequestModel>("HolidayRequest", HolidayRequestSchema);
