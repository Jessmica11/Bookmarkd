import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';


const Authentication = () => {
  const [key, setKey] = useState('login');

  return (
    <Tabs
      id="authentication-tabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="login" title="Login">
        <Login />
      </Tab>
      <Tab eventKey="signup" title="Sign Up">
        <SignUp />
      </Tab>
    </Tabs>
  );
};

export default Authentication;
