(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[2433],{83681:function(c,p,o){"use strict";o.r(p);var j=o(861),b=o.n(j),x=o(95440),O=o(40409),y=o(49482),u=o(92559),N=o(48605),r=o(17829),I=o(57106),W=o(75283),P=o(18814),a=o(67294),e=o(85893),d=function(){return(0,e.jsxs)("div",{className:"blueprint-wrapper",children:[(0,e.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

        :root {
          --c-bg: #f8fafc;
          --c-canvas: #ffffff;
          --c-border: #cbd5e1;
          --c-border-strong: #94a3b8;
          --c-text-main: #0f172a;
          --c-text-sub: #64748b;
          --c-code-bg: #f1f5f9;
          --font-ui: 'Inter', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        .blueprint-wrapper {
          background-color: var(--c-bg);
          padding: 40px;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          font-family: var(--font-ui);
          color: var(--c-text-main);
        }

        /* Document Sheet */
        .doc-sheet {
          background-color: var(--c-canvas);
          border: 1px solid var(--c-border);
          width: 800px;
          position: relative;
          box-shadow: 10px 10px 0px rgba(0,0,0,0.05); /* Architectural block shadow */
        }

        /* Header */
        .doc-header {
          border-bottom: 2px solid var(--c-text-main);
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        
        .doc-title {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 24px;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }

        .doc-meta {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--c-text-sub);
          text-align: right;
          line-height: 1.4;
        }

        /* Content Area */
        .doc-content {
          padding: 40px 48px;
        }

        /* Typography Mapping */
        h1, h2, h3 {
          font-family: var(--font-ui);
          color: var(--c-text-main);
          margin-top: 32px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        h1 { font-size: 28px; font-weight: 800; letter-spacing: -1px; border-bottom: 1px solid var(--c-border); padding-bottom: 8px; }
        h2 { font-size: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 48px; }
        p { font-size: 15px; line-height: 1.7; color: #334155; margin-bottom: 16px; max-width: 65ch; }
        
        strong { font-weight: 800; color: #000; }
        em { font-family: var(--font-mono); font-style: normal; background: #f1f5f9; padding: 0 4px; font-size: 0.9em; }

        /* Blueprint Modules (Media Wrappers) */
        .module-frame {
          border: 1px solid var(--c-border);
          margin: 24px 0;
          background: #fff;
        }

        .module-header {
          border-bottom: 1px solid var(--c-border);
          padding: 6px 12px;
          background: #f8fafc;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--c-text-sub);
          display: flex;
          justify-content: space-between;
          text-transform: uppercase;
        }

        /* Video Player Style */
        .video-container {
          position: relative;
          aspect-ratio: 16/9;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        /* Grid overlay for video placeholder */
        .video-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .play-btn-large {
          width: 64px;
          height: 64px;
          border: 2px solid var(--c-text-main);
          background: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2;
          transition: all 0.2s;
        }
        .play-btn-large:hover { background: #fff; transform: scale(1.05); }

        .video-controls {
          border-top: 1px solid var(--c-border);
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          background: #fff;
          font-family: var(--font-mono);
          font-size: 11px;
        }

        /* Audio Player Style */
        .audio-row {
          display: flex;
          align-items: center;
          padding: 16px;
          gap: 16px;
        }
        
        .waveform-viz {
          flex: 1;
          height: 24px;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .wave-bar {
          width: 3px;
          background: var(--c-border);
          height: 100%;
        }
        .wave-bar.active { background: var(--c-text-main); }

        /* Image Style */
        .image-preview {
          padding: 16px;
          background: #fff;
          display: flex;
          justify-content: center;
        }
        .img-placeholder {
          width: 100%;
          height: 240px;
          background: #f1f5f9;
          border: 1px dashed var(--c-border-strong);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--c-text-sub);
        }
        
        .caption-bar {
          padding: 8px 12px;
          border-top: 1px solid var(--c-border);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--c-text-sub);
          display: flex;
          gap: 12px;
        }

        /* Code Block */
        .code-block {
          background: var(--c-code-bg);
          border: 1px solid var(--c-border);
          padding: 16px;
          margin: 16px 0;
          font-family: var(--font-mono);
          font-size: 13px;
          overflow-x: auto;
          position: relative;
        }
        .code-lang-tag {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--c-border);
          color: #fff;
          font-size: 10px;
          padding: 2px 8px;
          text-transform: uppercase;
        }

        /* Lists */
        .tech-list {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }
        .tech-list li {
          display: flex;
          align-items: baseline;
          margin-bottom: 8px;
          padding-left: 8px;
        }
        .tech-list li::before {
          content: '[+]';
          font-family: var(--font-mono);
          color: var(--c-text-sub);
          margin-right: 12px;
          font-size: 12px;
        }

        /* Progress Bar Shared */
        .scrubber-track {
          flex: 1;
          height: 1px;
          background: var(--c-border);
          position: relative;
        }
        .scrubber-fill {
          height: 2px;
          background: var(--c-text-main);
          position: absolute; top: -0.5px;
        }
        .scrubber-thumb {
          width: 8px; height: 8px; background: var(--c-text-main);
          position: absolute; top: -3px; margin-left: -4px;
        }

        /* Button Reset */
        .icon-btn {
          background: none; border: 1px solid transparent; 
          cursor: pointer; padding: 4px; display: flex;
          color: var(--c-text-main);
        }
        .icon-btn:hover { background: #f1f5f9; border-color: var(--c-border); }

      `}),(0,e.jsxs)("div",{className:"doc-sheet",children:[(0,e.jsxs)("div",{className:"doc-header",children:[(0,e.jsxs)("div",{children:[(0,e.jsx)("div",{className:"doc-title",children:"Engineering Rendering"}),(0,e.jsx)("div",{style:{fontFamily:"var(--font-mono)",fontSize:"12px",marginTop:"4px"},children:"MD_PARSER_V4.2 // COMPONENT_DEMO"})]}),(0,e.jsxs)("div",{className:"doc-meta",children:["DATE: 2025-05-18",(0,e.jsx)("br",{}),"AUTH: SYSTEM_ROOT",(0,e.jsx)("br",{}),"ID: DOC-8821"]})]}),(0,e.jsxs)("div",{className:"doc-content",children:[(0,e.jsx)("h1",{children:"Multimedia Integration"}),(0,e.jsxs)("p",{children:["This document demonstrates the rendering capabilities of the new"," ",(0,e.jsx)("strong",{children:"blueprint engine"}),". It supports embedded media types including video, audio, and static imagery while maintaining a strict engineering aesthetic."]}),(0,e.jsxs)("h2",{children:[(0,e.jsx)(x.Z,{size:18,style:{marginRight:8}}),"01. Video Playback Module"]}),(0,e.jsx)("p",{children:"Video content is encapsulated in a 16:9 container with hardware-accelerated playback controls."}),(0,e.jsxs)("div",{className:"module-frame",children:[(0,e.jsxs)("div",{className:"module-header",children:[(0,e.jsxs)("span",{children:[(0,e.jsx)(O.Z,{size:10,style:{display:"inline",marginRight:6}})," ","vid_demo_render.mp4"]}),(0,e.jsx)("span",{children:"1920x1080 @ 60fps"})]}),(0,e.jsxs)("div",{className:"video-container",children:[(0,e.jsx)("div",{className:"video-grid"}),(0,e.jsx)("div",{className:"play-btn-large",children:(0,e.jsx)(y.Z,{size:32,fill:"currentColor",strokeWidth:1})})]}),(0,e.jsxs)("div",{className:"video-controls",children:[(0,e.jsx)("button",{className:"icon-btn",children:(0,e.jsx)(y.Z,{size:14})}),(0,e.jsxs)("div",{className:"scrubber-track",children:[(0,e.jsx)("div",{className:"scrubber-fill",style:{width:"35%"}}),(0,e.jsx)("div",{className:"scrubber-thumb",style:{left:"35%"}})]}),(0,e.jsx)("span",{children:"04:20 / 12:00"}),(0,e.jsx)("button",{className:"icon-btn",children:(0,e.jsx)(u.Z,{size:14})}),(0,e.jsx)("button",{className:"icon-btn",children:(0,e.jsx)(N.Z,{size:14})})]})]}),(0,e.jsxs)("h2",{children:[(0,e.jsx)(x.Z,{size:18,style:{marginRight:8}}),"02. Audio Analysis"]}),(0,e.jsx)("p",{children:"Audio tracks are visualized using a waveform approximation."}),(0,e.jsxs)("div",{className:"module-frame",children:[(0,e.jsxs)("div",{className:"module-header",children:[(0,e.jsxs)("span",{children:[(0,e.jsx)(r.Z,{size:10,style:{display:"inline",marginRight:6}})," ","interview_part_1.wav"]}),(0,e.jsx)("span",{children:"44.1kHz / STEREO"})]}),(0,e.jsxs)("div",{className:"audio-row",children:[(0,e.jsx)("button",{className:"icon-btn",style:{border:"1px solid #000",padding:8},children:(0,e.jsx)(y.Z,{size:16,fill:"currentColor"})}),(0,e.jsx)("div",{className:"waveform-viz",children:b()(Array(40)).map(function(C,A){return(0,e.jsx)("div",{className:"wave-bar ".concat(A<15?"active":""),style:{height:"".concat(Math.max(20,Math.random()*100),"%")}},A)})}),(0,e.jsx)("div",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",minWidth:"80px",textAlign:"right"},children:"01:14 / 03:45"})]})]}),(0,e.jsxs)("h2",{children:[(0,e.jsx)(x.Z,{size:18,style:{marginRight:8}}),"03. Static Data & Code"]}),(0,e.jsxs)("ul",{className:"tech-list",children:[(0,e.jsx)("li",{children:"Standardized image containers with caption support."}),(0,e.jsx)("li",{children:"Monospaced syntax highlighting for technical implementation details."}),(0,e.jsx)("li",{children:"Responsive grid alignment."})]}),(0,e.jsxs)("div",{className:"module-frame",children:[(0,e.jsxs)("div",{className:"module-header",children:[(0,e.jsxs)("span",{children:[(0,e.jsx)(I.Z,{size:10,style:{display:"inline",marginRight:6}})," ","schematic_v1.png"]}),(0,e.jsx)("span",{children:"SIZE: 2.4MB"})]}),(0,e.jsx)("div",{className:"image-preview",children:(0,e.jsxs)("div",{className:"img-placeholder",children:[(0,e.jsx)(W.Z,{size:48,strokeWidth:1,style:{marginBottom:16}}),(0,e.jsx)("span",{style:{fontFamily:"var(--font-mono)",fontSize:"12px"},children:"IMAGE_RESOURCE_NOT_FOUND"})]})}),(0,e.jsxs)("div",{className:"caption-bar",children:[(0,e.jsx)("strong",{children:"FIG 1.1:"})," System architecture diagram showing data flow between nodes."]})]}),(0,e.jsxs)("div",{className:"code-block",children:[(0,e.jsx)("div",{className:"code-lang-tag",children:"TYPESCRIPT"}),(0,e.jsx)("pre",{children:`interface MediaNode {
  id: string;
  type: 'video' | 'audio' | 'image';
  src: string;
  metadata: {
    duration?: number;
    dimensions?: [number, number];
  };
}

function renderNode(node: MediaNode): void {
  console.log("Initializing blueprint renderer...");
  // Connect to hardware interface
}`})]}),(0,e.jsxs)("p",{style:{marginTop:32,fontSize:13,borderTop:"1px solid #cbd5e1",paddingTop:16},children:[(0,e.jsx)(P.Z,{size:12,style:{display:"inline",marginRight:4}}),(0,e.jsx)("a",{href:"#",style:{color:"var(--c-text-main)",textDecoration:"none",borderBottom:"1px solid currentColor"},children:"View Full Documentation"})]})]})]})]})};p.default=d},15242:function(c,p,o){"use strict";o.r(p);var j=o(27424),b=o.n(j),x=o(41352),O=o(73510),y=o(45977),u=o(37921),N=o(67294),r=o(85893),I=function(){var P=(0,N.useState)("warning input"),a=b()(P,2),e=a[0],d=a[1],U=(0,N.useState)(""),C=b()(U,2),A=C[0],$=C[1],H=function(){d("")};return(0,r.jsxs)("div",{className:"diagram-wrapper",children:[(0,r.jsxs)("div",{className:"diagram-canvas",children:[(0,r.jsxs)("header",{className:"blueprint-header",children:[(0,r.jsxs)("div",{className:"header-main",children:[(0,r.jsx)("h1",{className:"title",children:"INPUT_STATES"}),(0,r.jsx)("span",{className:"subtitle",children:"FIG 2.1 // FORM CONTROL VARIANTS"})]}),(0,r.jsxs)("div",{className:"header-meta",children:[(0,r.jsx)("span",{children:"SYS.UI.KIT"}),(0,r.jsx)("span",{children:"REV: 2024-C"})]})]}),(0,r.jsxs)("div",{className:"blueprint-grid",children:[(0,r.jsxs)("div",{className:"spec-block",children:[(0,r.jsxs)("div",{className:"spec-label",children:[(0,r.jsx)("span",{className:"code",children:"01. STATE: WARNING"}),(0,r.jsx)("div",{className:"connector-line"})]}),(0,r.jsxs)("div",{className:"input-container warning-mode interactive",children:[(0,r.jsx)("div",{className:"input-wrapper",children:(0,r.jsx)("input",{type:"text",value:e,onChange:function(k){return d(k.target.value)},className:"blueprint-input",placeholder:"Type to see clear button..."})}),(0,r.jsx)("div",{className:"icon-slot",children:e.length>0&&(0,r.jsx)("div",{className:"icon-badge action-icon",onClick:H,title:"Clear input",children:(0,r.jsx)(x.Z,{size:14,strokeWidth:2})})}),(0,r.jsx)("div",{className:"status-tag",children:"WARN"})]}),(0,r.jsx)("div",{className:"dim-lines",children:(0,r.jsxs)("span",{className:"measure",children:["LEN: ",e.length," CHARS"]})})]}),(0,r.jsxs)("div",{className:"spec-block",children:[(0,r.jsxs)("div",{className:"spec-label",children:[(0,r.jsx)("span",{className:"code",children:"02. STATE: ERROR"}),(0,r.jsx)("div",{className:"connector-line"})]}),(0,r.jsxs)("div",{className:"input-container error-mode interactive",children:[(0,r.jsx)("div",{className:"input-wrapper",children:(0,r.jsx)("input",{type:"text",placeholder:"Enter value...",value:A,onChange:function(k){return $(k.target.value)},className:"blueprint-input"})}),(0,r.jsx)("div",{className:"icon-slot",children:(0,r.jsx)("div",{className:"icon-badge error",children:(0,r.jsx)(O.Z,{size:14,strokeWidth:2})})})]}),(0,r.jsxs)("div",{className:"error-message-line",children:[(0,r.jsx)("span",{className:"line-segment"}),(0,r.jsx)("span",{className:"error-text",children:"INVALID_INPUT_EXCEPTION"})]})]}),(0,r.jsxs)("div",{className:"spec-block",children:[(0,r.jsxs)("div",{className:"spec-label",children:[(0,r.jsx)("span",{className:"code",children:"03. ATTR: READ_ONLY"}),(0,r.jsx)("div",{className:"connector-line"})]}),(0,r.jsxs)("div",{className:"input-container readonly-mode",children:[(0,r.jsx)("div",{className:"input-wrapper",children:(0,r.jsx)("input",{type:"text",defaultValue:"readOnly input",readOnly:!0,className:"blueprint-input"})}),(0,r.jsx)("div",{className:"icon-slot",children:(0,r.jsx)("div",{className:"icon-badge",children:(0,r.jsx)(y.Z,{size:14,strokeWidth:2})})})]})]}),(0,r.jsxs)("div",{className:"spec-block",children:[(0,r.jsxs)("div",{className:"spec-label",children:[(0,r.jsx)("span",{className:"code",children:"04. ATTR: DISABLED"}),(0,r.jsx)("div",{className:"connector-line"})]}),(0,r.jsxs)("div",{className:"input-container disabled-mode",children:[(0,r.jsx)("div",{className:"input-wrapper",children:(0,r.jsx)("input",{type:"text",defaultValue:"disabled input",disabled:!0,className:"blueprint-input"})}),(0,r.jsx)("div",{className:"icon-slot",children:(0,r.jsx)("div",{className:"icon-badge disabled",children:(0,r.jsx)(u.Z,{size:14,strokeWidth:2})})})]})]})]}),(0,r.jsxs)("div",{className:"blueprint-footer",children:[(0,r.jsxs)("div",{className:"legend-item",children:[(0,r.jsx)("span",{className:"box solid"})," ",(0,r.jsx)("span",{children:"ACTIVE"})]}),(0,r.jsxs)("div",{className:"legend-item",children:[(0,r.jsx)("span",{className:"box hatch"})," ",(0,r.jsx)("span",{children:"INACTIVE"})]}),(0,r.jsxs)("div",{className:"legend-item",children:[(0,r.jsx)("span",{className:"box error"})," ",(0,r.jsx)("span",{children:"CRITICAL"})]})]})]}),(0,r.jsx)("style",{children:`
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
      `})]})};p.default=I},22966:function(c,p,o){"use strict";o.r(p);var j=o(70215),b=o.n(j),x=o(861),O=o.n(x),y=o(27424),u=o.n(y),N=o(17061),r=o.n(N),I=o(17156),W=o.n(I),P=o(59400),a=o.n(P),e=o(42122),d=o.n(e),U=o(8971),C=o(64998),A=o(63494),$=o(90250),H=o(58532),K=o(87764),k=o(31012),Jn=o(67338),Qn=o(95440),Xn=o(13718),qn=o(73696),ne=o(22448),ee=o(40116),J=o(42858),g=o(67294),te=o(13973),i=o(30789),t=o(85893),re=["children","className","node"],Q,X,q,nn,en,tn,rn,on,an,sn,ln,cn,dn,un,mn,pn,xn,fn,hn,gn,vn,bn,_n,jn,yn,En,Dn,wn,On,Mn,Tn,Nn,Cn,An,In,Pn,kn,Sn,Bn,Rn,zn={fonts:{mono:"'JetBrains Mono', 'Fira Code', monospace",sans:"'Inter', sans-serif"},spacing:{unit:4}},oe=d()(d()({},zn),{},{name:"light",colors:{bg:"#f0f2f5",panel:"#ffffff",border:"#1a1a1a",borderDim:"#d4d4d8",text:"#1a1a1a",textDim:"#71717a",accent:"#0055ff",warning:"#dc2626",grid:"#e5e7eb",shadow:"rgba(0,0,0,1)",activeItem:"#f0f9ff",surfaceHover:"#f4f4f5",codeBg:"#f4f4f5"}}),ae=d()(d()({},zn),{},{name:"dark",colors:{bg:"#09090b",panel:"#18181b",border:"#52525b",borderDim:"#27272a",text:"#e4e4e7",textDim:"#a1a1aa",accent:"#38bdf8",warning:"#f87171",grid:"#27272a",shadow:"#000000",activeItem:"#1e293b",surfaceHover:"#27272a",codeBg:"#27272a"}}),ie=(0,i.createGlobalStyle)(Q||(Q=a()([`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: `,`;
    background-color: `,`;
    color: `,`;
    transition: background-color 0.3s ease, color 0.3s ease;
    
    background-image: 
      linear-gradient(`,` 1px, transparent 1px),
      linear-gradient(90deg, `,` 1px, transparent 1px);
    background-size: 20px 20px;
    height: 100vh;
    overflow: hidden;
  }
  
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: `,`; }
`])),function(n){return n.theme.fonts.sans},function(n){return n.theme.colors.bg},function(n){return n.theme.colors.text},function(n){return n.theme.colors.grid},function(n){return n.theme.colors.grid},function(n){return n.theme.colors.border}),se=i.default.div(X||(X=a()([`
  display: flex;
  width: 100vw;
  height: 100vh;
  padding: 16px;
  gap: 16px;
  overflow: hidden; /* \u9632\u6B62\u6EA2\u51FA */
`]))),Ln=i.default.div(q||(q=a()([`
  background: `,`;
  border: 2px solid `,`;
  box-shadow: 4px 4px 0px `,`;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '+';
    position: absolute;
    top: -9px;
    right: -9px;
    background: `,`;
    font-family: `,`;
    font-weight: bold;
    color: `,`;
    line-height: 1;
    width: 16px;
    text-align: center;
    transition: background 0.3s ease, color 0.3s ease;
  }
`])),function(n){return n.theme.colors.panel},function(n){return n.theme.colors.border},function(n){return n.theme.colors.shadow},function(n){return n.theme.colors.bg},function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.border}),le=(0,i.default)(Ln)(nn||(nn=a()([`
  width: 340px;
  min-width: 340px;
  z-index: 2;
  /* \u786E\u4FDD\u4FA7\u8FB9\u680F\u5185\u5BB9\u5782\u76F4\u6392\u5217 */
  display: flex;
  flex-direction: column;
`]))),ce=(0,i.default)(Ln)(en||(en=a()([`
  flex: 1;
  z-index: 1;
  /* \u786E\u4FDD\u4E3B\u533A\u57DF\u5185\u5BB9\u5782\u76F4\u6392\u5217 */
  display: flex;
  flex-direction: column;
  min-width: 0; /* \u5173\u952E\uFF1A\u9632\u6B62 Flex \u5B50\u5143\u7D20\u5185\u5BB9\u6EA2\u51FA\u5BFC\u81F4\u5E03\u5C40\u5D29\u574F */
`]))),de=i.default.div(tn||(tn=a()([`
  padding: 20px;
  border-bottom: 2px solid `,`;
  background: `,`;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0; /* \u9632\u6B62\u5934\u90E8\u88AB\u538B\u7F29 */
`])),function(n){return n.theme.colors.border},function(n){return n.theme.colors.panel}),ue=i.default.div(rn||(rn=a()([`
  display: flex;
  justify-content: space-between;
  align-items: center;
`]))),me=i.default.div(on||(on=a()([`
  font-family: `,`;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 8px;

  span.highlight {
    background: `,`;
    color: `,`;
    padding: 2px 6px;
  }
`])),function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.text},function(n){return n.theme.colors.panel}),pe=i.default.button(an||(an=a()([`
  background: transparent;
  border: 1px solid `,`;
  color: `,`;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: `,`;
    border-color: `,`;
  }
`])),function(n){return n.theme.colors.border},function(n){return n.theme.colors.textDim},function(n){return n.theme.colors.accent},function(n){return n.theme.colors.accent}),xe=i.default.div(sn||(sn=a()([`
  display: flex;
  align-items: center;
  border: 1px solid `,`;
  height: 40px;

  &:focus-within {
    outline: 2px solid `,`;
  }
`])),function(n){return n.theme.colors.border},function(n){return n.theme.colors.accent}),fe=i.default.input(ln||(ln=a()([`
  flex: 1;
  border: none;
  height: 100%;
  padding: 0 12px;
  font-family: `,`;
  font-size: 12px;
  outline: none;
  background: transparent;
  color: `,`;

  &::placeholder {
    color: `,`;
    text-transform: uppercase;
  }
`])),function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.text},function(n){return n.theme.colors.textDim}),he=i.default.button(cn||(cn=a()([`
  height: 100%;
  padding: 0 12px;
  border: none;
  border-left: 1px solid `,`;
  background: `,`;
  color: `,`;
  font-family: `,`;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.1s;

  &:hover {
    background: `,`;
    opacity: 0.9;
  }
`])),function(n){return n.theme.colors.border},function(n){return n.$primary?n.theme.colors.text:"transparent"},function(n){return n.$primary?n.theme.colors.panel:n.theme.colors.text},function(n){return n.theme.fonts.mono},function(n){return n.$primary?n.theme.colors.text:n.theme.colors.grid}),ge=i.default.div(dn||(dn=a()([`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`]))),ve=i.default.div(un||(un=a()([`
  border-bottom: 1px solid `,`;
  background: `,`;
  position: relative;
  transition: background 0.1s;
  cursor: pointer;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: `,`;
  }

  &:hover {
    background: `,`;
  }
`])),function(n){return n.theme.colors.border},function(n){return n.$active?n.theme.colors.activeItem:"transparent"},function(n){return n.$active?n.theme.colors.accent:"transparent"},function(n){return n.$active?n.theme.colors.activeItem:n.theme.colors.surfaceHover}),be=i.default.div(mn||(mn=a()([`
  display: flex;
  align-items: center;
  padding: 12px 12px 8px 16px;
  gap: 8px;
`]))),_e=i.default.span(pn||(pn=a()([`
  font-family: `,`;
  font-size: 10px;
  color: `,`;
  border: 1px solid `,`;
  padding: 2px 4px;
  background: `,`;
`])),function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.textDim},function(n){return n.theme.colors.borderDim},function(n){return n.theme.name==="dark"?"rgba(255,255,255,0.05)":"#f4f4f5"}),je=i.default.div(xn||(xn=a()([`
  font-weight: 700;
  font-size: 14px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: `,`;
`])),function(n){return n.theme.colors.text}),ye=i.default.div(fn||(fn=a()([`
  padding: 4px;
  color: `,`;
  &:hover {
    color: `,`;
  }
`])),function(n){return n.theme.colors.textDim},function(n){return n.theme.colors.text}),Ee=i.default.div(hn||(hn=a()([`
  padding: 0 16px 16px 16px;
  margin-left: 24px;
  border-left: 1px dashed `,`;

  p {
    margin: 0;
    font-family: `,`;
    font-size: 11px;
    color: `,`;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`])),function(n){return n.theme.colors.borderDim},function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.textDim}),De=i.default.div(gn||(gn=a()([`
  height: 60px;
  border-bottom: 2px solid `,`;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: `,`;
  flex-shrink: 0;
`])),function(n){return n.theme.colors.border},function(n){return n.theme.colors.panel}),we=i.default.div(vn||(vn=a()([`
  font-family: `,`;
  font-size: 12px;
  color: `,`;
  display: flex;
  align-items: center;
  gap: 8px;

  .icon {
    color: `,`;
  }
  strong {
    color: `,`;
    font-weight: 700;
  }
`])),function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.textDim},function(n){return n.theme.colors.accent},function(n){return n.theme.colors.text}),Oe=i.default.div(bn||(bn=a()([`
  display: flex;
  align-items: center;
  gap: 12px;
`]))),Wn=i.default.div(_n||(_n=a()([`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: `,`;
  font-size: 10px;
  color: `,`;
  margin-right: 12px;
  padding-right: 12px;
  border-right: 1px solid `,`;
  height: 20px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: `,`;
    box-shadow: `,`;
  }
`])),function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.textDim},function(n){return n.theme.colors.borderDim},function(n){return n.$active?n.theme.colors.accent:n.theme.colors.textDim},function(n){return n.$active?"0 0 8px ".concat(n.theme.colors.accent):"none"}),G=i.default.button(jn||(jn=a()([`
  height: 32px;
  padding: 0 16px;
  border: 1px solid `,`;
  background: transparent;
  color: `,`;
  font-family: `,`;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: `,`;
    transform: translateY(-1px);
    box-shadow: 2px 2px 0px `,`;
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  `,`

  `,`
`])),function(n){return n.theme.colors.border},function(n){return n.theme.colors.text},function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.surfaceHover},function(n){return n.theme.colors.borderDim},function(n){return n.$variant==="primary"&&(0,i.css)(yn||(yn=a()([`
      background: `,`;
      color: `,`;
      border-color: `,`;
      &:hover {
        background: `,`;
        border-color: `,`;
        color: #fff;
      }
    `])),n.theme.colors.text,n.theme.colors.panel,n.theme.colors.text,n.theme.colors.accent,n.theme.colors.accent)},function(n){return n.$variant==="danger"&&(0,i.css)(En||(En=a()([`
      color: `,`;
      border-color: `,`;
      &:hover {
        background: `,`;
        color: white;
        border-color: `,`;
      }
    `])),n.theme.colors.warning,n.theme.colors.borderDim,n.theme.colors.warning,n.theme.colors.warning)}),Me=i.default.div(Dn||(Dn=a()([`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  background-image: linear-gradient(
    `,` 1px,
    transparent 1px
  );
  background-size: 100% 32px;
`])),function(n){return n.theme.colors.grid}),Te=i.default.input(wn||(wn=a()([`
  font-family: `,`;
  font-weight: 800;
  font-size: 28px;
  padding: 32px 32px 16px;
  border: none;
  background: transparent;
  color: `,`;
  width: 100%;
  flex-shrink: 0;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: `,`;
  }
`])),function(n){return n.theme.fonts.sans},function(n){return n.theme.colors.text},function(n){return n.theme.colors.borderDim}),Ne=i.default.textarea(On||(On=a()([`
  flex: 1;
  font-family: `,`;
  font-size: 14px;
  line-height: 32px;
  padding: 0 32px 32px;
  border: none;
  background: transparent;
  resize: none;
  color: `,`;

  &:focus {
    outline: none;
  }
`])),function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.text}),Ce=i.default.div(Mn||(Mn=a()([`
  flex: 1;
  padding: 0 32px 32px;
  overflow-y: auto;
`]))),Ae=i.default.h1(Tn||(Tn=a()([`
  font-family: `,`;
  font-size: 28px;
  font-weight: 800;
  margin-top: 32px;
  margin-bottom: 24px;
  color: `,`;
`])),function(n){return n.theme.fonts.sans},function(n){return n.theme.colors.text}),Ie=i.default.div(Nn||(Nn=a()([`
  display: flex;
  justify-content: center;
  background: `,`;
  border: 1px dashed `,`;
  padding: 16px;
  margin: 16px 0;
  border-radius: 4px;

  svg {
    max-width: 100%;
    font-family: `,` !important;
  }
`])),function(n){return n.theme.name==="dark"?"rgba(255,255,255,0.02)":"rgba(0,0,0,0.02)"},function(n){return n.theme.colors.borderDim},function(n){return n.theme.fonts.mono}),Pe=function(D){var E=D.chart,f=D.themeName,_=(0,g.useRef)(null);return(0,g.useEffect)(function(){J.default.initialize({startOnLoad:!1,theme:f==="dark"?"dark":"default",fontFamily:"'JetBrains Mono', monospace",securityLevel:"loose"});var S=function(){var M=W()(r()().mark(function h(){var w,B,T;return r()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:if(!_.current){m.next=15;break}return m.prev=1,w="mermaid-".concat(Math.random().toString(36).substr(2,9)),_.current.innerHTML="",m.next=6,J.default.render(w,E);case 6:B=m.sent,T=B.svg,_.current.innerHTML=T,m.next=15;break;case 11:m.prev=11,m.t0=m.catch(1),console.error("Mermaid error:",m.t0),_.current.innerHTML='<div style="color:red; font-size:12px; font-family:monospace">SYNTAX ERROR</div>';case 15:case"end":return m.stop()}},h,null,[[1,11]])}));return function(){return M.apply(this,arguments)}}();S()},[E,f]),(0,t.jsx)(Ie,{ref:_})},ke=i.default.div(Cn||(Cn=a()([`
  font-family: `,`;
  line-height: 1.7;
  color: `,`;

  /* Headings */
  h1,
  h2,
  h3,
  h4 {
    font-family: `,`;
    font-weight: 800;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    letter-spacing: -0.02em;
    color: `,`;
  }
  h1 {
    font-size: 2em;
    border-bottom: 2px solid `,`;
    padding-bottom: 0.2em;
  }
  h2 {
    font-size: 1.5em;
  }

  /* Paragraphs */
  p {
    margin-bottom: 1em;
  }

  /* Links */
  a {
    color: `,`;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-bottom-color 0.2s;
    &:hover {
      border-bottom-color: `,`;
    }
  }

  /* Lists */
  ul,
  ol {
    padding-left: 1.5em;
    margin-bottom: 1em;
  }
  li {
    margin-bottom: 0.25em;
  }

  /* Inline Code */
  code {
    font-family: `,`;
    background: `,`;
    padding: 2px 5px;
    border-radius: 2px;
    font-size: 0.9em;
    border: 1px solid `,`;
    color: `,`;
  }

  /* Code Blocks (Pre) */
  pre {
    background: `,`;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    border: 1px solid `,`;
    margin: 1em 0;

    code {
      background: transparent;
      padding: 0;
      border: none;
      color: `,`;
      font-size: 0.9em;
    }
  }

  /* Blockquotes */
  blockquote {
    border-left: 4px solid `,`;
    margin: 1em 0;
    padding-left: 1em;
    font-style: italic;
    color: `,`;
  }

  /* Table */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: 0.9em;
  }
  th,
  td {
    border: 1px solid `,`;
    padding: 8px 12px;
    text-align: left;
  }
  th {
    background: `,`;
    font-weight: 600;
  }
`])),function(n){return n.theme.fonts.sans},function(n){return n.theme.colors.text},function(n){return n.theme.fonts.sans},function(n){return n.theme.colors.text},function(n){return n.theme.colors.border},function(n){return n.theme.colors.accent},function(n){return n.theme.colors.accent},function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.codeBg},function(n){return n.theme.colors.borderDim},function(n){return n.theme.colors.accent},function(n){return n.theme.colors.codeBg},function(n){return n.theme.colors.borderDim},function(n){return n.theme.colors.text},function(n){return n.theme.colors.accent},function(n){return n.theme.colors.textDim},function(n){return n.theme.colors.borderDim},function(n){return n.theme.colors.surfaceHover}),Se=i.default.div(An||(An=a()([`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`]))),Be=i.default.div(In||(In=a()([`
  width: 400px;
  background: `,`;
  border: 2px solid `,`;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5),
    0 10px 10px -5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    height: 12px;
    width: 100%;
    background: repeating-linear-gradient(
      45deg,
      `,`,
      `,` 10px,
      transparent 10px,
      transparent 20px
    );
    border-bottom: 1px solid `,`;
  }
`])),function(n){return n.theme.colors.panel},function(n){return n.theme.colors.warning},function(n){return n.theme.colors.warning},function(n){return n.theme.colors.warning},function(n){return n.theme.colors.warning}),Re=i.default.div(Pn||(Pn=a()([`
  padding: 32px 24px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`]))),ze=i.default.h3(kn||(kn=a()([`
  font-family: `,`;
  text-transform: uppercase;
  font-size: 16px;
  margin: 16px 0 8px;
  color: `,`;
`])),function(n){return n.theme.fonts.mono},function(n){return n.theme.colors.text}),Le=i.default.p(Sn||(Sn=a()([`
  font-size: 13px;
  color: `,`;
  margin-bottom: 24px;
  line-height: 1.5;
`])),function(n){return n.theme.colors.textDim}),We=i.default.div(Bn||(Bn=a()([`
  display: flex;
  gap: 12px;
  width: 100%;
`]))),Un=i.default.button(Rn||(Rn=a()([`
  flex: 1;
  height: 40px;
  border: 1px solid
    `,`;
  background: `,`;
  color: `,`;
  font-family: `,`;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: `,`;
    transform: translateY(-1px);
  }
`])),function(n){return n.$variant==="danger"?n.theme.colors.warning:n.theme.colors.border},function(n){return n.$variant==="danger"?n.theme.colors.warning:"transparent"},function(n){return n.$variant==="danger"?"#fff":n.theme.colors.text},function(n){return n.theme.fonts.mono},function(n){return n.$variant==="danger"?"#b91c1c":n.theme.colors.surfaceHover}),Ue=function(){return Math.floor(Math.random()*9e3+1e3).toString()},Ke=function(D){var E=D.note,f=D.isActive,_=D.onClick,S=(0,g.useState)(!1),M=u()(S,2),h=M[0],w=M[1];return(0,t.jsxs)(ve,{$active:f,onClick:_,children:[(0,t.jsxs)(be,{children:[(0,t.jsxs)(_e,{children:["#",E.id]}),(0,t.jsx)(je,{children:E.title||"UNTITLED_LOG"}),(0,t.jsx)(ye,{onClick:function(T){T.stopPropagation(),w(!h)},children:h?(0,t.jsx)(U.Z,{size:14}):(0,t.jsx)(C.Z,{size:14})})]}),h&&(0,t.jsx)(Ee,{children:(0,t.jsx)("p",{children:E.content||"// No data..."})})]})},Fe=function(){var D=(0,g.useState)("light"),E=u()(D,2),f=E[0],_=E[1],S=(0,g.useState)([{id:"8024",title:"System Architecture",content:`# System Specs

The system relies on a **flux capacitor** design.

## Components
- [x] React Frontend
- [ ] Node Backend

## Diagram
\`\`\`mermaid
graph LR
    A[Client] -->|HTTP/JSON| B(API Gateway)
    B --> C{Service Registry}
    D[(Database)]
\`\`\`
`,updatedAt:new Date().toISOString()},{id:"1092",title:"Daily Log",content:"Use the `markdown` to write docs.",updatedAt:"2023-11-25T14:00:00"}]),M=u()(S,2),h=M[0],w=M[1],B=(0,g.useState)("8024"),T=u()(B,2),R=T[0],m=T[1],Ze=(0,g.useState)(""),Kn=u()(Ze,2),V=Kn[0],$e=Kn[1],He=(0,g.useState)(!1),Fn=u()(He,2),Y=Fn[0],z=Fn[1],Ge=(0,g.useState)(null),Zn=u()(Ge,2),v=Zn[0],F=Zn[1],Ve=(0,g.useState)(!1),$n=u()(Ve,2),Ye=$n[0],Z=$n[1];(0,g.useEffect)(function(){var s=localStorage.getItem("notes-theme");s&&_(s)},[]);var Je=function(){var l=f==="light"?"dark":"light";_(l),localStorage.setItem("notes-theme",l)},L=h.find(function(s){return s.id===R}),Qe=h.filter(function(s){return s.title.toLowerCase().includes(V.toLowerCase())||s.content.toLowerCase().includes(V.toLowerCase())}),Xe=function(){var l={id:Ue(),title:"UNTITLED",content:"",updatedAt:new Date().toISOString()};w([l].concat(O()(h))),m(l.id),z(!0),F(l)},Hn=function(){v&&(w(h.map(function(l){return l.id===v.id?d()(d()({},v),{},{updatedAt:new Date().toISOString()}):l})),z(!1))},qe=function(){return Z(!0)},nt=function(){w(h.filter(function(l){return l.id!==R})),m(null),z(!1),Z(!1)};return(0,t.jsxs)(i.ThemeProvider,{theme:f==="light"?oe:ae,children:[(0,t.jsx)(ie,{}),(0,t.jsxs)(se,{children:[(0,t.jsxs)(le,{children:[(0,t.jsxs)(de,{children:[(0,t.jsxs)(ue,{children:[(0,t.jsxs)(me,{children:[(0,t.jsx)(A.Z,{size:18}),(0,t.jsx)("span",{children:"React"}),(0,t.jsx)("span",{className:"highlight",children:"NOTES_OS"})]}),(0,t.jsx)(pe,{onClick:Je,title:"Toggle System Mode",children:f==="light"?(0,t.jsx)($.Z,{size:16}):(0,t.jsx)(H.Z,{size:16})})]}),(0,t.jsxs)(xe,{children:[(0,t.jsx)("div",{style:{paddingLeft:"12px",display:"flex",alignItems:"center"},children:(0,t.jsx)(K.Z,{size:14})}),(0,t.jsx)(fe,{placeholder:"QUERY_DB...",value:V,onChange:function(l){return $e(l.target.value)}}),(0,t.jsxs)(he,{$primary:!0,onClick:Xe,children:[(0,t.jsx)(k.Z,{size:14})," NEW"]})]})]}),(0,t.jsx)(ge,{children:Qe.map(function(s){return(0,t.jsx)(Ke,{note:s,isActive:s.id===R,onClick:function(){Y&&Hn(),m(s.id),z(!1)}},s.id)})}),(0,t.jsxs)("div",{style:{padding:"8px",borderTop:"1px solid ".concat(f==="light"?"#e5e5e5":"#333"),fontFamily:"monospace",fontSize:"10px",opacity:.6,textAlign:"center",marginTop:"auto"},children:["SYS_MODE: ",f.toUpperCase()]})]}),(0,t.jsx)(ce,{children:L?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(De,{children:[(0,t.jsxs)(we,{children:[(0,t.jsx)(Qn.Z,{size:14,className:"icon"}),(0,t.jsx)("span",{children:"ROOT"}),(0,t.jsx)(C.Z,{size:12}),(0,t.jsx)("strong",{children:L.title||"UNTITLED"})]}),(0,t.jsx)(Oe,{children:Y?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(Wn,{$active:!0,children:"EDITING_MODE"}),(0,t.jsxs)(G,{$variant:"danger",onClick:qe,children:[(0,t.jsx)(Xn.Z,{size:14})," DELETE"]}),(0,t.jsxs)(G,{$variant:"primary",onClick:Hn,children:[(0,t.jsx)(qn.Z,{size:14})," SAVE_CHANGES"]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(Wn,{$active:!1,children:"READ_ONLY"}),(0,t.jsxs)(G,{onClick:function(){F(d()({},L)),z(!0)},children:[(0,t.jsx)(ne.Z,{size:14})," EDIT"]})]})})]}),(0,t.jsx)(Me,{children:Y?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(Te,{value:v==null?void 0:v.title,onChange:function(l){return F(d()(d()({},v),{},{title:l.target.value}))},placeholder:"ENTER_TITLE"}),(0,t.jsx)(Ne,{value:v==null?void 0:v.content,onChange:function(l){return F(d()(d()({},v),{},{content:l.target.value}))},placeholder:"// BEGIN TRANSMISSION...",spellCheck:!1})]}):(0,t.jsxs)(Ce,{children:[(0,t.jsx)(Ae,{children:L.title}),(0,t.jsx)(ke,{children:(0,t.jsx)(te.UG,{components:{code:function(l){var Gn=l.children,Vn=l.className,rt=l.node,et=b()(l,re),Yn=/language-(\w+)/.exec(Vn||""),tt=Yn&&Yn[1]==="mermaid";return tt?(0,t.jsx)(Pe,{chart:String(Gn).replace(/\n$/,""),themeName:f}):(0,t.jsx)("code",d()(d()({className:Vn},et),{},{children:Gn}))}},children:L.content})})]})})]}):(0,t.jsxs)("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",opacity:.5,fontFamily:"monospace"},children:[(0,t.jsx)(Jn.Z,{size:48,strokeWidth:1,style:{marginBottom:16}}),(0,t.jsx)("div",{children:"AWAITING INPUT..."})]})})]}),Ye&&(0,t.jsx)(Se,{onClick:function(){return Z(!1)},children:(0,t.jsx)(Be,{onClick:function(l){return l.stopPropagation()},children:(0,t.jsxs)(Re,{children:[(0,t.jsx)(ee.Z,{size:48,color:f==="light"?"#dc2626":"#f87171",strokeWidth:1.5}),(0,t.jsx)(ze,{children:"Confirm Protocol"}),(0,t.jsxs)(Le,{children:["Are you sure you want to delete note"," ",(0,t.jsxs)("strong",{children:["#",R]}),"?",(0,t.jsx)("br",{}),"This action is irreversible and data will be lost."]}),(0,t.jsxs)(We,{children:[(0,t.jsx)(Un,{onClick:function(){return Z(!1)},children:"Cancel"}),(0,t.jsx)(Un,{$variant:"danger",onClick:nt,children:"Confirm Delete"})]})]})})})]})};p.default=Fe},63405:function(c,p,o){var j=o(73897);function b(x){if(Array.isArray(x))return j(x)}c.exports=b,c.exports.__esModule=!0,c.exports.default=c.exports},79498:function(c){function p(o){if(typeof Symbol!="undefined"&&o[Symbol.iterator]!=null||o["@@iterator"]!=null)return Array.from(o)}c.exports=p,c.exports.__esModule=!0,c.exports.default=c.exports},42281:function(c){function p(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}c.exports=p,c.exports.__esModule=!0,c.exports.default=c.exports},861:function(c,p,o){var j=o(63405),b=o(79498),x=o(86116),O=o(42281);function y(u){return j(u)||b(u)||x(u)||O()}c.exports=y,c.exports.__esModule=!0,c.exports.default=c.exports}}]);
