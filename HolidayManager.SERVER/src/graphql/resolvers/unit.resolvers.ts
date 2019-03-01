import { IUnitModel } from "../../database/schemas/unit.schema";
import { IDataModels } from "../../database/index";

export default {
    Query: {
        unit: async (parent, { _id }, { models } )  => {
            const { MongooseModels }: IDataModels = models;
            const Unit: IUnitModel = await MongooseModels.Unit.findOne({ _id });
            return Unit;
        },
    },
    Mutation: {
        createUnit: async (parent, { name }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Unit: IUnitModel = await MongooseModels.Unit.findOne({ name });
            if ( Unit ) {
                throw new Error("Please provide a unique name.");
            }

            const newUnit: IUnitModel = new MongooseModels.Unit({
                name,
            })

            try {
                await newUnit.save();
            } catch(e) {
                throw new Error(e);
            }

            return true;
        }
    }
};