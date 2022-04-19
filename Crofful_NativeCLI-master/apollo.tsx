import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import {
  getMainDefinition,
  offsetLimitPagination,
} from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";

export const isLoggedinVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token: any) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedinVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedinVar(false);
  tokenVar("");
};

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("그래프큐엘 에러", graphQLErrors);
  }
  if (networkError) {
    console.log("서버 에러", networkError);
  }
});

const httpLink = createHttpLink({
  uri: "http://1c12-211-54-66-89.ngrok.io/graphql",
});

const uploadHttpLink = createUploadLink({
  uri: "http://efcd-14-36-37-141.ngrok.io/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://efcd-14-36-37-141.ngrok.io/graphql",
  options: {
    connectionParams: () => ({
      token: tokenVar(),
    }),
  },
});
//wsLink 결과물

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);
//httpLink 로 나뉜 결과물 (split communication)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinks
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
