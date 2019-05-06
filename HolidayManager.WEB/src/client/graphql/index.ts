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
`
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

const VALIDATE_TOKEN: DocumentNode = gql `
    mutation IsTokenValid($token: String!) 
    {
        isTokenValid(token: $token)
    }
`;

export const GraphQLSchema = {
    GQL_UNITS,
    WHO_AM_I,
    LOGIN,
    SIGN_UP,
    VALIDATE_TOKEN
}