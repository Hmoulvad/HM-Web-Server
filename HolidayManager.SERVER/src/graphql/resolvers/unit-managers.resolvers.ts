import { IUnitManagerModel } from "../../database/schemas/unit-manager.schema";
import { IDataModels } from "../../database/index";

export default {
    Query: {
        unitManager: async (parent, { _id }, { models } )  => {
            const { MongooseModels }: IDataModels = models;
            const UnitManager: IUnitManagerModel = await MongooseModels.UnitManager.findOne({ _id });
            return UnitManager;
        },
    },
    Mutation: {
        createUnitManager: async (parent, { name }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const UnitManager: IUnitManagerModel = await MongooseModels.UnitManager.findOne({ name });
            if ( UnitManager ) {
                throw new Error("Please provide a unique name.");
            }

            const newUnitManager: IUnitManagerModel = new MongooseModels.UnitManager({
                name,
            })

            try {
                await newUnitManager.save();
            } catch(e) {
                throw new Error(e);
            }

            return true;
        }
    }
};