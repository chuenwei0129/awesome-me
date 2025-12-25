import React from 'react';

// --- CSS Styles ---
const styles = `
  :root {
    --c-bg: #f8fafc;
    --c-canvas: #ffffff;
    --c-border: #cbd5e1;
    --c-text-main: #0f172a;
    --c-text-sub: #64748b;
    --font-ui: 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  }

  .blueprint-demo-area {
    font-family: var(--font-ui);
    padding: 3rem;
    background-color: var(--c-bg);
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: flex-start;
  }

  /* --- BREADCRUMB CONTAINER --- */
  .blueprint-breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--c-text-sub);
    padding: 8px 0;
  }

  /* Root Label (Optional prefix) */
  .blueprint-breadcrumb-prefix {
    font-weight: 700;
    color: var(--c-text-main);
    margin-right: 8px;
    user-select: none;
  }

  /* List of items */
  .breadcrumb-list {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .breadcrumb-item {
    display: flex;
    align-items: center;
  }

  /* --- LINK STYLES --- */
  .breadcrumb-link {
    text-decoration: none;
    color: var(--c-text-sub);
    transition: color 0s;
    position: relative;
    cursor: pointer;
  }

  .breadcrumb-link:hover {
    color: var(--c-text-main);
    text-decoration: underline;
  }

  /* --- SEPARATOR --- */
  .breadcrumb-separator {
    margin: 0 8px;
    color: #94a3b8; /* Lighter slate */
    user-select: none;
    font-weight: normal;
  }

  /* --- ACTIVE / CURRENT ITEM --- */
  .breadcrumb-current {
    color: var(--c-text-main);
    font-weight: 700;
    background: #e2e8f0;
    padding: 0 4px;
    border-radius: 0;
  }

  /* Variant: "Folder" Style */
  .style-folder .breadcrumb-current {
    background: none;
    border-bottom: 2px solid var(--c-text-main);
  }
`;

const BlueprintBreadcrumb = ({
  items = [],
  separator = '/',
  prefix = 'PATH:',
}) => {
  return (
    <nav aria-label="Breadcrumb" className="blueprint-breadcrumb">
      {/* Optional Technical Prefix */}
      {prefix && <span className="blueprint-breadcrumb-prefix">{prefix}</span>}

      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.id || index} className="breadcrumb-item">
              {/* Render Link or Text */}
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || '#'}
                  className="breadcrumb-link"
                  onClick={(e) => {
                    if (!item.href) e.preventDefault();
                    if (item.onClick) item.onClick(e);
                  }}
                >
                  {item.label}
                </a>
              )}

              {/* Render Separator (unless last) */}
              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// --- Usage Example ---
export default function App() {
  const pathData = [
    { label: 'ROOT', href: '/dashboard' },
    { label: 'SYSTEMS', href: '/systems' },
    { label: 'NET_CONFIG', href: '/systems/network' },
    { label: 'IPV4_SETTINGS', active: true }, // Last item is implicitly active
  ];

  const fileData = [
    { label: '~', href: '/' },
    { label: 'usr', href: '/usr' },
    { label: 'bin', href: '/usr/bin' },
    { label: 'local_mount' },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="blueprint-demo-area">
        {/* Style 1: Standard Technical Path */}
        <div>
          <span
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '0.7rem',
              color: '#64748b',
            }}
          >
            STYLE: STANDARD
          </span>
          <BlueprintBreadcrumb items={pathData} separator="//" />
        </div>

        {/* Style 2: Command Line Style */}
        <div>
          <span
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '0.7rem',
              color: '#64748b',
            }}
          >
            STYLE: TERMINAL
          </span>
          <BlueprintBreadcrumb items={fileData} separator=">" prefix="PWD:" />
        </div>

        {/* Style 3: Minimal Hierarchy */}
        <div>
          <span
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '0.7rem',
              color: '#64748b',
            }}
          >
            STYLE: MINIMAL
          </span>
          <nav className="blueprint-breadcrumb style-folder">
            <span className="blueprint-breadcrumb-prefix">REF:</span>
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <a href="#" className="breadcrumb-link">
                  Main_Deck
                </a>
                <span className="breadcrumb-separator">→</span>
              </li>
              <li className="breadcrumb-item">
                <a href="#" className="breadcrumb-link">
                  Engineering
                </a>
                <span className="breadcrumb-separator">→</span>
              </li>
              <li className="breadcrumb-item">
                <span className="breadcrumb-current">Schematic_View</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </>
  );
}
