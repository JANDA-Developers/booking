import ApolloClient from 'apollo-boost';
import dotenv from 'dotenv';
import uri from './uri';
import resolvers from './resolvers';

dotenv.config({
  path: '../.env',
});


const client = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: 'Auth',
        isLoggedIn: Boolean(localStorage.getItem('jwt')),
        lastSelectedHouse: {
          __typename: 'House',
          value: localStorage.getItem('selectId'),
          label: localStorage.getItem('selectHouseLabel'),
        },
      },
    },
    resolvers,
  },
  request: async (operation) => {
    operation.setContext({
      headers: {
        'X-JWT': localStorage.getItem('jwt') || '',
      },
    });
  },
  uri,
  credentials: 'omit',
});

export default client;
