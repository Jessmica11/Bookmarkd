import * as decode from "jwt-decode";

class AuthService {
  // Get user profile information from the decoded token
  getProfile() {
    const token = this.getToken();
    return token ? decode(token) : null;
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // See if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      console.error("Error decoding token:", err.message);
      return true; // Treat decoding errors as expired tokens
    }
  }

  // Get the user token from local storage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Login user and redirect to their profile page
  async loginUser(username, password) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      const { idToken, userId } = data;

      // Store the token locally
      this.login(idToken);
      return userId;
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error; // Rethrow the error for handling in the UI
    }
  }

  // Log the user out and redirect to the authentication page (will show login form)
  logout(redirectPath = "/home") {
    localStorage.removeItem("id_token");
    window.location.assign(redirectPath);
  }

  // Log the user in and store the token
  login(idToken) {
    localStorage.setItem("id_token", idToken);
  }
}

export default new AuthService();
