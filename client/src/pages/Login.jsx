/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [loginSuccessful, setLoginSuccessful] = useState(null);
  const [loginUnuccessful, setLoginUnsuccessful] = useState(null);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/login/', { email: data.email, password: data.password });
      if (res.status === 200) setLoginSuccessful(true);
    } catch (error) {
      setLoginUnsuccessful(true);
    }
  };

  useEffect(() => {
    if (loginSuccessful) {
      const timeoutId = setTimeout(() => {
        navigate('/'); // Redirect to the home page
      }, 2000);

      // Clean up the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [loginSuccessful]);

  return (
    <div>
      <Form onSubmit={loginUser}>
        <Form.Group className='mb-3' controlId='formEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      {loginSuccessful && <Alert variant={'success'}>Login successfully.</Alert>}
      {loginUnuccessful && <Alert variant={'danger'}>Invalid credentials.</Alert>}
    </div>
  );
};

export default Login;
