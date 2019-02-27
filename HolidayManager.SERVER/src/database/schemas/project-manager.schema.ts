import * as Mongoose from "mongoose";
import { IProjectManager } from "../../models/models";

interface IProjectManagerModel extends IProjectManager, Mongoose.Document { }

export const ProjectManagerSchema = new Mongoose.Schema({
    name: String,
    unit: Mongoose.Types.ObjectId,
    holidayRequests: [],
    role: String,
    referenceId: Mongoose.Types.ObjectId,
    projects: [],
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "ProjectManagers" });

export default Mongoose.model<IProjectManagerModel>("ProjectManager", ProjectManagerSchema);
