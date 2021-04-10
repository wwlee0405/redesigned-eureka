import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(false);
export const client = new ApolloClient({
  uri: "http://5dc95a986c7a.ngrok.io",
  cache: new InMemoryCache(),
});
