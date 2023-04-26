import { Kind } from 'graphql/language';
import { timestampResolver } from '../src/main';
import { Timestamp } from '@google-cloud/firestore';

describe('timestampResolver', () => {
  describe('valid', () => {
    test('serialize', () => {
      const now = new Date();
      expect(timestampResolver.serialize(Timestamp.fromDate(now))).toEqual(now);
    });

    test('serialize (String)', () => {
      const now = '2018-07-24T01:28:47.940Z';
      const d1 = Date.parse(now);
      const d2 = new Date();

      d2.setTime(d1);

      expect(timestampResolver.serialize(now)).toEqual(d2);
    });

    test('serialize (number)', () => {
      const now = new Date();

      expect(timestampResolver.serialize(now.getTime())).toEqual(now);
    });

    test('parseValue', () => {
      const now = new Date();
      expect(timestampResolver.parseValue(now).toDate()).toEqual(now);
    });

    test('parseLiteral', () => {
      const result = new Date(Date.UTC(2017, 0, 2, 3, 4, 5, 0));
      expect(
        timestampResolver.parseLiteral(
          {
            value: '2017-01-02T03:04:05.000Z',
            kind: Kind.STRING,
          },
          {},
        ).toDate(),
      ).toEqual(result);

      expect(
        timestampResolver.parseLiteral(
          {
            value: result.getTime().toString(),
            kind: Kind.INT,
          },
          {},
        ).toDate(),
      ).toEqual(result);
    });
  });

  describe('invalid', () => {
    describe('not a valid date', () => {
      test('serialize', () => {
        expect(() => timestampResolver.serialize('this is not a date')).toThrow(
          /Value is not a valid Date/,
        );
      });

      test('parseValue', () => {
        expect(() =>
          timestampResolver.parseValue('this is not a date'),
        ).toThrow(/Value is not a valid Date/);
      });

      test('parseLiteral', () => {
        expect(() =>
          timestampResolver.parseLiteral(
            {
              value: 'this is not a date',
              kind: Kind.STRING,
            },
            {},
          ),
        ).toThrow(/Value is not a valid Date/);
      });
    });
  });
});
