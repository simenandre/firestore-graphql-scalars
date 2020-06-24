import { makeExecutableSchema } from '@graphql-tools/schema';
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from '../src';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { GraphQLSchema, graphql } from 'graphql';
import { Timestamp } from '@google-cloud/firestore';

const FOO = '2018-01-01T00:00:00.000Z';

const fooQuery = /* GraphQL */ `
  type Query {
    foo: Timestamp
  }
`;
const fooResolvers = {
  Query: {
    foo: () => Timestamp.fromDate(new Date(FOO)),
  },
};

const typeDefs = mergeTypeDefs([fooQuery, ...scalarTypeDefs]);
const resolvers = mergeResolvers([fooResolvers, scalarResolvers]);

describe('Common', () => {
  it('should create a valid schema', async () => {
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    expect(schema).toBeInstanceOf(GraphQLSchema);
    const result = await graphql({
      schema,
      source: /* GraphQL */ `
        {
          foo
        }
      `,
    });
    expect(result.errors).toBeFalsy();
    expect(new Date(result.data.foo)).toStrictEqual(new Date(FOO));
  });
});
