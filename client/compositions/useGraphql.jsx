import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_HELLO = gql`query Hello ($msg: String!) {
  hello (msg: $msg) { answer }
}`;

export default function () {
  const getGraphHello = () => {
    const { loading, data } = useQuery(GET_HELLO, {
      variables: { msg: 'Hey' },
    });

    if (loading) {
      return <p>Loading ...</p>;
    }
    return <h1>{data.hello.answer}</h1>;
  };

  return {
    getGraphHello,
  };
}
