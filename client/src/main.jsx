import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './src/App.jsx';
import Home from './src/pages/Home';
import Signup from './src/pages/Signup';
import Login from './src/pages/Login';
import Profile from './src/pages/Profile';
import Error from './src/pages/Error';
import Bookclub from './src/pages/Bookclub'; // Import Bookclub if it's not imported

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/me',
        element: <Profile />,
      },
      {
        path: '/profiles/:profileId',
        element: <Profile />,
      },
      {
        path: '/bookclubs/:bookclubId',
        element: <Bookclub />,
      },
      {
        path: '/bookclubs/:bookclubId/comments',
        element: <Bookclub />,
      },
    ],
  },
]);

import { RouterProvider } from 'react-router-dom'; // Import RouterProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);