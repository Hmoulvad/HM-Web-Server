import * as Mongoose from "mongoose";
import { IProject } from "../../models/models";

export interface IProjectModel extends IProject, Mongoose.Document { }

export const ProjectSchema = new Mongoose.Schema({
    name: String,
    developers: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Developer"
    }],
    projectManager: Mongoose.Schema.Types.ObjectId,
    unit: Mongoose.Schema.Types.ObjectId,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "Projects" });

export default Mongoose.model<IProjectModel>("Project", ProjectSchema);
