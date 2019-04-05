import * as React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from './authenticated.route';
import LoginComponent from '../components/login/login.component';
import GraphQLComponent from '../components/graphql-test.component';
import { isAuthenticated } from '../helpers/authentication';
import { UserContext } from '../context/userContext';

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
		<div>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				{ isAuth && <Link to="/overview">Overview</Link> }
			</nav>
			<Switch>
				<Route path="/login" render={ props => <LoginComponent {...props}/>}/>
				<AuthenticatedRoute path="/overview" component={ GraphQLComponent } isAuth={isAuth} />
			</Switch>
		</div>
	)
};

export default Routes;