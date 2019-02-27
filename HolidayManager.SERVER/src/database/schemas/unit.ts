import * as Mongoose from "mongoose";

const Schema = Mongoose.Schema;

export const UnitSchema = new Schema({
    name: String,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

export default Mongoose.model("Unit", UnitSchema);
