import * as React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apolloClient/apolloClient";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/routes";
import { UserContext, IUserContext } from "./context/userContext";
import Navigation from "./shell/navigation";
import { isAuthenticated } from "./helpers/authentication";

class App extends React.PureComponent<any, IUserContext > {
	state = {
		userIsAuthenticated: false,
		setAuth: (auth: boolean) => {
			this.setState({userIsAuthenticated: auth})
		},
	}

	async componentDidMount() {
		const token = localStorage.getItem("token")
		if (!!token) {
			if (await isAuthenticated()) {
				this.setState({userIsAuthenticated: true})
			}
		}
	}
	render()  {
		return (
			<ApolloProvider client={client}>
				<UserContext.Provider value={{
					userIsAuthenticated: this.state.userIsAuthenticated,
					setAuth: this.state.setAuth}}>
					<Router>
						<div className="app">
							<Navigation />
							<Routes userIsAuthenticated={this.state.userIsAuthenticated}/>
						</div>
					</Router>
				</UserContext.Provider>
			</ApolloProvider>
		);
	}
}

export default App;
