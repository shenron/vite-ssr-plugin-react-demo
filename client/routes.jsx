import React from 'react';
import PropsProvider from './api.jsx';

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/*.jsx');

// Follow `react-router-config` route structure
export default Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
  let component = null;

  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    // Async components
    component: (props) => {
      if (!component) {
        // Suspense will re-render when component is ready
        throw pages[path]().then((result) => {
          component = result.default;
        });
      }

      return React.createElement(PropsProvider, props, component);
    },
  };
});
