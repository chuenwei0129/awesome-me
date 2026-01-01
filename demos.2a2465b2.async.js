(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[2433],{15242:function(r,t,a){"use strict";a.r(t);var l=a(27424),o=a.n(l),s=a(41352),p=a(73510),x=a(45977),d=a(37921),f=a(67294),n=a(85893),E=function(){var M=(0,f.useState)("warning input"),g=o()(M,2),b=g[0],_=g[1],w=(0,f.useState)(""),v=o()(w,2),T=v[0],e=v[1],O=function(){_("")};return(0,n.jsxs)("div",{className:"diagram-wrapper",children:[(0,n.jsxs)("div",{className:"diagram-canvas",children:[(0,n.jsxs)("header",{className:"blueprint-header",children:[(0,n.jsxs)("div",{className:"header-main",children:[(0,n.jsx)("h1",{className:"title",children:"INPUT_STATES"}),(0,n.jsx)("span",{className:"subtitle",children:"FIG 2.1 // FORM CONTROL VARIANTS"})]}),(0,n.jsxs)("div",{className:"header-meta",children:[(0,n.jsx)("span",{children:"SYS.UI.KIT"}),(0,n.jsx)("span",{children:"REV: 2024-C"})]})]}),(0,n.jsxs)("div",{className:"blueprint-grid",children:[(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"01. STATE: WARNING"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container warning-mode interactive",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",value:b,onChange:function(u){return _(u.target.value)},className:"blueprint-input",placeholder:"Type to see clear button..."})}),(0,n.jsx)("div",{className:"icon-slot",children:b.length>0&&(0,n.jsx)("div",{className:"icon-badge action-icon",onClick:O,title:"Clear input",children:(0,n.jsx)(s.Z,{size:14,strokeWidth:2})})}),(0,n.jsx)("div",{className:"status-tag",children:"WARN"})]}),(0,n.jsx)("div",{className:"dim-lines",children:(0,n.jsxs)("span",{className:"measure",children:["LEN: ",b.length," CHARS"]})})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"02. STATE: ERROR"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container error-mode interactive",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",placeholder:"Enter value...",value:T,onChange:function(u){return e(u.target.value)},className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge error",children:(0,n.jsx)(p.Z,{size:14,strokeWidth:2})})})]}),(0,n.jsxs)("div",{className:"error-message-line",children:[(0,n.jsx)("span",{className:"line-segment"}),(0,n.jsx)("span",{className:"error-text",children:"INVALID_INPUT_EXCEPTION"})]})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"03. ATTR: READ_ONLY"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container readonly-mode",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",defaultValue:"readOnly input",readOnly:!0,className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge",children:(0,n.jsx)(x.Z,{size:14,strokeWidth:2})})})]})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"04. ATTR: DISABLED"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container disabled-mode",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",defaultValue:"disabled input",disabled:!0,className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge disabled",children:(0,n.jsx)(d.Z,{size:14,strokeWidth:2})})})]})]})]}),(0,n.jsxs)("div",{className:"blueprint-footer",children:[(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box solid"})," ",(0,n.jsx)("span",{children:"ACTIVE"})]}),(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box hatch"})," ",(0,n.jsx)("span",{children:"INACTIVE"})]}),(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box error"})," ",(0,n.jsx)("span",{children:"CRITICAL"})]})]})]}),(0,n.jsx)("style",{children:`
        :root {
          --c-bg: #f8fafc;
          --c-canvas: #ffffff;
          --c-border: #cbd5e1;
          --c-text-main: #0f172a;
          --c-text-sub: #64748b;
          --c-accent-error: #ef4444; 
          --font-ui: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-mono: 'JetBrains Mono', 'Consolas', monospace;
        }

        .diagram-wrapper {
          background-color: var(--c-bg);
          padding: 40px;
          display: flex;
          justify-content: center;
          font-family: var(--font-ui);
          color: var(--c-text-main);
        }

        .diagram-canvas {
          background-color: var(--c-canvas);
          border: 1px solid var(--c-border);
          padding: 32px;
          width: 100%;
          max-width: 800px;
          box-shadow: none;
          position: relative;
        }

        /* Header */
        .blueprint-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 2px solid var(--c-text-main);
          padding-bottom: 16px;
          margin-bottom: 48px;
        }

        .title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 0;
          text-transform: uppercase;
        }

        .subtitle {
          display: block;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--c-text-sub);
          margin-top: 4px;
        }

        .header-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          text-align: right;
          color: var(--c-text-sub);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        /* Grid */
        .blueprint-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px 32px;
        }

        /* Component Block */
        .spec-block {
          position: relative;
        }

        .spec-label {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          gap: 8px;
        }

        .code {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
          font-weight: 600;
        }

        .connector-line {
          flex-grow: 1;
          height: 1px;
          background-color: var(--c-border);
        }

        /* Input Container Base */
        .input-container {
          display: flex;
          align-items: center;
          border: 1px solid var(--c-border);
          height: 40px;
          padding: 0 12px;
          position: relative;
          background: var(--c-canvas);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        /* Interactive States */
        .input-container.interactive:hover {
           border-color: var(--c-text-sub); 
           cursor: text;
        }

        .input-container.interactive:focus-within {
           border-color: var(--c-text-main); 
           box-shadow: 0 0 0 1px var(--c-text-main); 
        }

        /* Warning Mode */
        .input-container.warning-mode {
          border: 2px solid var(--c-text-main);
        }
        .input-container.warning-mode:hover,
        .input-container.warning-mode:focus-within {
           border-color: var(--c-text-main); 
           box-shadow: none; /* Already thick enough */
        }

        .input-wrapper {
          flex-grow: 1;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden; /* Contains the text properly */
        }

        .blueprint-input {
          border: none;
          outline: none;
          width: 100%;
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--c-text-main);
          background: transparent;
          /* Removed caret-color manipulation to use default native cursor */
        }

        .blueprint-input::placeholder {
          color: var(--c-text-sub);
          opacity: 0.5;
        }

        /* Icons & Slot */
        /* Fixed width slot for icons to prevent layout jumping */
        .icon-slot {
          width: 20px; 
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--c-text-sub);
          transition: color 0.2s;
        }

        .action-icon {
          cursor: pointer;
        }
        .action-icon:hover {
          color: var(--c-text-main);
        }

        .status-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          background: var(--c-text-main);
          color: var(--c-canvas);
          padding: 2px 4px;
          position: absolute;
          top: -8px;
          right: -1px;
        }

        /* 2. Error State */
        .input-container.error-mode {
          border: 1px solid var(--c-accent-error);
        }
        .input-container.error-mode:hover,
        .input-container.error-mode:focus-within {
          border-color: var(--c-accent-error);
          box-shadow: 0 0 0 1px var(--c-accent-error);
        }

        .input-container.error-mode .blueprint-input::placeholder {
            color: var(--c-accent-error);
            opacity: 0.6;
        }

        .icon-badge.error {
          color: var(--c-accent-error);
        }

        .error-message-line {
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .line-segment {
            width: 12px;
            height: 1px;
            background: var(--c-accent-error);
        }

        .error-text {
            font-family: var(--font-mono);
            font-size: 9px;
            color: var(--c-accent-error);
        }

        /* 3. ReadOnly State */
        .input-container.readonly-mode {
           border-style: dashed; 
           cursor: not-allowed;
        }
        .input-container.readonly-mode:hover {
           border-color: var(--c-border); 
        }

        /* 4. Disabled State */
        .input-container.disabled-mode {
          background-image: repeating-linear-gradient(
            45deg,
            var(--c-canvas),
            var(--c-canvas) 4px,
            #f1f5f9 4px,
            #f1f5f9 8px
          );
          color: var(--c-text-sub);
          cursor: not-allowed;
        }

        .input-container.disabled-mode .blueprint-input {
          color: var(--c-text-sub);
          cursor: not-allowed;
        }

        /* Dimensions / Technical Markings */
        .dim-lines {
          position: absolute;
          bottom: -16px;
          left: 0;
          width: 100%;
          border-left: 1px solid var(--c-border);
          border-right: 1px solid var(--c-border);
          height: 6px;
          display: flex;
          justify-content: center;
        }
        
        .dim-lines::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: var(--c-border);
        }

        .measure {
          background: var(--c-canvas);
          padding: 0 4px;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--c-text-sub);
          position: relative;
          z-index: 1;
        }

        /* Footer Legend */
        .blueprint-footer {
          margin-top: 64px;
          padding-top: 16px;
          border-top: 1px solid var(--c-border);
          display: flex;
          gap: 24px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
        }

        .box {
          width: 12px;
          height: 12px;
          border: 1px solid var(--c-border);
        }
        
        .box.solid { background: var(--c-canvas); border-color: var(--c-text-main); }
        .box.error { border-color: var(--c-accent-error); }
        .box.hatch { 
          background-image: repeating-linear-gradient(
            45deg,
            var(--c-canvas),
            var(--c-canvas) 2px,
            #cbd5e1 2px,
            #cbd5e1 4px
          ); 
        }
      `})]})};t.default=E},1101:function(r,t,a){"use strict";a.r(t);var l=a(861),o=a.n(l),s=a(27424),p=a.n(s),x=a(33587),d=a(87764),f=a(69062),n=a(14199),E=a(95440),I=a(77321),M=a(71787),g=a(12795),b=a(54976),_=a(84617),w=a(95999),v=a(67294),T=a(13973),e=a(85893),O=[{id:"M-1024",content:`Hello world. This is my first memo! #hello

> System initialized successfully.
`,timestamp:"2025-08-20T10:00:00",tags:["hello"]},{id:"M-1025",content:`And here are my **tasks**. #todo

- [x] deploy memos for myself;
- [ ] share to my friends;
- [ ] sounds good to me!`,timestamp:"2025-08-20T10:05:00",tags:["todo"]},{id:"M-1026",content:`Wow, it can be **referenced** too! REALLY GREAT!!! #features

Observed performance metrics within expected parameters.`,timestamp:"2025-08-20T12:30:00",tags:["features"]}],j=["features","hello","sponsor","todo","dev","sys"],u=`
:root {
  --c-bg: #f8fafc;        /* Outer Background */
  --c-canvas: #ffffff;    /* Diagram Background */
  --c-border: #cbd5e1;    /* Slate-300 - Sturdy borders */
  --c-border-light: #e2e8f0;
  --c-text-main: #0f172a; /* Slate-900 */
  --c-text-sub: #64748b;  /* Slate-500 */
  --c-accent: #0f172a;    /* Black accent for active states */
  --c-accent-hover: #334155;
  
  --font-ui: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Consolas', monospace;
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  --border-width: 1px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  padding: 0;
  background-color: var(--c-bg);
  font-family: var(--font-ui);
  color: var(--c-text-main);
  -webkit-font-smoothing: antialiased;
}

/* Layout Grid */
.bp-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: var(--spacing-md);
  background-color: var(--c-bg);
  gap: var(--spacing-md);
}

.bp-frame {
  background-color: var(--c-canvas);
  border: var(--border-width) solid var(--c-border);
  display: flex;
  flex: 1;
  overflow: hidden; /* Contain scroll */
  position: relative;
}

/* Sidebar */
.bp-sidebar {
  width: 280px;
  flex-shrink: 0;
  border-right: var(--border-width) solid var(--c-border);
  display: flex;
  flex-direction: column;
  background-color: var(--c-canvas);
}

.bp-header {
  height: 60px;
  border-bottom: var(--border-width) solid var(--c-border);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
}

.bp-header__title {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.bp-search {
  padding: var(--spacing-md);
  border-bottom: var(--border-width) solid var(--c-border);
}

.bp-input-wrapper {
  display: flex;
  align-items: center;
  border: var(--border-width) solid var(--c-border);
  padding: var(--spacing-sm);
  gap: var(--spacing-sm);
  background: var(--c-canvas);
}

.bp-input-wrapper:focus-within {
  border-color: var(--c-text-main);
}

.bp-input {
  border: none;
  background: transparent;
  width: 100%;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--c-text-main);
  outline: none;
}

.bp-nav {
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  overflow-y: auto;
}

.bp-section-title {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--c-text-sub);
  letter-spacing: 1px;
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
}

.bp-menu-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  color: var(--c-text-sub);
  cursor: pointer;
  font-size: 14px;
  transition: color 0.1s;
}

.bp-menu-item:hover, .bp-menu-item--active {
  color: var(--c-text-main);
}

.bp-menu-item--active {
  font-weight: 600;
}

.bp-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.bp-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--c-text-sub);
  cursor: pointer;
}

.bp-tag::before { content: '#'; color: var(--c-border); margin-right: 2px; }
.bp-tag:hover { color: var(--c-text-main); text-decoration: underline; }

/* Main Content */
.bp-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--c-canvas);
  overflow: hidden;
}

.bp-editor-files {
  padding: var(--spacing-md);
  border-bottom: var(--border-width) solid var(--c-border);
}

.bp-editor-box {
  border: var(--border-width) solid var(--c-border);
  padding: var(--spacing-md);
}

.bp-textarea {
  width: 100%;
  border: none;
  resize: vertical;
  min-height: 80px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.5;
  outline: none;
  color: var(--c-text-main);
  background: transparent;
}

.bp-toolbar {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-sm);
  align-items: center;
}

.bp-tools {
  display: flex;
  gap: var(--spacing-sm);
}

.bp-icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--c-text-sub);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bp-icon-btn:hover { color: var(--c-text-main); }

.bp-btn {
  background: var(--c-text-main);
  color: var(--c-canvas);
  border: none;
  padding: 6px 16px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
}

.bp-btn:hover {
  opacity: 0.9;
}

/* Stream */
.bp-stream {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.bp-memo-card {
  border: var(--border-width) solid var(--c-border);
  background: var(--c-canvas);
}

.bp-memo-header {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: var(--border-width) solid var(--c-border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
}

.bp-meta {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--c-text-sub);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.bp-memo-content {
  padding: var(--spacing-md);
  font-size: 14px;
  line-height: 1.6;
  color: var(--c-text-main);
}

.bp-memo-content p { margin: 0 0 10px 0; }
.bp-memo-content p:last-child { margin: 0; }
.bp-memo-content ul { padding-left: 20px; }
.bp-memo-content blockquote {
  border-left: 2px solid var(--c-border);
  margin: 0;
  padding-left: var(--spacing-md);
  color: var(--c-text-sub);
}

/* Utils */
.bp-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 2px 6px;
  border: 1px solid var(--c-border);
  color: var(--c-text-sub);
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--c-border); }
::-webkit-scrollbar-thumb:hover { background: var(--c-text-sub); }
`,S=function(){return(0,e.jsxs)("aside",{className:"bp-sidebar",children:[(0,e.jsx)("div",{className:"bp-header",children:(0,e.jsxs)("div",{className:"bp-header__title",children:[(0,e.jsx)(x.Z,{size:16}),"MEMO-ENGINE-V1"]})}),(0,e.jsx)("div",{className:"bp-search",children:(0,e.jsxs)("div",{className:"bp-input-wrapper",children:[(0,e.jsx)(d.Z,{size:14,className:"bp-icon-btn"}),(0,e.jsx)("input",{className:"bp-input",placeholder:"SEARCH_MEMOS..."}),(0,e.jsx)("span",{className:"bp-badge",children:"CTRL+K"})]})}),(0,e.jsxs)("nav",{className:"bp-nav",children:[(0,e.jsxs)("div",{children:[(0,e.jsx)("div",{className:"bp-section-title",children:"Timeline"}),(0,e.jsxs)("div",{className:"bp-menu-item bp-menu-item--active",children:[(0,e.jsx)(f.Z,{size:16}),(0,e.jsx)("span",{children:"Stream"})]}),(0,e.jsxs)("div",{className:"bp-menu-item",children:[(0,e.jsx)(n.Z,{size:16}),(0,e.jsx)("span",{children:"Resources"})]})]}),(0,e.jsxs)("div",{children:[(0,e.jsx)("div",{className:"bp-section-title",children:"Filter By Tags"}),(0,e.jsx)("div",{className:"bp-tag-list",children:j.map(function(i){return(0,e.jsx)("span",{className:"bp-tag",children:i},i)})})]})]})]})},P=function(i){var c=i.onSave,y=(0,v.useState)(""),N=p()(y,2),h=N[0],m=N[1],C=function(){h.trim()&&(c(h),m(""))};return(0,e.jsx)("div",{className:"bp-editor-files",children:(0,e.jsxs)("div",{className:"bp-editor-box",children:[(0,e.jsx)("textarea",{className:"bp-textarea",placeholder:"Input thought stream...",value:h,onChange:function(B){return m(B.target.value)}}),(0,e.jsxs)("div",{className:"bp-toolbar",children:[(0,e.jsxs)("div",{className:"bp-tools",children:[(0,e.jsx)("button",{className:"bp-icon-btn",children:(0,e.jsx)(E.Z,{size:14})}),(0,e.jsx)("button",{className:"bp-icon-btn",children:(0,e.jsx)(I.Z,{size:14})}),(0,e.jsx)("button",{className:"bp-icon-btn",children:(0,e.jsx)(M.Z,{size:14})}),(0,e.jsx)("button",{className:"bp-icon-btn",children:(0,e.jsx)(g.Z,{size:14})}),(0,e.jsx)("button",{className:"bp-icon-btn",children:(0,e.jsx)(b.Z,{size:14})}),(0,e.jsx)("button",{className:"bp-icon-btn",children:(0,e.jsx)(_.Z,{size:14})})]}),(0,e.jsx)("button",{className:"bp-btn",onClick:C,children:"Process Input"})]})]})})},R=function(i){var c=i.memo;return(0,e.jsxs)("div",{className:"bp-memo-card",children:[(0,e.jsxs)("div",{className:"bp-memo-header",children:[(0,e.jsxs)("span",{className:"bp-meta",children:[new Date(c.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),(0,e.jsx)("span",{style:{margin:"0 8px",color:"var(--c-border)"},children:"|"}),"ID: ",c.id]}),(0,e.jsx)("button",{className:"bp-icon-btn",children:(0,e.jsx)(w.Z,{size:14})})]}),(0,e.jsx)("div",{className:"bp-memo-content",children:(0,e.jsx)(T.UG,{children:c.content})})]})},k=function(){var i=(0,v.useState)(O),c=p()(i,2),y=c[0],N=c[1],h=function(C){var D={content:C,timestamp:new Date().toISOString(),tags:[]};N([D].concat(o()(y)))};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("style",{children:u}),(0,e.jsx)("div",{className:"bp-layout",children:(0,e.jsxs)("div",{className:"bp-frame",children:[(0,e.jsx)(S,{}),(0,e.jsxs)("main",{className:"bp-main",children:[(0,e.jsx)(P,{onSave:h}),(0,e.jsx)("div",{className:"bp-stream",children:y.map(function(m){return(0,e.jsx)(R,{memo:m},m.id)})})]})]})})]})};t.default=k},63405:function(r,t,a){var l=a(73897);function o(s){if(Array.isArray(s))return l(s)}r.exports=o,r.exports.__esModule=!0,r.exports.default=r.exports},79498:function(r){function t(a){if(typeof Symbol!="undefined"&&a[Symbol.iterator]!=null||a["@@iterator"]!=null)return Array.from(a)}r.exports=t,r.exports.__esModule=!0,r.exports.default=r.exports},42281:function(r){function t(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}r.exports=t,r.exports.__esModule=!0,r.exports.default=r.exports},861:function(r,t,a){var l=a(63405),o=a(79498),s=a(86116),p=a(42281);function x(d){return l(d)||o(d)||s(d)||p()}r.exports=x,r.exports.__esModule=!0,r.exports.default=r.exports}}]);
