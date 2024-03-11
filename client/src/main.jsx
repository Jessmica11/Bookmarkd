import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
// import Nav from './components/Nav';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        {/* <Nav /> */}
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
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
