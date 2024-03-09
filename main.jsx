import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Auth from './pages/Auth.jsx';
import Home from './pages/Home.jsx'; // Import the Home component

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/auth',
        element: <Auth />
      },
    ],
  },
]);

// Change ReactDOM.createRoot to ReactDOM.createRoot(document.getElementById('root'))
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
