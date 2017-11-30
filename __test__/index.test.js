const gql 											= require('graphql-tag')
const {default: ApolloClient}   = require('apollo-client')
const {InMemoryCache} 					= require('apollo-cache-inmemory')
const localSchemaLink 					= require('../index.js')
const schema										= require('./fixtures/schema')
const mockClient								= require('./fixtures/client')

describe('GraphQL local link', () => {
	let graphClient

	beforeEach(function(){
		try{
			graphClient = new ApolloClient({link: localSchemaLink(schema), cache: new InMemoryCache()});
		}catch(e){
			console.error(e)
		}
	})

	it('should allow local queries', async () => {
		const result = await graphClient.query({query: gql`
			query test{
				client(id: "1"){
					firstName,
					lastName
				}
			}
			`})

			expect(result).toHaveProperty('data.client.firstName', mockClient.firstName)
			expect(result).toHaveProperty('data.client.lastName', mockClient.lastName)
		})
})
