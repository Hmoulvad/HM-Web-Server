import * as React from 'react';
import { GraphQLSchema } from '../graphql/index';
import { Query } from 'react-apollo';

interface IAppProps {
}

const LoginComponent: React.FC<IAppProps> = (props) => {
  return (
    <Query query={GraphQLSchema.login}>
        {({ loading, error, data}) => {
            if ( loading ) return <p>Loading...</p>;
            if ( error ) return <p>{error.message}</p>;
            return (
                <h2>{data.isLoggedIn.username}</h2>
            );
        }}
    </Query>
  );
};

export default LoginComponent;