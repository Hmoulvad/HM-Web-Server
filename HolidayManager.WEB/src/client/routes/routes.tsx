import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from './authenticated.route';
import LoginComponent from '../components/login/login.component';
import GraphQLComponent from '../components/graphql-test.component';
import { isAuthenticated } from '../helpers/authentication';
import { UserContext } from '../context/userContext';
import Home from '../components/home';
import HolidayRequest from '../components/holiday-request';

const Routes: React.FunctionComponent<any> = (props) => {
	const [ isAuth, setIsAuth ] = React.useState<boolean>(false);
	const { setAuth, userIsAuthenticated } = React.useContext(UserContext);
    React.useEffect(() => {
        isAuthenticated().then(r => setIsAuth(r));
	},[])
	React.useEffect(() => {
		setAuth(isAuth);
	}, [isAuth, userIsAuthenticated])
	return (
		<Switch>
			<Route exact path="/" render={ props => <Home {...props}/>}/>
			<Route path="/login" render={ props => <LoginComponent {...props}/>}/>
			<AuthenticatedRoute path="/holidayrequest" component={ HolidayRequest } isAuth={isAuth} />
			<AuthenticatedRoute path="/overview" component={ GraphQLComponent } isAuth={isAuth} />
		</Switch>
	)
};

export default Routes;