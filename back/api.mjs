// Example API
import pg from 'pg';
import { buildSchema, graphql } from 'graphql';

const { Pool } = pg;

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Hello {
    answer: String!
    otherAnswer: String!
  }
  type Query {
    hello (msg: String!): Hello!
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: ({ msg }) => ({
    answer: `Hello world! ${msg}`,
    otherAnswer: 'something else',
  }),
};

export default [
  {
    route: '/api/test',
    post: true,
    handler(req, res) {
      res.send('ok!');
    },
  },
  {
    route: '/api/getProps',
    handler(req, res) {
      const body = {};
      const pool = new Pool({
        user: process.env.POSTGRES_USER || 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: process.env.POSTGRES_PWD || '',
        port: 5432,
      });

      pool.query('SELECT NOW()', (err, dbRes) => {
        if (err) {
          body.error = `not possible to connect to pg: ${err}`;
        } else {
          body.res = `output from bd: ${dbRes.rows[0].now}`;
        }

        const url = new URL(`http://e.c${req.originalUrl}`);
        body.props = url.searchParams.toString();
        body.routeName = url.searchParams.get('name') || '';

        res.setHeader('Cache-Control', 'max-age=0');
        res.end(JSON.stringify({ body }));
        pool.end();
      });
    },
  }, {
    route: '/graph',
    method: 'post',
    handler(req, res) {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        let bodyJs = {};
        try {
          bodyJs = JSON.parse(body);
        } catch (e) {
          console.error(e);
        }
        graphql(
          schema,
          bodyJs.query,
          root,
          bodyJs.operationName,
          bodyJs.variables,
        ).then((response) => {
          res.setHeader('Cache-Control', 'max-age=0');
          res.end(JSON.stringify(response));
        });
      });
    },
  },
];
