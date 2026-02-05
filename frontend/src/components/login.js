import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = isRegister ? 'http://localhost:8080/auth/register' : 'http://localhost:8080/auth/login';
    try {
      const res = await axios.post(url, { email, password }, { withCredentials: true });
      toast.success(res.data.message);
      setIsAuthenticated(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Login/Register error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        {isRegister ? 'Register' : 'Login'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
          disabled={loading}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '10px', marginRight: '10px' }}
        >
          {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
        </Button>
        <Button
          onClick={() => setIsRegister(!isRegister)}
          disabled={loading}
          style={{ marginTop: '10px' }}
        >
          {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
        </Button>
      </form>
    </Container>
  );
}

export default Login;