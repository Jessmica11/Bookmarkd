import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Auth from './pages/Auth';
import BookClub from './pages/BookClub';
import Profile from './pages/Profile';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/bookclub/:bookClubId" element={<BookClub />} />
        <Route path="profile/:username" element={<Profile />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root')
);
