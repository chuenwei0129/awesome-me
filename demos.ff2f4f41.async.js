"use strict";(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[2433],{15242:function(R,u,t){t.r(u);var y=t(27424),x=t.n(y),N=t(41352),E=t(73510),k=t(45977),C=t(37921),_=t(67294),n=t(85893),e=function(){var l=(0,_.useState)("warning input"),d=x()(l,2),v=d[0],f=d[1],s=(0,_.useState)(""),r=x()(s,2),i=r[0],h=r[1],p=function(){f("")};return(0,n.jsxs)("div",{className:"diagram-wrapper",children:[(0,n.jsxs)("div",{className:"diagram-canvas",children:[(0,n.jsxs)("header",{className:"blueprint-header",children:[(0,n.jsxs)("div",{className:"header-main",children:[(0,n.jsx)("h1",{className:"title",children:"INPUT_STATES"}),(0,n.jsx)("span",{className:"subtitle",children:"FIG 2.1 // FORM CONTROL VARIANTS"})]}),(0,n.jsxs)("div",{className:"header-meta",children:[(0,n.jsx)("span",{children:"SYS.UI.KIT"}),(0,n.jsx)("span",{children:"REV: 2024-C"})]})]}),(0,n.jsxs)("div",{className:"blueprint-grid",children:[(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"01. STATE: WARNING"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container warning-mode interactive",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",value:v,onChange:function(c){return f(c.target.value)},className:"blueprint-input",placeholder:"Type to see clear button..."})}),(0,n.jsx)("div",{className:"icon-slot",children:v.length>0&&(0,n.jsx)("div",{className:"icon-badge action-icon",onClick:p,title:"Clear input",children:(0,n.jsx)(N.Z,{size:14,strokeWidth:2})})}),(0,n.jsx)("div",{className:"status-tag",children:"WARN"})]}),(0,n.jsx)("div",{className:"dim-lines",children:(0,n.jsxs)("span",{className:"measure",children:["LEN: ",v.length," CHARS"]})})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"02. STATE: ERROR"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container error-mode interactive",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",placeholder:"Enter value...",value:i,onChange:function(c){return h(c.target.value)},className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge error",children:(0,n.jsx)(E.Z,{size:14,strokeWidth:2})})})]}),(0,n.jsxs)("div",{className:"error-message-line",children:[(0,n.jsx)("span",{className:"line-segment"}),(0,n.jsx)("span",{className:"error-text",children:"INVALID_INPUT_EXCEPTION"})]})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"03. ATTR: READ_ONLY"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container readonly-mode",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",defaultValue:"readOnly input",readOnly:!0,className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge",children:(0,n.jsx)(k.Z,{size:14,strokeWidth:2})})})]})]}),(0,n.jsxs)("div",{className:"spec-block",children:[(0,n.jsxs)("div",{className:"spec-label",children:[(0,n.jsx)("span",{className:"code",children:"04. ATTR: DISABLED"}),(0,n.jsx)("div",{className:"connector-line"})]}),(0,n.jsxs)("div",{className:"input-container disabled-mode",children:[(0,n.jsx)("div",{className:"input-wrapper",children:(0,n.jsx)("input",{type:"text",defaultValue:"disabled input",disabled:!0,className:"blueprint-input"})}),(0,n.jsx)("div",{className:"icon-slot",children:(0,n.jsx)("div",{className:"icon-badge disabled",children:(0,n.jsx)(C.Z,{size:14,strokeWidth:2})})})]})]})]}),(0,n.jsxs)("div",{className:"blueprint-footer",children:[(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box solid"})," ",(0,n.jsx)("span",{children:"ACTIVE"})]}),(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box hatch"})," ",(0,n.jsx)("span",{children:"INACTIVE"})]}),(0,n.jsxs)("div",{className:"legend-item",children:[(0,n.jsx)("span",{className:"box error"})," ",(0,n.jsx)("span",{children:"CRITICAL"})]})]})]}),(0,n.jsx)("style",{children:`
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
      `})]})};u.default=e},14445:function(R,u,t){t.r(u),t.d(u,{default:function(){return v}});var y=t(27424),x=t.n(y),N=t(13761),E=t(98814),k=t(64998),C=t(13766),_=t(18814),n=t(67294),e=t(85893),I=`
:root {
  --c-bg: #f8fafc;
  --c-canvas: #ffffff;
  --c-border: #cbd5e1;
  --c-text-main: #0f172a;
  --c-text-sub: #64748b;
  --font-ui: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.blueprint-container {
  background-color: var(--c-bg);
  padding: 2rem;
  font-family: var(--font-ui);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Document Canvas */
.doc-canvas {
  background-color: var(--c-canvas);
  border: 1px solid var(--c-border);
  width: 100%;
  max-width: 800px;
  position: relative;
  /* Grid pattern background */
  background-image: radial-gradient(var(--c-border) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Header */
.doc-header {
  border-bottom: 1px solid var(--c-border);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
}
.doc-title {
  font-family: var(--font-mono);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}

/* Content Body */
.doc-body {
  padding: 3rem 4rem;
  background: rgba(255, 255, 255, 0.9); 
  font-size: 1rem;
  line-height: 1.8;
  color: var(--c-text-main);
  text-align: justify;
}

/* Citation Marker [N] */
.citation-marker {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
  background: white;
  border: 1px solid var(--c-border);
  padding: 0 4px;
  margin: 0 4px;
  cursor: pointer;
  vertical-align: super;
  line-height: 1.2;
  transition: all 0.15s ease;
  user-select: none;
}

.citation-marker:hover,
.citation-marker.active {
  border-color: var(--c-text-main);
  background: var(--c-text-main);
  color: white;
}

/* Source Popover Card */
.source-popover {
  position: absolute;
  width: 320px;
  background: white;
  border: 1px solid var(--c-text-main); /* Strong border for overlay */
  z-index: 100;
  display: flex;
  flex-direction: column;
  /* Connector Line styling simulated by positioning or simple border */
}

/* Popover Header */
.pop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--c-border);
  background: #f8fafc;
}

.pop-counter {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-sub);
}

.pop-nav {
  display: flex;
  gap: 0;
  border: 1px solid var(--c-border);
  background: white;
}

.pop-btn {
  border: none;
  background: transparent;
  padding: 4px 8px;
  cursor: pointer;
  color: var(--c-text-main);
  display: flex;
  align-items: center;
}
.pop-btn:hover { background: #f1f5f9; }
.pop-btn:first-child { border-right: 1px solid var(--c-border); }
.pop-btn:disabled { color: #cbd5e1; cursor: not-allowed; }

/* Popover Content */
.pop-content {
  padding: 1rem;
}

.pop-title {
  font-family: var(--font-ui);
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pop-desc {
  font-family: var(--font-ui);
  font-size: 0.8rem;
  color: var(--c-text-sub);
  line-height: 1.5;
}

.pop-footer {
  padding: 0.5rem 1rem;
  border-top: 1px dashed var(--c-border);
  display: flex;
  justify-content: flex-end;
}
.link-btn {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--c-text-main);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}
.link-btn:hover { text-decoration: underline; }

/* Connecting Line (Optional decorative element) */
.connector-line {
  position: absolute;
  width: 1px;
  background: var(--c-text-main);
  height: 20px;
  /* Position logic would be dynamic in production */
}
`,l=[{id:1,title:"Data Source Specification",content:"Artificial Intelligence, often abbreviated as AI, is a broad branch of computer science concerned with building smart machines capable of performing tasks that typically require human intelligence.",url:"#"},{id:2,title:"Agile R&D Workflow",content:"Rapid iteration cycles allow enterprise products to respond to market changes within 2-week sprint intervals.",url:"#"},{id:3,title:"Component Abstraction",content:"High reusability is achieved by decoupling logic from view layers, establishing a 'single source of truth' for design tokens.",url:"#"}],d=function(s){var r=s.id,i=s.activeId,h=s.onClick,p=s.markerRef;return(0,e.jsxs)("span",{ref:p,className:"citation-marker ".concat(i===r?"active":""),onClick:function(c){c.stopPropagation(),h(r)},children:["[",r,"]"]})};function v(){var f=(0,n.useState)(null),s=x()(f,2),r=s[0],i=s[1],h=(0,n.useState)({top:0,left:0}),p=x()(h,2),m=p[0],c=p[1],w=(0,n.useRef)(null),b=(0,n.useRef)({});(0,n.useEffect)(function(){if(r!==null&&b.current[r]&&w.current){var o=b.current[r],a=w.current.getBoundingClientRect(),P=o.getBoundingClientRect(),D=P.bottom-a.top+10,g=P.left-a.left-320/2+P.width/2;g<20&&(g=20),g>a.width-340&&(g=a.width-340),c({top:D,left:g})}},[r]);var O=function(){r<l.length&&i(r+1)},T=function(){r>1&&i(r-1)},A=function(){return i(null)};(0,n.useEffect)(function(){var o=function(){return A()};return window.addEventListener("click",o),function(){return window.removeEventListener("click",o)}},[]);var j=l.find(function(o){return o.id===r});return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("style",{children:I}),(0,e.jsx)("div",{className:"blueprint-container",children:(0,e.jsxs)("div",{className:"doc-canvas",ref:w,onClick:function(a){return a.stopPropagation()},children:[(0,e.jsxs)("header",{className:"doc-header",children:[(0,e.jsx)("span",{className:"doc-title",children:"TECH_SPEC_V2.0 // Overview"}),(0,e.jsx)(N.Z,{size:18,color:"#64748b"})]}),(0,e.jsx)("div",{className:"doc-body",children:(0,e.jsxs)("p",{children:["Ant Financial has a large number of enterprise-level products. With complex scenarios, we need to respond fast due to frequent changes in product demands and concurrent R&D workflows",(0,e.jsx)(d,{id:1,activeId:r,onClick:i,markerRef:function(a){return b.current[1]=a}}),". Many similar contents exist in the process. Through abstraction, we could obtain some stable and highly reusable components and pages",(0,e.jsx)(d,{id:2,activeId:r,onClick:i,markerRef:function(a){return b.current[2]=a}}),". This ensures consistency across the entire ecosystem while maintaining the flexibility required for individual business units",(0,e.jsx)(d,{id:3,activeId:r,onClick:i,markerRef:function(a){return b.current[3]=a}}),"."]})}),r&&j&&(0,e.jsxs)("div",{className:"source-popover",style:{top:m.top,left:m.left},onClick:function(a){return a.stopPropagation()},children:[(0,e.jsx)("div",{style:{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderBottom:"10px solid var(--c-text-main)"}}),(0,e.jsx)("div",{style:{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderBottom:"10px solid white"}}),(0,e.jsxs)("div",{className:"pop-header",children:[(0,e.jsxs)("span",{className:"pop-counter",children:["REF: ",String(r).padStart(2,"0"),"/",String(l.length).padStart(2,"0")]}),(0,e.jsxs)("div",{className:"pop-nav",children:[(0,e.jsx)("button",{className:"pop-btn",onClick:T,disabled:r===1,children:(0,e.jsx)(E.Z,{size:14})}),(0,e.jsx)("button",{className:"pop-btn",onClick:O,disabled:r===l.length,children:(0,e.jsx)(k.Z,{size:14})})]})]}),(0,e.jsxs)("div",{className:"pop-content",children:[(0,e.jsxs)("div",{className:"pop-title",children:[(0,e.jsx)(C.Z,{size:14}),j.title]}),(0,e.jsx)("div",{className:"pop-desc",children:j.content})]}),(0,e.jsx)("div",{className:"pop-footer",children:(0,e.jsxs)("a",{href:j.url,className:"link-btn",children:["VIEW_SOURCE ",(0,e.jsx)(_.Z,{size:10})]})})]})]})})]})}}}]);
