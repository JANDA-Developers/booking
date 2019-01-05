import gql from 'graphql-tag';

export const HOME_PAGE = gql`
	{
		bookers{
			id
			name
			phone_num
			email
			status
		}
	}
`;