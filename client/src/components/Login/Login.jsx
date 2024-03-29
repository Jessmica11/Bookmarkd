import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate(); 

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
      navigate('/profile'); // redirect to the user's profile page after login
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={userFormData.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={userFormData.password} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>

            {showAlert && <Alert variant="danger" className="mt-3">Invalid credentials. Please try again.</Alert>}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
