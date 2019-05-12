import * as Bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IDataModels } from "../../database";
import { saveObjectToDB, findReferenceInDB } from "../helpers/database";
import { IUserModel } from "../../database/schemas/user.schema";
import * as Mongoose from "mongoose";
import { IDeveloperModel } from "../../database/schemas/developer.schema";
import { IUnitManagerModel } from "../../database/schemas/unit-manager.schema";
import { IProjectManagerModel } from "../../database/schemas/project-manager.schema";
import { IToken } from "../../models/shared";

export default {
    Query: {
        isLoggedIn: async (parent, args, { req, models }): Promise<IUserModel> => {
            const { MongooseModels }: IDataModels = models;
            const { request }: any = req;
            const decodedJWT: any = await jwt.decode(request.headers.authorization);
            const ObjectID = Mongoose.Types.ObjectId;
            const toObjectID = decodedJWT.data.id.toString().toLowerCase();
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
        isTokenValid: async (parent, { token }, { models }, context): Promise<boolean> => {
            if ( jwt.verify(token, process.env.Jwt_Secret) ) {
                return true;
            } else {
                throw new Error("Not a valid token")
            }
        }   
    },
    Mutation: {
        login: async (parent, { username, password }, { models }): Promise<string> => {
            const { MongooseModels}: IDataModels = models;
            const User: IUserModel = await MongooseModels.User.findOne({ username: username.toLowerCase() });
            if ( User ) {
                if ( await Bcrypt.compareSync(password, User.password)) {
                    const token = jwt.sign(
                    {
                        data: {
                            id: User.id,
                            objectRefId: User.ref,
                            role: User.role
                        }
                    }, 
                    process.env.Jwt_Secret, 
                    { 
                        expiresIn: '365days' 
                    });
                    return token;
                }
                throw new Error("Password and username does not match.")
            }
            throw new Error("No such user exists.")
        },
        setReference: async (parent, { referenceId }, { req, models }): Promise<void> => {
            const { MongooseModels }: IDataModels = models;
            const { request }: any = req;
            const decodedJWT: any = await jwt.decode(request.headers.authorization);
            const ObjectID = Mongoose.Types.ObjectId;
            const toObjectID = (decodedJWT as IToken).data.id.toString().toLowerCase();
            if (!ObjectID.isValid(toObjectID)) {
                throw new Error("String is not an ObjectID");
            }
            const User: IUserModel = await MongooseModels.User.findOne({_id: toObjectID}); 
            if ( User ) {
                User.ref = referenceId
                await saveObjectToDB(User);
            } else {
                throw new Error("You're not logged in");
            }

        },
        signup: async (parent, { username, password, role }, { models }): Promise<string> => {
            const { MongooseModels}: IDataModels = models;
            const User = await MongooseModels.User.findOne({ username: username.toLowerCase() });
            if ( User ) {
                throw new Error("Please provide another username.");
            } else {
                const bcryptPassword = await Bcrypt.hashSync(password, 5);
                const newUser: IUserModel = new MongooseModels.User({
                    username,
                    password: bcryptPassword,
                    role
                });
                await saveObjectToDB(newUser);
                const token = jwt.sign(
                    {
                        data: {
                            role: newUser.role
                        }
                    }, 
                    process.env.Jwt_Secret, 
                    { 
                        expiresIn: '365days' 
                    });
                return token;
            }
        }
    }
};