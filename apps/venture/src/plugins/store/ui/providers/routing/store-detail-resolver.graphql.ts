import gql from 'graphql-tag';

export const GET_EXAMPLE = gql`
	query GetStore($id: ID!) {
		store(id: $id) {
			id
			name
			createdAt
		}
	}
`;
