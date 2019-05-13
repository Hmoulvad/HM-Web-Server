import * as React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apolloClient/";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/routes";
import { AppContext, IAppContext } from "./context/appContext";
import Navigation from "./shell/navigation";
import { isAuthenticated, getRefObject } from "./helpers/user";
import Media from "react-media";
import { IToken } from "./models/shared";
import * as jwt from "jsonwebtoken";
import { Role, IDeveloper } from "./models/models";

interface IAppProps {}

class App extends React.PureComponent<IAppProps, IAppContext> {
	state: IAppContext = {
		isAuth: false,
		isApp: false,
		userId: undefined,
		objectRefId: undefined,
		role: undefined,
		user: undefined,
		logout: () => {
			this.setState({
				objectRefId: undefined,
				user: undefined,
				isAuth: false,
				isApp: false,
				userId: undefined,
				role: undefined
			})
		},
		setIsApp: (app: boolean) => {
			this.setState({isApp: app})
		},
		setAuth: (auth: boolean) => {
			this.setState({isAuth: auth})
		},
	}

	async componentWillUpdate() {
		const token = localStorage.getItem("token");
		if (!!token) {
			const { data } = jwt.decode(token) as IToken;
			this.setState({ userId: data.id, role: data.role, objectRefId: data.objectRefId})
			const { developer, unitManager, projectManager } = await getRefObject(data.role, data.objectRefId)
			if (data.role === Role.developer) {
				this.setState({ user: developer})
			}
			if (data.role === Role.projectManager) {
				this.setState({ user: projectManager})
			}
			if (data.role === Role.unitManager) {
				this.setState({ user: unitManager})
			}
		}
	}

	async componentWillMount() {
		const urlParams = new URLSearchParams(document.location.search);
		if (urlParams.has("app")) {
			this.setState({isApp: true})
		}
		if (urlParams.has("token")) {
			const token = urlParams.get("token")
			if ( !!token ) {
				const { data } = jwt.decode(token) as IToken;
				localStorage.setItem("token", token);
				this.setState({ userId: data.id, role: data.role, objectRefId: data.objectRefId, isAuth: true})
				const { developer, unitManager, projectManager } = await getRefObject(data.role, data.objectRefId)
				if (data.role === Role.developer) {
					this.setState({ user: developer})
				}
				if (data.role === Role.projectManager) {
					this.setState({ user: projectManager})
				}
				if (data.role === Role.unitManager) {
					this.setState({ user: unitManager})
				}
			}
		} else {
			const token = localStorage.getItem("token")
			if (!!token) {
				const { data } = jwt.decode(token) as IToken;
				this.setState({ userId: data.id, role: data.role, objectRefId: data.objectRefId})
				const isAuth = await isAuthenticated();
				if (isAuth) {
					this.setState({isAuth: true})
				}
			}
		}	
	}

	render()  {
		const { isApp } = this.state;
		return (
			<ApolloProvider client={client}>
				<AppContext.Provider value={this.state}>
					<Router>
						<div className="app">
							<Media query="(min-width: 576px)">
								{matches =>
									<React.Fragment>
										{!isApp && <Navigation mobile={!matches} />}
											<Routes />
									</React.Fragment>
								}
							</Media>
						</div>
					</Router>
				</AppContext.Provider>
			</ApolloProvider>
		);
	}
}

export default App;
