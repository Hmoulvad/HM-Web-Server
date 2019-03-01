import * as Mongoose from "mongoose";
import { IUnitEmployee } from "../../models/models";

export interface IUnitEmployeeModel extends IUnitEmployee, Mongoose.Document { }

export const UnitEmployeeSchema = new Mongoose.Schema({
    name: String,
    unit: Mongoose.Schema.Types.ObjectId,
    holidayRequests: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "HolidayRequest"
    }],
    role: String,
    referenceId: Mongoose.Schema.Types.ObjectId,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "UnitEmployees" });

export default Mongoose.model<IUnitEmployeeModel>("UnitEmployee", UnitEmployeeSchema);