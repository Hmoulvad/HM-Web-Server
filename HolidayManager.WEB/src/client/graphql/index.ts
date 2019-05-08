import { DocumentNode } from "graphql";
import gql from "graphql-tag";

const LOGIN: DocumentNode = gql `
    mutation LogIn($username: String!, $password: String!) 
    {
        login(username: $username, password: $password)
    }
`;

const SIGN_UP: DocumentNode = gql `
    mutation SignUp($username: String!, $password: String!)
    {
        signup(username: $username, password: $password)
    }
`;

const GQL_UNITS: DocumentNode = gql `
{
    units {
        _id,
        name
    }
}
`;

const WHO_AM_I: DocumentNode = gql `
{
    isLoggedIn {
        username,
    }
}
`;

const ADD_HOLIDAY_REQUEST: DocumentNode = gql `
    mutation createHolidayRequest($_id: String!, $role: String!, $projectId: String, $to: String!, $from: String!)
    {
        createHolidayRequest(_id: $_id, role: $role, projectId: $projectId, to: $to, from: $from)
    }
    
`;

const VALIDATE_TOKEN: DocumentNode = gql `
    mutation IsTokenValid($token: String!) 
    {
        isTokenValid(token: $token)
    }
`;

const GET_DEVELOPER: DocumentNode = gql `
    query developer($_id: String!)
    {
        developer(_id: $_id) 
        {
            name,
            ref,
            unit,
            projects {
                _id
            },
            holidayRequests {
                _id
            }
        }    
    }
`;

const GET_UNIT_MANAGER: DocumentNode = gql `
    query unitManager($_id: String!)
    {
        unitManager(_id: $_id) 
        {
            name,
            ref,
            unit,
            holidayRequests {
                _id
            }
        }    
    }
`;

const GET_PROJECT_MANAGER: DocumentNode = gql `
    query projectManager($_id: String!)
    {
        projectManager(_id: $_id) 
        {
            name,
            ref,
            unit,
            projects {
                _id
            },
            holidayRequests {
                _id
            }
        }    
    }
`;

const GraphQLSchema = {
    ADD_HOLIDAY_REQUEST,
    GQL_UNITS,
    WHO_AM_I,
    LOGIN,
    SIGN_UP,
    VALIDATE_TOKEN,
    GET_DEVELOPER,
    GET_UNIT_MANAGER,
    GET_PROJECT_MANAGER
}

export default GraphQLSchema;

