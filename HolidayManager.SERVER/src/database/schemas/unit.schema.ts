import * as Mongoose from "mongoose";
import { IUnit } from "../../models/models";

export interface IUnitModel extends IUnit, Mongoose.Document { }

export const UnitSchema = new Mongoose.Schema({
    name: String,
    developers: [Object],
    projects: [Object],
    projectManagers: [Object],
    unitManager: Mongoose.Types.ObjectId,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "Units" });

export default Mongoose.model<IUnitModel>("Unit", UnitSchema);
