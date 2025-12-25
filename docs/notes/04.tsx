import {
  Check,
  FileText,
  MoreHorizontal,
  Pause,
  Play,
  Trash2,
} from 'lucide-react';
import React from 'react';

// --- CSS Styles (Injected for portability) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --c-bg: #f8fafc;        /* Outer Background */
    --c-canvas: #ffffff;    /* Component Background */
    --c-border: #cbd5e1;    /* Slate-300 */
    --c-text-main: #0f172a; /* Slate-900 */
    --c-text-sub: #64748b;  /* Slate-500 */
    
    /* Semantic Status Colors (Muted/Technical) */
    --s-blue: #3b82f6;      /* In Progress */
    --s-green: #22c55e;     /* Completed */
    --s-orange: #f59e0b;    /* Pending */
    --s-red: #ef4444;       /* Blocked */
    
    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  body {
    background-color: var(--c-bg);
    color: var(--c-text-main);
    font-family: var(--font-ui);
    padding: 2rem;
  }

  /* Table Container */
  .blueprint-table-container {
    background: var(--c-canvas);
    border: 1px solid var(--c-border);
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    box-shadow: none; /* Flat style */
  }

  /* Technical Header decoration */
  .blueprint-table-container::before {
    content: "DATA_GRID_VIEW // V.2.0.4";
    position: absolute;
    top: -20px;
    left: 0;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--c-text-sub);
    letter-spacing: 0.05em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  /* Header Styles */
  thead th {
    background: var(--c-bg);
    border-bottom: 2px solid var(--c-text-main);
    padding: 12px 16px;
    font-family: var(--font-ui);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c-text-sub);
  }

  /* Row Styles */
  tbody tr {
    border-bottom: 1px solid var(--c-border);
    transition: background 0.1s;
  }

  tbody tr:last-child {
    border-bottom: none;
  }

  tbody tr:hover {
    background: #f1f5f9;
  }

  td {
    padding: 16px;
    font-size: 0.875rem;
    vertical-align: middle;
  }

  /* Column Specifics */
  .col-title {
    font-weight: 600;
    color: var(--c-text-main);
    width: 25%;
  }

  .col-assignee {
    color: var(--c-text-sub);
    width: 15%;
  }

  .col-date {
    font-family: var(--font-mono);
    color: var(--c-text-sub);
    font-size: 0.8rem;
    width: 12%;
  }

  .col-notes {
    color: var(--c-text-sub);
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Status Badges - Flat Style */
  .status-badge {
    display: inline-block;
    padding: 4px 8px;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    border: 1px solid currentColor;
    background: transparent;
    font-weight: 600;
    min-width: 90px;
    text-align: center;
  }

  .status-badge.in-progress { color: var(--s-blue); background: #eff6ff; border-color: var(--s-blue); }
  .status-badge.completed { color: var(--s-green); background: #f0fdf4; border-color: var(--s-green); }
  .status-badge.pending { color: var(--s-orange); background: #fffbeb; border-color: var(--s-orange); }
  .status-badge.blocked { color: var(--s-red); background: #fef2f2; border-color: var(--s-red); }

  /* Action Buttons */
  .actions-cell {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--c-border);
    background: var(--c-canvas);
    color: var(--c-text-sub);
    cursor: pointer;
    transition: all 0.15s;
  }

  .action-btn:hover {
    border-color: var(--c-text-main);
    color: var(--c-text-main);
    background: #f1f5f9;
  }

  .action-btn.delete:hover {
    border-color: var(--s-red);
    color: var(--s-red);
  }

  .action-btn.success:hover {
    border-color: var(--s-green);
    color: var(--s-green);
  }
`;

// --- Data & Helpers ---

const data = [
  {
    id: 'TSK-001',
    title: 'Implement User Authentication',
    assignee: 'Sarah Chen',
    status: 'In Progress',
    dueDate: '2024-03-25',
    notes: 'OAuth 2.0 integration with Google and GitHub providers',
    actions: ['pause', 'check', 'delete', 'doc'],
  },
  {
    id: 'TSK-002',
    title: 'Design Dashboard UI',
    assignee: 'Michael Torres',
    status: 'Completed',
    dueDate: '2024-03-20',
    notes: 'Finalize dashboard layout with responsive grid',
    actions: ['delete', 'doc'],
  },
  {
    id: 'TSK-003',
    title: 'API Performance Optimization',
    assignee: 'Emma Rodriguez',
    status: 'Pending',
    dueDate: '2024-03-22',
    notes: 'Reduce API response time by implementing Redis caching',
    actions: ['play', 'delete', 'doc'],
  },
  {
    id: 'TSK-004',
    title: 'Write Unit Tests',
    assignee: 'James Wilson',
    status: 'In Progress',
    dueDate: '2024-03-28',
    notes: 'Achieve 80% code coverage for authentication modules',
    actions: ['pause', 'check', 'delete', 'doc'],
  },
  {
    id: 'TSK-005',
    title: 'Database Migration',
    assignee: 'Olivia Martinez',
    status: 'Blocked',
    dueDate: '2024-03-24',
    notes: 'Waiting for infrastructure team approval on schema',
    actions: ['play', 'delete', 'doc'],
  },
  {
    id: 'TSK-006',
    title: 'Update Documentation',
    assignee: 'Lucas Anderson',
    status: 'Pending',
    dueDate: '2024-03-30',
    notes: 'Document new API endpoints and auth flows',
    actions: ['play', 'delete', 'doc'],
  },
  {
    id: 'TSK-007',
    title: 'Security Audit',
    assignee: 'Sophia Taylor',
    status: 'Completed',
    dueDate: '2024-03-19',
    notes: 'Conducted comprehensive security review of v1.0',
    actions: ['delete', 'doc'],
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case 'In Progress':
      return 'in-progress';
    case 'Completed':
      return 'completed';
    case 'Pending':
      return 'pending';
    case 'Blocked':
      return 'blocked';
    default:
      return '';
  }
};

// --- Components ---

const StatusBadge = ({ status }) => (
  <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>
);

const ActionButton = ({ type }) => {
  let Icon = MoreHorizontal;
  let className = 'action-btn';

  switch (type) {
    case 'pause':
      Icon = Pause;
      break;
    case 'play':
      Icon = Play;
      break;
    case 'check':
      Icon = Check;
      className += ' success';
      break;
    case 'delete':
      Icon = Trash2;
      className += ' delete';
      break;
    case 'doc':
      Icon = FileText;
      break;
    default:
      break;
  }

  return (
    <button className={className} title={type}>
      <Icon size={14} strokeWidth={2} />
    </button>
  );
};

const TaskTable = () => {
  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Notes</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="col-title">{row.title}</td>
                <td className="col-assignee">{row.assignee}</td>
                <td>
                  <StatusBadge status={row.status} />
                </td>
                <td className="col-date">{row.dueDate}</td>
                <td className="col-notes" title={row.notes}>
                  {row.notes}
                </td>
                <td>
                  <div className="actions-cell">
                    {row.actions.map((action, idx) => (
                      <ActionButton
                        key={`${row.id}-${action}-${idx}`}
                        type={action}
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskTable;
