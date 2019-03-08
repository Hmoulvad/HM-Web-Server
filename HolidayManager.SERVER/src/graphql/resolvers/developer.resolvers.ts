import { IDeveloperModel } from "../../database/schemas/developer.schema";
import { IDataModels } from "../../database/index";
import { IUnitModel } from "../../database/schemas/unit.schema";
import { saveObjectToDB, findReferenceInDB } from "../helpers/database.functions";
import { IProjectModel } from "../../database/schemas/project.schema";

export default {
    Query: {
        developer: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Developer: IDeveloperModel = await MongooseModels.Developer.findOne({ _id });
            return Developer;
        },
    },
    Mutation: {
        createDeveloper: async (parent, { name, unitId, projectId }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const findDeveloper = { name: name }
            const Developer: IDeveloperModel = await MongooseModels.Developer.findOne( findDeveloper );
            if ( Developer ) {
                throw new Error("Please provide a unique name.");
            }
            const Unit: IUnitModel = await MongooseModels.Unit.findOne({ _id: unitId })
            if ( Unit ) {
                    const Project: IProjectModel = await MongooseModels.Project.findOne({ _id: projectId })
                    if ( Project ) {
                        const newDeveloper: IDeveloperModel = new MongooseModels.Developer({
                            name,
                            role: "Developer",
                            unit: Unit.id,
                            referenceId: Unit.unitManager,
                            projects: projectId,   
                        });
                        await saveObjectToDB(newDeveloper);
                        Project.developers.push(newDeveloper);
                        await saveObjectToDB(Project);
                        Unit.developers.push(newDeveloper);
                        await saveObjectToDB(Unit);
                        return true;
                    }
            }
        }
    }
};