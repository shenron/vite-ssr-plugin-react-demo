import viteSSR from 'vite-ssr'; // eslint-disable-line import/no-unresolved
import App from './app/App';
import routes from './routes';

// eslint-disable-next-line no-unused-vars
export default viteSSR(App, { routes }, ({ url, isClient, initialState }) => {
  // Custom initialization hook
});
