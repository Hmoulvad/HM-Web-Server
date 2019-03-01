import * as Mongoose from "mongoose";
import { IUnitEmployee } from "../../models/models";

export interface IUnitEmployeeModel extends IUnitEmployee, Mongoose.Document { }

export const UnitEmployeeSchema = new Mongoose.Schema({
    name: String,
    unit: Mongoose.Types.ObjectId,
    holidayRequests: [Object],
    role: String,
    referenceId: Mongoose.Types.ObjectId,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "UnitEmployees" });

export default Mongoose.model<IUnitEmployeeModel>("UnitEmployee", UnitEmployeeSchema);