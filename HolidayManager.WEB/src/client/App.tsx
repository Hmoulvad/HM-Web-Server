import * as React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apolloClient/apolloClient";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/routes";
import { UserContext, IUserContext } from "./context/userContext";
import Navigation from "./shell/navigation";
import { isAuthenticated } from "./helpers/authentication";
import Media from "react-media";

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
			if (await isAuthenticated) {
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
							<Media query="(min-width: 576px)">
								{matches =>
									<React.Fragment>
										<Navigation mobile={!matches} />
										<Routes userIsAuthenticated={this.state.userIsAuthenticated}/>
									</React.Fragment>
								}
							</Media>
						</div>
					</Router>
				</UserContext.Provider>
			</ApolloProvider>
		);
	}
}

export default App;
