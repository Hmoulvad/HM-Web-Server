import * as Mongoose from "mongoose";
import Unit from "./schemas/unit";

export const startDB = ({user, pwd}) => Mongoose.connect(
    `mongodb+srv://${user}:${pwd}@hm-impact-tvrfv.azure.mongodb.net/test?retryWrites=true`,
    {
      useNewUrlParser: true
    }
);

export const models = {
    Unit
}