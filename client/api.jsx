import React from 'react';
import PropTypes from 'prop-types';

// Get our page props from our custom API:
const getPageProps = ({ baseUrl, name, path } = {}) => fetch(
  `${baseUrl}/api/getProps?path=${encodeURIComponent(
    path,
  )}&name=${name}&client=${typeof window !== 'undefined'}`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
).then((res) => res.json());

const PropsProvider = ({ baseUrl, route, children: Page }) => {
  if (!route.meta.state) {
    // Will be suspended until resolved
    throw getPageProps({ baseUrl, ...route }).then((state) => {
      route.meta.state = state;
    });
  }

  console.log(route.meta.state);
  return <Page {...route.meta.state} />;
};

PropsProvider.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  route: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};

export default PropsProvider;
