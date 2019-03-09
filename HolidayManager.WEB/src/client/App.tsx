import * as React from "react";
import '../styles/App.css';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import GraphQLComponent from "./components/GraphQL-test/graphql-test.component";
import { createHttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import LoginComponent from "./components/login.component";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
});

const authLink = setContext((_, { headers }: any) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App: React.FC<any> = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <LoginComponent />
        <h2>My first Apollo app 🚀</h2>
        <GraphQLComponent />
      </div>
    </ApolloProvider>
  );
}

export default App;
