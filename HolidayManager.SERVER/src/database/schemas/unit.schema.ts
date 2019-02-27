import * as Mongoose from "mongoose";
import { IUnit } from "../../models/models";

interface IUnitModel extends IUnit, Mongoose.Document { }

export const UnitSchema = new Mongoose.Schema({
    name: String,
    developers: [],
    projects: [],
    projectManagers: [],
    unitManager: Mongoose.Types.ObjectId,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export default Mongoose.model<IUnitModel>("Unit", UnitSchema);
