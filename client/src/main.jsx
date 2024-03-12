import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Auth from './pages/Profile.jsx';
import Profile from './pages/Profile.jsx'
import BookClub from './pages/BookClub.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/bookclub',
        element: <BookClub />
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
