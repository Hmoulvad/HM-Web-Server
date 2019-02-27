import * as Mongoose from "mongoose";

const Schema = Mongoose.Schema;

export const UnitSchema = new Schema({
    _id: Mongoose.Types.ObjectId,
    name: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});

export default Mongoose.model("Unit", UnitSchema);
