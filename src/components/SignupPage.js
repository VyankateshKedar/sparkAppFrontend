import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';
import { useAuth } from './AuthContext'; // Must be inside <AuthProvider>

const SignupPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If user is already logged in, redirect
  useEffect(() => {
    if (auth && auth.user) {
      navigate('/postsign');
    }
  }, [auth, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (error) setError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (!formData.agreedToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const username = `${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`;

      // POST to register endpoint
      const response = await fetch('https://sparkappbackend-2.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // If server returns token in data.token:
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        // Optionally store user info
        const userInfo = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          username
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        // If we want to set the user in context
        if (auth && auth.setUser) {
          auth.setUser(userInfo);
        }
      }

      // Navigate to onboarding
      navigate('/postsign');

    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.formSection}>
        <h1>Sign up to your Spark</h1>
        
        <div className={styles.headerSection}>
          <h2>Create an account</h2>
          <a href="/login" className={styles.signInLink}>Sign in instead</a>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
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
              disabled={isLoading}
              minLength="8"
            />
            <small className={styles.passwordHint}>
              Must be at least 8 characters
            </small>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.termsGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              <span>
                By creating an account, I agree to our{' '}
                <a href="/terms" className={styles.link}>Terms of use</a> and{' '}
                <a href="/privacy" className={styles.link}>Privacy Policy</a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create an account'}
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

export default SignupPage;
