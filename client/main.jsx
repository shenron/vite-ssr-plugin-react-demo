import viteSSR from 'vite-ssr';
import { InMemoryCache } from '@apollo/client';
import App from './app/App';
import routes from './routes';
import './index.css';

export default viteSSR(App, {
  routes,
  transformState(state, defaultTransformer) {
    if (import.meta.env.SSR) {
      state.apolloCache = state.apolloCache.extract();
    }

    return defaultTransformer(state);
  },
  // eslint-disable-next-line no-unused-vars
}, ({ initialState }) => {
  // Custom initialization hook
  if (import.meta.env.SSR) {
    initialState.apolloCache = new InMemoryCache();
  } else {
    initialState.apolloCache = new InMemoryCache().restore(initialState.apolloCache);
  }
});
