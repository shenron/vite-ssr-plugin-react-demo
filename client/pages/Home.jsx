import React from 'react';
import { Helmet } from 'react-helmet-async';
import useGraphql from '../compositions/useGraphql';

export default function Home() {
  const { getGraphHello } = useGraphql();

  return (
    <>
      {getGraphHello()}
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <h1>Home</h1>
    </>
  );
}
