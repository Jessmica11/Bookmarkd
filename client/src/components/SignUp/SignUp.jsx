import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/authUtils';

const SignUp = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', bio: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userFormData }
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  // show the user the character count as they type
  const maxBioLength = 280;
  const remainingCharacters = maxBioLength - userFormData.bio.length;

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" name="username" value={userFormData.username} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={userFormData.email} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={userFormData.password} onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formBasicBio">
        <Form.Label>Bio</Form.Label>
        <Form.Control type="text" placeholder="Enter bio" name="bio" value={userFormData.bio} onChange={handleInputChange} size="lg" />
        <small>{remainingCharacters} characters left</small>
      </Form.Group>

      <div style={{ margin: '20px 0' }}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>

      {showAlert && <Alert variant="danger">Sign up failed. Please try again.</Alert>}
    </Form>
  );
};

export default SignUp;
