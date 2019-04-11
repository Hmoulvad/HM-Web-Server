import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from './authenticated.route';
import LoginComponent from '../components/login/login.component';
import GraphQLComponent from '../components/graphql-test.component';
import { UserContext } from '../context/userContext';
import Home from '../components/home';
import HolidayRequest from '../components/holiday-request';

interface IRoutes {
	userIsAuthenticated: boolean
}

const Routes: React.FC<IRoutes> = ({userIsAuthenticated}) => {
	return (
		<Switch>
			<Route exact path="/" render={ props => <Home {...props}/>}/>
			<Route path="/login" render={ props => <LoginComponent {...props}/>}/>
			<AuthenticatedRoute path="/holidayrequest" component={ HolidayRequest } isAuth={userIsAuthenticated} />
			<AuthenticatedRoute path="/overview" component={ GraphQLComponent } isAuth={userIsAuthenticated} />
		</Switch>
	)
};

export default Routes;