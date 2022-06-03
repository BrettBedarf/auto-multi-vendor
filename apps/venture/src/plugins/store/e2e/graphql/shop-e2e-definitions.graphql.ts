import gql from 'graphql-tag';

export const GET_EXAMPLES = gql`
	query GetStores {
		stores {
			items {
				name
			}
			totalItems
		}
	}
`;

export const GET_EXAMPLE = gql`
	query GetStore($id: ID!) {
		store(id: $id) {
			name
		}
	}
`;
