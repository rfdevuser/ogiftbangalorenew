import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// WooCommerce GraphQL endpoint
// Replace with your WooCommerce store URL
const WOOCOMMERCE_GRAPHQL_URL = 'https://www.onatiglobal.com?graphql=true';

// WooCommerce credentials - store these securely
// You can get these from WooCommerce > Settings > Advanced > REST API
const WOOCOMMERCE_CONSUMER_KEY = 'ogkey';
const WOOCOMMERCE_CONSUMER_SECRET = 'ogkey';

const httpLink = createHttpLink({
  uri: WOOCOMMERCE_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  // Basic authentication for WooCommerce
  const credentials = btoa(`${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`);
  
  return {
    headers: {
      ...headers,
      authorization: `Basic ${credentials}`,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
