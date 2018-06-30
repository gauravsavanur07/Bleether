import React, { Component } from 'react';
import { onError } from 'apollo-link-error';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { setContext } from 'apollo-link-context';
import _ from 'lodash';
import { logout } from './actions/auth.actions';
import thunk from 'redux-thunk';
import auth from './reducers/auth.reducer';
import { AsyncStorage, } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import ReduxLink from 'apollo-link-redux';
import { onError } from 'apollo-link-error';



import AppWithNavigationState, {
  navigationReducer,
  navigationMiddleware,
} from './navigation';
const httpLink = createHttpLink({ uri: `http://${URL}/graphql` });
const URL = 'localhost:8080'; // set your comp's url here


// afterware for responses
const errorLink = onError(({ graphQLErrors, networkError }) => {
  let shouldLogout = false;
  if (graphQLErrors) {
    console.log({ graphQLErrors });
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log({ message, locations, path });
      if (message === 'Unauthorized') {
        shouldLogout = true;
      }
    });
    if (shouldLogout) {
      store.dispatch(logout());
    }
  }
  if (networkError) {
    console.log('[Network error]:');
    console.log({ networkError });
    if (networkError.statusCode === 401) {
      logout();
    }
  }
});


const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['nav', 'apollo'], // don't persist nav for now
};
const reducer = persistCombineReducers(config, {
  apollo: apolloReducer,
  nav: navigationReducer,
  auth,
});

const store = createStore(
reducer, 
 combineReducers({
    apollo: apolloReducer,
    nav: navigationReducer,
    auth, 
 }),
  {}, // initial state
  composeWithDevTools(
    applyMiddleware(thunk, navigationMiddleware),
  ),
);
const cache = new ReduxCache({ store });
...
  cache,
});

// Create WebSocket client
export const wsClient = new SubscriptionClient(`ws://${URL}/subscriptions`, {
  reconnect: true,
  connectionParams: {
    // Pass any arguments you want for initialization
  },
});
const persistor = persistStore(store);
const webSocketLink = new WebSocketLink(wsClient);
const requestLink = ({ queryOrMutationLink, subscriptionLink }) =>
  ApolloLink.split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    subscriptionLink,
    queryOrMutationLink,
  );

const link = ApolloLink.from([
  reduxLink,
  errorLink,
  requestLink({
    queryOrMutationLink: middlewareLink.concat(httpLink),
    subscriptionLink: webSocketLink,
  }),
]);
/
// middleware for requests
const middlewareLink = setContext((req, previousContext) => {
  // get the authentication token from local storage if it exists
  const { jwt } = store.getState().auth;
  if (jwt) {
    return {
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    };
  }
  return previousContext;
});


export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
         <PersistGate persistor={persistor}>
            <AppWithNavigationState />
          </PersistGate>
	<Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </ApolloProvider>
    );
  }
}

