import PropTypes from 'prop-types';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { ClientOnly } from 'vite-ssr';
import logo from '../assets/logo.svg';
import './App.scss';

const client = new ApolloClient({
  uri: '/graph',
  cache: new InMemoryCache(),
});

const App = ({ isClient, url, router }) => {
  const baseUrl = isClient ? '' : url.origin;
  const [count, setCount] = useState(0);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello ViteSSR + React!</p>
          <p className="text-purple-600">And Tailwinds</p>
          <p>
            <button type="submit" onClick={() => setCount((c) => c + 1)}>
              count is:
              {' '}
              {count}
            </button>
          </p>

          <nav>
            <ul>
              {router.routes.map(({ name, path }) => (
                <li key={path}>
                  <Link to={path}>{name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <Switch>
          {router.routes.map((route) => (
            <Route key={route.path} path={route.path}>
              <route.component route={route} baseUrl={baseUrl} />
            </Route>
          ))}
        </Switch>

        <ClientOnly>
          <div>This text only renders in client side</div>
        </ClientOnly>
      </div>
    </ApolloProvider>
  );
};

App.propTypes = {
  isClient: PropTypes.bool.isRequired,
  url: PropTypes.object.isRequired,
  router: PropTypes.any.isRequired,
};

export default App;
