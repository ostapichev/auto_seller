import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';


import { setupStore } from './redux';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = setupStore();

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
