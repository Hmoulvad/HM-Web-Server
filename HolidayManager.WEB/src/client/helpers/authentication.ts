import client from "../apolloClient/apolloClient";
import { GraphQLSchema } from "../graphql";

export async function isAuthenticated () {
    const results = await client.query({
        query: GraphQLSchema.WHO_AM_I
    }).then(res => {
        if (res.data.isLoggedIn) {
            return true
        }
        return false;
    }).catch(e => {
        console.log(e)
    })
    return false;
}

