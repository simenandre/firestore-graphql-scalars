import { Timestamp } from '@google-cloud/firestore';
import { GraphQLError, GraphQLScalarType, Kind } from 'graphql';

const validator = (value: unknown): Date => {
  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return Timestamp.fromDate(value).toDate();
  }

  if (typeof value === 'string') {
    const date = new Date(value);

    try {
      return Timestamp.fromDate(date).toDate();
    } catch {
      throw new TypeError(
        `Value is not a valid Date: ${JSON.stringify(value)}`,
      );
    }
  }

  if (typeof value === 'number') {
    return Timestamp.fromMillis(value).toDate();
  }

  throw new TypeError(
    `Value is not an instance of Date, Date string or number: ${JSON.stringify(
      value,
    )}`,
  );
};

const parseValue = (value: unknown): Timestamp => {
  if (value instanceof Timestamp) {
    return value;
  }

  if (value instanceof Date) {
    return Timestamp.fromDate(value);
  }

  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new TypeError(`Value is not a valid Date: ${JSON.stringify(value)}`);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new GraphQLError(
      `Value is not a valid Date: ${JSON.stringify(value)}`,
    );
  }

  return Timestamp.fromDate(date);
};

export const timestampResolver = new GraphQLScalarType<Timestamp, Date>({
  name: 'Timestamp',

  description: '',

  serialize: validator,

  parseValue,

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT && ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Can only parse strings and integers to dates but got a: ${ast.kind}`,
      );
    }

    if (ast.kind === Kind.INT) {
      return Timestamp.fromDate(new Date(Number(ast.value)));
    }

    return parseValue(ast.value);
  },
});

export const timestampTypeDefinition = 'scalar Timestamp';
