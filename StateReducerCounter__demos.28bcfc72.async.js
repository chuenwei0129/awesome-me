"use strict";(self.webpackChunknaifu=self.webpackChunknaifu||[]).push([[8035],{30250:function(E,c,u){u.r(c);var n=u(27040),h=u(67294),e=u(85893);c.default=function(){var i=function(t){console.log("count",t)},s=function(t,d){switch(d.type){case n.DECREMENT:return{count:Math.max(0,t.count-2)};default:return n.useCounterStateReducer.reducer(t,d)}},r=(0,n.useCounterStateReducer)({initialCount:0,max:10},s),a=r.count,C=r.decrement,o=r.increment;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(n.StateReducerCounter,{value:a,onChange:i,children:[(0,e.jsx)(n.StateReducerCounter.Decrement,{icon:"minus",onClick:C}),(0,e.jsx)(n.StateReducerCounter.Label,{children:"\u8BA1\u6570\u5668"}),(0,e.jsx)(n.StateReducerCounter.Count,{limit:10}),(0,e.jsx)(n.StateReducerCounter.Increment,{icon:"plus",onClick:o})]}),(0,e.jsx)("div",{style:{marginTop:"20px"},children:(0,e.jsx)("button",{type:"button",onClick:o,disabled:a>=6,children:"\u81EA\u5B9A\u4E49\u9012\u589E\u6309\u94AE \u6700\u5927\u503C 6"})})]})}}}]);