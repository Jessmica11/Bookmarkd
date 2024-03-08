import React, { useState } from 'react';
import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';

const Auth = () => {
  const [key, setKey] = useState('login');

  const handleTabSelect = (selectedKey) => {
    setKey(selectedKey);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Tabs id="authentication-tabs" activeKey={key} onSelect={handleTabSelect} className="mb-3">
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
