import { IHolidayRequestModel } from "../../database/schemas/holiday-request.schema";
import { IDataModels } from "../../database/index";
import { Role, IDeveloper, IUnitManager, IProjectManager, IHolidayRequest } from "../../models/models";
import { saveObjectToDB } from "../helpers/database";

export default {
    Query: {
        holidayRequest: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const HolidayRequest: IHolidayRequestModel = await MongooseModels.HolidayRequest.findById(_id);
            return HolidayRequest;
        },
    },
    Mutation: {
        createHolidayRequest: async (parent, { _id, role, projectId, from, to }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            if ( role === Role.developer ) {
                const developer = await MongooseModels.Developer.findById(_id)
                const project = await MongooseModels.Project.findById(projectId)
                if ( developer && project) {
                    const newHolidayRequest: IHolidayRequest = new MongooseModels.HolidayRequest({
                        creatorRef: developer.id,
                        unitManagerRef: developer.ref,
                        unitManagerApproval: undefined,
                        ref: project.projectManager,
                        refApproval: undefined,
                        from: from as Date,
                        to: to as Date,
                    })
                    await saveObjectToDB(newHolidayRequest);
                    developer.holidayRequests.push(newHolidayRequest);
                    await saveObjectToDB(developer);
                } else {
                    new Error("No Developer or Project exists")
                }
            }
            if ( role === Role.projectManager ) {
                const projectManager = await MongooseModels.ProjectManager.findById({ _id});
            }
            return true;
        }
    }
};