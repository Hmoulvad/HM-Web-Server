import * as Mongoose from "mongoose";
import Unit from "./schemas/unit.schema";
import Project from "./schemas/project.schema";

export const startDB = ({user, pwd}) => Mongoose.connect(
    `mongodb+srv://${user}:${pwd}@hm-impact-tvrfv.azure.mongodb.net/HM-IMPACT?retryWrites=true`,
    {
      useNewUrlParser: true
    }
);

export const models = {
    Unit,
    Project
}