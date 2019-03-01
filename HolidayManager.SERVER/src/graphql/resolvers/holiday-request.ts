import { IHolidayRequestModel } from "../../database/schemas/holiday-request.schema";
import { IDataModels } from "../../database/index";
import { IUnitModel } from "../../database/schemas/unit.schema";

export default {
    Query: {
        holidayRequest: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const HolidayRequest: IHolidayRequestModel = await MongooseModels.HolidayRequest.findOne({ _id });
            return HolidayRequest;
        },
    },
    Mutation: {
        createHolidayRequest: async (parent, { name }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const HolidayRequest: IHolidayRequestModel = await MongooseModels.HolidayRequest.findOne({ name });
            if ( HolidayRequest ) {
                throw new Error("Please provide a unique name.");
            }

            const newHolidayRequest: IHolidayRequestModel = new MongooseModels.HolidayRequest({
                name,
            })

            try {
                await newHolidayRequest.save();
            } catch(e) {
                throw new Error(e);
            }

            return true;
        }
    }
};