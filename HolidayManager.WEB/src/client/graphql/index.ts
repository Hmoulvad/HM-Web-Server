import { DocumentNode } from "graphql";
import gql from "graphql-tag";

const gqlUnits: DocumentNode = gql `
{
    units {
        _id,
        name
    }
}
`

const login: DocumentNode = gql `
{
    isLoggedIn {
        username,
    }
}
`

export const GraphQLSchema = {
    gqlUnits,
    login
}