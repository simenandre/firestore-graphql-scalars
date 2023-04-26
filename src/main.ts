import { timestampResolver, timestampTypeDefinition } from './timestamp';

export const resolvers = {
  Timestamp: timestampResolver,
};

export const typeDefs = [timestampTypeDefinition];

export { timestampResolver, timestampTypeDefinition };
