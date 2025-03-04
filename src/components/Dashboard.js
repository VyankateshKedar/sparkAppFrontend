import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { Music, Calendar, Flame, Book, Gift, Video, Users, MessageSquare, Phone } from 'lucide-react';
const Dashboard = () => {
  const navigate = useNavigate();
  const testimonials = [
    {
      text: "Amazing tool! Saved me months",
      author: "John Master",
      position: "Director, Spark.com"
    },
    {
      text: "Amazing tool! Saved me months",
      author: "John Master", 
      position: "Director, Spark.com"
    }
  ];

    const integrations = [
      { 
        name: 'Audiomack', 
        description: 'Add an Audiomack player to your timeline',
        icon: <Music className={styles.integrationIcon} size={24} />
      },
      { 
        name: 'Bandsintown', 
        description: 'Drive ticket sales by listing your events',
        icon: <Calendar className={styles.integrationIcon} size={24} />
      },
      { 
        name: 'Bonfire', 
        description: 'Display and sell your custom merch',
        icon: <Flame className={styles.integrationIcon} size={24} />
      },
      { 
        name: 'Books', 
        description: 'Showcase books on your timeline',
        icon: <Book className={styles.integrationIcon} size={24} />
      },
      { 
        name: 'Buy Me A Gift', 
        description: 'Let supporters tip you with a small gift',
        icon: <Gift className={styles.integrationIcon} size={24} />
      },
      { 
        name: 'Cameo', 
        description: 'Make impossible fan connections possible',
        icon: <Video className={styles.integrationIcon} size={24} />
      },
      { 
        name: 'Clubhouse', 
        description: 'Let your community in on the conversation',
        icon: <Users className={styles.integrationIcon} size={24} />
      },
      { 
        name: 'Community', 
        description: 'Promote and sell subscriber list',
        icon: <MessageSquare className={styles.integrationIcon} size={24} />
      },
      { 
        name: 'Contact Details', 
        description: 'Easily share downloadable contact details',
        icon: <Phone className={styles.integrationIcon} size={24} />
      }
    ];
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.sparkLogo}>SPARK</span>
          <span className={styles.marketplace}>/ Marketplace</span>
        </div>
        <button 
        className={styles.signUpBtn} 
        onClick={() => navigate('/signup')}
      >
        Sign up free
      </button>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>The easiest place to update and share your Connection</h1>
          <p>Help your followers discover everything you're sharing all over the internet, in one simple place. They'll thank you for it.</p>
          <button className={styles.getSparkBtn}>Get your free Spark</button>
        </div>
        <div className={styles.heroImage}>
          <img src="/Analytics 1.png" alt="Analytics Dashboard" />
        </div>
      </section>

      <section className={styles.monetization}>
      <div className={styles.contentMedia}>
          <img src="/cards.png" alt="Content Preview" />
        </div>
        <div className={styles.monetizationContent}>
          <h2>Analyze your audience and keep your followers engaged.</h2>
          <p>Track your engagement over time, monitor revenue and learn what’s converting your audience. 
            Make informed updates on the fly to keep them coming back.</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentText}>
          <h2>Share limitless content in limitless ways</h2>
          <p>Connect your content in all its forms and help followers find more of what they're looking for. Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts and more - it all comes together in one powerful place.</p>
        </div>
        <div className={styles.contentMedia}>
          <img src="/content.png" alt="Content Preview" />
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2>Here's what our <span className={styles.highlight}>customer</span> has to say</h2>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <p>{testimonial.text}</p>
              <div className={styles.author}>
                <div className={styles.authorAvatar}></div>
                <div className={styles.authorInfo}>
                  <span>{testimonial.author}</span>
                  <span>{testimonial.position}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.integrations}>
      <h2>All Link Apps and Integrations</h2>
      <div className={styles.integrationGrid}>
        {integrations.map((integration, index) => (
          <div key={index} className={styles.integrationCard}>
            <div className={styles.integrationHeader}>
              <div className={styles.iconContainer}>
                {integration.icon}
              </div>
              <h3>{integration.name}</h3>
            </div>
            <p>{integration.description}</p>
          </div>
        ))}
      </div>
    </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerButtons}>
            <button className={styles.loginBtn} onClick={() => navigate('/login')}> Log in</button>
            <button className={styles.signUpBtn}>Sign up free</button>
          </div>
          <div className={styles.footerLinks}>
            <a href="#">Terms and Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Trust Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;