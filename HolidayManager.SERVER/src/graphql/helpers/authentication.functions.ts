
import * as jwt from "jsonwebtoken";
const isAuthenticated = async (resolve, parent, args, { req }) => {
    const NOT_AUTHORIZED = "Not Authorized"
    const { request }: any = req;
    if (request.headers.authorization !== undefined) {
        const permit = jwt.verify(request.headers.authorization, process.env.Jwt_Secret);
        if (!permit) {
            throw new Error(NOT_AUTHORIZED);
        }
        return resolve();
    } else  {
        throw new Error(NOT_AUTHORIZED);
    }
};

export const permissions = {
    Query: {
        isLoggedIn: isAuthenticated,
        developer: isAuthenticated,
        projectManager: isAuthenticated,
        project: isAuthenticated,
        unitManager: isAuthenticated,
        unit: isAuthenticated,
        units: isAuthenticated
    },
    Mutation: {
        createDeveloper: isAuthenticated,
        createProjectManager: isAuthenticated,
        createProject: isAuthenticated,
        setProjectManager: isAuthenticated,
        createUnitManager: isAuthenticated,
        createUnit: isAuthenticated
    }
}

