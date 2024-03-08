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
  login(idToken, userId, redirectPath = '/') {
    localStorage.setItem('id_token', idToken);

    // call the server route to handle redirection
    fetch(`/api/redirect/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const { message, redirectPath } = data;
        if (message) {
          console.error(message);
        } else {
          window.location.assign(redirectPath);
        }
      })
      .catch((error) => {
        console.error('Error fetching redirection information:', error);
      });
  }

  // log the user out and redirect to the authentication page (will show login form once state updates)
  logout(redirectPath = '/authentication') {
    localStorage.removeItem('id_token');
    window.location.assign(redirectPath);
  }
}

export default new AuthService();
