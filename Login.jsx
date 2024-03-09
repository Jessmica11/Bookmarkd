import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../../utils/auth.js';
import { loginUser } from '../../utils/API';
import { LOGIN_USER } from '../../utils/mutations.js';
import { useMutation } from '@apollo/client';
import '../../App.css';

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState({ email: false, password: false });
  const [showAlert, setShowAlert] = useState(false);
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated({ email: true, password: true });
      return;
    }

    // rely on regex for correct email format
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(userFormData.email)) {
      setValidated((prev) => ({ ...prev, email: true }));
      return;
    }

    try {
      const {data} = await login({
        variables: { ...userFormData },
      
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err.message);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });

    setValidated(false);
  };

  return (
    <form>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            className={`form-control ${validated.email ? 'is-invalid' : ''}`}
            id="inputEmail"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <div className="invalid-feedback">Email is required and must be in a valid format!</div>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className={`form-control ${validated.password ? 'is-invalid' : ''}`}
            id="inputPassword"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <div className="invalid-feedback">Password is required!</div>
        </div>
      </div>

      <Button
        disabled={!(userFormData.email && userFormData.password)}
        type="submit"
        className="btn btn-primary my-2 w-100"
        style={{ border: '1px solid #000000' }}
        onClick={handleFormSubmit}
      >
        Submit
      </Button>

      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
        Something went wrong with your login credentials!
      </Alert>
    </form>
  );
};

export default Login;