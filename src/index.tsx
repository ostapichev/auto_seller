import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import router from './router';
import { RouterProvider } from 'react-router-dom';
import { setupStore } from './redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = setupStore();

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
