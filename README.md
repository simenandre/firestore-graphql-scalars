[![npm version](https://badge.fury.io/js/firestore-graphql-scalars.svg)](https://badge.fury.io/js/firestore-graphql-scalars)

> A custom GraphQL [scalar type](http://graphql.org/learn/schema/#scalar-types) for Firebase and Google Cloud Firestore.

## Installation

```
npm install --save firestore-graphql-scalars
```

or

```
yarn add firestore-graphql-scalars
```

## Usage

To use this scalar you'll need to add it in two places, your schema and your resolvers map.

In your schema:

```graphql
scalar Timestamp
```

In your resolver map, first import them:

```javascript
import { timestampResolver } from 'firestore-graphql-scalars';
```

Then make sure they're in the root resolver map like this:

```javascript
const myResolverMap = {
  Timestamp: timestampResolver,

  Query: {
    // more stuff here
  },

  Mutation: {
    // more stuff here
  },
};
```

Alternatively, use the default import and ES6's spread operator syntax:

```javascript
import { resolvers } from 'firestore-graphql-scalars';
```

Then make sure they're in the root resolver map like this:

```javascript
const myResolverMap = {
  ...resolvers,

  Query: {
    // more stuff here
  },

  Mutation: {
    // more stuff here
  },
};
```

That's it. Now you can use these scalar types in your schema definition like this:

```graphql
type Person {
  createdAt: Timestamp
  ...
}
```

These scalars can be used just like the base, built-in ones.

### Usage with Apollo Server

```javascript
import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs, resolvers } from 'firestore-graphql-scalars';

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [
      // use spread syntax to add scalar definitions to your schema
      ...typeDefs,
      // DateTimeTypeDefinition,
      // ...
      // ... other type definitions ...
    ],
    resolvers: {
      // use spread syntax to add scalar resolvers to your resolver map
      ...resolvers,
      // DateTimeResolver,
      // ...
      // ... remainder of resolver map ...
    },
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

## License

Released under the [MIT license](./LICENSE).

## Contributing

Issues and Pull Requests are always welcome. ❤️

## Thanks

This repository is a fork of [graphql-scalars](https://github.com/Urigo/graphql-scalars). It's inspired by [@lookfirst's issue](https://github.com/Urigo/graphql-scalars/issues/61) and
[juicylevel/coffee-service](https://github.com/juicylevel/coffee-service). Big thanks to the contributors of these repositories! 🙏
