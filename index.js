import http from 'http';
import pkg from 'pg';

const { Pool, Client } = pkg;
const hostname = '127.0.0.1';
const port = 8080;


// set POSTGRES_PWD as env variable
const server = http.createServer((req, res) => {
  res.statusCode = 200;

  let body = 'Hello World';

  const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: process.env.POSTGRES_PWD,
    port: 5432,
  });

  pool.query('SELECT NOW()', (err, dbRes) => {
    if (err) {
      body = 'not possible to connect to pg';
    } else {
      body += `<br />output from bd: ${dbRes.rows[0].now}`;
    }
    pool.end()

    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.end(`<html>${body}</html>`);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
