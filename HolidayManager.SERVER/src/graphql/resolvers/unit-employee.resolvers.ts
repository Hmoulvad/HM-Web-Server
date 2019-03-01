import { IUnitEmployeeModel } from "../../database/schemas/unit-employee.schema";
import { IDataModels } from "../../database/index";

export default {
    Query: {
        unitEmployee: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const UnitEmployee: IUnitEmployeeModel = await MongooseModels.UnitEmployee.findOne({ _id });
            return UnitEmployee;
        },
    },
    Mutation: {
        createUnitEmployee: async (parent, { name }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const UnitEmployee: IUnitEmployeeModel = await MongooseModels.UnitEmployee.findOne({ name });
            if ( UnitEmployee ) {
                throw new Error("Please provide a unique name.");
            }

            const newUnitEmployee: IUnitEmployeeModel = new MongooseModels.UnitEmployee({
                name,
            })

            try {
                await newUnitEmployee.save();
            } catch(e) {
                throw new Error(e);
            }

            return true;
        }
    }
};