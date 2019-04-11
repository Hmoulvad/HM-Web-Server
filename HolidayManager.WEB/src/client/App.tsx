import * as React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apolloClient/apolloClient";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/routes";
import { UserContext, defaultContext } from "./context/userContext";
import Navigation from "./components/navigation";

const App: React.FC<any> = (props) => {

	return (
		<ApolloProvider client={client}>
			<UserContext.Provider value={defaultContext}>
				<Router>
					<div className="app">
						<Navigation />
						<Routes />
					</div>
				</Router>
			</UserContext.Provider>
		</ApolloProvider>
	);
}

export default App;
