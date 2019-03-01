import * as Mongoose from "mongoose";
import Unit, { IUnitModel } from "./schemas/unit.schema";
import Project, { IProjectModel } from "./schemas/project.schema";
import UnitEmployee, { IUnitEmployeeModel } from "./schemas/unit-employee.schema";
import ProjectManager, { IProjectManagerModel } from "./schemas/project-manager.schema";
import HolidayRequest, { IHolidayRequestModel } from "./schemas/holiday-request.schema";

export interface IMongooseModels {
    Unit: Mongoose.Model<IUnitModel, {}>;
    Project: Mongoose.Model<IProjectModel, {}>;
    UnitEmployee: Mongoose.Model<IUnitEmployeeModel, {}>;
    ProjectManager: Mongoose.Model<IProjectManagerModel, {}>;
    HolidayRequest: Mongoose.Model<IHolidayRequestModel, {}>;
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
    UnitEmployee,
    ProjectManager,
    HolidayRequest
  }
}