import * as Mongoose from "mongoose";
import { IProject } from "../../models/models";

interface IProjectModel extends IProject, Mongoose.Document { }

export const ProjectSchema = new Mongoose.Schema({
    name: String,
    developers: [],
    projectManager: Mongoose.Types.ObjectId,
    unit: Mongoose.Types.ObjectId,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "Projects" });

export default Mongoose.model<IProjectModel>("Project", ProjectSchema);
