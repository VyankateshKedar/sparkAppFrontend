import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// We'll reuse your existing styles object:
const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  sidebar: {
    width: '180px',
    backgroundColor: 'white',
    borderRight: '1px solid #e0e0e0',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    marginBottom: '30px',
  },
  logoIcon: {
    color: '#31B057',
    fontSize: '24px',
    marginRight: '10px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    color: '#31B057',
    textDecoration: 'none',
    marginBottom: '5px',
  },
  activeNavItem: {
    backgroundColor: '#f0f0f0',
    borderLeft: '3px solid #31B057',
  },
  navIcon: {
    marginRight: '10px',
    width: '20px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  greeting: {
    display: 'flex',
    flexDirection: 'column',
  },
  greetingName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  greetingText: {
    color: '#666',
    fontSize: '14px',
  },
  shareButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  contentContainer: {
    display: 'flex',
    gap: '20px',
  },
  mobilePreview: {
    borderRadius: '30px',
    overflow: 'hidden',
    border: '10px solid black',
    width: '280px',
    height: '580px',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  mobileScreen: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  profileHeader: {
    backgroundColor: '#3A3529',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  profileImageContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    border: '3px solid white',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  username: {
    color: 'white',
    margin: '10px 0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    width: '100%',
    marginTop: '15px',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#31B057',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 15px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 15px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 15px',
    width: '100%',
    marginTop: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'none', // For anchor styling
  },
  socialIcon: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  },
  mobileContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  connectButton: {
    backgroundColor: '#31B057',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 15px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: 'auto',
    width: '100%',
    marginBottom: '10px',
  },
  sparkLogo: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '12px',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  profileSection: {
    marginBottom: '30px',
  },
  profileEdit: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  profileImgPreview: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  profileButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
  uploadButton: {
    backgroundColor: '#31B057',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    width: '100%',
  },
  removeButton: {
    backgroundColor: 'white',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    width: '100%',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#666',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '80px',
  },
  charCount: {
    textAlign: 'right',
    fontSize: '12px',
    color: '#999',
    marginTop: '5px',
  },
  addButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  addButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31B057',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  addIcon: {
    marginRight: '5px',
    fontSize: '18px',
  },
  fullWidthButton: {
    width: '100%',
    backgroundColor: '#31B057',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerSection: {
    marginTop: '30px',
  },
  bannerPreview: {
    backgroundColor: '#3A3529',
    borderRadius: '10px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  colorOptions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
  },
  colorOption: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    cursor: 'pointer',
    border: '1px solid #ddd',
  },
  darkBrown: {
    backgroundColor: '#3A3529',
  },
  white: {
    backgroundColor: '#FFFFFF',
  },
  black: {
    backgroundColor: '#000000',
  },
  colorInput: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '15px',
  },
  colorSquare: {
    width: '30px',
    height: '30px',
    backgroundColor: '#000000',
    border: '1px solid #ddd',
  },
  colorTextInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#31B057',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 30px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '8px 12px',
    borderRadius: '20px',
    marginTop: 'auto',
    marginBottom: '10px',
  },
  userProfileImg: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userName: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  linkFormContainer: {
    marginTop: '15px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  linkFormHeader: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  linkFormRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  toggleLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '14px',
  },
  linkIconsRow: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  },
  smallIconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    cursor: 'pointer',
  },
};

const DEFAULT_AVATAR = 'https://via.placeholder.com/80?text=Avatar';

const SparkprofilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [bioText, setBioText] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [bannerColor, setBannerColor] = useState('#3A3529');
  const [links, setLinks] = useState([]);

  // Toggles
  const [showAddLinkForm, setShowAddLinkForm] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkEnabled, setLinkEnabled] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No auth token found. Please log in.');
      return navigate('/login');
    }

    // 1) Fetch user profile
    fetch('https://sparkappbackend-2.onrender.com/api/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then((userData) => {
        setUsername(userData.username || '');
        setBioText(userData.bio || '');
        setProfilePhoto(userData.profileImage || '');
        // If you store theme color in userData.theme, setBannerColor(...) here
      })
      .catch((err) => console.error('Error fetching user:', err));

    // 2) Fetch user’s links
    fetch('https://sparkappbackend-2.onrender.com/api/links', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch links');
        return res.json();
      })
      .then((linksData) => {
        setLinks(linksData);
      })
      .catch((err) => console.error('Error fetching links:', err));
  }, [navigate]);

  // Save user profile
  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No auth token');

      const response = await fetch('https://sparkappbackend-2.onrender.com/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          bio: bioText,
          profileImage: profilePhoto
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update profile');
      }

      const updatedUser = await response.json();
      console.log('Profile updated:', updatedUser);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error saving profile:', err);
      alert(err.message);
    }
  };

  // Add link
  const handleAddLink = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No auth token');

      const response = await fetch('https://sparkappbackend-2.onrender.com/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: linkTitle,
          url: linkUrl,
          isActive: linkEnabled
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create link');
      }

      const newLink = await response.json();
      setLinks([...links, newLink]);
      setLinkTitle('');
      setLinkUrl('');
      setLinkEnabled(true);
      setShowAddLinkForm(false);
    } catch (err) {
      console.error('Error creating link:', err);
      alert(err.message);
    }
  };

  const finalProfileImage = profilePhoto || DEFAULT_AVATAR;

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>Spark</span>
        </div>

        <RouterLink
          to="/sparkprofile"
          style={{ ...styles.navItem, ...styles.activeNavItem }}
        >
          <span style={styles.navIcon}>≡</span>
          Links
        </RouterLink>
        <RouterLink to="/appearance" style={styles.navItem}>
          <span style={styles.navIcon}>◧</span>
          Appearance
        </RouterLink>
        <RouterLink to="/analytics" style={styles.navItem}>
          <span style={styles.navIcon}>📊</span>
          Analytics
        </RouterLink>
        <RouterLink to="/setting" style={styles.navItem}>
          <span style={styles.navIcon}>⚙️</span>
          Settings
        </RouterLink>

        <div style={styles.userProfile}>
          <img
            src="https://via.placeholder.com/30"
            alt="User"
            style={styles.userProfileImg}
          />
          <span style={styles.userName}>{username}</span>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div style={styles.greeting}>
            <span style={styles.greetingName}>Hi, {username}!</span>
            <span style={styles.greetingText}>
              Congratulations. You got a great response today.
            </span>
          </div>
          <button style={styles.shareButton}>Share</button>
        </div>

        <div style={styles.contentContainer}>
          {/* MOBILE PREVIEW */}
          <div style={styles.mobilePreview}>
            <div style={styles.mobileScreen}>
              <div
                style={{
                  ...styles.profileHeader,
                  backgroundColor: bannerColor
                }}
              >
                <button
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  ↗
                </button>

                <div style={styles.profileImageContainer}>
                  <img
                    src={finalProfileImage}
                    alt="Profile"
                    style={styles.profileImage}
                  />
                </div>
                <h3 style={styles.username}>{username || '@username'}</h3>

                <div style={styles.actionButtons}>
                  <button style={styles.primaryButton}>link</button>
                  <button style={styles.secondaryButton}>Shop</button>
                </div>

                {/* Use the redirect endpoint so that trackClick is called */}
                {links.map((link) =>
                  link.isActive ? (
                    <a
                    key={link._id}
                    href={`https://sparkappbackend-2.onrender.com/api/links/redirect/short/${link.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.socialLink}
                  >
                    <span style={styles.socialIcon}>🔗</span>
                    {link.title}
                  </a>
                  ) : null
                )}

                <button style={styles.connectButton}>Get Connected</button>
                <div style={styles.sparkLogo}>⚡ SPARK</div>
              </div>
            </div>
          </div>

          {/* FORM CONTAINER */}
          <div style={styles.formContainer}>
            <div style={styles.profileSection}>
              <h3 style={styles.sectionTitle}>Profile</h3>

              <div style={styles.profileEdit}>
                <div style={styles.profileImgPreview}>
                  <img
                    src={finalProfileImage}
                    alt="Profile"
                    style={styles.profileImage}
                  />
                </div>
                <div style={styles.profileButtons}>
                  <label style={styles.label}>Profile Photo (URL)</label>
                  <input
                    style={styles.input}
                    type="text"
                    value={profilePhoto}
                    onChange={(e) => setProfilePhoto(e.target.value)}
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Profile Title (Username)</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Bio</label>
                <textarea
                  style={styles.textarea}
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  maxLength={80}
                />
                <div style={styles.charCount}>{bioText.length} / 80</div>
              </div>

              <div style={styles.addButtons}>
                <button
                  style={styles.addButton}
                  onClick={() => setShowAddLinkForm(true)}
                >
                  <span style={styles.addIcon}>+</span>
                  Add Link
                </button>
                <button style={styles.addButton}>
                  <span style={styles.addIcon}>+</span>
                  Add Shop
                </button>
              </div>

              {/* "Add Link" form */}
              {showAddLinkForm && (
                <div style={styles.linkFormContainer}>
                  <div style={styles.linkFormHeader}>Enter URL</div>
                  <div style={styles.linkFormRow}>
                    <input
                      style={styles.input}
                      type="text"
                      placeholder="Link title"
                      value={linkTitle}
                      onChange={(e) => setLinkTitle(e.target.value)}
                    />
                    <label style={styles.toggleLabel}>
                      <input
                        type="checkbox"
                        checked={linkEnabled}
                        onChange={() => setLinkEnabled(!linkEnabled)}
                      />
                      Enabled
                    </label>
                  </div>
                  <div style={styles.linkFormRow}>
                    <input
                      style={styles.input}
                      type="text"
                      placeholder="Link URL"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                  </div>
                  <button
                    style={styles.fullWidthButton}
                    onClick={handleAddLink}
                  >
                    Add This Link
                  </button>
                </div>
              )}

              <button style={styles.fullWidthButton}>
                <span style={styles.addIcon}>+</span>
                Add
              </button>
            </div>

            {/* Banner customization */}
            <div style={styles.bannerSection}>
              <h3 style={styles.sectionTitle}>Banner</h3>

              <div style={styles.bannerPreview}>
                <div style={styles.profileImageContainer}>
                  <img
                    src={finalProfileImage}
                    alt="Profile"
                    style={styles.profileImage}
                  />
                </div>
                <h3 style={styles.username}>{username || '@username'}</h3>
                <span style={{ color: '#999', fontSize: '14px' }}>
                  /{username}
                </span>
              </div>

              <div style={{ marginTop: '15px' }}>
                <label style={styles.label}>Custom Background Color</label>
                <div style={styles.colorOptions}>
                  {/* color pickers or anything */}
                </div>
                <div style={styles.colorInput}>
                  <div
                    style={{
                      ...styles.colorSquare,
                      backgroundColor: bannerColor
                    }}
                  ></div>
                  <input
                    type="text"
                    value={bannerColor}
                    onChange={(e) => setBannerColor(e.target.value)}
                    style={styles.colorTextInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button style={styles.saveButton} onClick={handleSaveProfile}>
        Save
      </button>
    </div>
  );
};

export default SparkprofilePage;
