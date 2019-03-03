import { IUnitManagerModel } from "../../database/schemas/unit-manager.schema";
import { IDataModels } from "../../database/index";
import { IUnitModel } from "../../database/schemas/unit.schema";

export default {
    Query: {
        unitManager: async (parent, { _id }, { models } )  => {
            const { MongooseModels }: IDataModels = models;
            const UnitManager: IUnitManagerModel = await MongooseModels.UnitManager.findOne({ _id });
            if ( UnitManager ) {
                return UnitManager;
            }
            else throw new Error ("Couldn't find Unit manager");
        },
    },
    Mutation: {
        createUnitManager: async (parent, { name, unitId, referenceId }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const UnitManager: IUnitManagerModel = await MongooseModels.UnitManager.findOne({ name });
            if ( UnitManager ) {
                throw new Error("Please provide a unique name.");
            }
            const findUnit = { _id: unitId };
            const Unit: IUnitModel = await MongooseModels.Unit.findOne(findUnit);
            if ( Unit ) {
                const newUnitManager: IUnitManagerModel = new MongooseModels.UnitManager({
                    name,
                    unit: unitId,
                    role: "Unit Manager",
                    referenceId
                })
                try {
                    await newUnitManager.save();
                } catch(e) {
                    throw new Error(e);
                }
                const UnitManager: IUnitManagerModel = await MongooseModels.UnitManager.findOne({ name });
                Unit.unitManager = UnitManager.id;
                try {
                    await Unit.save();
                } catch(e) {
                    throw new Error(e);
                }
                return true;
            } else {
                return false;
            }
        }
    }
};