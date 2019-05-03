import * as Bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IDataModels } from "../../database";
import { saveObjectToDB, findReferenceInDB } from "../helpers/database";
import { IUserModel } from "../../database/schemas/user.schema";
import * as Mongoose from "mongoose";

export default {
    Query: {
        isLoggedIn: async (parent, args, { req, models }) => {
            const { MongooseModels }: IDataModels = models;
            const { request }: any = req;
            const decodedJWT: any = await jwt.decode(request.headers.authorization);
        
            const ObjectID = Mongoose.Types.ObjectId;
            const toObjectID = decodedJWT.data.toString().toLowerCase();
            if (!ObjectID.isValid(toObjectID)) {
                throw new Error("String is not an ObjectID");
            }
            const User: IUserModel = await MongooseModels.User.findOne({_id: toObjectID}); 
            if ( User ) {
                return User;
            } else {
                throw new Error("You're not logged in");
            }
        },   
        getReference: async (parent, { referenceId }, { models }, context) => {
            console.log(context);
            return await findReferenceInDB(referenceId, models);   
        },
        isTokenValid: async (parent, { token }, { models }, context) => {
            if ( jwt.verify(token, process.env.Jwt_Secret) ) {
                return true;
            } else {
                throw new Error("Not a valid token")
            }
        }   
    },
    Mutation: {
        login: async (parent, { username, password }, { models }) => {
            const { MongooseModels}: IDataModels = models;
            const User: IUserModel = await MongooseModels.User.findOne({ username: username.toLowerCase() });
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
        setReference: async (parent, { referenceId }, { req, models }) => {
            const { MongooseModels }: IDataModels = models;
            const { request }: any = req;
            const decodedJWT: any = await jwt.decode(request.headers.authorization);

            const ObjectID = Mongoose.Types.ObjectId;
            const toObjectID = decodedJWT.data.toString().toLowerCase();
            if (!ObjectID.isValid(toObjectID)) {
                throw new Error("String is not an ObjectID");
            }
            const User: IUserModel = await MongooseModels.User.findOne({_id: toObjectID}); 
            if ( User ) {
                User.referenceId = referenceId
                await saveObjectToDB(User);
                return "User was set"
            } else {
                throw new Error("You're not logged in");
            }

        },
        signup: async (parent, { username, password }, { models }) => {
            const { MongooseModels}: IDataModels = models;
            const User = await MongooseModels.User.findOne({ username: username.toLowerCase() });
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