import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Authentication from '../src/pages/Authentication.jsx';
const router = createBrowserRouter([
  {
    path: '/authentication',
    element: <Authentication />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
