import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createUser } from '../../utils/API';
import Auth from '../../utils/auth.js';

const SignUp = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', bio: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error('Sign-up error:', err.message);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
      bio: '',
    });

    setValidated(false);
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          placeholder="Your username"
          name="username"
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />
        <div className="invalid-feedback">Username is required!</div>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Your email address"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        <div className="invalid-feedback">Email is required!</div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Your password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
        <div className="invalid-feedback">Password is required!</div>
      </div>

      <div className="form-group">
        <label htmlFor="bio">Write a Short Bio</label>
        <input
          type="text"
          className="form-control"
          id="bio"
          placeholder="Your bio"
          name="bio"
          onChange={handleInputChange}
          value={userFormData.bio}
          maxLength={280}
          required
        />
        <small>{280 - userFormData.bio.length} characters left</small>
      </div>

      <Button
        disabled={!(userFormData.username && userFormData.email && userFormData.password)}
        type="submit"
        variant="success"
        onClick={handleFormSubmit}
      >
        Submit
      </Button>

      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
        Something went wrong with your signup!
      </Alert>
    </form>
  );
};

export default SignUp;
