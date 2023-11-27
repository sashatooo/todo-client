import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://online-todos.onrender.com/graphql',
  cache: new InMemoryCache(),
});

export default client;
