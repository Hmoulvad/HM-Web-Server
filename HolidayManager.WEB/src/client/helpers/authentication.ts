import client from "../apolloClient/apolloClient";
import { GraphQLSchema } from "../graphql";

export function isAuthenticated (): boolean {
    client.query({
        query: GraphQLSchema.WHO_AM_I
    }).then( results => {
        if ( results.data.isLoggedIn ) {
            return true;
        }
    }); 
    return false;
}

