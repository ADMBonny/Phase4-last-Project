import axios from 'axios';

const API_URL = 'http://localhost:5000/auth/';

class AuthService {
  async login(username, password) {
    try {
      const response = await axios.post(API_URL + 'login', JSON.stringify({ username, password }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async register(username, email, password) {
    try {
      const response = await axios.post(API_URL + 'signup', JSON.stringify({ username, email, password }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  handleError(error) {
    const errorMessage = error.response && error.response.data && error.response.data.error
      ? error.response.data.error
      : error.message || 'An unknown error occurred';
    throw new Error(errorMessage);
  }
}

export default new AuthService();
