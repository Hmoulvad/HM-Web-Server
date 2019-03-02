import { IProjectModel } from "../../database/schemas/project.schema";
import { IDataModels } from "../../database/index";
import { IUnitModel } from "../../database/schemas/unit.schema";

export default {
    Query: {
        project: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Project: IProjectModel = await MongooseModels.Project.findOne({ _id });
            if ( Project ) {
                return Project;
            }
            else throw new Error ("Couldn't find Project");
        },
    },
    Mutation: {
        createProject: async (parent, { name, unit_id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Project: IProjectModel = await MongooseModels.Project.findOne({ name });
            if ( Project ) {
                throw new Error("Please provide a unique name.");
            }
            const findUnit = { _id: unit_id };
            const Unit: IUnitModel = await MongooseModels.Unit.findOne(findUnit);
            if ( Unit ) {
                const newProject: IProjectModel = new MongooseModels.Project({
                    name,
                    unit: unit_id,
                })
                try {
                    await newProject.save();
                } catch(e) {
                    throw new Error(e);
                }
                const Project: IProjectModel = await MongooseModels.Project.findOne({ name });
                Unit.projects.push(Project);
                try {
                    await Unit.save();
                } catch(e) {
                    throw new Error(e);
                }
                return true;
            } else  {
                return false;
            }
        }
    }
};