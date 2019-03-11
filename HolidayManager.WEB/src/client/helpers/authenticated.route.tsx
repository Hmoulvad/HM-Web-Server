import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../context/userContext';
import { isAuthenticated } from "./authentication";

interface IAuthenticatedRoute {
    component: any;
    path: string;
}

const AuthenticatedRoute: React.FC<IAuthenticatedRoute> = ({component: Component, ...rest}) => {
    return (
        <UserConsumer>
            { context => {
                return (
                    <Route {...rest} render={(props) => isAuthenticated()
                        ? <Component {...props} />
                        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
                    />
                );
            }}
        </UserConsumer>
    );
}

export default AuthenticatedRoute;
