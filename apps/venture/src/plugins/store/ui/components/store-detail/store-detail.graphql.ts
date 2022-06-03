import gql from 'graphql-tag';

export const CREATE_EXAMPLE = gql`
	mutation CreateStore($input: CreateStoreInput!) {
		createStore(input: $input) {
			id
			name
		}
	}
`;

export const UPDATE_EXAMPLE = gql`
	mutation UpdateStore($input: UpdateStoreInput!) {
		updateStore(input: $input) {
			id
			name
		}
	}
`;
