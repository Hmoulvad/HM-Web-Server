import * as React from "react";
import '../styles/App.css';
import { ApolloProvider } from "react-apollo";
import GraphQLComponent from "./components/graphql-test.component";
import client from "./apolloClient/apolloClient";
import LoginComponent from "./components/login/login.component";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import Routes from "./routes/routes";

interface IUser {
  isAuthenticated: boolean;
}

export interface IAppState {
  user: IUser;
  setAuth: (auth: boolean) => void;
}

class App extends React.PureComponent<any, IAppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      user: {
        isAuthenticated: false
      },
      setAuth: this.setAuth,
    }
  }

  setAuth = (auth: boolean) => {
    this.setState({
      user: {
        isAuthenticated: auth
      }
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <UserProvider value={this.state}>
            <Routes />
          </UserProvider>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
