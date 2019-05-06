import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from './authenticated.route';
import LoginComponent from '../components/login/login.component';
import GraphQLComponent from '../components/graphql-test.component';
import Home from '../components/home';
import HolidayRequest from '../components/holiday-request';
import { AppContext } from '../context/appContext';

interface IRoutes {
}

const Routes: React.FC<IRoutes> = (props) => {
	const { isAuth } = React.useContext(AppContext);

	return (
		<Switch>
			<Route exact={true} path="/" render={ props => <Home {...props}/>}/>
			<Route path="/login" render={ props => <LoginComponent {...props}/>}/>}
			<AuthenticatedRoute path="/holidayrequest" component={ HolidayRequest } isAuth={isAuth} />
			<AuthenticatedRoute path="/overview" component={ GraphQLComponent } isAuth={isAuth} />
		</Switch>
	)
};

export default Routes;