import gql from 'graphql-tag';

export const GET_EXAMPLES = gql`
	query GetStores($options: StoreListOptions) {
		stores(options: $options) {
			items {
				id
				name
				createdAt
			}
			totalItems
		}
	}
`;
