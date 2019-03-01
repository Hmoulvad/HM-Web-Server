import * as Mongoose from "mongoose";
import { IProjectManager } from "../../models/models";

export interface IProjectManagerModel extends IProjectManager, Mongoose.Document { }

export const ProjectManagerSchema = new Mongoose.Schema({
    name: String,
    role: String,
    referenceId: Mongoose.Schema.Types.ObjectId,
    unit: Mongoose.Schema.Types.ObjectId,
    holidayRequests: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "HolidayRequest"
    }],
    projects: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "ProjectManagers" });

export default Mongoose.model<IProjectManagerModel>("ProjectManager", ProjectManagerSchema);
