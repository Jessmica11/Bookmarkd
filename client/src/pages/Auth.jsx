import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import Login from '../components/Login/Login'; 
import SignUp from '../components/SignUp/SignUp';
import Auth from '../utils/auth';

const Auth = () => {
  const [key, setKey] = useState('login');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Redirect to login tab if user is not logged in and trying to access other pages
    if (!Auth.loggedIn() && location.pathname !== '/auth') {
      history.push('/auth');
      setKey('login');
    }
  }, [location, history]);

  const handleTabSelect = (selectedKey) => {
    setKey(selectedKey);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={{ span: 6 }}>
          <Tabs
            id="authentication-tabs"
            activeKey={key}
            onSelect={handleTabSelect}
            className="mb-3"
            variant='pills'
            style={{ gap: '1rem', display: 'flex', justifyContent: 'center' }}
          >
            <Tab eventKey="login" title="Login">
              <Login />
            </Tab>
            <Tab eventKey="signup" title="Sign Up">
              <SignUp />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
