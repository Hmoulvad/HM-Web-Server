import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthenticatedRoute from './authenticated.route';
import LoginComponent from '../components/login/login.component';
import GraphQLComponent from '../components/graphql-test.component';
import Home from '../components/home';
import HolidayRequest from '../components/holiday-request';
import { AppContext } from '../context/appContext';
import { Role } from '../models/models';
import Pending from '../components/pending';

interface IRoutes {
}

const Routes: React.FC<IRoutes> = (props) => {
	const { isAuth, role } = React.useContext(AppContext);

	return (
		<Switch>
			<Route exact={true} path="/" render={ props => <Home {...props}/>}/>
			<Route path="/login" render={ props => <LoginComponent {...props}/>}/>
			<AuthenticatedRoute path="/request" component={ HolidayRequest } isAuth={isAuth} />
			{role !== Role.developer && <AuthenticatedRoute path="/pending" component={ Pending } isAuth={isAuth} />}
			{role !== Role.developer && <AuthenticatedRoute path="/overview" component={ GraphQLComponent } isAuth={isAuth} />}
			<Redirect to="/" />
		</Switch>
	)
};

export default Routes;