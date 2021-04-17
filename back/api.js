// Example API
const pkg = require('pg');

const { Pool } = pkg;

module.exports = [
  {
    route: '/api/getProps',
    handler(req, res) {
      const body = {}
      const pool = new Pool({
        user: process.env.POSTGRES_USER || 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: process.env.POSTGRES_PWD || '',
        port: 5432,
      });

      pool.query('SELECT NOW()', (err, dbRes) => {
        if (err) {
          body.error = 'not possible to connect to pg';
        } else {
          body.res = `output from bd: ${dbRes.rows[0].now}`;
        }

        const url = new URL('http://e.c' + req.originalUrl)
        body.props = url.searchParams.toString()
        body.routeName = url.searchParams.get('name') || ''

        res.end(JSON.stringify({ body }))
        pool.end()
      });
    },
  },
]
