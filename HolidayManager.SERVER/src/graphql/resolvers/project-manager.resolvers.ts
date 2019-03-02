import { IUnitModel } from "../../database/schemas/unit.schema";
import { IProjectManagerModel } from "../../database/schemas/project-manager.schema";
import { IDataModels } from "../../database/index";

export default {
    Query: {
        projectManager: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const ProjectManager = await MongooseModels.ProjectManager.findOne({ _id });
            return ProjectManager;
        },
    },
    Mutation: {
        createProjectManager: async (parent, { name, unit_id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const ProjectManager = await MongooseModels.ProjectManager.findOne({ name });
            if ( ProjectManager ) {
                throw new Error("Please provide a unique name.");
            }
            const _id = unit_id;
            const Unit: IUnitModel = await MongooseModels.Unit.findOne({ _id });
            if ( Unit ) {
                const newProjectManager: IProjectManagerModel = new MongooseModels.ProjectManager({
                    name,
                    role: "ProjectManager",
                    unit: Unit
                });
                try {
                    await newProjectManager.save();
                } catch(e) {
                    throw new Error(e);
                }
                Unit.projectManagers.push(newProjectManager);
                try {
                    await Unit.save();
                } catch(e) {
                    throw new Error(e);
                }
                return true;
            } else {
                throw new Error ("Unit couldn't be found")
            }   
        }
    }
};