import { IProjectModel } from "../../database/schemas/project.schema";
import { IDataModels } from "../../database/index";

export default {
    Query: {
        project: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Project: IProjectModel = await MongooseModels.Project.findOne({ _id });
            return Project;
        },
    },
    Mutation: {
        createProject: async (parent, { name }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Project: IProjectModel = await MongooseModels.Project.findOne({ name });
            if ( Project ) {
                throw new Error("Please provide a unique name.");
            }

            const newProject: IProjectModel = new MongooseModels.Project({
                name,
            })

            try {
                await newProject.save();
            } catch(e) {
                throw new Error(e);
            }

            return true;
        }
    }
};