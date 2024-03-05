import decode from 'jwt-decode';
// use this to decode a token and get the user's information out of it

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // is there a saved token and is it still valid?
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check for expiration
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // get user from local storage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // then save the user token to local storage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // when the user logs out, clear the token and profile data from local storage
    localStorage.removeItem('id_token');
    // reset the whole window state
    window.location.assign('/');
  }
}

export default new AuthService();
