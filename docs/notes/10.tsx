import React, { useMemo } from 'react';

// --- CSS Styles (Injected for portability) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --c-bg: #ffffff;
    --c-card-bg: #f5f5f5; /* Light gray for cards */
    --c-text-main: #000000;
    --c-text-sub: #666666;
    --c-text-muted: #999999;
    
    /* Data Colors */
    --color-us: #0070f3; /* Blue */
    --color-de: #f5a623; /* Yellow */
    --color-gb: #0070f3; /* Blue variant */
    --color-in: #f5a623; /* Orange */
    --color-br: #ff0000; /* Red */
    --color-sg: #f5a623; 
    --color-jp: #ff0000;
    --color-dot-base: #e5e5e5;
    
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  body {
    background-color: var(--c-bg);
    color: var(--c-text-main);
    font-family: var(--font-ui);
    margin: 0;
    padding: 2rem;
    overflow-x: hidden;
  }

  .dashboard-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* --- Header --- */
  .header {
    font-family: var(--font-mono);
    text-transform: uppercase;
    font-size: 0.8rem;
    color: var(--c-text-sub);
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  /* --- Hero Section (Map + Main Stat) --- */
  .hero-section {
    position: relative;
    min-height: 500px;
    display: flex;
    align-items: flex-start;
  }

  /* Left Panel: Stats Overlay */
  .hero-stats {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    max-width: 350px;
  }

  .main-stat-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--c-text-sub);
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
  }

  .main-stat-value {
    font-family: var(--font-mono);
    font-size: 3.5rem;
    line-height: 1;
    font-weight: 400;
    letter-spacing: -0.03em;
    margin-bottom: 0.5rem;
  }

  .main-stat-sub {
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--c-text-muted);
    margin-bottom: 3rem;
  }

  /* Country List */
  .country-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 0.85rem;
  }

  .country-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .legend-box {
    width: 8px;
    height: 8px;
    flex-shrink: 0;
  }

  .country-code {
    width: 24px;
    color: var(--c-text-main);
    font-weight: 500;
  }

  .country-val {
    flex-grow: 1;
    text-align: right;
  }

  .country-rate {
    color: var(--c-text-muted);
    width: 80px;
    text-align: right;
  }

  /* Map Visualization */
  .map-container {
    flex-grow: 1;
    height: 500px;
    margin-left: 100px; /* Offset for text */
    position: relative;
    overflow: hidden;
    /* Mask to fade out edges if needed */
  }

  .dot-grid {
    display: grid;
    grid-template-columns: repeat(120, 1fr); /* High resolution grid */
    gap: 2px;
    width: 100%;
    height: 100%;
  }

  .dot {
    width: 2px;
    height: 2px;
    background-color: var(--color-dot-base);
    border-radius: 50%;
  }

  /* Active dots simulate landmass/activity */
  .dot.active {
    width: 3px;
    height: 3px;
  }

  /* --- Bento Grid Stats --- */
  .bento-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-top: 2rem;
  }

  .stat-card {
    background: var(--c-card-bg);
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 140px;
    position: relative;
  }

  .stat-card.wide {
    grid-column: span 1;
  }
  
  /* Layout adjustment for the specific image layout:
     Row 1: Total Deployments (1), Firewall (1), Bot Management (1)
     Row 2: AI Gateway (1), Firewall details (merged?), Cache (1)
     Actually image shows: 
     [Total Deployments] [Firewall Actions (Wide?)] [Bot Management]
     [AI Gateway]        [      ...             ] [Cache]
     Let's approximate nicely.
  */

  .card-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--c-text-sub);
    letter-spacing: 0.02em;
    margin-bottom: 12px;
  }

  .card-value {
    font-family: var(--font-mono);
    font-size: 2rem;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }

  .card-sub-row {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--c-text-sub);
    margin-top: 4px;
    border-top: 1px solid rgba(0,0,0,0.05);
    padding-top: 8px;
  }
  
  .card-sub-row span:last-child {
    color: var(--c-text-main);
  }

  /* Specific Helpers */
  .text-blue { background-color: var(--color-us); }
  .text-yellow { background-color: var(--color-de); }
  .text-red { background-color: var(--color-br); }
  
  .dot-us { background-color: var(--color-us) !important; opacity: 0.8; }
  .dot-eu { background-color: var(--color-br) !important; opacity: 0.8; } /* Using Red for EU mix */
  .dot-asia { background-color: var(--color-de) !important; opacity: 0.8; }
  .dot-sa { background-color: var(--color-us) !important; opacity: 0.6; }

  /* Responsive */
  @media (max-width: 1000px) {
    .bento-grid { grid-template-columns: 1fr; }
    .hero-section { flex-direction: column; }
    .map-container { margin-left: 0; width: 100%; height: 300px; margin-top: 2rem; }
    .hero-stats { position: relative; max-width: 100%; }
  }
`;

// --- Data & Components ---

const countryData = [
  {
    code: 'US',
    count: '40,778,124,127',
    rate: '163,949/s',
    color: 'var(--color-us)',
  },
  {
    code: 'DE',
    count: '6,211,629,581',
    rate: '23,135/s',
    color: 'var(--color-de)',
  },
  {
    code: 'GB',
    count: '4,952,175,023',
    rate: '18,300/s',
    color: 'var(--color-gb)',
  },
  {
    code: 'IN',
    count: '4,357,555,546',
    rate: '18,475/s',
    color: 'var(--color-in)',
  },
  {
    code: 'BR',
    count: '3,933,111,540',
    rate: '12,840/s',
    color: 'var(--color-br)',
  },
  {
    code: 'SG',
    count: '3,807,132,352',
    rate: '15,369/s',
    color: 'var(--color-sg)',
  },
  {
    code: 'JP',
    count: '3,690,514,788',
    rate: '15,207/s',
    color: 'var(--color-jp)',
  },
];

// Generates a dot grid map
const DotMap = () => {
  // Config
  const cols = 100;
  const rows = 45;
  const totalDots = cols * rows;

  const dots = useMemo(() => {
    return Array.from({ length: totalDots }).map((_, i) => {
      const x = i % cols;
      const y = Math.floor(i / cols);

      // Simple logic to approximate world map shapes (active dots)
      // This is a rough approximation of coordinates for continents on a 100x45 grid
      let isActive = false;
      let regionClass = '';

      // North America (US/Canada)
      if (x > 15 && x < 35 && y > 5 && y < 20) {
        if (Math.random() > 0.6) {
          isActive = true;
          regionClass = 'dot-us';
        }
      }
      // South America
      else if (x > 25 && x < 35 && y > 25 && y < 40) {
        if (Math.random() > 0.7) {
          isActive = true;
          regionClass = 'dot-sa';
        }
      }
      // Europe
      else if (x > 45 && x < 60 && y > 5 && y < 15) {
        if (Math.random() > 0.4) {
          isActive = true;
          regionClass = 'dot-eu';
        }
      }
      // Africa
      else if (x > 45 && x < 60 && y > 18 && y < 35) {
        if (Math.random() > 0.8) isActive = true; // Less active
      }
      // Asia
      else if (x > 65 && x < 90 && y > 5 && y < 25) {
        if (Math.random() > 0.6) {
          isActive = true;
          regionClass = 'dot-asia';
        }
      }
      // Australia
      else if (x > 75 && x < 90 && y > 30 && y < 40) {
        if (Math.random() > 0.75) isActive = true;
      }

      // Base noise to make it look like a map outline
      if (!isActive && Math.random() > 0.96) isActive = true;

      return (
        <div
          key={i}
          className={`dot ${isActive ? 'active' : ''} ${regionClass}`}
        />
      );
    });
  }, []);

  return (
    <div
      className="dot-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {dots}
    </div>
  );
};

const Dashboard = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-container">
        {/* Header */}
        <div className="header">
          Black Friday - Cyber Monday
          <br />
          [11.28.25 - 12.01.25]
        </div>

        {/* Hero Section */}
        <div className="hero-section">
          {/* Overlay Stats */}
          <div className="hero-stats">
            <div>
              <div className="main-stat-label">Total Requests</div>
              <div className="main-stat-value">115,842,928,055</div>
              <div className="main-stat-sub">462,454/s</div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <div className="main-stat-label" style={{ marginBottom: '1rem' }}>
                Top Countries by Requests
              </div>
              <div className="country-list">
                {countryData.map((c) => (
                  <div key={c.code} className="country-row">
                    <div
                      className="legend-box"
                      style={{ backgroundColor: c.color }}
                    ></div>
                    <div className="country-code">{c.code}</div>
                    <div className="country-val">{c.count}</div>
                    <div className="country-rate">{c.rate}</div>
                  </div>
                ))}
                <div
                  className="country-row"
                  style={{ marginTop: '8px', fontSize: '0.75rem' }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderBottom: '6px solid black',
                      marginRight: '4px',
                    }}
                  ></div>
                  <span>19 Vercel Regions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Visualization */}
          <div className="map-container">
            <DotMap />
          </div>
        </div>

        {/* Bottom Bento Grid */}
        <div className="bento-grid">
          {/* Total Deployments */}
          <div className="stat-card">
            <div>
              <div className="card-label">Total Deployments</div>
              <div className="card-value">6,120,721</div>
            </div>
          </div>

          {/* Firewall Actions */}
          <div className="stat-card" style={{ gridColumn: 'span 2' }}>
            {' '}
            {/* Simulating the wider central block */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '50%' }}>
                <div className="card-label">Firewall Actions</div>
                <div className="card-value">7,507,919,657</div>
              </div>
              <div
                style={{
                  width: '45%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  gap: '4px',
                }}
              >
                <div className="card-sub-row">
                  <span>SYSTEM BLOCKS</span>
                  <span>1,398,332,137 &nbsp; 5,178/s</span>
                </div>
                <div className="card-sub-row">
                  <span>SYSTEM CHALLENGES</span>
                  <span>3,171,570,969 12,532/s</span>
                </div>
                <div className="card-sub-row">
                  <span>CUSTOM WAF BLOCKS</span>
                  <span>328,813,934 &nbsp; 1,153/s</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Gateway */}
          <div className="stat-card">
            <div className="card-label">AI Gateway</div>
            <div style={{ marginTop: 'auto' }}>
              <div className="card-sub-row">
                <span>REQUESTS</span>
                <span>24,088,351</span>
              </div>
            </div>
          </div>

          {/* Bot Management (Moved here to fit grid logic) */}
          <div className="stat-card">
            <div className="card-label">Bot Management</div>
            <div
              style={{
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div className="card-sub-row">
                <span>BOTS BLOCKED</span>
                <span>415,721,372</span>
              </div>
              <div className="card-sub-row">
                <span>HUMANS VERIFIED</span>
                <span>2,408,343,845</span>
              </div>
            </div>
          </div>

          {/* Cache */}
          <div className="stat-card">
            <div>
              <div className="card-label">Cache</div>
              <div className="card-value" style={{ fontSize: '1.75rem' }}>
                78,952,925,266
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--c-text-sub)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Cache hits served
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
