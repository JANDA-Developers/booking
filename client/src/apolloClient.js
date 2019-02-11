import ApolloClient from 'apollo-boost';
import uri from './uri';

const client = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: 'Auth',
        isLoggedIn: Boolean(localStorage.getItem('jwt')),
      },
    },
    resolvers: {
      Mutation: {
        logUserIn: (_, {
          token,
        }, {
          cache,
        }) => {
          localStorage.setItem('jwt', token);
          cache.writeData({
            data: {
              auth: {
                __typename: 'Auth',
                isLoggedIn: true,
              },
            },
          });
          return null;
        },
        logUserOut: (_, __, {
          cache,
        }) => {
          localStorage.removeItem('jwt');
          cache.writeData({
            data: {
              __typename: 'Auth',
              isLoggedIn: false,
            },
          });
          return null;
        },
      },
    },
  },
  request: async (operation) => {
    operation.setContext({
      headers: {
        'X-JWT': localStorage.getItem('jwt') || '',
      },
    });
  },
  uri,
});

export default client;
