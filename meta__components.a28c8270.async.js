"use strict";(self.webpackChunknaifu=self.webpackChunknaifu||[]).push([[9838],{84134:function(d,o,n){var s;n.r(o),n.d(o,{demos:function(){return h}});var l=n(15009),a=n.n(l),E=n(99289),f=n.n(E),t=n(67294),I=n(77203),p=n(32589),h={"src-components-icons-demo-demo1":{component:t.memo(t.lazy(function(){return Promise.all([n.e(5281),n.e(1351),n.e(4976),n.e(1887),n.e(2589),n.e(1478),n.e(2433)]).then(n.bind(n,42452))})),asset:{type:"BLOCK",id:"src-components-icons-demo-demo1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(15941).Z},naifu:{type:"NPM",value:"0.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",title:"\u57FA\u672C\u7528\u6CD5"},context:{naifu:p,react:s||(s=n.t(t,2))},renderOpts:{compile:function(){var r=f()(a()().mark(function c(){var m,i=arguments;return a()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(4976),n.e(1011)]).then(n.bind(n,37335));case 2:return e.abrupt("return",(m=e.sent).default.apply(m,i));case 3:case"end":return e.stop()}},c)}));function u(){return r.apply(this,arguments)}return u}()}},"src-components-icons-demo-demo2":{component:t.memo(t.lazy(function(){return Promise.all([n.e(5281),n.e(1351),n.e(4976),n.e(1887),n.e(2589),n.e(1478),n.e(2433)]).then(n.bind(n,74628))})),asset:{type:"BLOCK",id:"src-components-icons-demo-demo2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(10957).Z},naifu:{type:"NPM",value:"0.0.1"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx",title:"\u4F7F\u7528 iconfont.cn"},context:{naifu:p,react:s||(s=n.t(t,2))},renderOpts:{compile:function(){var r=f()(a()().mark(function c(){var m,i=arguments;return a()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([n.e(4976),n.e(1011)]).then(n.bind(n,37335));case 2:return e.abrupt("return",(m=e.sent).default.apply(m,i));case 3:case"end":return e.stop()}},c)}));function u(){return r.apply(this,arguments)}return u}()}}}},31150:function(d,o,n){n.r(o),n.d(o,{texts:function(){return l}});var s=n(77203);const l=[]},15941:function(d,o){o.Z=`import { AddIcon, EmailIcon } from 'naifu';
import React from 'react';

export default () => (
  <>
    <EmailIcon size={['50px', '50px']} style={{ color: '#ccc' }}></EmailIcon>
    <AddIcon spin fontSize={'50px'}></AddIcon>
  </>
);
`},10957:function(d,o){o.Z=`import { createFromIconFont } from 'naifu';
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
`}}]);
