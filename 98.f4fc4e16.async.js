"use strict";(self.webpackChunk_c6i_playground=self.webpackChunk_c6i_playground||[]).push([[98],{1098:function(d,n,a){a.r(n),a.d(n,{texts:function(){return e}});const e=[{value:"CSS \u4E2D\u6709\u591A\u79CD\u9009\u62E9\u5668,\u7528\u4E8E\u9009\u62E9\u8981\u6837\u5F0F\u5316\u7684\u5143\u7D20\u3002\u4E0B\u9762\u6211\u4EEC\u901A\u8FC7\u4E00\u4E2A\u7EFC\u5408\u6848\u4F8B\u6765\u8BF4\u660E\u5E38\u7528\u9009\u62E9\u5668\u7684\u4F7F\u7528\u65B9\u6CD5\u3002",paraId:0,tocIndex:0},{value:`import './style.css';

export default function page() {
  return (
    <div className="container">
      <h1 id="title">Hello, CSS!</h1>
      <p className="content">This is a content.</p>
      <p className="content">This is another content.</p>
      <ul id="list">
        <li id="item">Item 1</li>
        <li className="active">Item 2</li>
        <li>Item 3</li>
      </ul>
      <div className="container">
        <p>Inside container</p>
      </div>
    </div>
  );
}
`,paraId:1,tocIndex:0},{value:`/* style.css */

/* \u5143\u7D20\u9009\u62E9\u5668 + \u540E\u4EE3\u9009\u62E9\u5668 + \u4F2A\u7C7B\u9009\u62E9\u5668 */
ul li:first-child {
  color: bisque;
}

/* \u5B50\u5143\u7D20\u9009\u62E9\u5668\uFF1A\u4EC5\u9009\u62E9\u76F4\u63A5\u5B50\u5143\u7D20 */
.container > p {
  border: 1px solid red;
}

/* \u7C7B\u9009\u62E9\u5668\uFF1A\u9009\u62E9\u5177\u6709\u6307\u5B9A\u7C7B\u540D\u7684\u5143\u7D20 */
li.active {
  font-weight: bold;
  color: red;
}

/* \u901A\u7528\u9009\u62E9\u5668\uFF1A\u9009\u62E9\u6240\u6709\u5143\u7D20 */
.container * {
  font-style: italic;
}

/* \u76F8\u90BB\u5144\u5F1F\u9009\u62E9\u5668\uFF1A\u9009\u62E9\u7D27\u63A5\u5728\u6307\u5B9A\u5143\u7D20\u4E4B\u540E\u7684\u540C\u7EA7\u5143\u7D20 */
h1 + p {
  background-color: blanchedalmond;
}

/* \u901A\u7528\u5144\u5F1F\u9009\u62E9\u5668\uFF1A\u9009\u62E9\u6307\u5B9A\u5143\u7D20\u4E4B\u540E\u7684\u6240\u6709\u540C\u7EA7\u5143\u7D20 */
h1 ~ p {
  color: red;
}

/* :not() \u4F2A\u7C7B\uFF1A\u9009\u62E9\u4E0D\u5339\u914D\u6307\u5B9A\u9009\u62E9\u5668\u7684\u5143\u7D20 */
li:not(.active) {
  text-decoration: underline;
}

/* \u5C5E\u6027\u9009\u62E9\u5668\uFF1A\u9009\u62E9\u5177\u6709\u6307\u5B9A\u5C5E\u6027\u6216\u5C5E\u6027\u503C\u7684\u5143\u7D20 */
li[id^='item'] {
  font-size: 30px;
}
`,paraId:2,tocIndex:0},{value:"\u9009\u62E9\u5668\u7C7B\u578B",paraId:3,tocIndex:1},{value:"\u8BED\u6CD5\u793A\u4F8B",paraId:3,tocIndex:1},{value:"\u8BF4\u660E",paraId:3,tocIndex:1},{value:"\u5143\u7D20\u9009\u62E9\u5668",paraId:3,tocIndex:1},{value:"p",paraId:3,tocIndex:1},{value:"\u3001",paraId:3,tocIndex:1},{value:"div",paraId:3,tocIndex:1},{value:"\u9009\u62E9\u6307\u5B9A\u7C7B\u578B\u7684\u6240\u6709\u5143\u7D20",paraId:3,tocIndex:1},{value:"\u7C7B\u9009\u62E9\u5668",paraId:3,tocIndex:1},{value:".className",paraId:3,tocIndex:1},{value:"\u9009\u62E9\u5177\u6709\u6307\u5B9A class \u7684\u5143\u7D20",paraId:3,tocIndex:1},{value:"ID \u9009\u62E9\u5668",paraId:3,tocIndex:1},{value:"#idName",paraId:3,tocIndex:1},{value:"\u9009\u62E9\u5177\u6709\u6307\u5B9A id \u7684\u5143\u7D20",paraId:3,tocIndex:1},{value:"\u5C5E\u6027\u9009\u62E9\u5668",paraId:3,tocIndex:1},{value:'[attr="value"]',paraId:3,tocIndex:1},{value:"\u9009\u62E9\u5177\u6709\u6307\u5B9A\u5C5E\u6027\u7684\u5143\u7D20",paraId:3,tocIndex:1},{value:"\u540E\u4EE3\u9009\u62E9\u5668",paraId:3,tocIndex:1},{value:"div p",paraId:3,tocIndex:1},{value:"\u9009\u62E9 div \u5185\u7684\u6240\u6709 p \u5143\u7D20",paraId:3,tocIndex:1},{value:"\u5B50\u5143\u7D20\u9009\u62E9\u5668",paraId:3,tocIndex:1},{value:"div > p",paraId:3,tocIndex:1},{value:"\u4EC5\u9009\u62E9 div \u7684\u76F4\u63A5\u5B50\u5143\u7D20 p",paraId:3,tocIndex:1},{value:"\u76F8\u90BB\u5144\u5F1F\u9009\u62E9\u5668",paraId:3,tocIndex:1},{value:"h1 + p",paraId:3,tocIndex:1},{value:"\u9009\u62E9\u7D27\u8DDF\u5728 h1 \u540E\u7684 p \u5143\u7D20",paraId:3,tocIndex:1},{value:"\u901A\u7528\u5144\u5F1F\u9009\u62E9\u5668",paraId:3,tocIndex:1},{value:"h1 ~ p",paraId:3,tocIndex:1},{value:"\u9009\u62E9 h1 \u540E\u7684\u6240\u6709 p \u5144\u5F1F\u5143\u7D20",paraId:3,tocIndex:1},{value:"\u5C5E\u6027\u9009\u62E9\u5668\u63D0\u4F9B\u4E86\u5F3A\u5927\u7684\u5143\u7D20\u5339\u914D\u80FD\u529B:",paraId:4,tocIndex:2},{value:`/* \u5B58\u5728\u5C5E\u6027 */
[disabled] {
  opacity: 0.5;
}

/* \u5B8C\u5168\u5339\u914D */
[type='text'] {
  border-color: blue;
}

/* \u4EE5...\u5F00\u5934 */
[class^='btn-'] {
  padding: 10px;
}

/* \u4EE5...\u7ED3\u5C3E */
[href$='.pdf'] {
  color: red;
}

/* \u5305\u542B... */
[class*='icon'] {
  display: inline-block;
}

/* \u7A7A\u683C\u5206\u9694\u7684\u8BCD\u5217\u8868\u4E2D\u5305\u542B */
[class~='active'] {
  font-weight: bold;
}

/* \u8FDE\u5B57\u7B26\u5206\u9694\u7684\u8BCD\u5217\u8868\u4E2D\u4EE5...\u5F00\u5934 */
[lang|='en'] {
  font-family: Arial;
}
`,paraId:5,tocIndex:2},{value:"\u63D0\u793A",paraId:6,tocIndex:2},{value:": \u5173\u4E8E\u5C5E\u6027\u9009\u62E9\u5668\u4E2D\u5F15\u53F7\u7684\u95EE\u9898,\u867D\u7136\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\u53EF\u4EE5\u7701\u7565,\u4F46\u4E3A\u4E86\u4FDD\u9669\u8D77\u89C1\u548C\u66F4\u597D\u7684\u53EF\u8BFB\u6027,\u5EFA\u8BAE\u603B\u662F\u4F7F\u7528\u5F15\u53F7\u3002",paraId:6,tocIndex:2},{value:"\u5728\u7EBF\u5DE5\u5177\uFF1A",paraId:7,tocIndex:3},{value:"CSS Specificity Calculator",paraId:7,tocIndex:3},{value:"\u5185\u8054\u6837\u5F0F",paraId:8,tocIndex:4},{value:" > ",paraId:8,tocIndex:4},{value:"ID \u9009\u62E9\u5668",paraId:8,tocIndex:4},{value:" > ",paraId:8,tocIndex:4},{value:"\u7C7B/\u5C5E\u6027/\u4F2A\u7C7B\u9009\u62E9\u5668",paraId:8,tocIndex:4},{value:" > ",paraId:8,tocIndex:4},{value:"\u5143\u7D20/\u4F2A\u5143\u7D20\u9009\u62E9\u5668",paraId:8,tocIndex:4},{value:" > ",paraId:8,tocIndex:4},{value:"\u901A\u7528\u9009\u62E9\u5668",paraId:8,tocIndex:4},{value:"\u4F18\u5148\u7EA7\u53EF\u4EE5\u8868\u793A\u4E3A\u4E09\u4F4D\u6570 ",paraId:9,tocIndex:4},{value:"(ID\u6570-\u7C7B\u6570-\u5143\u7D20\u6570)",paraId:9,tocIndex:4},{value:",\u4F8B\u5982:",paraId:9,tocIndex:4},{value:"#nav .list li",paraId:10,tocIndex:4},{value:" \u7684\u4F18\u5148\u7EA7\u662F ",paraId:10,tocIndex:4},{value:"1-1-1",paraId:10,tocIndex:4},{value:".container > p",paraId:10,tocIndex:4},{value:" \u7684\u4F18\u5148\u7EA7\u662F ",paraId:10,tocIndex:4},{value:"0-1-1",paraId:10,tocIndex:4},{value:"div p",paraId:10,tocIndex:4},{value:" \u7684\u4F18\u5148\u7EA7\u662F ",paraId:10,tocIndex:4},{value:"0-0-2",paraId:10,tocIndex:4},{value:"\u5F53\u4F18\u5148\u7EA7\u76F8\u540C\u65F6,",paraId:11,tocIndex:4},{value:"\u540E\u5B9A\u4E49\u7684\u89C4\u5219\u4F1A\u8986\u76D6\u5148\u5B9A\u4E49\u7684\u89C4\u5219",paraId:11,tocIndex:4},{value:"!important",paraId:12,tocIndex:4},{value:" \u58F0\u660E\u4F18\u5148\u7EA7\u6700\u9AD8,\u4F46\u5E94\u8BE5\u8C28\u614E\u4F7F\u7528",paraId:12,tocIndex:4},{value:"\u901A\u7528\u9009\u62E9\u5668 ",paraId:13,tocIndex:5},{value:"*",paraId:13,tocIndex:5},{value:"\u3001\u7EC4\u5408\u7B26 (",paraId:13,tocIndex:5},{value:"+",paraId:13,tocIndex:5},{value:"\u3001",paraId:13,tocIndex:5},{value:">",paraId:13,tocIndex:5},{value:"\u3001",paraId:13,tocIndex:5},{value:"~",paraId:13,tocIndex:5},{value:") \u548C ",paraId:13,tocIndex:5},{value:":where()",paraId:13,tocIndex:5},{value:" \u4E0D\u5F71\u54CD\u4F18\u5148\u7EA7",paraId:13,tocIndex:5},{value:":not()",paraId:14,tocIndex:5},{value:" \u548C ",paraId:14,tocIndex:5},{value:":is()",paraId:14,tocIndex:5},{value:" \u672C\u8EAB\u4E0D\u5F71\u54CD\u4F18\u5148\u7EA7,\u4F46\u5B83\u4EEC\u7684\u53C2\u6570\u4F1A\u5F71\u54CD:",paraId:14,tocIndex:5},{value:"\u53C2\u6570\u4E2D\u4F18\u5148\u7EA7\u6700\u9AD8\u7684\u9009\u62E9\u5668\u5C06\u4F5C\u4E3A\u8BE5\u4F2A\u7C7B\u7684\u4F18\u5148\u7EA7",paraId:15,tocIndex:5},{value:"\u5185\u8054\u6837\u5F0F",paraId:16,tocIndex:5},{value:" \u7684\u4F18\u5148\u7EA7\u53EF\u4EE5\u7406\u89E3\u4E3A ",paraId:16,tocIndex:5},{value:"1-0-0-0",paraId:16,tocIndex:5},{value:"\u9009\u62E9\u5668",paraId:17,tocIndex:6},{value:"ID",paraId:17,tocIndex:6},{value:"\u7C7B",paraId:17,tocIndex:6},{value:"\u5143\u7D20",paraId:17,tocIndex:6},{value:"\u4F18\u5148\u7EA7",paraId:17,tocIndex:6},{value:"h1",paraId:17,tocIndex:6},{value:"0",paraId:17,tocIndex:6},{value:"0",paraId:17,tocIndex:6},{value:"1",paraId:17,tocIndex:6},{value:"0-0-1",paraId:17,tocIndex:6},{value:"h1 + p::first-letter",paraId:17,tocIndex:6},{value:"0",paraId:17,tocIndex:6},{value:"0",paraId:17,tocIndex:6},{value:"3",paraId:17,tocIndex:6},{value:"0-0-3",paraId:17,tocIndex:6},{value:'li > a[href*="en-US"] > .inline-warning',paraId:17,tocIndex:6},{value:"0",paraId:17,tocIndex:6},{value:"2",paraId:17,tocIndex:6},{value:"2",paraId:17,tocIndex:6},{value:"0-2-2",paraId:17,tocIndex:6},{value:"#identifier",paraId:17,tocIndex:6},{value:"1",paraId:17,tocIndex:6},{value:"0",paraId:17,tocIndex:6},{value:"0",paraId:17,tocIndex:6},{value:"1-0-0",paraId:17,tocIndex:6},{value:"button:not(#mainBtn, .cta)",paraId:17,tocIndex:6},{value:"1",paraId:17,tocIndex:6},{value:"0",paraId:17,tocIndex:6},{value:"1",paraId:17,tocIndex:6},{value:"1-0-1",paraId:17,tocIndex:6},{value:"\u91CD\u8981",paraId:18,tocIndex:7},{value:": \u5F53\u591A\u4E2A\u9009\u62E9\u5668\u4F18\u5148\u7EA7\u76F8\u540C\u65F6,\u6837\u5F0F\u53D6\u51B3\u4E8E\u5B83\u4EEC\u5728\u6837\u5F0F\u8868\u4E2D\u7684\u5B9A\u4E49\u987A\u5E8F,\u800C\u4E0D\u662F HTML \u4E2D class \u7684\u987A\u5E8F\u3002",paraId:18,tocIndex:7},{value:`.blue {
  color: blue;
}
.red {
  color: red;
}
`,paraId:19,tocIndex:7},{value:`<!-- \u65E0\u8BBA class \u987A\u5E8F\u5982\u4F55,\u6587\u5B57\u90FD\u662F\u7EA2\u8272,\u56E0\u4E3A .red \u5728 CSS \u4E2D\u540E\u5B9A\u4E49 -->
<p class="blue red">\u6211\u662F\u7EA2\u8272</p>
<p class="red blue">\u6211\u4E5F\u662F\u7EA2\u8272</p>
`,paraId:20,tocIndex:7},{value:"\u6CE8\u610F",paraId:21,tocIndex:7},{value:": \u5982\u679C ",paraId:21,tocIndex:7},{value:".blue",paraId:21,tocIndex:7},{value:" \u548C ",paraId:21,tocIndex:7},{value:".red",paraId:21,tocIndex:7},{value:" \u5728\u4E0D\u540C\u7684 CSS \u6587\u4EF6\u4E2D,\u6700\u7EC8\u6837\u5F0F\u5C06\u53D6\u51B3\u4E8E CSS \u6587\u4EF6\u7684\u52A0\u8F7D\u987A\u5E8F\u3002",paraId:21,tocIndex:7},{value:"\u8FD9\u4E9B\u662F\u5F00\u53D1\u4E2D\u6700\u5E38\u7528\u7684\u4F2A\u7C7B:",paraId:22,tocIndex:9},{value:`/* \u94FE\u63A5\u72B6\u6001 - \u6309 LVHA \u987A\u5E8F\u4E66\u5199 (Link-Visited-Hover-Active) */
a:link {
  color: blue;
} /* \u672A\u8BBF\u95EE\u7684\u94FE\u63A5 */
a:visited {
  color: purple;
} /* \u5DF2\u8BBF\u95EE\u7684\u94FE\u63A5 */
a:hover {
  color: red;
} /* \u9F20\u6807\u60AC\u505C */
a:active {
  color: orange;
} /* \u6B63\u5728\u70B9\u51FB */

/* \u8868\u5355\u72B6\u6001 */
input:focus {
  border-color: blue;
} /* \u83B7\u5F97\u7126\u70B9 */
input:focus-visible {
  outline: 2px solid blue;
} /* \u952E\u76D8\u7126\u70B9 */
input:disabled {
  opacity: 0.5;
} /* \u7981\u7528\u72B6\u6001 */
input:enabled {
  cursor: pointer;
} /* \u542F\u7528\u72B6\u6001 */
input:checked {
  background: green;
} /* \u9009\u4E2D\u72B6\u6001 */
input:valid {
  border-color: green;
} /* \u9A8C\u8BC1\u901A\u8FC7 */
input:invalid {
  border-color: red;
} /* \u9A8C\u8BC1\u5931\u8D25 */
input:required {
  border-left: 3px solid red;
} /* \u5FC5\u586B\u9879 */
input:optional {
  border-left: 3px solid gray;
} /* \u53EF\u9009\u9879 */
`,paraId:23,tocIndex:9},{value:"\u7528\u4E8E\u9009\u62E9\u7279\u5B9A\u4F4D\u7F6E\u7684\u5143\u7D20:",paraId:24,tocIndex:10},{value:`/* \u9009\u62E9\u7B2C\u4E00\u4E2A/\u6700\u540E\u4E00\u4E2A\u5B50\u5143\u7D20 */
li:first-child {
  font-weight: bold;
}
li:last-child {
  border-bottom: none;
}

/* \u9009\u62E9\u7279\u5B9A\u7C7B\u578B\u7684\u7B2C\u4E00\u4E2A/\u6700\u540E\u4E00\u4E2A */
p:first-of-type {
  margin-top: 0;
}
p:last-of-type {
  margin-bottom: 0;
}

/* \u9009\u62E9\u552F\u4E00\u7684\u5B50\u5143\u7D20 */
p:only-child {
  text-align: center;
}
p:only-of-type {
  font-style: italic;
}

/* \u6309\u516C\u5F0F\u9009\u62E9 */
li:nth-child(2n) {
  background: #f0f0f0;
} /* \u5076\u6570\u9879 */
li:nth-child(2n + 1) {
  background: white;
} /* \u5947\u6570\u9879 */
li:nth-child(3n) {
  font-weight: bold;
} /* \u6BCF3\u4E2A */
li:nth-last-child(2) {
  color: red;
} /* \u5012\u6570\u7B2C2\u4E2A */

/* \u7B80\u5199\u5F62\u5F0F */
li:nth-child(even) {
  background: #f0f0f0;
} /* \u7B49\u540C\u4E8E 2n */
li:nth-child(odd) {
  background: white;
} /* \u7B49\u540C\u4E8E 2n+1 */
`,paraId:25,tocIndex:10},{value:`/* :not() - \u6392\u9664\u7279\u5B9A\u5143\u7D20 */
li:not(.active) {
  opacity: 0.6;
}
input:not([type='submit']) {
  border-radius: 4px;
}

/* :is() - \u5339\u914D\u5217\u8868\u4E2D\u4EFB\u4E00\u9009\u62E9\u5668 */
:is(h1, h2, h3) {
  margin-top: 0;
}
/* \u7B49\u540C\u4E8E h1, h2, h3 { margin-top: 0; } */

/* :where() - \u7C7B\u4F3C :is() \u4F46\u4F18\u5148\u7EA7\u4E3A 0 */
:where(article, section) p {
  line-height: 1.6;
}

/* :has() - \u6839\u636E\u5B50\u5143\u7D20\u9009\u62E9\u7236\u5143\u7D20 (\u76F8\u5BF9\u8F83\u65B0) */
div:has(> img) {
  display: flex;
}
article:has(h2) {
  padding-top: 20px;
}
`,paraId:26,tocIndex:11},{value:`/* \u9009\u62E9\u7A7A\u5143\u7D20 */
div:empty {
  display: none;
}

/* \u76EE\u6807\u5143\u7D20 (\u901A\u8FC7 URL \u951A\u70B9) */
:target {
  background: yellow;
}

/* \u6839\u5143\u7D20 (\u901A\u5E38\u662F <html>) */
:root {
  --main-color: #333;
  --spacing: 8px;
}
`,paraId:27,tocIndex:12},{value:"\u66F4\u591A\u4F2A\u7C7B",paraId:28,tocIndex:12},{value:": \u67E5\u9605 ",paraId:28,tocIndex:12},{value:"MDN \u4F2A\u7C7B\u5B8C\u6574\u5217\u8868",paraId:28,tocIndex:12},{value:`/* \u8868\u5355\u9A8C\u8BC1\u7684\u5B8C\u6574\u6837\u5F0F\u65B9\u6848 */
.form-field {
  position: relative;
  margin-bottom: 20px;
}

/* \u5FC5\u586B\u5B57\u6BB5\u6807\u8BB0 */
.form-field input:required + label::after {
  content: '*';
  color: red;
  margin-left: 4px;
}

/* \u9A8C\u8BC1\u901A\u8FC7 */
.form-field input:valid {
  border-color: #4caf50;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%234CAF50' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
}

/* \u9A8C\u8BC1\u5931\u8D25 */
.form-field input:invalid:not(:placeholder-shown) {
  border-color: #f44336;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23F44336' d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 20px;
}

/* \u805A\u7126\u72B6\u6001 */
.form-field input:focus {
  outline: none;
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

/* \u7981\u7528\u72B6\u6001 */
.form-field input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
}
`,paraId:29,tocIndex:13},{value:"\u4F2A\u5143\u7D20\u521B\u5EFA\u4E0D\u5728 DOM \u4E2D\u7684\u5143\u7D20,\u7528\u53CC\u5192\u53F7 ",paraId:30,tocIndex:14},{value:"::",paraId:30,tocIndex:14},{value:" \u8868\u793A\u3002",paraId:30,tocIndex:14},{value:"\u6700\u5E38\u7528\u7684\u4F2A\u5143\u7D20,\u53EF\u7528\u4E8E\u6DFB\u52A0\u88C5\u9970\u6027\u5185\u5BB9:",paraId:31,tocIndex:15},{value:`/* \u57FA\u7840\u7528\u6CD5 */
.icon::before {
  content: '\u2192';
  margin-right: 5px;
}

/* \u6E05\u9664\u6D6E\u52A8 */
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

/* \u88C5\u9970\u6027\u56FE\u6807 */
.external-link::after {
  content: '\u2197';
  font-size: 0.8em;
  margin-left: 3px;
}

/* \u5FC5\u586B\u6807\u8BB0 */
.required::before {
  content: '*';
  color: red;
  margin-right: 2px;
}

/* \u5F15\u53F7 */
blockquote::before {
  content: '"';
  font-size: 2em;
  color: #999;
}
`,paraId:32,tocIndex:15},{value:"\u91CD\u8981",paraId:33,tocIndex:15},{value:": ",paraId:33,tocIndex:15},{value:"::before",paraId:33,tocIndex:15},{value:" \u548C ",paraId:33,tocIndex:15},{value:"::after",paraId:33,tocIndex:15},{value:" \u751F\u6210\u7684\u662F\u884C\u7EA7\u5143\u7D20,\u4E0D\u80FD\u5E94\u7528\u4E8E\u66FF\u6362\u5143\u7D20(\u5982 ",paraId:33,tocIndex:15},{value:"<img>",paraId:33,tocIndex:15},{value:"\u3001",paraId:33,tocIndex:15},{value:"<input>",paraId:33,tocIndex:15},{value:"),\u56E0\u4E3A\u5B83\u4EEC\u7684\u5185\u5BB9\u4F1A\u88AB\u66FF\u6362\u3002",paraId:33,tocIndex:15},{value:`/* \u9996\u5B57\u6BCD */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
  float: left;
}

/* \u9996\u884C */
p::first-line {
  font-variant: small-caps;
}

/* \u9009\u4E2D\u7684\u6587\u672C */
::selection {
  background: yellow;
  color: black;
}

/* \u5360\u4F4D\u7B26\u6587\u672C */
input::placeholder {
  color: #999;
  font-style: italic;
}

/* \u5217\u8868\u6807\u8BB0 */
li::marker {
  color: #2196f3;
  font-weight: bold;
}
`,paraId:34,tocIndex:16},{value:"\u66F4\u591A\u4F2A\u5143\u7D20",paraId:35,tocIndex:16},{value:": \u67E5\u9605 ",paraId:35,tocIndex:16},{value:"MDN \u4F2A\u5143\u7D20\u5B8C\u6574\u5217\u8868",paraId:35,tocIndex:16},{value:`/* \u4F7F\u7528\u4F2A\u5143\u7D20\u521B\u5EFA\u60AC\u505C\u6548\u679C */
.card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;
}

/* \u4F7F\u7528 ::before \u521B\u5EFA\u60AC\u505C\u906E\u7F69 */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.8), rgba(156, 39, 176, 0.8));
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 1;
}

/* \u4F7F\u7528 ::after \u521B\u5EFA\u88C5\u9970\u56FE\u6807 */
.card::after {
  content: '\u2192';
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 2em;
  color: white;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s;
  z-index: 2;
}

/* \u60AC\u505C\u65F6\u7684\u6548\u679C */
.card:hover {
  transform: translateY(-5px);
}

.card:hover::before {
  opacity: 1;
}

.card:hover::after {
  opacity: 1;
  transform: translateX(0);
}

/* \u5361\u7247\u5185\u5BB9\u5728\u60AC\u505C\u65F6\u4FDD\u6301\u53EF\u89C1 */
.card-content {
  position: relative;
  z-index: 3;
}
`,paraId:36,tocIndex:17},{value:"CSS \u9009\u62E9\u5668\u5217\u8868\u4F7F\u7528\u9017\u53F7 ",paraId:37,tocIndex:19},{value:",",paraId:37,tocIndex:19},{value:" \u5206\u9694\u591A\u4E2A\u9009\u62E9\u5668,\u5171\u4EAB\u76F8\u540C\u7684\u6837\u5F0F\u58F0\u660E:",paraId:37,tocIndex:19},{value:`/* \u8FD9\u4E09\u79CD\u5199\u6CD5\u6548\u679C\u76F8\u540C */
span {
  border: red 2px solid;
}
div {
  border: red 2px solid;
}

/* \u9009\u62E9\u5668\u5217\u8868 */
span,
div {
  border: red 2px solid;
}

/* \u4F7F\u7528 :is() */
:is(span, div) {
  border: red 2px solid;
}
`,paraId:38,tocIndex:19},{value:"\u9009\u62E9\u5668\u5217\u8868\u4E2D\u7684\u5355\u4E2A\u65E0\u6548\u9009\u62E9\u5668\u4F1A\u4F7F\u6574\u4E2A\u89C4\u5219\u5931\u6548",paraId:39,tocIndex:20},{value:":",paraId:39,tocIndex:20},{value:`/* \u7B2C\u4E00\u7EC4\u89C4\u5219 */
h1 {
  font-family: sans-serif;
}
h2:invalid-pseudo {
  font-family: sans-serif;
} /* \u65E0\u6548,\u4F46\u4E0D\u5F71\u54CD\u5176\u4ED6\u89C4\u5219 */
h3 {
  font-family: sans-serif;
}

/* \u7B2C\u4E8C\u7EC4\u89C4\u5219 */
h1,
h2:invalid-pseudo,
h3 {
  font-family: sans-serif; /* \u6574\u4E2A\u89C4\u5219\u5931\u6548,h1 \u548C h3 \u4E5F\u4E0D\u4F1A\u5E94\u7528\u6837\u5F0F */
}
`,paraId:40,tocIndex:20},{value:"\u4F7F\u7528 ",paraId:41,tocIndex:21},{value:":is()",paraId:41,tocIndex:21},{value:" \u6216 ",paraId:41,tocIndex:21},{value:":where()",paraId:41,tocIndex:21},{value:" \u53EF\u4EE5\u521B\u5EFA\u53EF\u5BB9\u9519\u7684\u9009\u62E9\u5668\u5217\u8868:",paraId:41,tocIndex:21},{value:`/* \u65E0\u6548\u7684\u9009\u62E9\u5668\u4F1A\u88AB\u5FFD\u7565,\u6709\u6548\u7684\u9009\u62E9\u5668\u7EE7\u7EED\u751F\u6548 */
:is(h1, h2:invalid-pseudo, h3) {
  font-family: sans-serif; /* h1 \u548C h3 \u6B63\u5E38\u5E94\u7528\u6837\u5F0F */
}
`,paraId:42,tocIndex:21},{value:`<div>
  <p class="text1">\u6211\u662F\u6587\u672C1</p>
  <p class="text2">\u6211\u662F\u6587\u672C2</p>
  <p id="text3">\u6211\u662F\u6587\u672C3</p>
</div>
`,paraId:43,tocIndex:22},{value:`/* :is() - \u4F18\u5148\u7EA7\u4E3A\u53C2\u6570\u4E2D\u6700\u9AD8\u7684\u9009\u62E9\u5668 */
:is(#text3, .text1, .text2) {
  color: blue; /* \u4F18\u5148\u7EA7: 1-0-0 (ID \u9009\u62E9\u5668) */
}

/* :where() - \u4F18\u5148\u7EA7\u59CB\u7EC8\u4E3A 0 */
:where(#text3, .text1, .text2) {
  color: red; /* \u4F18\u5148\u7EA7: 0-0-0 */
}

/* \u666E\u901A\u9009\u62E9\u5668\u5217\u8868 - \u6BCF\u4E2A\u9009\u62E9\u5668\u4FDD\u6301\u5404\u81EA\u7684\u4F18\u5148\u7EA7 */
#text3,
.text1,
.text2 {
  color: yellow;
  /* #text3 \u4F18\u5148\u7EA7: 1-0-0 */
  /* .text1 \u4F18\u5148\u7EA7: 0-1-0 */
  /* .text2 \u4F18\u5148\u7EA7: 0-1-0 */
}
`,paraId:44,tocIndex:22},{value:"\u7ED3\u679C\u5206\u6790",paraId:45,tocIndex:22},{value:":",paraId:45,tocIndex:22},{value:"text1 \u548C text2",paraId:46,tocIndex:22},{value:": \u84DD\u8272 (",paraId:46,tocIndex:22},{value:":is()",paraId:46,tocIndex:22},{value:" \u7684\u4F18\u5148\u7EA7 ",paraId:46,tocIndex:22},{value:"1-0-0",paraId:46,tocIndex:22},{value:" \u6700\u9AD8)",paraId:46,tocIndex:22},{value:"text3",paraId:46,tocIndex:22},{value:": \u9EC4\u8272 (",paraId:46,tocIndex:22},{value:":is()",paraId:46,tocIndex:22},{value:" \u548C ",paraId:46,tocIndex:22},{value:"#text3",paraId:46,tocIndex:22},{value:" \u4F18\u5148\u7EA7\u76F8\u540C,\u4F46 ",paraId:46,tocIndex:22},{value:"#text3",paraId:46,tocIndex:22},{value:" \u540E\u5B9A\u4E49)",paraId:46,tocIndex:22},{value:"\u4F7F\u7528\u5EFA\u8BAE",paraId:47,tocIndex:22},{value:":",paraId:47,tocIndex:22},{value:":is()",paraId:48,tocIndex:22},{value:" \u9002\u5408\u9700\u8981\u4FDD\u6301\u4E00\u5B9A\u4F18\u5148\u7EA7\u7684\u573A\u666F",paraId:48,tocIndex:22},{value:":where()",paraId:48,tocIndex:22},{value:" \u9002\u5408\u521B\u5EFA\u4F4E\u4F18\u5148\u7EA7\u7684\u57FA\u7840\u6837\u5F0F,\u4FBF\u4E8E\u540E\u7EED\u8986\u76D6",paraId:48,tocIndex:22},{value:"\u907F\u514D\u4F7F\u7528\u901A\u7528\u9009\u62E9\u5668",paraId:49,tocIndex:24},{value:`/* \u907F\u514D */
* {
  margin: 0;
}
.container * {
  padding: 0;
}

/* \u63A8\u8350 */
body,
h1,
h2,
p {
  margin: 0;
}
`,paraId:50,tocIndex:24},{value:"\u907F\u514D\u8FC7\u5EA6\u5D4C\u5957",paraId:51,tocIndex:24},{value:`/* \u907F\u514D */
html body div.container ul li a {
  color: blue;
}

/* \u63A8\u8350 */
.nav-link {
  color: blue;
}
`,paraId:52,tocIndex:24},{value:"\u4F18\u5148\u4F7F\u7528\u7C7B\u9009\u62E9\u5668\u800C\u975E\u6807\u7B7E\u9009\u62E9\u5668",paraId:53,tocIndex:24},{value:`/* \u6027\u80FD\u8F83\u5DEE */
div p span {
  font-size: 14px;
}

/* \u6027\u80FD\u66F4\u597D */
.text-content {
  font-size: 14px;
}
`,paraId:54,tocIndex:24},{value:"\u907F\u514D\u4F7F\u7528\u5C5E\u6027\u9009\u62E9\u5668\u7684\u901A\u914D\u7B26(\u7279\u522B\u662F\u5728\u5927\u578B DOM \u4E2D)",paraId:55,tocIndex:24},{value:`/* \u6027\u80FD\u8F83\u5DEE */
[class*='icon'] {
  display: inline-block;
}

/* \u63A8\u8350\u6DFB\u52A0\u66F4\u5177\u4F53\u7684\u9650\u5B9A */
.btn [class*='icon'] {
  display: inline-block;
}
`,paraId:56,tocIndex:24},{value:"\u6D4F\u89C8\u5668\u4ECE\u53F3\u5230\u5DE6\u89E3\u6790\u9009\u62E9\u5668,\u56E0\u6B64",paraId:57,tocIndex:25},{value:"\u6700\u53F3\u4FA7\u7684\u9009\u62E9\u5668(\u5173\u952E\u9009\u62E9\u5668)\u5BF9\u6027\u80FD\u5F71\u54CD\u6700\u5927",paraId:57,tocIndex:25},{value:":",paraId:57,tocIndex:25},{value:`/* \u6D4F\u89C8\u5668\u5148\u627E\u6240\u6709 a \u5143\u7D20,\u518D\u8FC7\u6EE4 li \u5185\u7684,\u518D\u8FC7\u6EE4 .nav \u5185\u7684 */
.nav li a {
  color: blue;
}

/* \u66F4\u9AD8\u6548:\u5148\u627E .nav-link,\u65E0\u9700\u989D\u5916\u8FC7\u6EE4 */
.nav-link {
  color: blue;
}
`,paraId:58,tocIndex:25},{value:"\u5168\u5C40\u9009\u62E9\u5668 ",paraId:59,tocIndex:27},{value:"*",paraId:59,tocIndex:27},{value:" \u53EF\u4EE5\u8BA9\u67D0\u4E9B\u9009\u62E9\u5668\u7684\u610F\u56FE\u66F4\u660E\u786E:",paraId:59,tocIndex:27},{value:`/* \u4E0D\u592A\u6E05\u6670:\u53EF\u80FD\u88AB\u8BEF\u8BFB\u4E3A article \u5143\u7D20\u672C\u8EAB\u662F\u7B2C\u4E00\u4E2A\u5B50\u5143\u7D20 */
article:first-child {
  font-weight: bold;
}

/* \u6E05\u6670:article \u5143\u7D20\u5185\u7684\u4EFB\u4F55\u7B2C\u4E00\u4E2A\u5B50\u5143\u7D20 */
article *:first-child {
  font-weight: bold;
}
`,paraId:60,tocIndex:27},{value:"\u5F53\u6D4F\u89C8\u5668\u9047\u5230\u65E0\u6CD5\u89E3\u6790\u7684 CSS \u4EE3\u7801\u65F6\u7684\u884C\u4E3A:",paraId:61,tocIndex:28},{value:"\u65E0\u6548\u7684\u5C5E\u6027\u6216\u503C",paraId:62,tocIndex:28},{value:": \u6D4F\u89C8\u5668\u4F1A\u5FFD\u7565\u8BE5\u58F0\u660E,\u7EE7\u7EED\u89E3\u6790\u540E\u7EED\u7684 CSS",paraId:62,tocIndex:28},{value:"\u65E0\u6548\u7684\u9009\u62E9\u5668",paraId:62,tocIndex:28},{value:": \u6D4F\u89C8\u5668\u4F1A\u5FFD\u7565\u6574\u4E2A\u89C4\u5219\u96C6",paraId:62,tocIndex:28},{value:`/* \u5982\u679C\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 :has(),\u6574\u4E2A\u89C4\u5219\u4F1A\u88AB\u5FFD\u7565 */
div:has(> img) {
  display: flex; /* \u4E0D\u4F1A\u5E94\u7528 */
}

/* \u6E10\u8FDB\u589E\u5F3A:\u5148\u63D0\u4F9B\u57FA\u7840\u6837\u5F0F */
div {
  display: block; /* \u964D\u7EA7\u65B9\u6848 */
}
div:has(> img) {
  display: flex; /* \u652F\u6301\u7684\u6D4F\u89C8\u5668\u4F1A\u5E94\u7528\u8FD9\u4E2A */
}
`,paraId:63,tocIndex:28},{value:"\u4F7F\u7528\u8F83\u65B0\u7684\u9009\u62E9\u5668\u65F6\u9700\u8981\u8003\u8651\u6D4F\u89C8\u5668\u517C\u5BB9\u6027:",paraId:64,tocIndex:29},{value:":has()",paraId:65,tocIndex:29},{value:" - \u9700\u8981\u68C0\u67E5\u6D4F\u89C8\u5668\u652F\u6301\u5EA6",paraId:65,tocIndex:29},{value:":is()",paraId:65,tocIndex:29},{value:" - \u73B0\u4EE3\u6D4F\u89C8\u5668\u652F\u6301\u826F\u597D",paraId:65,tocIndex:29},{value:":where()",paraId:65,tocIndex:29},{value:" - \u73B0\u4EE3\u6D4F\u89C8\u5668\u652F\u6301\u826F\u597D",paraId:65,tocIndex:29},{value:":focus-visible",paraId:65,tocIndex:29},{value:" - \u9700\u8981\u8003\u8651\u964D\u7EA7\u65B9\u6848",paraId:65,tocIndex:29},{value:"\u53EF\u4EE5\u4F7F\u7528 ",paraId:66,tocIndex:29},{value:"@supports",paraId:66,tocIndex:29},{value:" \u8FDB\u884C\u7279\u6027\u68C0\u6D4B:",paraId:66,tocIndex:29},{value:`/* \u964D\u7EA7\u65B9\u6848 */
.element {
  outline: 2px solid blue;
}

/* \u5982\u679C\u652F\u6301 :focus-visible,\u4F7F\u7528\u66F4\u597D\u7684\u65B9\u6848 */
@supports selector(:focus-visible) {
  .element:focus {
    outline: none;
  }
  .element:focus-visible {
    outline: 2px solid blue;
  }
}
`,paraId:67,tocIndex:29},{value:`/* \u7ED3\u5408\u591A\u79CD\u9009\u62E9\u5668\u5B9E\u73B0\u54CD\u5E94\u5F0F\u5BFC\u822A */
.nav {
  display: flex;
  gap: 20px;
}

/* \u9009\u62E9\u6700\u540E\u4E00\u4E2A\u5BFC\u822A\u9879,\u79FB\u9664\u53F3\u8FB9\u8DDD */
.nav-item:last-child {
  margin-right: 0;
}

/* \u9009\u62E9\u5F53\u524D\u6FC0\u6D3B\u7684\u5BFC\u822A\u9879 */
.nav-item.active,
.nav-item:hover {
  color: #2196f3;
  border-bottom: 2px solid currentColor;
}

/* \u4F7F\u7528 :has() \u4E3A\u5305\u542B\u5B50\u83DC\u5355\u7684\u5BFC\u822A\u9879\u6DFB\u52A0\u6307\u793A\u5668 */
.nav-item:has(.submenu)::after {
  content: '\u25BC';
  font-size: 0.8em;
  margin-left: 5px;
}

/* \u4F7F\u7528 :not() \u6392\u9664\u7279\u5B9A\u9879 */
.nav-item:not(.no-hover):hover {
  background-color: rgba(33, 150, 243, 0.1);
}

/* \u4F7F\u7528 :nth-child() \u4E3A\u5947\u5076\u9879\u6DFB\u52A0\u4E0D\u540C\u6837\u5F0F */
.nav-item:nth-child(odd) {
  /* \u5947\u6570\u9879\u6837\u5F0F */
}

/* \u4F7F\u7528 :focus-visible \u6539\u5584\u952E\u76D8\u5BFC\u822A\u4F53\u9A8C */
.nav-item:focus-visible {
  outline: 2px solid #2196f3;
  outline-offset: 4px;
}
`,paraId:68,tocIndex:30},{value:"CSS \u9009\u62E9\u5668 - MDN",paraId:69,tocIndex:31},{value:"\u9009\u62E9\u5668\u4F18\u5148\u7EA7 - MDN",paraId:69,tocIndex:31},{value:"\u4F2A\u7C7B\u5B8C\u6574\u5217\u8868 - MDN",paraId:69,tocIndex:31},{value:"\u4F2A\u5143\u7D20\u5B8C\u6574\u5217\u8868 - MDN",paraId:69,tocIndex:31},{value:"Can I Use - CSS \u9009\u62E9\u5668\u517C\u5BB9\u6027\u67E5\u8BE2",paraId:69,tocIndex:31},{value:":has() \u7236\u5143\u7D20\u9009\u62E9\u5668\u8BE6\u89E3",paraId:69,tocIndex:31}]}}]);
