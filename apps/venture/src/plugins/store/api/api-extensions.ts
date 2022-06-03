import gql from 'graphql-tag';

export const commonApiExtensions = gql`
	type Store implements Node {
		id: ID!
		createdAt: DateTime!
		updatedAt: DateTime!
		name: String!
	}

	type StoreList implements PaginatedList {
		items: [Store!]!
		totalItems: Int!
	}

	extend type Query {
		stores(options: StoreListOptions): StoreList!
		store(id: ID!): Store
	}

	# Auto-generated at runtime
	input StoreListOptions
`;

export const shopApiExtensions = gql`
	${commonApiExtensions}
`;

export const adminApiExtensions = gql`
	${commonApiExtensions}

	extend type Mutation {
		createStore(input: CreateStoreInput!): Store!
		updateStore(input: UpdateStoreInput!): Store!
	}

	input CreateStoreInput {
		name: String!
	}

	input UpdateStoreInput {
		id: ID!
		name: String!
	}
`;
