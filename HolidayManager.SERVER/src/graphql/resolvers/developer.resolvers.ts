import { IDeveloperModel } from "../../database/schemas/developer.schema";
import { IDataModels } from "../../database/index";
import { IUnitModel } from "../../database/schemas/unit.schema";
import { saveObjectToDB } from "../helper.functions.ts/helper";

export default {
    Query: {
        developer: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Developer: IDeveloperModel = await MongooseModels.Developer.findOne({ _id });
            return Developer;
        },
    },
    Mutation: {
        createDeveloper: async (parent, { name, unitId }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const findDeveloper = { name: name }
            const Developer: IDeveloperModel = await MongooseModels.Developer.findOne( findDeveloper );
            if ( Developer ) {
                throw new Error("Please provide a unique name.");
            }
            const findUnit = { _id: unitId }
            const Unit: IUnitModel = await MongooseModels.Unit.findOne(findUnit)
            if ( Unit ) {
                const newDeveloper: IDeveloperModel = new MongooseModels.Developer({
                    name,   
                })
                await saveObjectToDB(newDeveloper);
                Unit.devolopers.push(newDeveloper);
                await saveObjectToDB(Unit);
            }
            return true;
        }
    }
};