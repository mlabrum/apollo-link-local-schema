Use Apollo client v2 without a graphql server.
This is a port of https://github.com/mstn/apollo-local-network-interface for Apollo v2
which itself is a port of https://github.com/relay-tools/relay-local-schema

# Usage
This isn't published on NPM yet so you'll need to install via the github url

```js
npm install git+https://github.com/mlabrum/apollo-link-local-schema.git#v1.0.0
```

call localSchemaLink and pass in an instance of GraphQLSchema
```js
import localSchemaLink from 'apollo-link-local-schema';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';

const schema = ... // Create and define your GraphQLSchema

const client = new ApolloClient({ link: localSchemaLink(schema), cache: new InMemoryCache()});

client.query({query: gql`
	query test{
		client(id: "1"){
			firstName
		}
	}
`}).then(console.log)
```

# Why
I saw this article http://graphql.org/blog/rest-api-graphql-wrapper/ and wanted to try that with Apollo and found that there wasn't an implementation for Apollo client v2
