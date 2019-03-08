
import { IUser } from "../../models/models";
import * as Bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IDataModels } from "../../database";
import { saveObjectToDB } from "../helpers/database.functions";
import { IUserModel } from "../../database/schemas/user.schema";
import * as Mongoose from "mongoose";

export default {
    Query: {
        isLoggedIn: async (parent, args, { req, models }) => {
            const { MongooseModels}: IDataModels = models;
            const { request }: any = req;

            if (jwt.verify(request.headers.authorization, process.env.Jwt_Secret)) {
                const decodedJWT: any = await jwt.decode(request.headers.authorization);
            
                let ObjectID = Mongoose.Types.ObjectId;
                let toObjectID = decodedJWT.data.toString().toLowerCase();
                if (!ObjectID.isValid(toObjectID)) {
                    throw new Error("String is not an ObjectID");
                }
                const User: IUserModel = await MongooseModels.User.findOne({_id: toObjectID}); 
                if ( User ) {
                    return User;
                } else {
                    throw new Error("You're not logged in");
                }
            }
        },   
    },
    Mutation: {
        login: async (parent, { username, password }, { models }) => {
            const { MongooseModels}: IDataModels = models;
            const User: IUserModel = await MongooseModels.User.findOne({ username });
            if ( User ) {
                if ( await Bcrypt.compareSync(password, User.password)) {
                    const token = jwt.sign(
                    {
                        data: User.id
                    }, 
                    process.env.Jwt_Secret, 
                    { 
                        expiresIn: '1h' 
                    });
                    return token;
                }
                throw new Error("Password and username does not match.")
            }
            throw new Error("No such user exists.")
        },
        signup: async (parent, { username, password }, { models }) => {
            const { MongooseModels}: IDataModels = models;
            const User = await MongooseModels.User.findOne({ username });
            if ( User ) {
                throw new Error("Please provide another username.");
            } else {
                const bcryptPassword = await Bcrypt.hashSync(password, 5);
                const newUser: IUserModel = new MongooseModels.User({
                    username,
                    password: bcryptPassword
                });
                await saveObjectToDB(newUser);
                const token = jwt.sign(
                    {
                        data: newUser.id
                    }, 
                    process.env.Jwt_Secret, 
                    { 
                        expiresIn: '1h' 
                    });
                return token;
            }
        }
    }
};