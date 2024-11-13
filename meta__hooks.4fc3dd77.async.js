"use strict";(self.webpackChunknaifu=self.webpackChunknaifu||[]).push([[3518],{45721:function(m,n,e){e.r(n),e.d(n,{demos:function(){return u}});var s=e(67294),t=e(61526),u={}},98092:function(m,n,e){var s;e.r(n),e.d(n,{demos:function(){return l}});var t=e(15009),u=e.n(t),r=e(99289),d=e.n(r),a=e(67294),i=e(9508),l={"src-hooks-use-latest-demo-demo1":{component:a.memo(a.lazy(function(){return Promise.all([e.e(6262),e.e(536),e.e(6962),e.e(5699),e.e(2433)]).then(e.bind(e,85701))})),asset:{type:"BLOCK",id:"src-hooks-use-latest-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:e(66384).Z},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{react:s||(s=e.t(a,2))},renderOpts:{compile:function(){var c=d()(u()().mark(function f(){var _,h=arguments;return u()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.all([e.e(1011),e.e(4976)]).then(e.bind(e,37335));case 2:return o.abrupt("return",(_=o.sent).default.apply(_,h));case 3:case"end":return o.stop()}},f)}));function E(){return c.apply(this,arguments)}return E}()}}}},41705:function(m,n,e){e.r(n),e.d(n,{texts:function(){return t}});var s=e(61526);const t=[{value:"useFoo",paraId:0}]},47357:function(m,n,e){e.r(n),e.d(n,{texts:function(){return t}});var s=e(9508);const t=[{value:"useLatest",paraId:0}]},66384:function(m,n){n.Z=`import React, { useEffect, useRef, useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  // \u6BCF\u6B21\u6E32\u67D3\u540E\u90FD\u4F1A\u91CD\u65B0\u6267\u884C\uFF0C\u6240\u4EE5\u9700\u8981\u4F7F\u7528 useRef \u4FDD\u5B58\u6700\u65B0\u7684\u503C
  countRef.current = count;

  useEffect(() => {
    setInterval(() => {
      console.log('setInterval:', countRef.current);
    }, 1000);
  }, []);

  return (
    <div>
      count: {count}
      <br />
      <button type="button" onClick={() => setCount((val) => val + 1)}>
        \u589E\u52A0 1
      </button>
    </div>
  );
};
`}}]);
