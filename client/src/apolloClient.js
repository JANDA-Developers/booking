import ApolloClient from 'apollo-boost';
import uri from './uri';

const client = new ApolloClient({
  clientState: {
    defaults: {
      auth: {
        __typename: 'Auth',
        isLoggedIn: Boolean(localStorage.getItem('jwt')),
        lastSelectedHouse: {
          __typename: 'House',
          value: localStorage.getItem('selectId'),
          label: localStorage.getItem('selectHouseLabel')
        },
      },
    },
    resolvers: {
      Mutation: {
        LogUserIn: (_, {
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
        LogUserOut: (_, __, {
          cache,
        }) => {
          localStorage.removeItem('jwt');
          cache.writeData({
            data: {
              auth: {
                ...cache.data.auth,
                __typename: 'Auth',
                isLoggedIn: false,
              },
            },
          });
          return null;
        },
        selectHouse: (_, args, {
          cache,
        }) => {
          try {
            cache.writeData({
              data: {
                auth: {
                  __typename: 'Auth',
                  lastSelectedHouse: {
                    __typename: 'House',
                    value: args.selectedHouse.value,
                    label: args.selectedHouse.label,
                  },
                },
              },
            });
            localStorage.setItem('selectId', args.selectedHouse.value);
            localStorage.setItem('selectHouseLabel', args.selectedHouse.label);
            return {
              ok: true,
              erorr: null,
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
            }
          }
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