// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';

import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import PostSignUpPage from './components/PostSignupPage';
import SparkProfile from './components/Sparkprofile';
import SparkAppearancePage from './components/Sparkappearance';
import SparkAnalyticsDashboard from './components/SparkAnalyticsPage';
import ProfileSettings from './components/SparkSettingPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      {/* Provide Auth Context for all routes */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/postsign" element={<PostSignUpPage />} />
          <Route path="/sparkprofile" element={<SparkProfile />} />
          <Route path="/appearance" element={<SparkAppearancePage />} />
          <Route path="/analytics" element={<SparkAnalyticsDashboard />} />
          <Route path="/setting" element={<ProfileSettings />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
