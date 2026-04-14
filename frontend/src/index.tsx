import { createRoot } from 'react-dom/client';
import { Root } from './Root.tsx';
import "./index.css";
import { Provider } from 'react-redux';
import store from './services/store.ts';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Provider store={store}>
    <Root />
  </Provider>
);
