import * as React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import AuthenticatedRoute from './authenticated.route';
import LoginComponent from '../components/login/login.component';
import GraphQLComponent from '../components/graphql-test.component';

const Routes: React.FunctionComponent<any> = (props) => {
  return (
    <div>
      <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/overview">Overview</Link>
      </nav>
      <Switch>
          <Route path="/login" render={ props => <LoginComponent {...props}/>}/>
          <AuthenticatedRoute path="/overview" component={GraphQLComponent} />
      </Switch>
    </div>
  )
};

export default Routes;