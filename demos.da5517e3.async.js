"use strict";(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[2433],{15242:function(_,t,e){e.r(t);var p=e(27424),i=e.n(p),x=e(41352),m=e(73510),u=e(45977),v=e(37921),o=e(67294),n=e(85893),h=function(){var b=(0,o.useState)("warning input"),s=i()(b,2),a=s[0],c=s[1],g=(0,o.useState)(""),l=i()(g,2),f=l[0],j=l[1],N=function(){c("")};return(0,n.jsxs)("div",{className:"diagram-wrapper",children:[(0,n.jsxs)("div",{className:"diagram-canvas",children:[(0,n.jsxs)("header",{className:"blueprint-header",children:[(0,n.jsxs)("div",{className:"header-main",children:[(0,n.jsx)("h1",{className:"title",children:"INPUT_STATES"}),(0,n.jsx)("span",{className:"subtitle",children:"FIG 2.1 // FORM CONTROL VARIANTS"})]}),(0,n.jsxs)("div",{className:"header-meta",children:[(0,n.jsx)("span",{children:"SYS.UI.KIT"}),(0,n.jsx)("span",{children:"REV: 2024-C"})]})]}),(0,n.jsxs)("div",{className:"blueprint-grid",children:[(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"01. STATE: WARNING"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container warning-mode interactive",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",value:a,onChange:function(r){return c(r.target.value)},className:"blueprint-input",placeholder:"Type to see clear button..."})}),(0,n.jsx)("div",{className:"icon-slot",children:a.length>0&&(0,n.jsx)("div",{className:"icon-badge action-icon",onClick:N,title:"Clear input",children:(0,n.jsx)(x.Z,{size:14,strokeWidth:2})})}),(0,n.jsx)("div",{className:"status-tag",children:"WARN"})]}),(0,n.jsx)("div",{className:"dim-lines",children:(0,n.jsxs)("span",{className:"measure",children:["LEN: ",a.length," CHARS"]})})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"02. STATE: ERROR"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container error-mode interactive",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",placeholder:"Enter value...",value:f,onChange:function(r){return j(r.target.value)},className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge error",children:(0,n.jsx)(m.Z,{size:14,strokeWidth:2})})})]}),(0,n.jsxs)("div",{className:"error-message-line",children:[(0,n.jsx)("span",{className:"line-segment"}),(0,n.jsx)("span",{className:"error-text",children:"INVALID_INPUT_EXCEPTION"})]})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"03. ATTR: READ_ONLY"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container readonly-mode",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",defaultValue:"readOnly input",readOnly:!0,className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge",children:(0,n.jsx)(u.Z,{size:14,strokeWidth:2})})})]})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"04. ATTR: DISABLED"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container disabled-mode",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",defaultValue:"disabled input",disabled:!0,className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge disabled",children:(0,n.jsx)(v.Z,{size:14,strokeWidth:2})})})]})]})]}),(0,n.jsxs)("div",{className:"blueprint-footer",children:[(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box solid"})," ",(0,n.jsx)("span",{children:"ACTIVE"})]}),(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box hatch"})," ",(0,n.jsx)("span",{children:"INACTIVE"})]}),(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box error"})," ",(0,n.jsx)("span",{children:"CRITICAL"})]})]})]}),(0,n.jsx)("style",{children:`
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
      `})]})};t.default=h}}]);
