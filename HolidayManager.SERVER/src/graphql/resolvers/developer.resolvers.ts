import { IDeveloperModel } from "../../database/schemas/developer.schema";
import { IDataModels } from "../../database/index";
import { IUnitModel } from "../../database/schemas/unit.schema";

export default {
    Query: {
        developer: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Developer: IDeveloperModel = await MongooseModels.Developer.findOne({ _id });
            return Developer;
        },
    },
    Mutation: {
        createDeveloper: async (parent, { name, unit_name }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const findDeveloper = { name: name }
            const Developer: IDeveloperModel = await MongooseModels.Developer.findOne( findDeveloper );
            if ( Developer ) {
                throw new Error("Please provide a unique name.");
            }
            const findUnit = { name: unit_name }
            const Unit: IUnitModel = await MongooseModels.Unit.findOne(findUnit)
            if ( Unit ) {
                const newDeveloper: IDeveloperModel = new MongooseModels.Developer({
                    name,
                })
                try {
                    await newDeveloper.save();
                } catch(e) {
                    throw new Error(e);
                }

                Unit.devolopers.push(newDeveloper);
            }
            return true;
        }
    }
};