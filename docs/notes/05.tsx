import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
} from 'lucide-react';
import React, { useState } from 'react';

// --- CSS Styles (Injected for portability) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    
    /* Semantic Colors */
    --s-green: #22c55e;
    --s-blue: #3b82f6;
    --s-orange: #f59e0b;
    --s-red: #ef4444;

    --font-ui: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  body {
    background-color: var(--c-bg);
    color: var(--c-text-main);
    font-family: var(--font-ui);
    padding: 2rem;
  }

  /* Main Container */
  .blueprint-dt-container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* --- Top Controls --- */
  .dt-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dt-length-menu {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--c-text-sub);
  }

  /* Custom Dropdown */
  .custom-select-wrapper {
    position: relative;
    width: 70px;
  }

  .custom-select-trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 8px;
    background: var(--c-canvas);
    border: 1px solid var(--c-border);
    cursor: pointer;
    font-family: var(--font-mono);
    user-select: none;
  }

  .custom-select-trigger:hover {
    border-color: var(--c-text-main);
  }

  .custom-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--c-canvas);
    border: 1px solid var(--c-border);
    border-top: none;
    z-index: 10;
    display: none;
  }

  .custom-options.open {
    display: block;
  }

  .custom-option {
    padding: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }

  .custom-option:hover {
    background: #f1f5f9;
  }

  .custom-option.selected {
    background: #f1f5f9;
    font-weight: 600;
  }

  /* Search Box */
  .dt-search {
    position: relative;
  }

  .dt-search input {
    padding: 8px 12px 8px 36px;
    border: 1px solid var(--c-border);
    font-family: var(--font-mono);
    font-size: 0.875rem;
    width: 200px;
    outline: none;
  }

  .dt-search input:focus {
    border-color: var(--c-text-main);
  }

  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--c-text-sub);
    pointer-events: none;
  }

  /* --- Table --- */
  .dt-table-wrapper {
    background: var(--c-canvas);
    border: 1px solid var(--c-border);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th {
    padding: 12px 16px;
    border-bottom: 2px solid var(--c-text-main);
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--c-text-sub);
    font-weight: 700;
  }

  td {
    padding: 16px;
    border-bottom: 1px solid var(--c-border);
    font-size: 0.9rem;
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  /* Checkbox - Custom Square */
  .dt-checkbox {
    width: 16px;
    height: 16px;
    border: 1px solid var(--c-border);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: var(--c-canvas);
  }

  .dt-checkbox.checked {
    background: var(--c-text-main);
    border-color: var(--c-text-main);
    color: var(--c-canvas);
  }

  /* Status Badges */
  .status-tag {
    display: inline-block;
    padding: 2px 8px;
    border: 1px solid currentColor;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
    min-width: 80px;
    text-align: center;
  }

  .status-tag.completed { color: var(--s-green); background: #f0fdf4; border-color: var(--s-green); }
  .status-tag.processing { color: var(--s-blue); background: #eff6ff; border-color: var(--s-blue); }
  .status-tag.pending { color: var(--s-orange); background: #fffbeb; border-color: var(--s-orange); }
  .status-tag.cancelled { color: var(--s-red); background: #fef2f2; border-color: var(--s-red); }

  .amount-cell {
    font-family: var(--font-mono);
    font-weight: 500;
  }

  .action-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--c-text-sub);
    padding: 4px;
  }

  .action-btn:hover {
    color: var(--c-text-main);
  }

  /* --- Footer --- */
  .dt-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--c-text-sub);
    font-size: 0.875rem;
  }

  .dt-pagination {
    display: flex;
    gap: -1px; /* Overlap borders */
  }

  .page-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--c-border);
    background: var(--c-canvas);
    cursor: pointer;
    margin-left: -1px;
    color: var(--c-text-main);
  }

  .page-btn:first-child { margin-left: 0; }
  
  .page-btn.active {
    background: var(--c-text-main);
    color: var(--c-canvas);
    border-color: var(--c-text-main);
    z-index: 1;
  }

  .page-btn:hover:not(.active) {
    background: #f1f5f9;
  }
`;

// --- Data ---
const tableData = [
  {
    id: 1,
    name: 'Website Redesign',
    date: 'Jan 15, 2024',
    status: 'Completed',
    amount: '$2,500',
  },
  {
    id: 2,
    name: 'Mobile App MVP',
    date: 'Feb 3, 2024',
    status: 'Processing',
    amount: '$4,200',
  },
  {
    id: 3,
    name: 'Brand Identity',
    date: 'Feb 18, 2024',
    status: 'Pending',
    amount: '$8,750',
  },
  {
    id: 4,
    name: 'Marketing Campaign',
    date: 'Mar 5, 2024',
    status: 'Completed',
    amount: '$1,800',
  },
  {
    id: 5,
    name: 'Analytics Dashboard',
    date: 'Mar 22, 2024',
    status: 'Cancelled',
    amount: '$3,400',
  },
  {
    id: 6,
    name: 'E-commerce Platform',
    date: 'Apr 8, 2024',
    status: 'Processing',
    amount: '$5,600',
  },
  {
    id: 7,
    name: 'API Integration',
    date: 'Apr 25, 2024',
    status: 'Pending',
    amount: '$12,000',
  },
  {
    id: 8,
    name: 'Cloud Migration',
    date: 'May 10, 2024',
    status: 'Completed',
    amount: '$3,200',
  },
];

const entriesOptions = [5, 10, 20];

// --- Components ---

const CustomCheckbox = ({ checked, onChange }) => (
  <div className={`dt-checkbox ${checked ? 'checked' : ''}`} onClick={onChange}>
    {checked && <Check size={12} strokeWidth={3} />}
  </div>
);

const BlueprintTable = () => {
  const [entries, setEntries] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData.map((r) => r.id));
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-dt-container">
        {/* Controls */}
        <div className="dt-controls">
          <div className="dt-length-menu">
            <span>Show</span>
            <div className="custom-select-wrapper">
              <div
                className="custom-select-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{entries}</span>
                <ChevronDown size={14} />
              </div>
              <div className={`custom-options ${isDropdownOpen ? 'open' : ''}`}>
                {entriesOptions.map((opt) => (
                  <div
                    key={opt}
                    className={`custom-option ${
                      entries === opt ? 'selected' : ''
                    }`}
                    onClick={() => {
                      setEntries(opt);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {opt}
                    {entries === opt && <Check size={12} />}
                  </div>
                ))}
              </div>
            </div>
            <span>entries</span>
          </div>

          <div className="dt-search">
            <Search size={14} className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        {/* Table */}
        <div className="dt-table-wrapper">
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <CustomCheckbox
                    checked={
                      selectedRows.length === tableData.length &&
                      tableData.length > 0
                    }
                    onChange={toggleAll}
                  />
                </th>
                <th>Project Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th style={{ width: '40px' }}></th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <CustomCheckbox
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRow(row.id)}
                    />
                  </td>
                  <td style={{ fontWeight: 600 }}>{row.name}</td>
                  <td
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--c-text-sub)',
                    }}
                  >
                    {row.date}
                  </td>
                  <td>
                    <span className={`status-tag ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="amount-cell">{row.amount}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="action-btn">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="dt-footer">
          <div>
            Showing 1 to {tableData.length} of {tableData.length} entries
          </div>
          <div className="dt-pagination">
            <div className="page-btn">
              <ChevronLeft size={16} />
            </div>
            <div className="page-btn active">1</div>
            <div className="page-btn">
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlueprintTable;
