import * as decode from 'jwt-decode';

class AuthService {
  // get user profile information from the decoded token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // see if the token is expired
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

  // get the user token from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Login user and redirect to their profile page
  async loginUser(username, password) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      const { idToken, userId } = data;

      // Store the token locally and redirect
      this.login(idToken, userId);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  }

  // log the user out and redirect to the authentication page (will show login form once state updates)
  logout(redirectPath = '/authentication') {
    localStorage.removeItem('id_token');
    window.location.assign(redirectPath);
  }
}

export default new AuthService();
