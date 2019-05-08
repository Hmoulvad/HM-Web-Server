import { IHolidayRequestModel } from "../../database/schemas/holiday-request.schema";
import { IDataModels } from "../../database/index";
import { Role, IHolidayRequest } from "../../models/models";
import { saveObjectToDB } from "../helpers/database";

export default {
    Query: {
        getUserHolidayRequests: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            try {
                const holidayRequests: IHolidayRequestModel[] = await MongooseModels.HolidayRequest.find({creatorRef: _id})
                if ( holidayRequests ) {
                    return holidayRequests;
                } else {
                    new Error("No such user exists")
                }
            } catch (error) {
                new Error(error)
            }
        },
    },
    Mutation: {
        createHolidayRequest: async (parent, { _id, role, projectId, from, to }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            if ( role === Role.developer ) {
                const developer = await MongooseModels.Developer.findById(_id)
                const project = await MongooseModels.Project.findById(projectId)
                if ( developer && project ) {
                    try {
                        const newHolidayRequest: IHolidayRequest = new MongooseModels.HolidayRequest({
                            creatorRef: developer.id,
                            unitManagerRef: developer.ref,
                            ref: project.projectManager,
                            from: from as Date,
                            to: to as Date,
                        })
                        await saveObjectToDB(newHolidayRequest);
                        developer.holidayRequests.push(newHolidayRequest);
                        await saveObjectToDB(developer);
                        return true;
                    } catch (error) {
                        new Error(error)
                    }
                } else {
                    new Error("Such developer or project doesn't exists");
                }
            }
            if ( role === Role.projectManager ) {
                const projectManager = await MongooseModels.ProjectManager.findById({ _id});
                try {
                    const newHolidayRequest: IHolidayRequest = new MongooseModels.HolidayRequest({
                        creatorRef: projectManager.id,
                        unitManagerRef: projectManager.ref,
                        from: from as Date,
                        to: to as Date
                    })
                    await saveObjectToDB(newHolidayRequest);
                    projectManager.holidayRequests.push(newHolidayRequest);
                    await saveObjectToDB(projectManager);
                    return true;
                } catch (error) {
                    new Error(error)
                }
            }
            if (role === Role.unitManager) {
                const unitManager= await MongooseModels.UnitManager.findById(_id);
                try {
                    const newHolidayRequest: IHolidayRequest = new MongooseModels.HolidayRequest({
                        creatorRef: unitManager.id,
                        ref: unitManager.ref,
                        from: from as Date,
                        to: to as Date
                    })
                    await saveObjectToDB(newHolidayRequest);
                    unitManager.holidayRequests.push(newHolidayRequest);
                    await saveObjectToDB(unitManager);
                    return true;
                } catch (error) {
                    new Error(error)   
                }
            }
            return false;
        }
    }
};