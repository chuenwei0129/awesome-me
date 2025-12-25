import React, { useEffect, useState } from 'react';

// --- GLOBAL STYLES (Injected) ---
const styles = `
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --c-accent: #0f172a;
    --font-ui: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: var(--font-ui);
    background-color: var(--c-bg);
    color: var(--c-text-main);
  }

  /* --- LAYOUT SHELL --- */
  .app-shell {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  /* --- SIDEBAR --- */
  .sidebar {
    width: 260px;
    background: var(--c-canvas);
    border-right: 1px solid var(--c-border);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .brand-block {
    height: 60px;
    border-bottom: 1px solid var(--c-border);
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-weight: 900;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
    background: #f1f5f9;
  }
  .brand-icon {
    width: 20px; height: 20px; background: var(--c-text-main); margin-right: 12px;
  }

  .nav-group { padding: 20px 0; }
  .nav-label {
    padding: 0 20px 8px;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--c-text-sub);
    text-transform: uppercase;
  }

  .nav-item {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--c-text-sub);
    border-left: 3px solid transparent;
  }
  .nav-item:hover { background: #f8fafc; color: var(--c-text-main); }
  .nav-item.active {
    background: #f1f5f9;
    color: var(--c-text-main);
    border-left-color: var(--c-text-main);
    font-weight: 700;
  }

  /* --- MAIN CONTENT --- */
  .main-viewport {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .top-header {
    height: 60px;
    background: var(--c-canvas);
    border-bottom: 1px solid var(--c-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }

  .breadcrumbs {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--c-text-sub);
  }
  .crumb-active { color: var(--c-text-main); font-weight: bold; }

  .user-status {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .clock-display {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    background: #f1f5f9;
    padding: 4px 8px;
    border: 1px solid var(--c-border);
  }

  /* --- DASHBOARD GRID --- */
  .content-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 30px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* --- WIDGET CARD --- */
  .b-card {
    background: var(--c-canvas);
    border: 1px solid var(--c-border);
    position: relative;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  .b-card::after { /* Corner Mark */
    content: ''; position: absolute; top: -1px; right: -1px;
    width: 6px; height: 6px; border-top: 2px solid var(--c-text-main); border-right: 2px solid var(--c-text-main);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--c-border);
  }
  .card-title {
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .card-id {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--c-text-sub);
  }

  /* Columns Spanning */
  .col-12 { grid-column: span 12; }
  .col-8  { grid-column: span 8; }
  .col-4  { grid-column: span 4; }
  .col-3  { grid-column: span 3; }

  /* --- COMPONENTS RE-IMPLEMENTATION (Simplified) --- */
  
  /* Stat Big Number */
  .stat-value {
    font-family: var(--font-mono);
    font-size: 2.5rem;
    font-weight: 500;
    color: var(--c-text-main);
  }
  .stat-label {
    font-size: 0.75rem; color: var(--c-text-sub); text-transform: uppercase; margin-top: 4px;
  }
  .trend-up { color: #16a34a; font-size: 0.8rem; }

  /* Table Style */
  .b-table { width: 100%; border-collapse: collapse; font-family: var(--font-mono); font-size: 0.8rem; }
  .b-table th { text-align: left; padding: 8px; border-bottom: 1px solid var(--c-text-main); color: var(--c-text-sub); font-weight: normal; }
  .b-table td { padding: 10px 8px; border-bottom: 1px solid var(--c-border); }
  .status-badge {
    display: inline-block; padding: 2px 6px; font-size: 0.7rem; border: 1px solid var(--c-border); text-transform: uppercase;
  }
  .status-badge.ok { background: #f0fdf4; border-color: #16a34a; color: #16a34a; }
  .status-badge.warn { background: #fffbeb; border-color: #d97706; color: #d97706; }

  /* Button */
  .btn-action {
    background: var(--c-text-main); color: #fff; border: none; padding: 8px 16px; 
    font-family: var(--font-mono); font-size: 0.75rem; cursor: pointer;
  }
`;

// --- MOCK DATA ---
const modules = [
  {
    id: 'M-01',
    name: 'Cooling_Sys_A',
    status: 'NOMINAL',
    load: '32%',
    uptime: '14d 2h',
  },
  {
    id: 'M-02',
    name: 'Power_Grid_Main',
    status: 'WARNING',
    load: '89%',
    uptime: '0d 4h',
  },
  {
    id: 'M-03',
    name: 'Data_Ingest_Node',
    status: 'NOMINAL',
    load: '12%',
    uptime: '42d 1h',
  },
  {
    id: 'M-04',
    name: 'Auth_Gateway',
    status: 'NOMINAL',
    load: '45%',
    uptime: '2d 9h',
  },
];

const Dashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="app-shell">
      <style>{styles}</style>

      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-icon"></div>
          <span>NEXUS_CORE</span>
        </div>

        <div className="nav-group">
          <div className="nav-label">Main_Deck</div>
          <div className="nav-item active">:: Dashboard</div>
          <div className="nav-item">:: Topology View</div>
          <div className="nav-item">:: Active Alerts (2)</div>
        </div>

        <div className="nav-group">
          <div className="nav-label">Configuration</div>
          <div className="nav-item">:: System Params</div>
          <div className="nav-item">:: User Access</div>
          <div className="nav-item">:: Logs / Audit</div>
        </div>
      </aside>

      {/* 2. MAIN VIEWPORT */}
      <main className="main-viewport">
        {/* Header */}
        <header className="top-header">
          <div className="breadcrumbs">
            ROOT / SYSTEMS / <span className="crumb-active">OVERVIEW</span>
          </div>
          <div className="user-status">
            <div className="clock-display">
              {time.toLocaleTimeString('en-US', { hour12: false })} UTC
            </div>
            {/* Avatar Component Simplified */}
            <div
              style={{
                width: 32,
                height: 32,
                background: '#cbd5e1',
                border: '1px solid #0f172a',
              }}
            ></div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="content-scroll">
          <div className="grid-container">
            {/* Row 1: KPI Stats */}
            <div className="b-card col-3">
              <div className="card-header">
                <span className="card-title">System Load</span>
                <span className="card-id">IDX:01</span>
              </div>
              <div className="stat-value">42.8%</div>
              <div className="stat-label">Total Capacity</div>
            </div>

            <div className="b-card col-3">
              <div className="card-header">
                <span className="card-title">Network I/O</span>
                <span className="card-id">IDX:02</span>
              </div>
              <div className="stat-value">
                1.2<span style={{ fontSize: '1rem' }}>TB</span>
              </div>
              <div className="stat-label">Daily Throughput</div>
            </div>

            <div className="b-card col-3">
              <div className="card-header">
                <span className="card-title">Active Nodes</span>
                <span className="card-id">IDX:03</span>
              </div>
              <div className="stat-value">
                84
                <span style={{ fontSize: '1rem', color: '#94a3b8' }}>/100</span>
              </div>
              <div className="stat-label">Cluster Health</div>
            </div>

            <div className="b-card col-3">
              <div className="card-header">
                <span className="card-title">Status</span>
                <span className="card-id">IDX:04</span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    style={{ width: 8, height: 8, background: '#16a34a' }}
                  ></div>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    CORE_SERVICES: OK
                  </span>
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <div
                    style={{ width: 8, height: 8, background: '#d97706' }}
                  ></div>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    BACKUP_LINK: DEG
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Main Table + Control Panel */}
            <div className="b-card col-8">
              <div className="card-header">
                <span className="card-title">Module Status Manifest</span>
                <span className="card-id">REF: TBL-882</span>
              </div>
              <table className="b-table">
                <thead>
                  <tr>
                    <th>MODULE_ID</th>
                    <th>PROCESS_NAME</th>
                    <th>LOAD</th>
                    <th>UPTIME</th>
                    <th>STATE</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m) => (
                    <tr key={m.id}>
                      <td>{m.id}</td>
                      <td>{m.name}</td>
                      <td>{m.load}</td>
                      <td>{m.uptime}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            m.status === 'NOMINAL' ? 'ok' : 'warn'
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="b-card col-4">
              <div className="card-header">
                <span className="card-title">Quick Actions</span>
                <span className="card-id">REF: ACT-00</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px dashed #cbd5e1',
                    paddingBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '0.8rem' }}>Emergency Stop</span>
                  {/* Simplified Switch */}
                  <div
                    style={{
                      width: 40,
                      height: 20,
                      border: '1px solid #0f172a',
                      display: 'flex',
                    }}
                  >
                    <div style={{ width: '50%', background: '#fff' }}></div>
                    <div style={{ width: '50%', background: '#0f172a' }}></div>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px dashed #cbd5e1',
                    paddingBottom: '8px',
                  }}
                >
                  <span style={{ fontSize: '0.8rem' }}>Maintenance Mode</span>
                  <div
                    style={{
                      width: 40,
                      height: 20,
                      border: '1px solid #0f172a',
                      display: 'flex',
                    }}
                  >
                    <div style={{ width: '50%', background: '#0f172a' }}></div>
                    <div style={{ width: '50%', background: '#fff' }}></div>
                  </div>
                </div>

                <div style={{ marginTop: '10px' }}>
                  <button className="btn-action" style={{ width: '100%' }}>
                    INITIALIZE_DIAGNOSTIC()
                  </button>
                </div>
              </div>
            </div>

            {/* Row 3: Logs */}
            <div className="b-card col-12">
              <div className="card-header">
                <span className="card-title">System Activity Log</span>
                <span className="card-id">REF: LOG-SYS</span>
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.75rem',
                  color: '#64748b',
                  height: '100px',
                  overflowY: 'hidden',
                }}
              >
                <div>[10:42:01] INFO :: Daemon process started on PID 4421</div>
                <div>
                  [10:42:05] WARN :: High latency detected on /dev/eth0 (102ms)
                </div>
                <div>[10:42:12] INFO :: User "Admin" authenticated via SSH</div>
                <div>
                  [10:43:00] INFO :: Scheduled backup completed successfully
                  (3.2GB)
                </div>
                <div>
                  [10:45:22] ERROR :: Connection timeout to Node_05
                  (Retrying...)
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
