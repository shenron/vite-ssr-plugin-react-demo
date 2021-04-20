import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graph',
  cache: new InMemoryCache(),
});

export default function Home(props) {
  const getHello = () => client
    .query({
      query: gql`query Hello ($msg: String!) {
        hello (msg: $msg)
      }`,
      variables: {
        msg: 'toto',
      },
    })
    .then(({ data }) => alert(data.hello))
    .catch((err) => console.error(err));

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <h1>Home</h1>
      <p>{JSON.stringify(props, null, 2)}</p>
      <button type="button" onClick={(e) => [e.preventDefault(), getHello()]}>Get hello from graph</button>
    </>
  );
}
