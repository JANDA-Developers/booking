import gql from 'graphql-tag';

const BOOKER = gql`
  {
    bookers {
      id
      name
      phone_num
      email
      status
    }
  }
`;

export default BOOKER;
