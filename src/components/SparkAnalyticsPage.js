import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import styles from './SparkDashboard.module.css';

function randomColorPalette(index) {
  // A small palette for chart colors (expand if you want more variety)
  const palette = [
    '#5fe7a3', '#7df7b6', '#1c5e44', '#54e899', '#c2f7da', '#37c675',
    '#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888'
  ];
  return palette[index % palette.length];
}

const SparkAnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('Last 7 Days'); // Example text for the date range

  // States to hold the dynamic analytics data
  const [lineData, setLineData] = useState([]);     // timeSeries -> line chart
  const [deviceData, setDeviceData] = useState([]); // deviceStats -> bar chart
  const [linkData, setLinkData] = useState([]);     // linkPerformance -> bar chart
  const [siteData, setSiteData] = useState([]);     // referrerStats -> pie chart

  // Metric cards
  const [totalProfileViews, setTotalProfileViews] = useState(0);
  const [totalLinkClicks, setTotalLinkClicks] = useState(0);
  const [ctaClicks, setCtaClicks] = useState(156); // Example placeholder for "CTA"

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log('No auth token found. Please log in.');
      navigate('/login');
      return;
    }

    // 1) Fetch analytics data for the logged-in user
    // e.g. /api/analytics?period=week
    fetch('http://localhost:5000/api/analytics?period=week', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch analytics');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Analytics data:', data);

        // Update top metrics
        setTotalProfileViews(data.totalProfileViews || 0);
        setTotalLinkClicks(data.totalLinkClicks || 0);
        // CTA might be separate, so we keep a placeholder

        // 2) Transform timeSeries -> lineData
        // Suppose we want to plot clicks over time
        if (data.timeSeries) {
          // Recharts expects e.g. [{ date: '2023-09-01', value: 5 }, ...]
          const transformed = data.timeSeries.map((item) => ({
            date: item.date,
            value: item.clicks // or item.views if you prefer
          }));
          setLineData(transformed);
        }

        // 3) Device stats => { mobile: X, desktop: Y, ... } -> Array for BarChart
        if (data.deviceStats) {
          // Convert e.g. { mobile: 2, desktop: 4 } into array
          const devArray = Object.keys(data.deviceStats).map((dev, index) => ({
            name: dev,
            value: data.deviceStats[dev],
            color: randomColorPalette(index),
          }));
          setDeviceData(devArray);
        }

        // 4) Link performance => data.linkPerformance -> linkData (BarChart)
        if (data.linkPerformance) {
          const linkArr = data.linkPerformance.map((lp, index) => ({
            name: lp.title,
            value: lp.clicks,
            color: randomColorPalette(index),
          }));
          setLinkData(linkArr);
        }

        // 5) Referrer stats => data.referrerStats -> siteData (PieChart)
        if (data.referrerStats) {
          const refArr = Object.keys(data.referrerStats).map((ref, index) => ({
            name: ref,
            value: data.referrerStats[ref],
            color: randomColorPalette(index),
          }));
          setSiteData(refArr);
        }
      })
      .catch((err) => {
        console.error('Error fetching analytics:', err);
      });
  }, [navigate]);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <span>S</span>
          </div>
          <span className={styles.logoText}>Spark</span>
        </div>
        
        <div className={styles.navLinks}>
          <div className={styles.navItem}>
            <span className={styles.navIcon}>&#9776;</span>
            <span>Links</span>
          </div>
          
          <div className={styles.navItem}>
            <span className={styles.navIcon}>&#9881;</span>
            <span>Appearance</span>
          </div>
          
          <div className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.navIcon}>&#128202;</span>
            <span>Analytics</span>
          </div>
          
          <div className={styles.navItem}>
            <span className={styles.navIcon}>&#9881;</span>
            <span>Settings</span>
          </div>
        </div>
        
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            <span>JW</span>
          </div>
          <span className={styles.userName}>Jenny Wilson</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.greeting}>Hi, Jenny Wilson!</h1>
          <p className={styles.subGreeting}>Congratulations. You got a great response today.</p>
        </div>
        
        <div className={styles.overviewHeader}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <div className={styles.dateSelector}>
            <span>{dateRange}</span>
            <Calendar size={18} className={styles.calendarIcon} />
          </div>
        </div>
        
        {/* Metrics Cards */}
        <div className={styles.metricsGrid}>
          <div className={`${styles.metricCard} ${styles.primaryCard}`}>
            <div className={styles.metricLabel}>Clicks on Links</div>
            <div className={styles.metricValue}>{totalLinkClicks}</div>
          </div>
          
          <div className={`${styles.metricCard} ${styles.secondaryCard}`}>
            <div className={styles.metricLabel}>Profile Views</div>
            <div className={styles.metricValue}>{totalProfileViews}</div>
          </div>
          
          <div className={`${styles.metricCard} ${styles.tertiaryCard}`}>
            <div className={styles.metricLabel}>CTA</div>
            <div className={styles.metricValue}>{ctaClicks}</div>
          </div>
        </div>
        
        {/* Line Chart (time series: clicks or views by date) */}
        <div className={styles.chartCard}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#37c675"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Charts Row */}
        <div className={styles.chartsGrid}>
          {/* Traffic by Device */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Traffic by Device</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={deviceData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {deviceData.map((entry, index) => (
                    <Cell key={`device-cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Sites (Referrer Stats) */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Referrer Sites</h3>
            <div className={styles.pieChartContainer}>
              <div className={styles.pieChart}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={siteData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {siteData.map((entry, index) => (
                        <Cell key={`site-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className={styles.pieChartLegend}>
                {siteData.map((site, index) => (
                  <div key={index} className={styles.legendItem}>
                    <div className={styles.legendItemContent}>
                      <div
                        className={styles.legendDot}
                        style={{ backgroundColor: site.color }}
                      />
                      <span className={styles.legendText}>{site.name}</span>
                    </div>
                    <span className={styles.legendValue}>{site.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Traffic by Links */}
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Traffic by links</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={linkData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {linkData.map((entry, index) => (
                  <Cell key={`link-cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SparkAnalyticsDashboard;
