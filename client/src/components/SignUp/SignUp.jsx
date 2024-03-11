import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/authUtils';

const SignUp = () => {
  const history = useHistory();
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '', bio: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [bioCharsLeft, setBioCharsLeft] = useState(280);
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });

    // show the character count for the bio as the user types
    if (name === 'bio') {
      const charsLeft = 280 - value.length;
      setBioCharsLeft(charsLeft);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userFormData }
      });

      Auth.login(data.addUser.token);

      // this will resend the user to the auth page to login
      // login page has Login tab open by default
      history.push('/auth');
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
          <Form.Label>Tell us about yourself!</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Your bio" name="bio" value={userFormData.bio} onChange={handleInputChange} maxLength={280} />
          <Form.Text className="text-muted">{bioCharsLeft} characters left</Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {error && <p>Error signing up: {error.message}</p>}
      {showAlert && <p>Something went wrong with your sign up! Please try again.</p>}
    </div>
  );
};

export default SignUp;
