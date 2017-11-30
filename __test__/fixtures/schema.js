const { GraphQLSchema } = require('graphql');
const {
	GraphQLList,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt
} = require('graphql');

const ClientType = new GraphQLObjectType({
	name: 'Client',
	description: 'This is a Client',
	fields: () => ({
		id: {type: GraphQLString},
		firstName: {type: GraphQLString},
		lastName: {type: GraphQLString},
	}),
});

const QueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'The root of all... queries',
	fields: () => ({
		client: {
			type: ClientType,
			args: {
				id: { type: GraphQLString },
			},
			resolve: () => require('./client'),
		},
	}),
});

module.exports = new GraphQLSchema({
	query: QueryType,
});
