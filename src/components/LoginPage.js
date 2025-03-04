// components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous errors

    try {
      // Make a POST request to your backend's login endpoint
      const response = await fetch('https://sparkappbackend-2.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If response is not OK, throw an error
        throw new Error(data.message || 'Login failed');
      }

      // On success, data should contain the token
      // e.g., { token: "JWT_TOKEN", user: { ... }, etc. }
      localStorage.setItem('authToken', data.token);

      // Navigate to PostSign page, or wherever you want after successful login
      navigate('/postsign');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.formSection}>
        <h1>Sign in to your Spark</h1>

        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>

        <p className={styles.captchaText}>
          This site is protected by reCAPTCHA and the{' '}
          <a href="https://policies.google.com/privacy" className={styles.link}>
            Google Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms" className={styles.link}>
            Terms of Service
          </a>{' '}
          apply.
        </p>
      </div>

      <div className={styles.imageSection}>
        <img src="/signup.png" alt="Decorative" />
      </div>
    </div>
  );
};

export default LoginPage;
