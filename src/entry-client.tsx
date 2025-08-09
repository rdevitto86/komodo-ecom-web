import { lazy, Suspense } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore, type RootState } from './redux/store';

declare global {
  interface Window { __PRELOADED_STATE__?: RootState }
}

const preloaded = window.__PRELOADED_STATE__;
if (preloaded) delete window.__PRELOADED_STATE__;

const store = setupStore(preloaded);
const el = document.getElementById('root')!;
const App = lazy(() => import('./App'));

const root = (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div id="app-skeleton" />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
);

if (el.hasChildNodes()) {
  hydrateRoot(el, root); // SSR
} else {
  createRoot(el).render(root); // CSR
}
