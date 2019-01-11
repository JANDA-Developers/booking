import gql from 'graphql-tag';

const HOME_PAGE = gql`
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

export default HOME_PAGE;
