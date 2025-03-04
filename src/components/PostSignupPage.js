// PostSignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostSignUpPage.css'; // your styling

const categories = [
  'Business',
  'Creative',
  'Education',
  'Entertainment',
  'Fashion & Beauty',
  'Food & Beverage',
  'Government & Politics',
  'Health & Wellness',
  'Non-Profit',
  'Other',
  'Tech',
  'Travel & Tourism',
];

export default function PostSignupPage() {
  const [username, setUsername] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleContinue = async () => {
    try {
      // The JWT token stored after user logs in or registers
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log("No auth token found. Please log in.");
        return navigate('/login');
      }

      // POST to save username, category in DB
      const response = await fetch('https://sparkappbackend-2.onrender.com/api/user/profile-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          category: selectedCategory
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit post-signup data');
      }

      // On success, navigate to Sparkprofile
      navigate('/sparkprofile');
    } catch (error) {
      console.error('Error in post-signup:', error);
      // Display error if needed
    }
  };

  return (
    <div className="post-sign-up-container">
      <div className="info-section">
        <h1>Tell us about yourself</h1>
        <p className="subtitle">For a personalized Spark experience</p>
        <input
          type="text"
          className="username-input"
          placeholder="Tell us your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p className="category-instruction">
          Select one category that best describes your Linktree:
        </p>
        <div className="category-list">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          className="continue-button"
          onClick={handleContinue}
          disabled={!username || !selectedCategory}
        >
          Continue
        </button>
      </div>
      <div className="image-section">
        {/* ...your background or illustration... */}
      </div>
    </div>
  );
}
