import * as React from "react";
import GraphQLSchema from "../graphql";
import { Query } from "react-apollo";

const GraphQLComponent: React.FC<any> = (props) => {

    return (
        <Query query={GraphQLSchema.GQL_UNITS}>
            {({ loading, error, data}) => {
                if ( loading ) return <p>Loading...</p>;
                if ( error ) return <p>Error...</p>;
                return data.units.map(({ _id, name }: any) => (
                    <div key={_id}>
                        <p>{_id}: {name}</p>
                    </div>
                ));
            }}
        </Query>
    )
};

export default GraphQLComponent;