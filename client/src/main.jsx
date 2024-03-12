import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import BookClub from './pages/BookClub';
import Header from './components/Header';
import Footer from './components/Footer';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <App />
        <Footer />
      </>
    ),
    children: [
      {
        path: '/home',
        index: true,
        element: <Home />
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/book-club/:bookClubId', 
        element: <BookClub />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
