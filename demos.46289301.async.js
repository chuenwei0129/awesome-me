"use strict";(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[2433],{15242:function(N,t,a){a.r(t);var v=a(27424),d=a.n(v),f=a(41352),e=a(73510),g=a(45977),r=a(37921),p=a(67294),n=a(85893),o=function(){var b=(0,p.useState)("warning input"),s=d()(b,2),l=s[0],c=s[1],m=(0,p.useState)(""),x=d()(m,2),y=x[0],j=x[1],_=function(){c("")};return(0,n.jsxs)("div",{className:"diagram-wrapper",children:[(0,n.jsxs)("div",{className:"diagram-canvas",children:[(0,n.jsxs)("header",{className:"blueprint-header",children:[(0,n.jsxs)("div",{className:"header-main",children:[(0,n.jsx)("h1",{className:"title",children:"INPUT_STATES"}),(0,n.jsx)("span",{className:"subtitle",children:"FIG 2.1 // FORM CONTROL VARIANTS"})]}),(0,n.jsxs)("div",{className:"header-meta",children:[(0,n.jsx)("span",{children:"SYS.UI.KIT"}),(0,n.jsx)("span",{children:"REV: 2024-C"})]})]}),(0,n.jsxs)("div",{className:"blueprint-grid",children:[(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"01. STATE: WARNING"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container warning-mode interactive",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",value:l,onChange:function(h){return c(h.target.value)},className:"blueprint-input",placeholder:"Type to see clear button..."})}),(0,n.jsx)("div",{className:"icon-slot",children:l.length>0&&(0,n.jsx)("div",{className:"icon-badge action-icon",onClick:_,title:"Clear input",children:(0,n.jsx)(f.Z,{size:14,strokeWidth:2})})}),(0,n.jsx)("div",{className:"status-tag",children:"WARN"})]}),(0,n.jsx)("div",{className:"dim-lines",children:(0,n.jsxs)("span",{className:"measure",children:["LEN: ",l.length," CHARS"]})})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"02. STATE: ERROR"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container error-mode interactive",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",placeholder:"Enter value...",value:y,onChange:function(h){return j(h.target.value)},className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge error",children:(0,n.jsx)(e.Z,{size:14,strokeWidth:2})})})]}),(0,n.jsxs)("div",{className:"error-message-line",children:[(0,n.jsx)("span",{className:"line-segment"}),(0,n.jsx)("span",{className:"error-text",children:"INVALID_INPUT_EXCEPTION"})]})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"03. ATTR: READ_ONLY"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container readonly-mode",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",defaultValue:"readOnly input",readOnly:!0,className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge",children:(0,n.jsx)(g.Z,{size:14,strokeWidth:2})})})]})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"04. ATTR: DISABLED"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container disabled-mode",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",defaultValue:"disabled input",disabled:!0,className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge disabled",children:(0,n.jsx)(r.Z,{size:14,strokeWidth:2})})})]})]})]}),(0,n.jsxs)("div",{className:"blueprint-footer",children:[(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box solid"})," ",(0,n.jsx)("span",{children:"ACTIVE"})]}),(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box hatch"})," ",(0,n.jsx)("span",{children:"INACTIVE"})]}),(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box error"})," ",(0,n.jsx)("span",{children:"CRITICAL"})]})]})]}),(0,n.jsx)("style",{children:`
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
      `})]})};t.default=o},45034:function(N,t,a){a.r(t),a.d(t,{default:function(){return p}});var v=a(27424),d=a.n(v),f=a(67294),e=a(85893),g=`
:root {
  --c-bg: #f8fafc;
  --c-canvas: #ffffff;
  --c-text-main: #0f172a;
  --c-text-sub: #64748b;
  --c-line: #cbd5e1;
  --c-accent: #0f172a;
  --font-ui: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.blueprint-container {
  background-color: var(--c-bg);
  padding: 3rem;
  font-family: var(--font-ui);
  display: flex;
  justify-content: center;
  color: var(--c-text-main);
  min-height: 100vh;
}

.doc-canvas {
  background-color: var(--c-canvas);
  border: 1px solid var(--c-line);
  width: 100%;
  max-width: 800px;
  padding: 4rem 5rem;
  box-shadow: 10px 10px 0 rgba(15, 23, 42, 0.03);
}

/* --- Common Wrapper Behavior --- */
.bp-header-wrapper {
  position: relative;
  cursor: pointer;
  user-select: none;
  /* Visual cue that it's interactive */
  transition: opacity 0.2s;
}
.bp-header-wrapper:hover {
  opacity: 0.8;
}

/* The Source Tag (Common) */
.source-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  background: #f1f5f9;
  border: 1px solid var(--c-line);
  padding: 2px 8px;
  opacity: 0; /* Hidden by default */
  transform: translateX(-10px);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  font-weight: normal; /* Reset weight from headers */
  letter-spacing: 0;
  font-style: normal;
  display: inline-block;
  vertical-align: middle;
}

/* Active State: Show Tag */
.bp-header-wrapper.active .source-tag {
  opacity: 1;
  transform: translateX(0);
}


/* --- H1 & H2: Structural (Full Width Layout) --- */
/* These headers use Flexbox to push the tag to the far right */
.layout-structural {
  display: flex;
  justify-content: space-between;
  align-items: baseline; 
}

h1.layout-structural {
  font-family: var(--font-ui);
  font-weight: 800;
  font-size: 2.5rem;
  text-transform: uppercase;
  margin: 0 0 1.5rem 0;
  padding-bottom: 1.5rem;
  border-bottom: 4px solid var(--c-text-main);
  width: 100%;
}

h2.layout-structural {
  font-family: var(--font-ui);
  font-weight: 700;
  font-size: 1.75rem;
  margin: 3.5rem 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--c-line);
  width: 100%;
}


/* --- H3 - H6: Content (Inline Layout) --- */
/* These headers use Flexbox to keep tag next to text */
.layout-inline {
  display: flex;
  align-items: center; /* Center vertically for visual balance */
  gap: 1rem; /* Space between text and tag */
}

h3.layout-inline {
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 1.4rem;
  margin: 2.5rem 0 1rem 0;
  color: var(--c-text-main);
}

h4.layout-inline {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.125rem;
  margin: 2rem 0 1rem 0;
  color: var(--c-text-main);
}
/* Style specific to H4 content */
.h4-content {
  background: #f8fafc;
  padding: 4px 8px;
  border: 1px dashed var(--c-line);
}

h5.layout-inline {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 1.5rem 0 0.5rem 0;
  color: var(--c-text-sub);
}

h6.layout-inline {
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: 0.875rem;
  font-style: italic;
  color: #94a3b8;
  margin: 1rem 0;
}


/* Body Text */
p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #334155;
  margin-bottom: 1.5rem;
  max-width: 65ch;
}
`,r=function(o){var i=o.level,b=o.md,s=o.children,l=(0,f.useState)(!1),c=d()(l,2),m=c[0],x=c[1],y=i===1||i===2,j=y?"layout-structural":"layout-inline",_="h".concat(i),u="[ ".concat(b," ]");return(0,e.jsxs)(_,{className:"bp-header-wrapper ".concat(j," ").concat(m?"active":""),onClick:function(){return x(!m)},title:"Click to toggle Markdown source",children:[i===4?(0,e.jsx)("span",{className:"h4-content",children:s}):s,(0,e.jsx)("span",{className:"source-tag",children:u})]})};function p(){return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("style",{children:g}),(0,e.jsx)("div",{className:"blueprint-container",children:(0,e.jsxs)("article",{className:"doc-canvas",children:[(0,e.jsx)(r,{level:1,md:"#",children:"System Architecture"}),(0,e.jsx)("p",{children:"Clicking any header will reveal its Markdown level on the right side. Level 1 and 2 headers align the tag to the far right edge, reinforcing their status as structural dividers."}),(0,e.jsx)(r,{level:2,md:"##",children:"01. Rendering Pipeline"}),(0,e.jsx)("p",{children:"The pipeline is the core of the visual output system. It processes geometry and rasterizes it into the frame buffer."}),(0,e.jsx)(r,{level:3,md:"###",children:"Geometry Processing"}),(0,e.jsx)("p",{children:"Note how Level 3+ headers keep the tag close to the text. This prevents the eye from losing track when reading shorter subtitles."}),(0,e.jsx)(r,{level:4,md:"####",children:"Vertex_Shader_Core()"}),(0,e.jsx)("p",{children:"Technical components (Level 4) maintain their monospace, code-like appearance, with the hierarchy tag appearing as a parameter or annotation."}),(0,e.jsx)(r,{level:5,md:"#####",children:"Input Parameters"}),(0,e.jsx)("p",{children:"Level 5 is used for property groups or labeled lists."}),(0,e.jsx)(r,{level:6,md:"######",children:"// TODO: Refactor for performance"}),(0,e.jsx)("p",{children:"Comments and annotations (Level 6) sit quietly in the flow until inspected."})]})})]})}}}]);
