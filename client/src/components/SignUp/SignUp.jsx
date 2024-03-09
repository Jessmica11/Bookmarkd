import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createUser } from '../../utils/API';
import Auth from '../../utils/auth.js';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations.js';

const SignUp = () => {
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', bio: '' });
  const [validated, setValidated] = useState({ username: false, email: false, password: false });
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated({
        username: !form['username'].checkValidity(),
        email: !form['email'].checkValidity(),
        password: !form['password'].checkValidity(),
      });
      return;
    }

    // rely on regex for correct email format
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(userFormData.email)) {
      setValidated((prev) => ({ ...prev, email: true }));
      return;
    }

    try {
      const {data} = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);

      // redirect the user to the auth page with the login form
      navigate('/auth'); // Use navigate instead of history.push
    } catch (err) {
      console.error('Sign-up error:', err.message);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    // Reset validation state and form data after successful form submission
    setValidated({ username: false, email: false, password: false });
    setUserFormData({ username: '', email: '', password: '', bio: '' });
  }, [showAlert]);

  return (
    <form>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className={`form-control ${validated.username ? 'is-invalid' : ''}`}
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
          className={`form-control ${validated.email ? 'is-invalid' : ''}`}
          id="email"
          placeholder="Your email address"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
        <div className="invalid-feedback">Email is required and must be in a valid format!</div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className={`form-control ${validated.password ? 'is-invalid' : ''}`}
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
        className="btn btn-primary my-2 w-100"
        style={{ border: '1px solid #000000' }}
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
