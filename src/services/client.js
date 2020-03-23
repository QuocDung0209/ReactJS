// Apollo Client will take care of requesting GraphQL query and caching data
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http"; //  Get the results for a GraphQL query over HTTP.

const link = new HttpLink({
  uri: "https://localhost:5001/graphql"
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache
});
export default client;