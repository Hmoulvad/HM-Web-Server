import { IUnitModel } from "../../database/schemas/unit.schema";
import { IProjectManagerModel } from "../../database/schemas/project-manager.schema";
import { IDataModels } from "../../database/index";
import { saveObjectToDB } from "../helper.functions.ts/helper";

export default {
    Query: {
        projectManager: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const ProjectManager = await MongooseModels.ProjectManager.findOne({ _id });
            return ProjectManager;
        },
    },
    Mutation: {
        createProjectManager: async (parent, { name, unitId, referenceId }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const ProjectManager = await MongooseModels.ProjectManager.findOne({ name });
            if ( ProjectManager ) {
                throw new Error("Please provide a unique name.");
            }
            const _id = unitId;
            const Unit: IUnitModel = await MongooseModels.Unit.findOne({ _id });
            if ( Unit ) {
                const newProjectManager: IProjectManagerModel = new MongooseModels.ProjectManager({
                    name,
                    role: "Project Manager",
                    unit: Unit,
                    referenceId: referenceId
                });
                await saveObjectToDB(newProjectManager);
                Unit.projectManagers.push(newProjectManager);
                
                await saveObjectToDB(Unit);
                return true;
            } else {
                throw new Error ("Unit couldn't be found")
            }   
        },
    }
};