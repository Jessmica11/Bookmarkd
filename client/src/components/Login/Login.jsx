import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/authUtils'

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...userFormData }
      });

      Auth.login(data.login.token);
      // the user will be redirected to their profile page after logging in
      history.push('/profile');

    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={userFormData.email} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={userFormData.password} onChange={handleInputChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      {showAlert && <Alert variant="danger">Invalid credentials. Please try again.</Alert>}
    </Form>
  );
};

export default Login;
