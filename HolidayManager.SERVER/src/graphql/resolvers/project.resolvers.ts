import { IProjectModel } from "../../database/schemas/project.schema";
import { IDataModels } from "../../database/index";
import { IUnitModel } from "../../database/schemas/unit.schema";
import { findReferenceInDB, saveObjectToDB } from "../helper.functions.ts/helper";

export default {
    Query: {
        project: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Project: IProjectModel = await MongooseModels.Project.findOne({ _id });
            if ( Project ) {
                return Project;
            }
            else throw new Error ("Couldn't find Project");
        }
    },
    Mutation: {
        createProject: async (parent, { name, unitId }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Project: IProjectModel = await MongooseModels.Project.findOne({ name });
            if ( Project ) {
                throw new Error("Please provide a unique name.");
            }
            const findUnit = { _id: unitId };
            const Unit: IUnitModel = await MongooseModels.Unit.findOne(findUnit);
            if ( Unit ) {
                const newProject: IProjectModel = new MongooseModels.Project({
                    name,
                    unit: unitId,
                })
                await saveObjectToDB(newProject);
                
                const Project: IProjectModel = await MongooseModels.Project.findOne({ name });
                Unit.projects.push(Project);
                await saveObjectToDB(Project);
                return true;
            } else  {
                return false;
            }
        },
    }
};