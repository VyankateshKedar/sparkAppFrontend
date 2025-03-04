import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

  // CSS styles
  const styles = {
    container: {
      display: 'flex',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
    },
    sidebar: {
      width: '130px',
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
      fontSize: '18px',
      fontWeight: 'bold',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 20px',
      color: '#666',
      textDecoration: 'none',
      marginBottom: '5px',
      fontSize: '14px',
    },
    navItemActive: {
      color: '#31B057',
      fontWeight: 'bold',
    },
    navIcon: {
      marginRight: '10px',
      width: '20px',
      height: '20px',
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 15px',
      marginTop: 'auto',
      borderTop: '1px solid #f0f0f0',
    },
    userAvatar: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      marginRight: '10px',
    },
    userName: {
      fontSize: '14px',
      fontWeight: 'normal',
    },
    mainContent: {
      flex: 1,
      padding: '20px 30px',
    },
    header: {
      marginBottom: '30px',
    },
    greeting: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    subtext: {
      color: '#666',
      fontSize: '14px',
    },
    contentContainer: {
      display: 'flex',
      gap: '20px',
    },
    mobilePreview: {
      borderRadius: '30px',
      overflow: 'hidden',
      border: '10px solid black',
      width: '250px',
      height: '520px',
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
    exportButton: {
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
      cursor: 'pointer',
    },
    profileImage: {
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      overflow: 'hidden',
      backgroundColor: '#f0f0f0',
      border: '3px solid white',
    },
    username: {
      color: 'white',
      margin: '10px 0',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    buttonGroup: {
      display: 'flex',
      gap: '5px',
      width: '100%',
      marginTop: '15px',
    },
    primaryButton: {
      flex: 1,
      backgroundColor: '#31B057',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 0',
      cursor: 'pointer',
      fontSize: '14px',
    },
    secondaryButton: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 0',
      cursor: 'pointer',
      fontSize: '14px',
    },
    linkButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 12px',
      width: '100%',
      marginTop: '10px',
      cursor: 'pointer',
      fontSize: '14px',
    },
    socialIcon: {
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    youtubeIcon: {
      backgroundColor: 'red',
      borderRadius: '4px',
      color: 'white',
      fontSize: '10px',
    },
    igIcon: {
      background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
      borderRadius: '4px',
      color: 'white',
      fontSize: '10px',
    },
    connectButton: {
      backgroundColor: '#31B057',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 0',
      width: '100%',
      marginTop: 'auto',
      cursor: 'pointer',
      fontSize: '14px',
    },
    sparkLogo: {
      textAlign: 'center',
      marginTop: '10px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '12px',
    },
    settingsContainer: {
      flex: 1,
      maxWidth: '600px',
    },
    section: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    layoutOptions: {
      display: 'flex',
      gap: '15px',
      marginBottom: '10px',
    },
    layoutOption: {
      width: '100px',
      height: '80px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: '10px',
      gap: '5px',
    },
    layoutOptionActive: {
      borderColor: '#31B057',
    },
    layoutIcon: {
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    layoutName: {
      fontSize: '12px',
      color: '#666',
    },
    buttonsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '10px',
      marginBottom: '20px',
    },
    buttonStyleLabel: {
      fontSize: '13px',
      color: '#666',
      marginBottom: '10px',
      gridColumn: '1 / -1',
    },
    buttonStyleOption: {
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid transparent',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    colorPickerContainer: {
      marginTop: '20px',
    },
    colorPickerLabel: {
      fontSize: '13px',
      color: '#666',
      marginBottom: '10px',
    },
    colorInput: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 10px',
      backgroundColor: '#f5f5f5',
      border: '1px solid #ddd',
      borderRadius: '5px',
    },
    colorSquare: {
      width: '20px',
      height: '20px',
      backgroundColor: '#111111',
      borderRadius: '4px',
    },
    fontSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
    },
    fontIcon: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    fontName: {
      color: '#666',
      flex: 1,
    },
    themesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '10px',
      marginBottom: '10px',
    },
    themeOption: {
      border: '1px solid #ddd',
      borderRadius: '5px',
      overflow: 'hidden',
      height: '120px',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
    },
    themePreview: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '5px',
    },
    themeBar: {
      width: '70%',
      height: '8px',
      marginBottom: '4px',
      borderRadius: '2px',
    },
    themeName: {
      fontSize: '12px',
      color: '#666',
      textAlign: 'center',
      padding: '5px',
      borderTop: '1px solid #eee',
    },
    saveButton: {
      backgroundColor: '#31B057',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '12px 40px',
      fontSize: '16px',
      cursor: 'pointer',
      marginLeft: 'auto',
      display: 'block',
    },
    mobileContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 20px 20px',
    },
  };

  const DEFAULT_AVATAR = 'https://via.placeholder.com/80?text=Avatar';

const SparkAppearancePage = () => {
  const navigate = useNavigate();

  // Profile & appearance states (fetched from backend)
  const [username, setUsername] = useState('');
  const [bioText, setBioText] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  // Banner color is used as the mobile preview header background
  const [bannerColor, setBannerColor] = useState('#3A3529');
  
  // New appearance customization states
  const [layoutOption, setLayoutOption] = useState('stack'); // "stack", "grid", or "carousel"
  const [selectedButtonStyle, setSelectedButtonStyle] = useState('fill'); // e.g., "fill", "outline", "hardShadow", "softShadow", "special"
  
  const [links, setLinks] = useState([]);

  // For toggling "Add Link" form (optional)
  const [showAddLinkForm, setShowAddLinkForm] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkEnabled, setLinkEnabled] = useState(true);

  // Fetch user profile data and links on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No auth token found. Please log in.');
      return navigate('/login');
    }
    // Fetch user profile (including appearance settings)
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
        // Assume bannerImage holds the chosen background color
        if (userData.bannerImage) {
          setBannerColor(userData.bannerImage);
        }
        if (userData.layoutOption) {
          setLayoutOption(userData.layoutOption);
        }
        if (userData.buttonDesign && userData.buttonDesign.style) {
          setSelectedButtonStyle(userData.buttonDesign.style);
        }
      })
      .catch((err) => console.error('Error fetching user:', err));

    // Fetch user links
    fetch('https://sparkappbackend-2.onrender.com/api/links', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch links');
        return res.json();
      })
      .then((linksData) => setLinks(linksData))
      .catch((err) => console.error('Error fetching links:', err));
  }, [navigate]);

  // Save updated appearance settings to the backend
  const handleSaveAppearance = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          bio: bioText,
          bannerImage: bannerColor,
          layoutOption,
          buttonDesign: { style: selectedButtonStyle }
        })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update appearance');
      }
      const updatedUser = await response.json();
      console.log('Appearance updated:', updatedUser);
      alert('Appearance updated successfully!');
    } catch (err) {
      console.error('Error saving appearance:', err);
      alert(err.message);
    }
  };

  // Optional: Handle adding a new link
  const handleAddLink = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
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

  // Determine the style for link buttons based on selected button design
  const getLinkButtonStyle = () => {
    switch (selectedButtonStyle) {
      case 'fill':
        return { backgroundColor: '#31B057', color: 'white', padding: '5px', borderRadius: '5px', textAlign: 'center' };
      case 'outline':
        return { border: '1px solid white', color: 'white', padding: '5px', borderRadius: '5px', textAlign: 'center' };
      case 'hardShadow':
        return { backgroundColor: '#31B057', color: 'white', padding: '5px', borderRadius: '5px', boxShadow: '3px 3px 0 white', textAlign: 'center' };
      case 'softShadow':
        return { backgroundColor: '#31B057', color: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)', textAlign: 'center' };
      case 'special':
        return { backgroundColor: 'black', color: 'white', padding: '5px', clipPath: 'polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%, 8% 50%)', textAlign: 'center' };
      default:
        return { backgroundColor: '#31B057', color: 'white', padding: '5px', borderRadius: '5px', textAlign: 'center' };
    }
  };

  // Render links based on the chosen layout option
  const renderLinks = () => {
    const buttonStyle = getLinkButtonStyle();
    if (layoutOption === 'grid') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px', width: '100%' }}>
          {links.map((link) =>
            link.isActive ? (
              <a
                key={link._id}
                href={`https://sparkappbackend-2.onrender.com/api/links/redirect/short/${link.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', ...buttonStyle }}
              >
                {link.title}
              </a>
            ) : null
          )}
        </div>
      );
    }
    // For "stack" and "carousel", render vertically
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
        {links.map((link) =>
          link.isActive ? (
            <a
              key={link._id}
              href={`https://sparkappbackend-2.onrender.com/api/links/redirect/short/${link.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', ...buttonStyle }}
            >
              {link.title}
            </a>
          ) : null
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Left Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>⚡</div>
          <div style={styles.logoText}>Spark</div>
        </div>
        <a href="#" style={styles.navItem}>
          <div style={styles.navIcon}>≡</div>
          <span>Links</span>
        </a>
        <a href="#" style={{ ...styles.navItem, ...styles.navItemActive }}>
          <div style={{ ...styles.navIcon, color: '#31B057' }}>◧</div>
          <span>Appearance</span>
        </a>
        <a href="#" style={styles.navItem}>
          <div style={styles.navIcon}>📊</div>
          <span>Analytics</span>
        </a>
        <a href="#" style={styles.navItem}>
          <div style={styles.navIcon}>⚙️</div>
          <span>Settings</span>
        </a>
        <div style={styles.userProfile}>
          <img src="https://via.placeholder.com/30" alt="User" style={styles.userAvatar} />
          <span style={styles.userName}>Jenny Wilson</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div style={styles.greeting}>Hi, Jenny Wilson!</div>
          <div style={styles.subtext}>Customize your link appearance below.</div>
        </div>

        <div style={styles.contentContainer}>
          {/* Mobile Preview */}
          <div style={styles.mobilePreview}>
            <div style={styles.mobileScreen}>
              <div style={{ ...styles.profileHeader, backgroundColor: bannerColor }}>
                <button style={styles.exportButton}>↗</button>
                <div style={styles.profileImage}>
                  <img
                    src={profilePhoto || DEFAULT_AVATAR}
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={styles.username}>{username || '@username'}</div>
                {renderLinks()}
              </div>
            </div>
          </div>

          {/* Settings Container */}
          <div style={styles.settingsContainer}>
            {/* Layout Options */}
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Layout</div>
              <div style={styles.layoutOptions}>
                <div
                  style={{ ...styles.layoutOption, ...(layoutOption === 'stack' ? styles.layoutOptionActive : {}) }}
                  onClick={() => setLayoutOption('stack')}
                >
                  <div style={styles.layoutIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="5" width="18" height="3" rx="1" fill="black" />
                      <rect x="3" y="11" width="18" height="3" rx="1" fill="black" />
                      <rect x="3" y="17" width="18" height="3" rx="1" fill="black" />
                    </svg>
                  </div>
                  <div style={styles.layoutName}>Stack</div>
                </div>
                <div
                  style={{ ...styles.layoutOption, ...(layoutOption === 'grid' ? styles.layoutOptionActive : {}) }}
                  onClick={() => setLayoutOption('grid')}
                >
                  <div style={styles.layoutIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="7" height="7" rx="1" fill="black" />
                      <rect x="14" y="3" width="7" height="7" rx="1" fill="black" />
                      <rect x="3" y="14" width="7" height="7" rx="1" fill="black" />
                      <rect x="14" y="14" width="7" height="7" rx="1" fill="black" />
                    </svg>
                  </div>
                  <div style={styles.layoutName}>Grid</div>
                </div>
                <div
                  style={{ ...styles.layoutOption, ...(layoutOption === 'carousel' ? styles.layoutOptionActive : {}) }}
                  onClick={() => setLayoutOption('carousel')}
                >
                  <div style={styles.layoutIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="6" height="18" rx="1" fill="black" />
                      <rect x="15" y="3" width="6" height="18" rx="1" fill="black" />
                    </svg>
                  </div>
                  <div style={styles.layoutName}>Carousel</div>
                </div>
              </div>
            </div>

            {/* Button Design Options */}
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Buttons</div>
              <div style={{ marginBottom: '10px' }}>
                <label>Button Style: </label>
                <select
                  value={selectedButtonStyle}
                  onChange={(e) => setSelectedButtonStyle(e.target.value)}
                >
                  <option value="fill">Fill</option>
                  <option value="outline">Outline</option>
                  <option value="hardShadow">Hard Shadow</option>
                  <option value="softShadow">Soft Shadow</option>
                  <option value="special">Special</option>
                </select>
              </div>
            </div>

            {/* Themes Section */}
            <div style={styles.section}>
              <div style={styles.sectionTitle}>Themes</div>
              <div style={styles.themesGrid}>
                <div style={styles.themeOption} onClick={() => setBannerColor('#ffffff')}>
                  <div style={{ ...styles.themePreview, backgroundColor: '#ffffff' }}>
                    <div style={{ ...styles.themeBar, backgroundColor: '#333' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#333' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#333' }}></div>
                  </div>
                  <div style={styles.themeName}>Air Snow</div>
                </div>
                <div style={styles.themeOption} onClick={() => setBannerColor('#f5f6f7')}>
                  <div style={{ ...styles.themePreview, backgroundColor: '#f5f6f7' }}>
                    <div style={{ ...styles.themeBar, backgroundColor: '#333' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#333' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#333' }}></div>
                  </div>
                  <div style={styles.themeName}>Air Grey</div>
                </div>
                <div style={styles.themeOption} onClick={() => setBannerColor('#2b303a')}>
                  <div style={{ ...styles.themePreview, backgroundColor: '#2b303a' }}>
                    <div style={{ ...styles.themeBar, backgroundColor: '#fff' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#fff' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#fff' }}></div>
                  </div>
                  <div style={styles.themeName}>Air Smoke</div>
                </div>
                <div style={styles.themeOption} onClick={() => setBannerColor('#000000')}>
                  <div style={{ ...styles.themePreview, backgroundColor: '#000000' }}>
                    <div style={{ ...styles.themeBar, backgroundColor: '#ccc' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#ccc' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#ccc' }}></div>
                  </div>
                  <div style={styles.themeName}>Air Black</div>
                </div>
                <div style={styles.themeOption} onClick={() => setBannerColor('#e6f7ff')}>
                  <div style={{ ...styles.themePreview, backgroundColor: '#e6f7ff' }}>
                    <div style={{ ...styles.themeBar, backgroundColor: '#0066cc' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#0066cc' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#0066cc' }}></div>
                  </div>
                  <div style={styles.themeName}>Mineral Blue</div>
                </div>
                <div style={styles.themeOption} onClick={() => setBannerColor('#e6fff0')}>
                  <div style={{ ...styles.themePreview, backgroundColor: '#e6fff0' }}>
                    <div style={{ ...styles.themeBar, backgroundColor: '#00994d' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#00994d' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#00994d' }}></div>
                  </div>
                  <div style={styles.themeName}>Mineral Green</div>
                </div>
                <div style={styles.themeOption} onClick={() => setBannerColor('#fff5e6')}>
                  <div style={{ ...styles.themePreview, backgroundColor: '#fff5e6' }}>
                    <div style={{ ...styles.themeBar, backgroundColor: '#cc7a00' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#cc7a00' }}></div>
                    <div style={{ ...styles.themeBar, backgroundColor: '#cc7a00' }}></div>
                  </div>
                  <div style={styles.themeName}>Mineral Orange</div>
                </div>
              </div>
            </div>
            
            <button style={styles.saveButton} onClick={handleSaveAppearance}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SparkAppearancePage;
