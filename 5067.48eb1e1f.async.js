!(function(){"use strict";var it=Object.defineProperty;var b=Object.getOwnPropertySymbols;var ot=Object.prototype.hasOwnProperty,ct=Object.prototype.propertyIsEnumerable;var B=($,h,c)=>h in $?it($,h,{enumerable:!0,configurable:!0,writable:!0,value:c}):$[h]=c,L=($,h)=>{for(var c in h||(h={}))ot.call(h,c)&&B($,c,h[c]);if(b)for(var c of b(h))ct.call(h,c)&&B($,c,h[c]);return $};var S=($,h,c)=>new Promise((A,y)=>{var x=v=>{try{s(c.next(v))}catch(g){y(g)}},u=v=>{try{s(c.throw(v))}catch(g){y(g)}},s=v=>v.done?A(v.value):Promise.resolve(v.value).then(x,u);s((c=c.apply($,h)).next())});(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[5067],{25925:function($,h,c){c.d(h,{A:function(){return y}});var A=c(35096);function y(x,u){var s,v,g;x.accDescr&&((s=u.setAccDescription)==null||s.call(u,x.accDescr)),x.accTitle&&((v=u.setAccTitle)==null||v.call(u,x.accTitle)),x.title&&((g=u.setDiagramTitle)==null||g.call(u,x.title))}(0,A.eW)(y,"populateCommonDb")},25067:function($,h,c){c.d(h,{diagram:function(){return nt}});var A=c(88674),y=c(25925),x=c(4284),u=c(99970),s=c(35096),v=c(12491),g={showLegend:!0,ticks:5,max:null,min:0,graticule:"circle"},O={axes:[],curves:[],options:g},M=structuredClone(O),F=u.vZ.radar,U=(0,s.eW)(()=>(0,x.Rb)(L(L({},F),(0,u.iE)().radar)),"getConfig"),D=(0,s.eW)(()=>M.axes,"getAxes"),G=(0,s.eW)(()=>M.curves,"getCurves"),j=(0,s.eW)(()=>M.options,"getOptions"),K=(0,s.eW)(a=>{M.axes=a.map(t=>{var e;return{name:t.name,label:(e=t.label)!=null?e:t.name}})},"setAxes"),z=(0,s.eW)(a=>{M.curves=a.map(t=>{var e;return{name:t.name,label:(e=t.label)!=null?e:t.name,entries:H(t.entries)}})},"setCurves"),H=(0,s.eW)(a=>{if(a[0].axis==null)return a.map(e=>e.value);const t=D();if(t.length===0)throw new Error("Axes must be populated before curves for reference entries");return t.map(e=>{const r=a.find(n=>{var o;return((o=n.axis)==null?void 0:o.$refText)===e.name});if(r===void 0)throw new Error("Missing entry for axis "+e.label);return r.value})},"computeCurveEntries"),J=(0,s.eW)(a=>{var e,r,n,o,l,i,d,p,_,m;const t=a.reduce((f,C)=>(f[C.name]=C,f),{});M.options={showLegend:(r=(e=t.showLegend)==null?void 0:e.value)!=null?r:g.showLegend,ticks:(o=(n=t.ticks)==null?void 0:n.value)!=null?o:g.ticks,max:(i=(l=t.max)==null?void 0:l.value)!=null?i:g.max,min:(p=(d=t.min)==null?void 0:d.value)!=null?p:g.min,graticule:(m=(_=t.graticule)==null?void 0:_.value)!=null?m:g.graticule}},"setOptions"),V=(0,s.eW)(()=>{(0,u.ZH)(),M=structuredClone(O)},"clear"),W={getAxes:D,getCurves:G,getOptions:j,setAxes:K,setCurves:z,setOptions:J,getConfig:U,clear:V,setAccTitle:u.GN,getAccTitle:u.eu,setDiagramTitle:u.g2,getDiagramTitle:u.Kr,getAccDescription:u.Mx,setAccDescription:u.U$},Z=(0,s.eW)(a=>{(0,y.A)(a,W);const{axes:t,curves:e,options:r}=a;W.setAxes(t),W.setCurves(e),W.setOptions(r)},"populate"),N={parse:(0,s.eW)(a=>S(this,null,function*(){const t=yield(0,v.Qc)("radar",a);s.cM.debug(t),Z(t)}),"parse")},X=(0,s.eW)((a,t,e,r)=>{var w;const n=r.db,o=n.getAxes(),l=n.getCurves(),i=n.getOptions(),d=n.getConfig(),p=n.getDiagramTitle(),_=(0,A.P)(t),m=Y(_,d),f=(w=i.max)!=null?w:Math.max(...l.map(T=>Math.max(...T.entries))),C=i.min,E=Math.min(d.width,d.height)/2;Q(m,o,E,i.ticks,i.graticule),q(m,o,E,d),R(m,o,l,C,f,i.graticule,d),I(m,l,i.showLegend,d),m.append("text").attr("class","radarTitle").text(p).attr("x",0).attr("y",-d.height/2-d.marginTop)},"draw"),Y=(0,s.eW)((a,t)=>{const e=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,n={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return a.attr("viewbox",`0 0 ${e} ${r}`).attr("width",e).attr("height",r),a.append("g").attr("transform",`translate(${n.x}, ${n.y})`)},"drawFrame"),Q=(0,s.eW)((a,t,e,r,n)=>{if(n==="circle")for(let o=0;o<r;o++){const l=e*(o+1)/r;a.append("circle").attr("r",l).attr("class","radarGraticule")}else if(n==="polygon"){const o=t.length;for(let l=0;l<r;l++){const i=e*(l+1)/r,d=t.map((p,_)=>{const m=2*_*Math.PI/o-Math.PI/2,f=i*Math.cos(m),C=i*Math.sin(m);return`${f},${C}`}).join(" ");a.append("polygon").attr("points",d).attr("class","radarGraticule")}}},"drawGraticule"),q=(0,s.eW)((a,t,e,r)=>{const n=t.length;for(let o=0;o<n;o++){const l=t[o].label,i=2*o*Math.PI/n-Math.PI/2;a.append("line").attr("x1",0).attr("y1",0).attr("x2",e*r.axisScaleFactor*Math.cos(i)).attr("y2",e*r.axisScaleFactor*Math.sin(i)).attr("class","radarAxisLine"),a.append("text").text(l).attr("x",e*r.axisLabelFactor*Math.cos(i)).attr("y",e*r.axisLabelFactor*Math.sin(i)).attr("class","radarAxisLabel")}},"drawAxes");function R(a,t,e,r,n,o,l){const i=t.length,d=Math.min(l.width,l.height)/2;e.forEach((p,_)=>{if(p.entries.length!==i)return;const m=p.entries.map((f,C)=>{const E=2*Math.PI*C/i-Math.PI/2,w=P(f,r,n,d),T=w*Math.cos(E),st=w*Math.sin(E);return{x:T,y:st}});o==="circle"?a.append("path").attr("d",k(m,l.curveTension)).attr("class",`radarCurve-${_}`):o==="polygon"&&a.append("polygon").attr("points",m.map(f=>`${f.x},${f.y}`).join(" ")).attr("class",`radarCurve-${_}`)})}(0,s.eW)(R,"drawCurves");function P(a,t,e,r){const n=Math.min(Math.max(a,t),e);return r*(n-t)/(e-t)}(0,s.eW)(P,"relativeRadius");function k(a,t){const e=a.length;let r=`M${a[0].x},${a[0].y}`;for(let n=0;n<e;n++){const o=a[(n-1+e)%e],l=a[n],i=a[(n+1)%e],d=a[(n+2)%e],p={x:l.x+(i.x-o.x)*t,y:l.y+(i.y-o.y)*t},_={x:i.x-(d.x-l.x)*t,y:i.y-(d.y-l.y)*t};r+=` C${p.x},${p.y} ${_.x},${_.y} ${i.x},${i.y}`}return`${r} Z`}(0,s.eW)(k,"closedRoundCurve");function I(a,t,e,r){if(!e)return;const n=(r.width/2+r.marginRight)*3/4,o=-(r.height/2+r.marginTop)*3/4,l=20;t.forEach((i,d)=>{const p=a.append("g").attr("transform",`translate(${n}, ${o+d*l})`);p.append("rect").attr("width",12).attr("height",12).attr("class",`radarLegendBox-${d}`),p.append("text").attr("x",16).attr("y",0).attr("class","radarLegendText").text(i.label)})}(0,s.eW)(I,"drawLegend");var tt={draw:X},et=(0,s.eW)((a,t)=>{let e="";for(let r=0;r<a.THEME_COLOR_LIMIT;r++){const n=a[`cScale${r}`];e+=`
		.radarCurve-${r} {
			color: ${n};
			fill: ${n};
			fill-opacity: ${t.curveOpacity};
			stroke: ${n};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${n};
			fill-opacity: ${t.curveOpacity};
			stroke: ${n};
		}
		`}return e},"genIndexStyles"),at=(0,s.eW)(a=>{const t=(0,u.xN)(),e=(0,u.iE)(),r=(0,x.Rb)(t,e.themeVariables),n=(0,x.Rb)(r.radar,a);return{themeVariables:r,radarOptions:n}},"buildRadarStyleOptions"),rt=(0,s.eW)(({radar:a}={})=>{const{themeVariables:t,radarOptions:e}=at(a);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${e.axisColor};
		stroke-width: ${e.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${e.axisLabelFontSize}px;
		color: ${e.axisColor};
	}
	.radarGraticule {
		fill: ${e.graticuleColor};
		fill-opacity: ${e.graticuleOpacity};
		stroke: ${e.graticuleColor};
		stroke-width: ${e.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${e.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${et(t,e)}
	`},"styles"),nt={parser:N,db:W,renderer:tt,styles:rt}}}]);
}());