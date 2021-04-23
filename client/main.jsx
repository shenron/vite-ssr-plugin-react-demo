import viteSSR from 'vite-ssr';
import App from './app/App';
import routes from './routes';
import './index.css';

// eslint-disable-next-line no-unused-vars
export default viteSSR(App, { routes }, ({ url, isClient, initialState }) => {
  // Custom initialization hook
});
