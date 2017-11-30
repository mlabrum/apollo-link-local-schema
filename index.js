const { printAST } 								= require('apollo-client')
const { ApolloLink, Observable }	= require('apollo-link')
const { graphql } 								= require('graphql')

module.exports = (schema) => new ApolloLink((operation) => new Observable(observer => {
	const { operationName, variables, query } = operation;

	graphql(
		schema,
		printAST(query),
		null,
		null,
		variables,
		operationName
	)
		.then((result) => {
			operation.setContext({ result });
			if(result.hasOwnProperty('errors')){
				throw result.errors[0]
			}

			observer.next(result);
			observer.complete();
		})
		.catch((e) => observer.error(e));
}))
