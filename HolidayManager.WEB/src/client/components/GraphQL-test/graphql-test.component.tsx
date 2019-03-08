import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { DocumentNode } from "graphql";

const gqlUnits: DocumentNode = gql `
    {
        units {
            _id,
            name
        }
    }
`;

const GraphQLComponent: React.FC<any> = (props: any) => {

    return (
        <Query query={gqlUnits}>
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