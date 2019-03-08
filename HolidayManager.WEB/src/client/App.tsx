import * as React from "react";
import '../styles/App.css';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import GraphQLComponent from "./components/GraphQL-test/graphql-test.component";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const App: React.FC<any> = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <GraphQLComponent />
      </div>
    </ApolloProvider>
  );
}

export default App;
