import * as Mongoose from "mongoose";
import { IProjectManager } from "../../models/models";

export interface IProjectManagerModel extends IProjectManager, Mongoose.Document { }

export const ProjectManagerSchema = new Mongoose.Schema({
    name: String,
    unit: Mongoose.Types.ObjectId,
    holidayRequests: [Object],
    role: String,
    referenceId: Mongoose.Types.ObjectId,
    projects: [Object],
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "ProjectManagers" });

export default Mongoose.model<IProjectManagerModel>("ProjectManager", ProjectManagerSchema);
