import * as React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apolloClient/apolloClient";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/routes";
import { UserContext, IAppContext } from "./context/appContext";
import Navigation from "./shell/navigation";
import { isAuthenticated } from "./helpers/authentication";
import Media from "react-media";
import {isAndroid, isIOS} from "react-device-detect";

interface IAppProps {}

class App extends React.PureComponent<IAppProps, IAppContext > {
	state: IAppContext = {
		userIsAuthenticated: false,
		isApp: false,
		setIsApp: (app: boolean) => {
			this.setState({isApp: app})
		},
		setAuth: (auth: boolean) => {
			this.setState({userIsAuthenticated: auth})
		},
	}

	async componentDidMount() {
		if ( isAndroid )  {
			document.addEventListener("message", (event) => {
				const urlParams = new URLSearchParams(document.location.search);
				if (urlParams.has("app")) {
					this.state.setIsApp(true);
				}
				}, false)
		}
		if ( isIOS ) {
			window.addEventListener("message", (event) => {
				const urlParams = new URLSearchParams(document.location.search);
				if (urlParams.has("app")) {
					this.state.setIsApp(true);
				}
				}, false)
		}
		const token = localStorage.getItem("token")
		if (!!token) {
			if (await isAuthenticated) {
				this.setState({userIsAuthenticated: true})
			}
		}
	}
	render()  {
		const { isApp } = this.state;
		return (
			<ApolloProvider client={client}>
				<UserContext.Provider value={this.state}>
					<Router>
						<div className="app">
							<Media query="(min-width: 576px)">
								{matches =>
									<React.Fragment>
										{!isApp && <Navigation mobile={!matches} />}
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
