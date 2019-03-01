import * as Mongoose from "mongoose";
import Unit, { IUnitModel } from "./schemas/unit.schema";
import Project, { IProjectModel } from "./schemas/project.schema";
import Developer, { IDeveloperModel } from "./schemas/developer.schema";
import ProjectManager, { IProjectManagerModel } from "./schemas/project-manager.schema";
import HolidayRequest, { IHolidayRequestModel } from "./schemas/holiday-request.schema";
import UnitManager, { IUnitManagerModel } from "./schemas/unit-manager.schema";

export interface IMongooseModels {
    Unit: Mongoose.Model<IUnitModel, {}>;
    Project: Mongoose.Model<IProjectModel, {}>;
    Developer: Mongoose.Model<IDeveloperModel, {}>;
    ProjectManager: Mongoose.Model<IProjectManagerModel, {}>;
    HolidayRequest: Mongoose.Model<IHolidayRequestModel, {}>;
    UnitManager: Mongoose.Model<IUnitManagerModel, {}>;
}

export interface IDataModels {
  MongooseModels: IMongooseModels;
}

export const startDB = ({user, pwd}) => Mongoose.connect(
    `mongodb+srv://${user}:${pwd}@hm-impact-tvrfv.azure.mongodb.net/HM-IMPACT?retryWrites=true`,
    {
      useNewUrlParser: true
    }
);

export const models: IDataModels = {
  MongooseModels: {
    Unit,
    Project,
    Developer,
    ProjectManager,
    HolidayRequest,
    UnitManager,
  }
}