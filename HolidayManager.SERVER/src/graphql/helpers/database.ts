import { IDataModels } from "../../database";
import * as Mongoose from "mongoose" 

export async function saveObjectToDB (object: any) {
    try {
        await object.save();
    } catch(e) {
        throw new Error(e);
    }
};


export async function doesReferenceExistsInDB (_id: string, models: any) {
    const { MongooseModels }: IDataModels = models;
    let ObjectID = Mongoose.Types.ObjectId;
    let stringId = _id.toString().toLowerCase();
    if (!ObjectID.isValid(stringId)) {
        throw new Error("String is not an ObjectID")
    } else {
        const UnitManager = await MongooseModels.UnitManager.findOne({ _id })
        const ProjectManager = await MongooseModels.ProjectManager.findOne({ _id })
        const Developer = await MongooseModels.Developer.findOne({ _id })
        if ( Developer || ProjectManager || UnitManager ) {
            return true;
        } else {
            throw new Error("Reference doesn't exist")
        }
    }
}

export async function findReferenceInDB (_id: string, models: any) {
    const { MongooseModels }: IDataModels = models;
    let ObjectID = Mongoose.Types.ObjectId;
    let stringId = _id.toString().toLowerCase();
    if (!ObjectID.isValid(stringId)) {
        throw new Error("String is not an ObjectID")
    } else {
        const UnitManager = await MongooseModels.UnitManager.findOne({ _id })
        if ( UnitManager ) {
            return UnitManager;
        }
        const ProjectManager = await MongooseModels.ProjectManager.findOne({ _id })
        if ( ProjectManager ) {
            return ProjectManager;
        }
        const Developer = await MongooseModels.Developer.findOne({ _id })
        if ( Developer ) {
            return Developer;
        }
        throw new Error("Reference doesn't exist")
    }
}