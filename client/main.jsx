import viteSSR from 'vite-ssr';
import { InMemoryCache } from '@apollo/client';
import App from './app/App';
import routes from './routes';
import './index.css';

export default viteSSR(App, {
  routes,
  transformState(state) {
    if (import.meta.env.SSR) {
      // Serialize
      state.apolloCache = state.apolloCache.extract();
      return JSON.stringify(JSON.stringify(state));
    }
    // Deserialize
    state = JSON.parse(state);
    state.apolloCache = new InMemoryCache().restore(JSON.parse(state.apolloCache));
    return state;
  },
  // eslint-disable-next-line no-unused-vars
}, (ctx) => {
  // Custom initialization hook
});
