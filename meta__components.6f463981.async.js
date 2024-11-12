"use strict";(self.webpackChunknaifu=self.webpackChunknaifu||[]).push([[9838],{84134:function(l,e,n){var s;n.r(e),n.d(e,{demos:function(){return h}});var d=n(15009),a=n.n(d),p=n(99289),f=n.n(p),t=n(67294),v=n(77203),E=n(5699),h={"src-components-icons-demo-demo1":{component:t.memo(t.lazy(function(){return Promise.all([n.e(6262),n.e(536),n.e(9544),n.e(5699),n.e(2433)]).then(n.bind(n,42452))})),asset:{type:"BLOCK",id:"src-components-icons-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(15941).Z},naifu:{type:"NPM",value:"0.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",title:"\u57FA\u672C\u7528\u6CD5"},context:{naifu:E,react:s||(s=n.t(t,2))},renderOpts:{compile:function(){var i=f()(a()().mark(function u(){var r,_=arguments;return a()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.all([n.e(7335),n.e(8764)]).then(n.bind(n,37335));case 2:return o.abrupt("return",(r=o.sent).default.apply(r,_));case 3:case"end":return o.stop()}},u)}));function c(){return i.apply(this,arguments)}return c}()}},"src-components-icons-demo-demo2":{component:t.memo(t.lazy(function(){return Promise.all([n.e(6262),n.e(536),n.e(9544),n.e(5699),n.e(2433)]).then(n.bind(n,74628))})),asset:{type:"BLOCK",id:"src-components-icons-demo-demo2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(10957).Z},naifu:{type:"NPM",value:"0.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",title:"\u4F7F\u7528 iconfont.cn"},context:{naifu:E,react:s||(s=n.t(t,2))},renderOpts:{compile:function(){var i=f()(a()().mark(function u(){var r,_=arguments;return a()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.all([n.e(7335),n.e(8764)]).then(n.bind(n,37335));case 2:return o.abrupt("return",(r=o.sent).default.apply(r,_));case 3:case"end":return o.stop()}},u)}));function c(){return i.apply(this,arguments)}return c}()}}}},35589:function(l,e,n){var s;n.r(e),n.d(e,{demos:function(){return E}});var d=n(15009),a=n.n(d),p=n(99289),f=n.n(p),t=n(67294),v=n(91687),E={"src-components-others-demo-demo10":{component:t.memo(t.lazy(function(){return Promise.all([n.e(6262),n.e(536),n.e(9544),n.e(5699),n.e(2433)]).then(n.bind(n,62920))})),asset:{type:"BLOCK",id:"src-components-others-demo-demo10",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(96264).Z},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",title:"\u6D4B\u8BD5"},context:{react:s||(s=n.t(t,2))},renderOpts:{compile:function(){var h=f()(a()().mark(function c(){var u,r=arguments;return a()().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,Promise.all([n.e(7335),n.e(8764)]).then(n.bind(n,37335));case 2:return m.abrupt("return",(u=m.sent).default.apply(u,r));case 3:case"end":return m.stop()}},c)}));function i(){return h.apply(this,arguments)}return i}()}}}},31150:function(l,e,n){n.r(e),n.d(e,{texts:function(){return d}});var s=n(77203);const d=[]},46432:function(l,e,n){n.r(e),n.d(e,{texts:function(){return d}});var s=n(91687);const d=[]},15941:function(l,e){e.Z=`import { AddIcon, EmailIcon } from 'naifu';
import React from 'react';

export default () => (
  <>
    <EmailIcon size={['50px', '50px']} style={{ color: '#ccc' }}></EmailIcon>
    <AddIcon spin fontSize={'50px'}></AddIcon>
  </>
);
`},10957:function(l,e){e.Z=`import { createFromIconFont } from 'naifu';
import React from 'react';

const IconFont = createFromIconFont(
  '//at.alicdn.com/t/c/font_4697166_zeqonxwplya.js',
);

export default function demo2() {
  return (
    <div>
      <IconFont type="icon-sword" size={'50px'} color="#f00" />
      <IconFont type="icon-a-010-sword" fontSize={'50px'} />
    </div>
  );
}
`},96264:function(l,e){e.Z=`import React, { useEffect, useRef } from 'react';

// compareDocumentPosition: \u6BD4\u8F83\u4E24\u4E2A\u8282\u70B9\u7684\u6587\u6863\u4F4D\u7F6E\uFF08\u5982\u662F\u524D\u540E\u5173\u7CFB\u3001\u5305\u542B\u5173\u7CFB\u7B49\uFF09\uFF0C\u5B83\u8FD4\u56DE\u4E00\u4E2A\u4F4D\u63A9\u7801\u3002
// contains: \u68C0\u67E5\u4E00\u4E2A\u8282\u70B9\u662F\u5426\u5305\u542B\u53E6\u4E00\u4E2A\u8282\u70B9\u3002
// cloneNode: \u590D\u5236\u8282\u70B9\uFF0C\u5982\u679C\u4F20\u5165true\uFF0C\u4F1A\u8FDB\u884C\u6DF1\u62F7\u8D1D\u3002
// isEqualNode: \u68C0\u67E5\u4E24\u4E2A\u8282\u70B9\u662F\u5426\u5177\u6709\u76F8\u540C\u7684\u5C5E\u6027\u548C\u5185\u5BB9\u3002
// isSameNode: \u68C0\u67E5\u4E24\u4E2A\u5F15\u7528\u662F\u5426\u6307\u5411\u540C\u4E00\u4E2A\u8282\u70B9\u3002

const NodeExample = () => {
  const node1Ref = useRef<HTMLDivElement>(null!);
  const node2Ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const node1 = node1Ref.current;
    const node2 = node2Ref.current;

    // compareDocumentPosition
    const position = node1.compareDocumentPosition(node2);
    console.log('compareDocumentPosition:', position);

    // contains
    const contains = node1.contains(node2);
    console.log('contains:', contains);

    // cloneNode
    const clonedNode = node1.cloneNode(true);
    console.log('cloneNode:', clonedNode);

    // isEqualNode
    const isEqual = node1.isEqualNode(node2);
    console.log('isEqualNode:', isEqual);

    // isSameNode
    const isSame = node1.isSameNode(node2);
    console.log('isSameNode:', isSame);
  }, []);

  return (
    <div>
      <div ref={node1Ref}>
        <p>This is node 1</p>
      </div>
      <div ref={node2Ref}>
        <p>This is node 2</p>
      </div>
    </div>
  );
};

export default NodeExample;
`}}]);
