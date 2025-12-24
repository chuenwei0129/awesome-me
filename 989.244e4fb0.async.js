"use strict";(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[989],{10989:function(d,e,a){a.r(e),a.d(e,{texts:function(){return n}});const n=[{value:"\u6700\u91CD\u8981\u7684\u914D\u7F6E\u9879\uFF0C\u8FD9\u4E2A\u914D\u7F6E\u9ED8\u8BA4\u4E3A ",paraId:0,tocIndex:1},{value:"false",paraId:0,tocIndex:1},{value:"\uFF0C\u5EFA\u8BAE\u5728\u9879\u76EE\u4E2D\u5F00\u542F\u3002",paraId:0,tocIndex:1},{value:`{
  "compilerOptions": {
    "strict": true
  }
}
`,paraId:1,tocIndex:1},{value:"\u5F00\u542F ",paraId:2,tocIndex:1},{value:"strict",paraId:2,tocIndex:1},{value:" \u4F1A\u540C\u65F6\u542F\u7528\u4EE5\u4E0B\u6240\u6709\u4E25\u683C\u68C0\u67E5\u89C4\u5219:",paraId:2,tocIndex:1},{value:"strictNullChecks",paraId:3,tocIndex:1},{value:" - \u4E25\u683C\u7684 null/undefined \u68C0\u67E5",paraId:3,tocIndex:1},{value:"noImplicitAny",paraId:3,tocIndex:1},{value:" - \u7981\u6B62\u9690\u5F0F any \u7C7B\u578B",paraId:3,tocIndex:1},{value:"strictFunctionTypes",paraId:3,tocIndex:1},{value:" - \u4E25\u683C\u7684\u51FD\u6570\u7C7B\u578B\u68C0\u67E5",paraId:3,tocIndex:1},{value:"strictBindCallApply",paraId:3,tocIndex:1},{value:" - \u4E25\u683C\u7684 bind/call/apply \u68C0\u67E5",paraId:3,tocIndex:1},{value:"strictPropertyInitialization",paraId:3,tocIndex:1},{value:" - \u7C7B\u5C5E\u6027\u521D\u59CB\u5316\u68C0\u67E5",paraId:3,tocIndex:1},{value:"noImplicitThis",paraId:3,tocIndex:1},{value:" - \u7981\u6B62\u9690\u5F0F this",paraId:3,tocIndex:1},{value:"alwaysStrict",paraId:3,tocIndex:1},{value:" - \u59CB\u7EC8\u4F7F\u7528\u4E25\u683C\u6A21\u5F0F",paraId:3,tocIndex:1},{value:"\u63A8\u8350\u505A\u6CD5",paraId:4,tocIndex:1},{value:": \u65B0\u9879\u76EE\u76F4\u63A5\u5F00\u542F,\u8001\u9879\u76EE\u9010\u6B65\u8FC1\u79FB\u3002",paraId:4,tocIndex:1},{value:"\u9ED8\u8BA4\u60C5\u51B5",paraId:5,tocIndex:2},{value:": ",paraId:5,tocIndex:2},{value:'"strictNullChecks": false',paraId:5,tocIndex:2},{value:"(\u9ED8\u8BA4\u5173\u95ED),\u53EA\u6709\u5728\u8BBE\u7F6E ",paraId:5,tocIndex:2},{value:'"strict": true',paraId:5,tocIndex:2},{value:" \u65F6\u624D\u4F1A\u5F00\u542F\u3002",paraId:5,tocIndex:2},{value:'\u9632\u6B62 "cannot read property of undefined" \u9519\u8BEF\u7684\u5173\u952E\u914D\u7F6E\u3002',paraId:6,tocIndex:2},{value:`// \u5173\u95ED strictNullChecks \u65F6
const list = ['a', 'b'];
const target = list.find((u) => u === 'c'); // \u7C7B\u578B: string
console.log(target.toUpperCase()); // \u8FD0\u884C\u65F6\u9519\u8BEF!

// \u5F00\u542F strictNullChecks \u65F6
const target = list.find((u) => u === 'c'); // \u7C7B\u578B: string | undefined
console.log(target.toUpperCase()); // \u274C \u7F16\u8BD1\u9519\u8BEF,\u5FC5\u987B\u5148\u68C0\u67E5
console.log(target?.toUpperCase()); // \u2705 \u6B63\u786E
`,paraId:7,tocIndex:2},{value:"\u786E\u4FDD\u6240\u6709\u53D8\u91CF\u90FD\u6709\u660E\u786E\u7684\u7C7B\u578B\u3002",paraId:8,tocIndex:3},{value:`// \u274C \u9519\u8BEF: \u53C2\u6570\u9690\u5F0F\u5177\u6709 any \u7C7B\u578B
function fn(s) {
  console.log(s.includes('test'));
}

// \u2705 \u6B63\u786E
function fn(s: string) {
  console.log(s.includes('test'));
}
`,paraId:9,tocIndex:3},{value:"\u9ED8\u8BA4\u60C5\u51B5",paraId:10,tocIndex:4},{value:":",paraId:10,tocIndex:4},{value:'"noUnusedLocals": false',paraId:11,tocIndex:4},{value:"(\u9ED8\u8BA4\u5173\u95ED)",paraId:11,tocIndex:4},{value:'"noUnusedParameters": false',paraId:11,tocIndex:4},{value:"(\u9ED8\u8BA4\u5173\u95ED)",paraId:11,tocIndex:4},{value:"\u5B83\u4EEC",paraId:11,tocIndex:4},{value:"\u4E0D\u5305\u542B",paraId:11,tocIndex:4},{value:"\u5728 ",paraId:11,tocIndex:4},{value:'"strict": true',paraId:11,tocIndex:4},{value:" \u4E2D,\u9700\u8981\u5355\u72EC\u914D\u7F6E",paraId:11,tocIndex:4},{value:"\u533A\u522B\u8BF4\u660E",paraId:12,tocIndex:4},{value:":",paraId:12,tocIndex:4},{value:"1. ",paraId:13,tocIndex:4},{value:"noUnusedLocals",paraId:13,tocIndex:4},{value:" - \u68C0\u67E5\u672A\u4F7F\u7528\u7684\u5C40\u90E8\u53D8\u91CF",paraId:13,tocIndex:4},{value:`// \u5F53 noUnusedLocals: true \u65F6
function example() {
  const used = '\u6211\u4F1A\u88AB\u4F7F\u7528'; // \u2705
  const unused = '\u6211\u4E0D\u4F1A\u88AB\u4F7F\u7528'; // \u274C \u9519\u8BEF:\u672A\u4F7F\u7528\u7684\u5C40\u90E8\u53D8\u91CF
  console.log(used);
}
`,paraId:14,tocIndex:4},{value:"2. ",paraId:15,tocIndex:4},{value:"noUnusedParameters",paraId:15,tocIndex:4},{value:" - \u68C0\u67E5\u672A\u4F7F\u7528\u7684\u51FD\u6570\u53C2\u6570",paraId:15,tocIndex:4},{value:`// \u5F53 noUnusedParameters: true \u65F6
function calculate(a: number, b: number, c: number) {
  // \u274C \u9519\u8BEF:\u672A\u4F7F\u7528\u7684\u53C2\u6570 'b', 'c'
  return a * 2;
}

// \u89E3\u51B3\u65B9\u6848:\u4EE5\u4E0B\u5212\u7EBF\u5F00\u5934\u5FFD\u7565
function calculateFixed(a: number, _b: number, _c: number) {
  return a * 2; // \u2705
}
`,paraId:16,tocIndex:4},{value:"\u786E\u4FDD\u6240\u6709\u6267\u884C\u8DEF\u5F84\u90FD\u6709\u8FD4\u56DE\u503C\u3002\u9ED8\u8BA4\u662F\u5173\u95ED\u7684\uFF0C\u9700\u8981\u5355\u72EC\u914D\u7F6E\u3002",paraId:17,tocIndex:5},{value:`// \u274C \u9519\u8BEF: \u7F3A\u5C11 return
function handle(color: 'blue' | 'black'): string {
  if (color === 'blue') {
    return 'beats';
  } else {
    ('bose'); // \u5FD8\u8BB0 return
  }
}

// \u2705 \u6B63\u786E
function handle(color: 'blue' | 'black'): string {
  if (color === 'blue') {
    return 'beats';
  } else {
    return 'bose';
  }
}
`,paraId:18,tocIndex:5},{value:"\u662F\u4EC0\u4E48\uFF1F",paraId:19,tocIndex:6},{value:`
\u4E00\u4E2A\u975E\u5E38\u4E25\u683C\u7684\u7C7B\u578B\u68C0\u67E5\u9009\u9879\u3002\u5F53\u5B83\u4E3A `,paraId:19,tocIndex:6},{value:"true",paraId:19,tocIndex:6},{value:" \u65F6\uFF0CTypeScript \u4F1A\u4E25\u683C\u533A\u5206 ",paraId:19,tocIndex:6},{value:"\u201C\u5C5E\u6027\u4E0D\u5B58\u5728\u201D",paraId:19,tocIndex:6},{value:" \u548C ",paraId:19,tocIndex:6},{value:"\u201C\u5C5E\u6027\u503C\u4E3A ",paraId:19,tocIndex:6},{value:"undefined",paraId:19,tocIndex:6},{value:"\u201D",paraId:19,tocIndex:6},{value:"\u3002",paraId:19,tocIndex:6},{value:"\u4E3A\u4EC0\u4E48\u662F\u9677\u9631\uFF1F",paraId:20,tocIndex:6},{value:`
\u56E0\u4E3A\u5B83\u6539\u53D8\u4E86 JavaScript \u4E2D\u4E00\u4E2A\u5E38\u89C1\u7684\u6A21\u7CCA\u5730\u5E26\uFF0C\u6253\u7834\u4E86\u591A\u6570\u4EBA\u548C\u8BB8\u591A\u73B0\u6709\u5E93\u7684\u9ED8\u8BA4\u4E60\u60EF\u3002`,paraId:20,tocIndex:6},{value:"\u5177\u4F53\u9677\u9631\u573A\u666F\uFF1A",paraId:21,tocIndex:6},{value:`
\u5728\u666E\u901A\u6A21\u5F0F\uFF08`,paraId:21,tocIndex:6},{value:"exactOptionalPropertyTypes: false",paraId:21,tocIndex:6},{value:" \u6216\u9ED8\u8BA4\uFF09\u4E0B\uFF1A",paraId:21,tocIndex:6},{value:`interface User {
  name: string;
  age?: number; // age \u53EF\u4EE5\u662F number\uFF0C\u4E5F\u53EF\u4EE5\u662F undefined\uFF0C\u4E5F\u53EF\u4EE5\u4E0D\u5B58\u5728
}

const user1: User = { name: 'Alice' }; // OK - \u5C5E\u6027\u4E0D\u5B58\u5728
const user2: User = { name: 'Bob', age: undefined }; // OK - \u5C5E\u6027\u5B58\u5728\uFF0C\u503C\u4E3A undefined
`,paraId:22,tocIndex:6},{value:"\u5728\u4E25\u683C\u6A21\u5F0F\uFF08",paraId:23,tocIndex:6},{value:"exactOptionalPropertyTypes: true",paraId:23,tocIndex:6},{value:"\uFF09\u4E0B\uFF1A",paraId:23,tocIndex:6},{value:`const user1: User = { name: 'Alice' }; // OK - \u5C5E\u6027\u4E0D\u5B58\u5728
const user2: User = { name: 'Bob', age: undefined }; // ERROR! \u4F60\u4E0D\u80FD\u663E\u5F0F\u5730\u5C06 age \u8BBE\u7F6E\u4E3A undefined\u3002
`,paraId:24,tocIndex:6},{value:"\u9677\u9631\u5728\u4E8E",paraId:25,tocIndex:6},{value:"\uFF1A\u5F88\u591A JavaScript \u4EE3\u7801\u548C\u5E93\uFF08\u4F8B\u5982\uFF0C\u4F7F\u7528 ",paraId:25,tocIndex:6},{value:"obj.hasOwnProperty(\u2018key\u2019)",paraId:25,tocIndex:6},{value:" \u6216 ",paraId:25,tocIndex:6},{value:"{ ...spread }",paraId:25,tocIndex:6},{value:" \u8FD0\u7B97\u7684\u903B\u8F91\uFF09\u5E76\u4E0D\u533A\u5206\u8FD9\u4E24\u79CD\u72B6\u6001\u3002\u5F53\u4F60\u5F00\u542F\u8FD9\u4E2A\u9009\u9879\u540E\uFF0C\u4F60\u53EF\u80FD\u4F1A\u53D1\u73B0\u5F88\u591A\u4E4B\u524D\u80FD\u6B63\u5E38\u5DE5\u4F5C\u7684\u4EE3\u7801\uFF08\u5C24\u5176\u662F\u5904\u7406\u5916\u90E8 API \u54CD\u5E94\u6216\u914D\u7F6E\u5BF9\u8C61\u65F6\uFF09\u73B0\u5728\u4F1A\u7C7B\u578B\u62A5\u9519\u3002",paraId:25,tocIndex:6},{value:"\u5982\u4F55\u89C4\u907F\u9677\u9631\uFF1F",paraId:26,tocIndex:6},{value:"\u5BF9\u4E8E\u5927\u591A\u6570\u5E94\u7528\u9879\u76EE",paraId:27,tocIndex:6},{value:"\uFF1A",paraId:27,tocIndex:6},{value:"\u4E0D\u5EFA\u8BAE\u5F00\u542F",paraId:27,tocIndex:6},{value:"\u3002\u8FD9\u4E2A\u9009\u9879\u8FC7\u4E8E\u4E25\u683C\uFF0C\u53EF\u80FD\u4F1A\u7ED9\u4F60\u5E26\u6765\u5F88\u591A\u4E0D\u5FC5\u8981\u7684\u9EBB\u70E6\uFF0C\u6536\u76CA\u4E0E\u6210\u672C\u4E0D\u6210\u6B63\u6BD4\u3002",paraId:27,tocIndex:6},{value:"\u5BF9\u4E8E\u8FFD\u6C42\u6781\u81F4\u7C7B\u578B\u5B89\u5168\u7684\u6838\u5FC3\u5E93",paraId:27,tocIndex:6},{value:"\uFF1A\u53EF\u4EE5\u8003\u8651\u5F00\u542F\uFF0C\u5B83\u80FD\u4FDD\u8BC1\u4F60\u7684\u5E93\u63A5\u53E3\u8BED\u4E49\u975E\u5E38\u7CBE\u786E\u3002\u4F46\u8981\u505A\u597D\u5FC3\u7406\u51C6\u5907\uFF0C\u9700\u8981\u66F4\u7EC6\u81F4\u5730\u5904\u7406\u53EF\u9009\u5C5E\u6027\u3002",paraId:27,tocIndex:6},{value:"\u5982\u679C\u9700\u8981\u663E\u5F0F\u8BBE\u7F6E ",paraId:27,tocIndex:6},{value:"undefined",paraId:27,tocIndex:6},{value:"\uFF0C\u4F60\u5E94\u8BE5\u4FEE\u6539\u7C7B\u578B\u5B9A\u4E49\uFF0C\u660E\u786E\u8868\u793A\u8BE5\u5C5E\u6027\u53EF\u4EE5\u63A5\u53D7 ",paraId:27,tocIndex:6},{value:"undefined",paraId:27,tocIndex:6},{value:`\uFF1A
`,paraId:27,tocIndex:6},{value:`interface User {
  name: string;
  age?: number | undefined; // \u660E\u786E\u5141\u8BB8 undefined
}
// \u73B0\u5728\uFF0C\u5728 exactOptionalPropertyTypes: true \u4E0B\uFF0Cuser2 \u4E5F\u662F\u5408\u6CD5\u7684\u4E86\u3002
`,paraId:28,tocIndex:6},{value:"\u51B3\u5B9A\u7F16\u8BD1\u76EE\u6807\u548C\u53EF\u7528\u7684 API\u3002",paraId:29,tocIndex:8},{value:'{\n  "compilerOptions": {\n    // \u66F4\u6539 `target` \u4F1A\u81EA\u52A8\u5F71\u54CD `lib` \u7684\u9ED8\u8BA4\u503C\n    "target": "ES2018", // \u51B3\u5B9A\u4E86\u6784\u5EFA\u4EE3\u7801\u4F7F\u7528\u7684\u8BED\u6CD5,\u4F1A\u8FDB\u884C\u8BED\u6CD5\u964D\u7EA7(\u5982\u7BAD\u5934\u51FD\u6570\u3001async/await)\uFF0C\u63A8\u8350: ES2018 \u6216\u66F4\u9AD8\n    "lib": ["ES2018", "DOM"] // \u51B3\u5B9A\u4E86\u53EF\u7528\u7684 API(\u5982 `Array.replaceAll`\u3001`Promise` \u7B49)\n  }\n}\n',paraId:30,tocIndex:8},{value:"\u5E38\u89C1\u914D\u7F6E",paraId:31,tocIndex:8},{value:":",paraId:31,tocIndex:8},{value:"Web \u9879\u76EE: ",paraId:32,tocIndex:8},{value:'"lib": ["ES2018", "DOM"]',paraId:32,tocIndex:8},{value:"Node \u9879\u76EE: ",paraId:32,tocIndex:8},{value:'"lib": ["ES2018"]',paraId:32,tocIndex:8},{value:"(\u4E0D\u9700\u8981 DOM)",paraId:32,tocIndex:8},{value:"\u73B0\u4EE3\u6D4F\u89C8\u5668: ",paraId:32,tocIndex:8},{value:'"target": "ES2020"',paraId:32,tocIndex:8},{value:" \u6216 ",paraId:32,tocIndex:8},{value:'"ESNext"',paraId:32,tocIndex:8},{value:"\u539F\u7406\u8BF4\u660E",paraId:33,tocIndex:8},{value:":",paraId:33,tocIndex:8},{value:"TypeScript \u4F1A\u81EA\u52A8\u52A0\u8F7D\u5185\u7F6E\u7684 ",paraId:34,tocIndex:8},{value:"lib.d.ts",paraId:34,tocIndex:8},{value:" \u7B49\u58F0\u660E\u6587\u4EF6,\u800C\u52A0\u8F7D\u54EA\u4E9B\u6587\u4EF6\u5219\u548C lib \u914D\u7F6E\u6709\u5173\u3002",paraId:34,tocIndex:8},{value:"target \u5BF9 lib \u7684\u5F71\u54CD\u5728\u4E8E\uFF0C\u5F53\u4F60\u7684 target \u4E3A\u66F4\u9AD8\u7684\u7248\u672C\u65F6,\u5B83\u4F1A\u81EA\u52A8\u5730\u5C06\u8FD9\u4E2A\u7248\u672C\u65B0\u8BED\u6CD5\u5BF9\u5E94\u7684 lib \u58F0\u660E\u52A0\u8F7D\u8FDB\u6765,target \u4E3A ",paraId:35,tocIndex:8},{value:'"es2021"',paraId:35,tocIndex:8},{value:" \u65F6,\u4F60\u4E0D\u9700\u8981\u6DFB\u52A0 ",paraId:35,tocIndex:8},{value:'"es2021"',paraId:35,tocIndex:8},{value:" \u5230 lib \u4E2D\u4E5F\u80FD\u4F7F\u7528 ECMAScript2021 \u7684\u65B0\u65B9\u6CD5 replaceAll\u3002\u8FD9\u662F\u56E0\u4E3A\u65E2\u7136\u4F60\u7684\u7F16\u8BD1\u4EA7\u7269\u90FD\u5230\u8FD9\u4E2A\u7248\u672C\u4E86,\u90A3\u4F60\u5F53\u7136\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u8FD9\u4E2A\u65B9\u6CD5\u5566\u3002",paraId:35,tocIndex:8},{value:"\u9664\u4E86\u9AD8\u7248\u672C\u8BED\u6CD5\u4EE5\u5916,lib \u5176\u5B9E\u4E5F\u548C\u4F60\u7684\u5B9E\u9645\u8FD0\u884C\u73AF\u5883\u6709\u5173\u3002\u6BD4\u5982,\u5F53\u4F60\u7684\u4EE3\u7801\u4EC5\u5728 Node \u73AF\u5883\u4E0B\u8FD0\u884C\u65F6,\u4F60\u7684 lib \u4E2D\u4E0D\u5E94\u5F53\u5305\u542B ",paraId:36,tocIndex:8},{value:'"DOM"',paraId:36,tocIndex:8},{value:" \u8FD9\u4E2A\u503C\u3002\u5BF9\u5E94\u7684,\u4EE3\u7801\u4E2D\u65E0\u6CD5\u4F7F\u7528 window\u3001document \u7B49\u5168\u5C40\u53D8\u91CF\u3002",paraId:36,tocIndex:8},{value:"\u5982\u679C\u4F60\u5E0C\u671B\u4F7F\u7528\u81EA\u5DF1\u63D0\u4F9B\u7684 lib \u58F0\u660E\u5B9A\u4E49,\u53EF\u4EE5\u542F\u7528 noLib \u914D\u7F6E,\u8FD9\u6837 TypeScript \u5C06\u4E0D\u4F1A\u53BB\u52A0\u8F7D\u5185\u7F6E\u7684\u7C7B\u578B\u5B9A\u4E49,\u4F46\u4F60\u9700\u8981\u4E3A\u6240\u6709\u5185\u7F6E\u5BF9\u8C61\u63D0\u4F9B\u7C7B\u578B\u5B9A\u4E49(String\u3001Function\u3001Object \u7B49)\u624D\u80FD\u8FDB\u884C\u7F16\u8BD1\u3002\u5982\u679C\u4F60\u7684\u8FD0\u884C\u73AF\u5883\u4E2D\u5B58\u5728\u5927\u91CF\u7684\u5B9A\u5236\u65B9\u6CD5,\u751A\u81F3\u5BF9\u539F\u672C\u7684\u5185\u7F6E\u65B9\u6CD5\u505A\u4E86\u8986\u76D6,\u5C31\u53EF\u4EE5\u4F7F\u7528\u6B64\u914D\u7F6E\u6765\u52A0\u8F7D\u81EA\u5DF1\u7684\u7C7B\u578B\u58F0\u660E\u3002",paraId:37,tocIndex:8},{value:"\u6A21\u5757\u7CFB\u7EDF\u914D\u7F6E\u3002",paraId:38,tocIndex:9},{value:`{
  "compilerOptions": {
    "module": "ESNext", // \u6216 "CommonJS"
    "moduleResolution": "node" // \u9ED8\u8BA4\u503C,\u63A8\u8350\u4F7F\u7528
  }
}
`,paraId:39,tocIndex:9},{value:"module \u914D\u7F6E\u63A7\u5236\u6700\u7EC8 JavaScript \u4EA7\u7269\u4F7F\u7528\u7684\u6A21\u5757\u6807\u51C6,\u5E38\u89C1\u7684\u5305\u62EC CommonJs\u3001ES6\u3001ESNext \u4EE5\u53CA NodeNext \u7B49(\u5B9E\u9645\u7684\u503C\u4E5F\u53EF\u4EE5\u662F\u5168\u5C0F\u5199\u7684\u5F62\u5F0F)\u3002\u53E6\u5916\u4E5F\u652F\u6301 AMD\u3001UMD\u3001System \u7B49\u6A21\u5757\u6807\u51C6\u3002",paraId:40,tocIndex:9},{value:"TypeScript \u4F1A\u968F\u7740\u7248\u672C\u66F4\u65B0\u65B0\u589E\u53EF\u7528\u7684 module \u9009\u9879,\u5982\u5728 4.5 \u7248\u672C\u65B0\u589E\u4E86 ",paraId:41,tocIndex:9},{value:"es2022",paraId:41,tocIndex:9},{value:" \u914D\u7F6E,\u652F\u6301\u4E86 Top-Level Await \u8BED\u6CD5\u3002\u5728 4.7 \u7248\u672C\u8FD8\u65B0\u589E\u4E86 ",paraId:41,tocIndex:9},{value:"node16",paraId:41,tocIndex:9},{value:" \u548C ",paraId:41,tocIndex:9},{value:"nodenext",paraId:41,tocIndex:9},{value:" \u4E24\u4E2A module \u914D\u7F6E,\u4F7F\u7528\u8FD9\u4E24\u4E2A\u914D\u7F6E\u610F\u5473\u7740\u4F60\u6784\u5EFA\u7684 npm \u5305\u6216\u8005\u4EE3\u7801\u4EC5\u5728 node \u73AF\u5883\u4E0B\u8FD0\u884C,\u56E0\u6B64 TypeScript \u4F1A\u5BF9\u5E94\u5730\u542F\u7528\u5BF9 Node ESM \u7684\u652F\u6301\u3002",paraId:41,tocIndex:9},{value:"moduleResolution \u914D\u7F6E\u6307\u5B9A\u4E86\u6A21\u5757\u7684\u89E3\u6790\u7B56\u7565,\u53EF\u4EE5\u914D\u7F6E\u4E3A node \u6216\u8005 classic,\u5176\u4E2D node \u4E3A\u9ED8\u8BA4\u503C,\u800C classic \u4E3B\u8981\u4F5C\u5411\u540E\u517C\u5BB9\u7528,\u57FA\u672C\u4E0D\u63A8\u8350\u4F7F\u7528\u3002",paraId:42,tocIndex:9},{value:"\u9996\u5148\u6765\u770B node \u89E3\u6790\u6A21\u5F0F,\u4ECE\u540D\u5B57\u4E5F\u80FD\u770B\u51FA\u6765\u5B83\u5176\u5B9E\u5C31\u662F\u4E0E node \u4E00\u81F4\u7684\u89E3\u6790\u6A21\u5F0F\u3002\u5047\u8BBE\u6211\u4EEC\u6709\u4E2A ",paraId:43,tocIndex:9},{value:"src/index.js",paraId:43,tocIndex:9},{value:",\u5176\u4E2D\u5B58\u5728\u57FA\u4E8E\u76F8\u5BF9\u8DEF\u5F84 ",paraId:43,tocIndex:9},{value:'const foo = require("./foo")',paraId:43,tocIndex:9},{value:" \u7684\u5BFC\u5165,\u5219\u4F1A\u4F9D\u6B21\u6309\u7167\u4EE5\u4E0B\u987A\u5E8F\u89E3\u6790:",paraId:43,tocIndex:9},{value:"/<root>/<project>/src/foo.js",paraId:44,tocIndex:9},{value:" \u6587\u4EF6\u662F\u5426\u5B58\u5728?",paraId:44,tocIndex:9},{value:"/<root>/<project>/src/foo",paraId:44,tocIndex:9},{value:` \u662F\u5426\u662F\u4E00\u4E2A\u6587\u4EF6\u5939?
`,paraId:44,tocIndex:9},{value:"\u6B64\u6587\u4EF6\u5939\u5185\u90E8\u662F\u5426\u5305\u542B ",paraId:45,tocIndex:9},{value:"package.json",paraId:45,tocIndex:9},{value:",\u4E14\u5176\u4E2D\u4F7F\u7528 ",paraId:45,tocIndex:9},{value:"main",paraId:45,tocIndex:9},{value:" \u5C5E\u6027\u63CF\u8FF0\u4E86\u8FD9\u4E2A\u6587\u4EF6\u5939\u7684\u5165\u53E3\u6587\u4EF6?",paraId:45,tocIndex:9},{value:"\u5047\u8BBE ",paraId:45,tocIndex:9},{value:"main",paraId:45,tocIndex:9},{value:" \u6307\u5411 ",paraId:45,tocIndex:9},{value:"dist/index.js",paraId:45,tocIndex:9},{value:",\u90A3\u8FD9\u91CC\u4F1A\u5C1D\u8BD5\u5BFB\u627E ",paraId:45,tocIndex:9},{value:"/<root>/<project>/src/foo/dist/index.js",paraId:45,tocIndex:9},{value:" \u6587\u4EF6",paraId:45,tocIndex:9},{value:"\u5426\u5219\u7684\u8BDD,\u8BF4\u660E\u8FD9\u4E2A\u6587\u4EF6\u4E0D\u662F\u4E00\u4E2A\u6A21\u5757\u6216\u8005\u6CA1\u6709\u5B9A\u4E49\u6A21\u5757\u5165\u53E3,\u6211\u4EEC\u8D70\u9ED8\u8BA4\u7684 ",paraId:45,tocIndex:9},{value:"/foo/index.js",paraId:45,tocIndex:9},{value:"\u3002",paraId:45,tocIndex:9},{value:"\u800C\u5BF9\u4E8E\u7EDD\u5BF9\u8DEF\u5F84,\u5373 ",paraId:46,tocIndex:9},{value:'const foo = require("foo")',paraId:46,tocIndex:9},{value:",\u5176\u53EA\u4F1A\u5728 ",paraId:46,tocIndex:9},{value:"node_modules",paraId:46,tocIndex:9},{value:" \u4E2D\u5BFB\u627E,\u4ECE ",paraId:46,tocIndex:9},{value:"/<root>/<project>/src/node_modules",paraId:46,tocIndex:9},{value:" \u5F00\u59CB,\u5230 ",paraId:46,tocIndex:9},{value:"/<root>/<project>/node_modules",paraId:46,tocIndex:9},{value:",\u518D\u9010\u7EA7\u5411\u4E0A\u76F4\u5230\u6839\u76EE\u5F55\u3002",paraId:46,tocIndex:9},{value:"TypeScript \u5728\u8FD9\u57FA\u7840\u4E0A\u589E\u52A0\u4E86\u5BF9 ",paraId:47,tocIndex:9},{value:".ts",paraId:47,tocIndex:9},{value:" ",paraId:47,tocIndex:9},{value:".tsx",paraId:47,tocIndex:9},{value:" \u548C ",paraId:47,tocIndex:9},{value:".d.ts",paraId:47,tocIndex:9},{value:"(\u4F18\u5148\u7EA7\u6309\u7167\u8FD9\u4E00\u987A\u5E8F)\u6269\u5C55\u540D\u7684\u6587\u4EF6\u89E3\u6790,\u4EE5\u53CA\u5BF9 ",paraId:47,tocIndex:9},{value:"package.json",paraId:47,tocIndex:9},{value:" \u4E2D ",paraId:47,tocIndex:9},{value:"types",paraId:47,tocIndex:9},{value:" \u5B57\u6BB5\u7684\u52A0\u8F7D\u3002",paraId:47,tocIndex:9},{value:"\u63A7\u5236\u8F93\u51FA\u76EE\u5F55\u7ED3\u6784\u3002",paraId:48,tocIndex:10},{value:`{
  "compilerOptions": {
    "outDir": "./dist", // \u8F93\u51FA\u76EE\u5F55
    "rootDir": "./src" // \u6E90\u7801\u6839\u76EE\u5F55
  }
}
`,paraId:49,tocIndex:10},{value:"rootDir \u914D\u7F6E\u51B3\u5B9A\u4E86\u9879\u76EE\u6587\u4EF6\u7684\u6839\u76EE\u5F55,\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u5B83\u662F\u9879\u76EE\u5185",paraId:50,tocIndex:10},{value:"\u5305\u62EC",paraId:50,tocIndex:10},{value:"\u7684\u6240\u6709 ",paraId:50,tocIndex:10},{value:".ts",paraId:50,tocIndex:10},{value:" \u6587\u4EF6\u7684\u6700\u957F\u516C\u5171\u8DEF\u5F84,\u8FD9\u91CC\u6709\u51E0\u5904\u9700\u8981\u6CE8\u610F:",paraId:50,tocIndex:10},{value:"\u5305\u62EC",paraId:51,tocIndex:10},{value:"\u6307\u7684\u662F include \u6216 files \u4E2D\u5305\u62EC\u7684 ",paraId:51,tocIndex:10},{value:".ts",paraId:51,tocIndex:10},{value:" \u6587\u4EF6,\u8FD9\u4E9B\u6587\u4EF6\u4E00\u822C\u6765\u8BF4\u4E0D\u4F1A\u548C tsconfig.json \u4F4D\u4E8E\u540C\u4E00\u76EE\u5F55\u5C42\u7EA7",paraId:51,tocIndex:10},{value:"\u4E0D\u5305\u62EC ",paraId:51,tocIndex:10},{value:".d.ts",paraId:51,tocIndex:10},{value:" \u6587\u4EF6,\u56E0\u4E3A\u58F0\u660E\u6587\u4EF6\u53EF\u80FD\u4F1A\u548C tsconfig.json \u4F4D\u4E8E\u540C\u4E00\u5C42\u7EA7",paraId:51,tocIndex:10},{value:"\u6700\u957F\u516C\u5171\u8DEF\u5F84\u53C8\u662F\u4EC0\u4E48?\u7B80\u5355\u5730\u8BF4,\u5B83\u5C31\u662F\u67D0\u4E00\u4E2A",paraId:52,tocIndex:10},{value:"\u5305\u542B\u4E86\u6240\u6709\u88AB\u5305\u62EC\u7684 ",paraId:52,tocIndex:10},{value:".ts",paraId:52,tocIndex:10},{value:" \u6587\u4EF6\u7684\u6587\u4EF6\u5939",paraId:52,tocIndex:10},{value:",TypeScript \u4F1A\u627E\u5230\u8FD9\u4E48\u4E00\u4E2A\u6587\u4EF6\u5939,\u9ED8\u8BA4\u5C06\u5176\u4F5C\u4E3A rootDir\u3002",paraId:52,tocIndex:10},{value:`PROJECT
\u251C\u2500\u2500 src
\u2502   \u251C\u2500\u2500 index.ts
\u2502   \u251C\u2500\u2500 app.ts
\u2502   \u251C\u2500\u2500 utils
\u2502   \u2502   \u251C\u2500\u2500 helpers.ts
\u251C\u2500\u2500 declare.d.ts
\u251C\u2500\u2500 tsconfig.json
`,paraId:53,tocIndex:10},{value:"\u5728\u8FD9\u4E2A\u4F8B\u5B50\u4E2D,rootDir \u4F1A\u88AB\u63A8\u65AD\u4E3A src\u3002",paraId:54,tocIndex:10},{value:`PROJECT
\u251C\u2500\u2500 env
\u2502   \u251C\u2500\u2500 env.dev.ts
\u2502   \u251C\u2500\u2500 env.prod.ts
\u251C\u2500\u2500 app
\u2502   \u251C\u2500\u2500 index.ts
\u251C\u2500\u2500 declare.d.ts
\u251C\u2500\u2500 tsconfig.json
`,paraId:55,tocIndex:10},{value:"\u5728\u8FD9\u4E2A\u4F8B\u5B50\u4E2D,rootDir \u4F1A\u88AB\u63A8\u65AD\u4E3A ",paraId:56,tocIndex:10},{value:".",paraId:56,tocIndex:10},{value:",\u5373 ",paraId:56,tocIndex:10},{value:"tsconfig.json",paraId:56,tocIndex:10},{value:" \u6240\u5728\u7684\u76EE\u5F55\u3002",paraId:56,tocIndex:10},{value:"\u6784\u5EFA\u4EA7\u7269\u7684\u76EE\u5F55\u7ED3\u6784\u4F1A\u53D7\u5230\u8FD9\u4E00\u914D\u7F6E\u7684\u5F71\u54CD,\u5047\u8BBE outDir \u88AB\u914D\u7F6E\u4E3A ",paraId:57,tocIndex:10},{value:"dist",paraId:57,tocIndex:10},{value:",\u5728\u4E0A\u9762\u7684\u7B2C\u4E00\u79CD\u60C5\u51B5\u4E0B,\u6700\u7EC8\u7684\u4EA7\u7269\u4F1A\u88AB\u5168\u90E8\u653E\u7F6E\u5728 dist \u76EE\u5F55\u4E0B,\u4FDD\u6301\u5B83\u4EEC\u5728 ",paraId:57,tocIndex:10},{value:"src",paraId:57,tocIndex:10},{value:"(\u4E5F\u5C31\u662F rootDir)\u5185\u7684\u76EE\u5F55\u7ED3\u6784:",paraId:57,tocIndex:10},{value:`PROJECT
\u251C\u2500\u2500 dist
\u2502   \u251C\u2500\u2500 index.js
\u2502   \u251C\u2500\u2500 index.d.ts
\u2502   \u251C\u2500\u2500 app.js
\u2502   \u251C\u2500\u2500 app.d.ts
\u2502   \u251C\u2500\u2500 utils
\u2502   \u2502   \u251C\u2500\u2500 helpers.js
\u2502   \u2502   \u251C\u2500\u2500 helpers.d.ts
`,paraId:58,tocIndex:10},{value:"\u5982\u679C\u4F60\u5C06 rootDir \u66F4\u6539\u4E3A\u63A8\u5BFC\u5F97\u5230\u7684 rootDir \u7684\u7236\u7EA7\u76EE\u5F55,\u6BD4\u5982\u5728\u8FD9\u91CC\u628A\u5B83\u66F4\u6539\u5230\u4E86\u9879\u76EE\u6839\u76EE\u5F55 ",paraId:59,tocIndex:10},{value:".",paraId:59,tocIndex:10},{value:"\u3002\u6B64\u65F6 ",paraId:59,tocIndex:10},{value:"src",paraId:59,tocIndex:10},{value:" \u4F1A\u88AB\u89C6\u4E3A rootDir \u7684\u4E00\u90E8\u5206,\u56E0\u6B64\u6700\u7EC8\u6784\u5EFA\u76EE\u5F55\u7ED3\u6784\u4E2D\u4F1A\u591A\u51FA ",paraId:59,tocIndex:10},{value:"src",paraId:59,tocIndex:10},{value:" \u8FD9\u4E00\u7EA7:",paraId:59,tocIndex:10},{value:`PROJECT
\u251C\u2500\u2500 dist
\u251C\u2500\u2500 \u251C\u2500\u2500src
\u2502      \u251C\u2500\u2500 index.js
\u2502      \u251C\u2500\u2500 index.d.ts
\u2502      \u251C\u2500\u2500 app.js
\u2502      \u251C\u2500\u2500 app.d.ts
\u2502      \u251C\u2500\u2500 utils
\u2502      \u2502   \u251C\u2500\u2500 helpers.js
\u2502      \u2502   \u251C\u2500\u2500 helpers.d.ts
`,paraId:60,tocIndex:10},{value:"\u9700\u8981\u6CE8\u610F\u7684\u662F,\u5982\u679C\u4F60\u663E\u5F0F\u6307\u5B9A rootDir,\u9700\u8981\u786E\u4FDD\u5176\u5305\u542B\u4E86\u6240\u6709 ",paraId:61,tocIndex:10},{value:'"\u88AB\u5305\u62EC"',paraId:61,tocIndex:10},{value:" \u7684\u6587\u4EF6,\u56E0\u4E3A TypeScript \u9700\u8981\u786E\u4FDD\u8FD9\u6240\u6709\u7684\u6587\u4EF6\u90FD\u88AB\u751F\u6210\u5728 outDir \u5185\u3002",paraId:61,tocIndex:10},{value:`PROJECT
\u251C\u2500\u2500 src
\u2502   \u251C\u2500\u2500 index.ts
\u2502   \u251C\u2500\u2500 app.ts
\u2502   \u251C\u2500\u2500 utils
\u2502   \u2502   \u251C\u2500\u2500 helpers.ts
\u251C\u2500\u2500 env.ts
\u251C\u2500\u2500 tsconfig.json
`,paraId:62,tocIndex:10},{value:"\u5728\u8FD9\u4E2A\u4F8B\u5B50\u4E2D,\u5982\u679C\u4F60\u6307\u5B9A rootDir \u4E3A ",paraId:63,tocIndex:10},{value:"src",paraId:63,tocIndex:10},{value:",\u4F1A\u5BFC\u81F4 ",paraId:63,tocIndex:10},{value:"env.ts",paraId:63,tocIndex:10},{value:" \u88AB\u751F\u6210\u5230 ",paraId:63,tocIndex:10},{value:"<project>/env.js",paraId:63,tocIndex:10},{value:" \u800C\u975E ",paraId:63,tocIndex:10},{value:"<project>/dist/env.js",paraId:63,tocIndex:10},{value:"\u3002",paraId:63,tocIndex:10},{value:"paths \u7C7B\u4F3C\u4E8E Webpack \u4E2D\u7684 alias,\u5141\u8BB8\u4F60\u901A\u8FC7 ",paraId:64,tocIndex:11},{value:"@/utils",paraId:64,tocIndex:11},{value:" \u6216\u7C7B\u4F3C\u7684\u65B9\u5F0F\u6765\u7B80\u5316\u5BFC\u5165\u8DEF\u5F84,\u5B83\u7684\u914D\u7F6E\u65B9\u5F0F\u662F\u8FD9\u6837\u7684:",paraId:64,tocIndex:11},{value:`{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/utils/*": ["src/utils/*", "src/other/utils/*"]
    }
  }
}
`,paraId:65,tocIndex:11},{value:"\u9700\u8981\u6CE8\u610F\u7684\u662F,paths \u7684\u89E3\u6790\u662F\u57FA\u4E8E baseUrl \u4F5C\u4E3A\u76F8\u5BF9\u8DEF\u5F84\u7684,\u56E0\u6B64\u9700\u8981\u786E\u4FDD\u6307\u5B9A\u4E86 baseUrl\u3002\u5728\u586B\u5199\u522B\u540D\u8DEF\u5F84\u65F6,\u6211\u4EEC\u53EF\u4EE5\u4F20\u5165\u4E00\u4E2A\u6570\u7EC4,TypeScript \u4F1A\u4F9D\u6B21\u89E3\u6790\u8FD9\u4E9B\u8DEF\u5F84,\u76F4\u5230\u627E\u5230\u4E00\u4E2A\u786E\u5B9E\u5B58\u5728\u7684\u8DEF\u5F84\u3002",paraId:66,tocIndex:11},{value:"baseUrl \u53EF\u4EE5\u5B9A\u4E49\u6587\u4EF6\u8FDB\u884C\u89E3\u6790\u7684\u6839\u76EE\u5F55,\u5B83\u901A\u5E38\u4F1A\u662F\u4E00\u4E2A\u76F8\u5BF9\u8DEF\u5F84,\u7136\u540E\u914D\u5408 tsconfig.json \u6240\u5728\u7684\u8DEF\u5F84\u6765\u786E\u5B9A\u6839\u76EE\u5F55\u7684\u4F4D\u7F6E\u3002",paraId:67,tocIndex:11},{value:`project
\u251C\u2500\u2500 out.ts
\u251C\u2500\u2500 src
\u251C\u2500\u2500\u2500\u2500 core.ts
\u2514\u2500\u2500 tsconfig.json
`,paraId:68,tocIndex:11},{value:"\u5728\u8FD9\u4E2A\u7ED3\u6784\u4E0B,\u5982\u679C\u914D\u7F6E\u4E3A ",paraId:69,tocIndex:11},{value:'"baseUrl": "./"',paraId:69,tocIndex:11},{value:",\u6839\u76EE\u5F55\u5C31\u4F1A\u88AB\u786E\u5B9A\u4E3A project\u3002",paraId:69,tocIndex:11},{value:"\u4F60\u4E5F\u53EF\u4EE5\u901A\u8FC7\u8FD9\u4E00\u914D\u7F6E,\u5728\u5BFC\u5165\u8BED\u53E5\u4E2D\u4F7F\u7528\u76F8\u5BF9 baseUrl \u7684\u89E3\u6790\u8DEF\u5F84\u3002\u5982\u5728\u4E0A\u9762\u6839\u76EE\u5F55\u5DF2\u7ECF\u786E\u5B9A\u4E3A project,\u5728 ",paraId:70,tocIndex:11},{value:"out.ts",paraId:70,tocIndex:11},{value:" \u4E2D,\u4F60\u5C31\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u57FA\u4E8E\u6839\u76EE\u5F55\u7684\u7EDD\u5BF9\u8DEF\u5F84\u5BFC\u5165\u6587\u4EF6:",paraId:70,tocIndex:11},{value:`import 'src/core'; // TS \u4F1A\u81EA\u52A8\u89E3\u6790\u5230\u5BF9\u5E94\u7684\u6587\u4EF6,\u5373 "./src/core.ts"
`,paraId:71,tocIndex:11},{value:"\u751F\u6210\u7C7B\u578B\u58F0\u660E\u6587\u4EF6(\u53D1\u5E03 npm \u5305\u5FC5\u5907)\u3002",paraId:72,tocIndex:12},{value:"declaration \u63A5\u53D7\u4E00\u4E2A\u5E03\u5C14\u503C,\u5373\u662F\u5426\u4EA7\u751F\u58F0\u660E\u6587\u4EF6\u3002\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u58F0\u660E\u6587\u4EF6\u4F1A\u548C\u6784\u5EFA\u4EE3\u7801\u6587\u4EF6\u5728\u4E00\u4E2A\u4F4D\u7F6E,\u6BD4\u5982 ",paraId:73,tocIndex:12},{value:"src/index.ts",paraId:73,tocIndex:12},{value:" \u4F1A\u6784\u5EFA\u51FA ",paraId:73,tocIndex:12},{value:"dist/index.js",paraId:73,tocIndex:12},{value:" \u4E0E ",paraId:73,tocIndex:12},{value:"dist/index.d.ts",paraId:73,tocIndex:12},{value:",\u4F7F\u7528 declarationDir \u4F60\u53EF\u4EE5\u5C06\u8FD9\u4E9B\u7C7B\u578B\u58F0\u660E\u6587\u4EF6\u8F93\u51FA\u5230\u4E00\u4E2A\u72EC\u7ACB\u7684\u6587\u4EF6\u5939\u4E0B,\u5982 ",paraId:73,tocIndex:12},{value:"dist/types/index.d.ts",paraId:73,tocIndex:12},{value:" ",paraId:73,tocIndex:12},{value:"dist/types/utils.d.ts",paraId:73,tocIndex:12},{value:" \u8FD9\u6837\u3002",paraId:73,tocIndex:12},{value:"declarationMap \u9009\u9879\u4F1A\u4E3A\u58F0\u660E\u6587\u4EF6\u4E5F\u751F\u6210 source map,\u8FD9\u6837\u4F60\u5C31\u53EF\u4EE5\u4ECE ",paraId:74,tocIndex:12},{value:".d.ts",paraId:74,tocIndex:12},{value:" \u76F4\u63A5\u6620\u5C04\u56DE\u539F\u672C\u7684 ",paraId:74,tocIndex:12},{value:".ts",paraId:74,tocIndex:12},{value:" \u6587\u4EF6\u4E86\u3002",paraId:74,tocIndex:12},{value:"\u5728\u4F7F\u7528\u7B2C\u4E09\u65B9\u5E93\u65F6,\u5982\u679C\u4F60\u70B9\u51FB\u4E00\u4E2A\u6765\u81EA\u7B2C\u4E09\u65B9\u5E93\u7684\u53D8\u91CF,\u4F1A\u53D1\u73B0\u8DF3\u8F6C\u7684\u662F\u5176\u58F0\u660E\u6587\u4EF6\u3002\u5982\u679C\u8FD9\u4E9B\u5E93\u63D0\u4F9B\u4E86 declarationMap \u4E0E\u539F\u672C\u7684 .ts \u6587\u4EF6,\u90A3\u5C31\u53EF\u4EE5\u76F4\u63A5\u8DF3\u8F6C\u5230\u53D8\u91CF\u5BF9\u5E94\u7684\u539F\u59CB ts \u6587\u4EF6\u3002\u5F53\u7136\u4E00\u822C\u53D1\u5E03 npm \u5305\u65F6\u5E76\u4E0D\u4F1A\u643A\u5E26\u8FD9\u4E9B\u6587\u4EF6,\u4F46\u5728 Monorepo \u7B49\u573A\u666F\u4E0B\u5374\u6709\u7740\u5947\u6548\u3002",paraId:75,tocIndex:12},{value:"React \u9879\u76EE\u5FC5\u9700\u3002",paraId:76,tocIndex:13},{value:`{
  "compilerOptions": {
    "jsx": "react-jsx" // React 17+
    // "jsx": "react"   // React 16 \u53CA\u4EE5\u4E0B
    // "jsx": "preserve" // \u4EA4\u7ED9\u5176\u4ED6\u5DE5\u5177\u5904\u7406
  }
}
`,paraId:77,tocIndex:13},{value:"\u4E0D\u540C\u914D\u7F6E\u7684\u7F16\u8BD1\u7ED3\u679C:",paraId:78,tocIndex:13},{value:`// \u6E90\u7801
export const App = () => <h1>Hello</h1>;

// react
export const App = () => React.createElement('h1', null, 'Hello');

// react-jsx
import { jsx as _jsx } from 'react/jsx-runtime';
export const App = () => _jsx('h1', { children: 'Hello' });

// preserve
export const App = () => <h1>Hello</h1>;
`,paraId:79,tocIndex:13},{value:"\u8FD9\u4E24\u4E2A\u914D\u7F6E\u4E3B\u8981\u8FD8\u662F\u4E3A\u4E86\u89E3\u51B3 ES Module \u548C CommonJS \u4E4B\u95F4\u7684\u517C\u5BB9\u6027\u95EE\u9898\u3002",paraId:80,tocIndex:14},{value:"\u901A\u5E38\u60C5\u51B5\u4E0B\uFF0CESM \u8C03\u7528 ESM\uFF0CCJS \u8C03\u7528 CJS\uFF0C\u90FD\u4E0D\u4F1A\u6709\u95EE\u9898\u3002\u4F46\u5982\u679C\u662F ESM \u8C03\u7528 CJS \uFF0C\u5C31\u53EF\u80FD\u9047\u5230\u5947\u602A\u7684\u95EE\u9898\u3002\u6BD4\u5982 React \u4E2D\u7684\u6E90\u7801\u4E2D\u662F\u8FD9\u6837\u5BFC\u51FA\u7684\uFF1A",paraId:81,tocIndex:14},{value:`// react/cjs/react.development.js
exports.Children = Children;
exports.useState = useState;
exports.memo = memo;
exports.useEffect = useEffect;
`,paraId:82,tocIndex:14},{value:"\u5047\u8BBE\u6211\u4EEC\u5206\u522B\u4F7F\u7528\u5177\u540D\u5BFC\u5165\u3001\u9ED8\u8BA4\u5BFC\u5165\u548C\u547D\u540D\u7A7A\u95F4\u5BFC\u5165\u6765\u5BFC\u5165 React\uFF1A",paraId:83,tocIndex:14},{value:`import { useRef } from 'react'; // \u5177\u540D\u5BFC\u5165\uFF08named import\uFF09
import React from 'react'; // \u9ED8\u8BA4\u5BFC\u5165\uFF08default import\uFF09
import * as ReactCopy from 'react'; // \u547D\u540D\u7A7A\u95F4\u5BFC\u5165\uFF08namespace import\uFF09

console.log(useRef);
console.log(React.useState);
console.log(ReactCopy.useEffect);
`,paraId:84,tocIndex:14},{value:"\u8FD9\u6837\u7684\u4EE3\u7801\u5728\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF08\u5373\u6CA1\u6709\u542F\u7528 esModuleInterop\uFF09\u4F1A\u88AB\u7F16\u8BD1\u4E3A\uFF1A",paraId:85,tocIndex:14},{value:`'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = require('react');
const react_2 = require('react');
const ReactCopy = require('react');
console.log(react_1.useRef);
console.log(react_2.default.useState);
console.log(ReactCopy.useEffect);
`,paraId:86,tocIndex:14},{value:"\u53EF\u4EE5\u770B\u5230\uFF0C\u9ED8\u8BA4\u5BFC\u5165\u7684\u8C03\u7528\u88AB\u8F6C\u6362\u4E3A\u4E86 ",paraId:87,tocIndex:14},{value:"react_2.default",paraId:87,tocIndex:14},{value:"\uFF0C\u800C\u5177\u540D\u5BFC\u5165\u548C\u547D\u540D\u7A7A\u95F4\u5219\u4E0D\u53D8\uFF0C\u4E09\u79CD\u5BFC\u5165\u8BED\u53E5\u90FD\u88AB\u8F6C\u6362\u4E3A\u4E86 CJS\u3002",paraId:87,tocIndex:14},{value:"\u8FD9\u662F\u56E0\u4E3A TypeScript \u9ED8\u8BA4\u5C06 CommonJs \u4E5F\u89C6\u4E3A ES Module \u4E00\u6837\uFF0C\u5BF9\u4E8E\u5177\u540D\u5BFC\u5165\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5C06 ",paraId:88,tocIndex:14},{value:"module.exports.useRef = useRef",paraId:88,tocIndex:14},{value:" \u548C ",paraId:88,tocIndex:14},{value:"export const useRef = useRef ",paraId:88,tocIndex:14},{value:"\u7B49\u4EF7\u3002\u4F46\u662F\u7531\u4E8E CommonJs \u4E2D\u5E76\u6CA1\u6709\u8FD9\u4E2A\u201C\u9ED8\u8BA4\u5BFC\u51FA\u201D\u8FD9\u4E2A\u6982\u5FF5\uFF0C \u53EA\u80FD\u5C06 ES Module \u4E2D\u7684\u9ED8\u8BA4\u5BFC\u51FA ",paraId:88,tocIndex:14},{value:"export default",paraId:88,tocIndex:14},{value:" \u5F3A\u884C\u7B49\u4EF7\u4E8E ",paraId:88,tocIndex:14},{value:"module.exports.default",paraId:88,tocIndex:14},{value:"\uFF0C\u5982\u4E0A\u9762\u7684\u7F16\u8BD1\u7ED3\u679C\u4E2D\u7684 ",paraId:88,tocIndex:14},{value:"react_2.default",paraId:88,tocIndex:14},{value:"\u3002\u8FD9\u91CC\u7684 default \u5C31\u662F\u4E00\u4E2A\u5C5E\u6027\u540D\uFF0C\u548C ",paraId:88,tocIndex:14},{value:"module.exports.foo",paraId:88,tocIndex:14},{value:" \u662F\u4E00\u4E2A\u6982\u5FF5\u3002",paraId:88,tocIndex:14},{value:"\u4F46 CommonJs \u4E0B\u5B58\u5728\u7740\u7C7B\u4F3C\u201C\u547D\u540D\u7A7A\u95F4\u5BFC\u51FA\u201D\u7684\u6982\u5FF5\uFF0C\u5373 ",paraId:89,tocIndex:14},{value:'const react = require("react") ',paraId:89,tocIndex:14},{value:" \u53EF\u4EE5\u7B49\u4EF7\u4E8E ",paraId:89,tocIndex:14},{value:'import * as React from "react"',paraId:89,tocIndex:14},{value:"\u3002",paraId:89,tocIndex:14},{value:"\u5F88\u660E\u663E\uFF0C\u5BF9\u4E8E\u9ED8\u8BA4\u5BFC\u51FA\u7684\u60C5\u51B5\uFF0C\u7531\u4E8E React \u4E2D\u5E76\u6CA1\u6709\u4F7F\u7528 ",paraId:90,tocIndex:14},{value:"module.exports.default",paraId:90,tocIndex:14},{value:" \u63D0\u4F9B\uFF08\u6A21\u62DF\uFF09\u4E00\u4E2A\u9ED8\u8BA4\u5BFC\u51FA\uFF0C\u56E0\u6B64 ",paraId:90,tocIndex:14},{value:"react_2.default",paraId:90,tocIndex:14},{value:" \u53EA\u53EF\u80FD\u662F undefined\u3002",paraId:90,tocIndex:14},{value:"\u4E3A\u4E86\u89E3\u51B3\u8FD9\u79CD\u60C5\u51B5\uFF0CTypeScript \u4E2D\u652F\u6301\u901A\u8FC7 esModuleInterop \u914D\u7F6E\u6765\u5728 ESM \u5BFC\u5165 CJS \u8FD9\u79CD\u60C5\u51B5\u65F6\u5F15\u5165\u989D\u5916\u7684\u8F85\u52A9\u51FD\u6570\uFF0C\u8FDB\u4E00\u6B65\u5BF9\u517C\u5BB9\u6027\u8FDB\u884C\u652F\u6301\uFF0C\u5982\u4E0A\u9762\u7684\u4EE3\u7801\u5728\u5F00\u542F\u914D\u7F6E\u540E\u7684\u6784\u5EFA\u4EA7\u7269\u4F1A\u662F\u8FD9\u6837\u7684\uFF1A",paraId:91,tocIndex:14},{value:`var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) { //... }));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) { //... });
var __importStar = (this && this.__importStar) || function (mod) { //... };
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const ReactCopy = __importStar(require("react"));
console.log(react_1.useRef);
console.log(react_2.default.useState);
console.log(ReactCopy.useEffect);
`,paraId:92,tocIndex:14},{value:"\u8FD9\u4E9B\u8F85\u52A9\u51FD\u6570\u4F1A\u786E\u4FDD ESM \u7684\u9ED8\u8BA4\u5BFC\u5165\uFF08",paraId:93,tocIndex:14},{value:"__importDefault",paraId:93,tocIndex:14},{value:"\uFF09 \u4E0E\u547D\u540D\u7A7A\u95F4\u5BFC\u5165 \uFF08",paraId:93,tocIndex:14},{value:"__importStar",paraId:93,tocIndex:14},{value:"\uFF09\u80FD\u6B63\u786E\u5730\u5BF9\u5E94\u5230 CJS \u4E2D\u7684\u5BFC\u51FA\uFF0C\u5982",paraId:93,tocIndex:14},{value:" __importDefault",paraId:93,tocIndex:14},{value:" \u4F1A\u68C0\u67E5\u76EE\u6807\u6A21\u5757\u7684\u4F7F\u7528\u89C4\u8303\uFF0C\u5BF9 ESM \u6A21\u5757\u76F4\u63A5\u8FD4\u56DE\uFF0C\u5426\u5219\u5C06\u5176\u6302\u8F7D\u5728\u4E00\u4E2A\u5BF9\u8C61\u7684 default \u5C5E\u6027\u4E0A\uFF1A",paraId:93,tocIndex:14},{value:`const react_2 = __importDefault(require('react'));

// \u8F6C\u6362\u7ED3\u679C\u7B49\u4EF7\u4E8E\u4EE5\u4E0B
const react_2 = { default: { useState: {} } };
`,paraId:94,tocIndex:14},{value:"\u800C ",paraId:95,tocIndex:14},{value:"__importStar",paraId:95,tocIndex:14},{value:" \uFF08\u5373\u547D\u540D\u7A7A\u95F4\u5BFC\u5165\u7684\u8F85\u52A9\u51FD\u6570\uFF09\u7684\u5B9E\u73B0\u5219\u8981\u590D\u6742\u4E00\u4E9B\uFF1A",paraId:95,tocIndex:14},{value:`var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
`,paraId:96,tocIndex:14},{value:"\u5B83\u4F1A\u5728\u76EE\u6807\u6A21\u5757\u4E0D\u662F ESM \u89C4\u8303\u65F6\uFF0C\u5C06\u6A21\u5757\u4E2D\u9664\u4E86 default \u5C5E\u6027\u4EE5\u5916\u7684\u5BFC\u51FA\u90FD\u6302\u8F7D\u5230\u8FD4\u56DE\u5BF9\u8C61\u4E0A\uFF08",paraId:97,tocIndex:14},{value:"__createBinding",paraId:97,tocIndex:14},{value:"\uFF09\uFF0C\u7136\u540E\u5C06\u8FD9\u4E2A\u5BF9\u8C61\u7684 default \u5C5E\u6027\u8BBE\u7F6E\u4E3A\u539F\u672C\u7684\u6A21\u5757\u4FE1\u606F\uFF08",paraId:97,tocIndex:14},{value:"__setModuleDefault",paraId:97,tocIndex:14},{value:"\uFF09\u3002\u8FD9\u6837\u4F60\u65E2\u53EF\u4EE5 ",paraId:97,tocIndex:14},{value:"ReactCopy.useEffect",paraId:97,tocIndex:14},{value:" \u8BBF\u95EE\u67D0\u4E2A\u503C\uFF0C\u4E5F\u53EF\u4EE5 ",paraId:97,tocIndex:14},{value:"ReactCopy.default",paraId:97,tocIndex:14},{value:" \u8BBF\u95EE\u539F\u672C\u7684\u6A21\u5757\u3002",paraId:97,tocIndex:14},{value:"\u8FD9\u4E9B\u8F85\u52A9\u65B9\u6CD5\u4E5F\u5C5E\u4E8E ",paraId:98,tocIndex:14},{value:"importHelpers",paraId:98,tocIndex:14},{value:" \u4E2D\u7684 helper\uFF0C\u56E0\u6B64\u4F60\u4E5F\u53EF\u4EE5\u901A\u8FC7\u542F\u7528 ",paraId:98,tocIndex:14},{value:"importHelpers",paraId:98,tocIndex:14},{value:" \u914D\u7F6E\u6765\u4ECE tslib \u5BFC\u5165\u8FD9\u4E9B\u8F85\u52A9\u65B9\u6CD5\u3002",paraId:98,tocIndex:14},{value:"\u5B9E\u9645\u4E0A\uFF0C\u7531\u4E8E React \u672C\u8EAB\u662F\u901A\u8FC7 CommonJs \u5BFC\u51FA\u7684\uFF0C\u5728\u4F60\u4F7F\u7528\u9ED8\u8BA4\u5BFC\u5165\u65F6\uFF0C TS \u4E5F\u4F1A\u63D0\u9192\u4F60\u6B64\u6A21\u5757\u53EA\u80FD\u5728\u542F\u7528\u4E86 ",paraId:99,tocIndex:14},{value:"esModuleInterop",paraId:99,tocIndex:14},{value:" \u7684\u60C5\u51B5\u4E0B\u4F7F\u7528\u9ED8\u8BA4\u5BFC\u5165\u3002",paraId:99,tocIndex:14},{value:"\u542F\u7528 ",paraId:100,tocIndex:14},{value:"esModuleInterop",paraId:100,tocIndex:14},{value:" \u914D\u7F6E\u7684\u540C\u65F6\uFF0C\u4E5F\u4F1A\u542F\u7528 ",paraId:100,tocIndex:14},{value:"allowSyntheticDefaultImports",paraId:100,tocIndex:14},{value:" \u914D\u7F6E\uFF0C\u8FD9\u4E00\u914D\u7F6E\u4F1A\u4E3A\u6CA1\u6709\u9ED8\u8BA4\u5BFC\u51FA\u7684 CJS \u6A21\u5757\u201C\u6A21\u62DF\u201D\u51FA\u9ED8\u8BA4\u7684\u5BFC\u51FA\uFF0C\u4EE5\u63D0\u4F9B\u66F4\u597D\u7684\u7C7B\u578B\u63D0\u793A\u3002\u5982\u4EE5\u4E0B\u4EE3\u7801\uFF1A",paraId:100,tocIndex:14},{value:`// handlers.js
module.exports = {
  errorHandler: () => {},
};

// index.js
import handlers from './handlers';

window.onerror = handlers.errorHandler;
`,paraId:101,tocIndex:14},{value:"\u867D\u7136\u8FD9\u6BB5\u4EE3\u7801\u8F6C\u6362\u540E\u7684\u5B9E\u9645\u903B\u8F91\u6CA1\u6709\u95EE\u9898\uFF0C\u4F46\u7531\u4E8E\u8FD9\u91CC\u5E76\u4E0D\u5B58\u5728 ",paraId:102,tocIndex:14},{value:"module.exports.default",paraId:102,tocIndex:14},{value:" \u5BFC\u51FA\uFF0C\u4F1A\u5BFC\u81F4\u5728\u7C7B\u578B\u4E0A\u51FA\u73B0\u4E00\u4E2A\u9519\u8BEF\u3002",paraId:102,tocIndex:14},{value:"\u542F\u7528 ",paraId:103,tocIndex:14},{value:"allowSyntheticDefaultImports",paraId:103,tocIndex:14},{value:" \u914D\u7F6E\u4F1A\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\u5C06 handlers \u4E2D\u7684\u4EE3\u7801\u6A21\u62DF\u4E3A\u4EE5\u4E0B\u7684\u5F62\u5F0F\uFF1A",paraId:103,tocIndex:14},{value:`const allHandlers = {
  errorHandler: () => {},
};

module.exports = allHandlers;
module.exports.default = allHandlers;
`,paraId:104,tocIndex:14},{value:"\u7136\u540E\u5728\u5BFC\u5165\u65B9\u5C31\u80FD\u591F\u83B7\u5F97\u6B63\u786E\u7684\u7C7B\u578B\u63D0\u793A\u4E86\uFF0C\u5B9E\u9645\u4E0A\u8FD9\u4E5F\u662F Babel \u5B9E\u9645\u7684\u6784\u5EFA\u6548\u679C\uFF0C\u4F46\u9700\u8981\u6CE8\u610F\u7684\u662F\u5728 TypeScript \u4E2D ",paraId:105,tocIndex:14},{value:"allowSyntheticDefaultImports",paraId:105,tocIndex:14},{value:" \u914D\u7F6E\u5E76\u4E0D\u4F1A\u5F71\u54CD\u6700\u7EC8\u7684\u4EE3\u7801\u751F\u6210\uFF08\u4E0D\u50CF ",paraId:105,tocIndex:14},{value:"esModuleInterop",paraId:105,tocIndex:14},{value:" \u90A3\u6837\uFF09\uFF0C\u53EA\u4F1A\u5BF9\u7C7B\u578B\u68C0\u67E5\u6709\u5E2E\u52A9\u3002",paraId:105,tocIndex:14},{value:"\u8FD9\u4E09\u4E2A\u9009\u9879\u51B3\u5B9A\u4E86\u5C06\u88AB\u5305\u62EC\u5230\u672C\u6B21\u7F16\u8BD1\u7684\u4EE3\u7801\u6587\u4EF6\u3002\u4F7F\u7528 files \u6211\u4EEC\u53EF\u4EE5\u63CF\u8FF0\u672C\u6B21\u5305\u542B\u7684\u6240\u6709\u6587\u4EF6,\u4F46\u4E0D\u80FD\u4F7F\u7528 ",paraId:106,tocIndex:16},{value:"src",paraId:106,tocIndex:16},{value:" \u6216\u8005 ",paraId:106,tocIndex:16},{value:"src/*",paraId:106,tocIndex:16},{value:" \u8FD9\u79CD\u65B9\u5F0F,\u6BCF\u4E2A\u503C\u90FD\u9700\u8981\u662F\u5B8C\u6574\u7684\u6587\u4EF6\u8DEF\u5F84,\u9002\u5408\u5728\u5C0F\u578B\u9879\u76EE\u65F6\u4F7F\u7528:",paraId:106,tocIndex:16},{value:`{
  "compilerOptions": {},
  "files": ["src/index.ts", "src/handler.ts"]
}
`,paraId:107,tocIndex:16},{value:"\u5982\u679C\u4F60\u7684\u6587\u4EF6\u6570\u91CF\u8F83\u591A,\u6216\u8005\u5206\u6563\u5728\u5404\u4E2A\u6587\u4EF6\u5939,\u6B64\u65F6\u53EF\u4EE5\u4F7F\u7528 include \u548C exclude \u8FDB\u884C\u914D\u7F6E,\u5728\u8FD9\u91CC\u53EF\u4EE5\u4F20\u5165\u6587\u4EF6\u5939\u6216\u8005 ",paraId:108,tocIndex:16},{value:"src/*",paraId:108,tocIndex:16},{value:" \u8FD9\u6837\u7684 glob pattern,\u4E5F\u53EF\u4EE5\u4F20\u5165\u5B8C\u6574\u7684\u6587\u4EF6\u8DEF\u5F84\u3002",paraId:108,tocIndex:16},{value:"include \u914D\u7F6E\u65B9\u5F0F\u53C2\u8003:",paraId:109,tocIndex:16},{value:`{
  "include": ["src/**/*", "generated/*.ts", "internal/*"]
}
`,paraId:110,tocIndex:16},{value:"\u5176\u4E2D,",paraId:111,tocIndex:16},{value:"src/**/*",paraId:111,tocIndex:16},{value:" \u8868\u793A\u5339\u914D src \u4E0B\u6240\u6709\u7684\u5408\u6CD5\u6587\u4EF6,\u800C\u65E0\u89C6\u76EE\u5F55\u5C42\u7EA7\u3002\u800C ",paraId:111,tocIndex:16},{value:"internal/*",paraId:111,tocIndex:16},{value:" \u5219\u53EA\u4F1A\u5339\u914D internal \u4E0B\u7684\u6587\u4EF6,\u4E0D\u4F1A\u5339\u914D ",paraId:111,tocIndex:16},{value:"internal/utils/",paraId:111,tocIndex:16},{value:" \u4E0B\u7684\u6587\u4EF6\u3002\u8FD9\u91CC\u7684\u5408\u6CD5\u6587\u4EF6\u6307\u7684\u662F,\u5728\u4E0D\u5305\u62EC\u6587\u4EF6\u6269\u5C55\u540D(",paraId:111,tocIndex:16},{value:"*.ts",paraId:111,tocIndex:16},{value:")\u7684\u60C5\u51B5\u4E0B\u53EA\u4F1A\u5339\u914D ",paraId:111,tocIndex:16},{value:".ts",paraId:111,tocIndex:16},{value:" / ",paraId:111,tocIndex:16},{value:".tsx",paraId:111,tocIndex:16},{value:" / ",paraId:111,tocIndex:16},{value:".d.ts",paraId:111,tocIndex:16},{value:" / ",paraId:111,tocIndex:16},{value:".js",paraId:111,tocIndex:16},{value:" / ",paraId:111,tocIndex:16},{value:".jsx",paraId:111,tocIndex:16},{value:" \u6587\u4EF6(js \u548C jsx \u6587\u4EF6\u9700\u8981\u542F\u7528 allowJs \u914D\u7F6E\u65F6\u624D\u4F1A\u88AB\u5305\u62EC)\u3002",paraId:111,tocIndex:16},{value:"\u7531\u4E8E\u6211\u4EEC\u4F1A\u5728 include \u4E2D\u5927\u91CF\u4F7F\u7528 glob pattern \u6765\u4E00\u6B21\u6027\u5339\u914D\u8BB8\u591A\u6587\u4EF6,\u5982\u679C\u5B58\u5728\u67D0\u4E9B\u975E\u9884\u671F\u7684\u6587\u4EF6\u4E5F\u7B26\u5408\u8FD9\u4E00\u5339\u914D\u6A21\u5F0F,\u6BD4\u5982 ",paraId:112,tocIndex:16},{value:"src/handler.test.ts",paraId:112,tocIndex:16},{value:" ",paraId:112,tocIndex:16},{value:"src/file-excluded/",paraId:112,tocIndex:16},{value:" \u8FD9\u6837,\u6B64\u65F6\u4E13\u95E8\u4E3A\u9700\u8981\u5339\u914D\u7684\u6587\u4EF6\u4E66\u5199\u7CBE\u786E\u7684\u5339\u914D\u6A21\u5F0F\u5C31\u592A\u9EBB\u70E6\u4E86\u3002\u56E0\u6B64,\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 exclude \u914D\u7F6E,\u6765\u4ECE\u88AB include \u5339\u914D\u5230\u7684\u6587\u4EF6\u4E2D\u518D\u79FB\u9664\u4E00\u90E8\u5206,\u5982:",paraId:112,tocIndex:16},{value:`{
  "include": ["src/**/*", "generated/*.ts", "internal/*"],
  "exclude": ["src/file-excluded", "/**/*.test.ts", "/**/*.e2e.ts"]
}
`,paraId:113,tocIndex:16},{value:"\u9700\u8981\u6CE8\u610F\u7684\u662F,",paraId:114,tocIndex:16},{value:"exclude \u53EA\u80FD\u5254\u9664\u5DF2\u7ECF\u88AB include \u5305\u542B\u7684\u6587\u4EF6",paraId:114,tocIndex:16},{value:"\u3002",paraId:114,tocIndex:16},{value:"\u542F\u7528\u4E86\u8FD9\u4E00\u914D\u7F6E\u540E,\u4F60\u5C31\u53EF\u4EE5\u76F4\u63A5\u5BFC\u5165 Json \u6587\u4EF6,\u5E76\u5BF9\u5BFC\u5165\u5185\u5BB9\u83B7\u5F97\u5B8C\u6574\u7684\u57FA\u4E8E\u5B9E\u9645 Json \u5185\u5BB9\u7684\u7C7B\u578B\u63A8\u5BFC\u3002",paraId:115,tocIndex:17},{value:`{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
`,paraId:116,tocIndex:17},{value:`import config from './config.json'; // \u2705 \u53EF\u884C
console.log(config.port); // \u5B8C\u6574\u7684\u7C7B\u578B\u63A8\u5BFC
`,paraId:117,tocIndex:17},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B,TypeScript \u4F1A\u5BF9\u52A0\u8F7D\u7684\u7C7B\u578B\u58F0\u660E\u6587\u4EF6\u4E5F\u8FDB\u884C\u68C0\u67E5,\u5305\u62EC\u5185\u7F6E\u7684 ",paraId:118,tocIndex:18},{value:"lib.d.ts",paraId:118,tocIndex:18},{value:" \u7CFB\u5217\u4E0E ",paraId:118,tocIndex:18},{value:"@types/",paraId:118,tocIndex:18},{value:" \u4E0B\u7684\u58F0\u660E\u6587\u4EF6\u3002\u5728\u67D0\u4E9B\u65F6\u5019,\u8FD9\u4E9B\u58F0\u660E\u6587\u4EF6\u53EF\u80FD\u5B58\u5728\u51B2\u7A81,\u6BD4\u5982\u4E24\u4E2A\u4E0D\u540C\u6765\u6E90\u7684\u58F0\u660E\u6587\u4EF6\u4F7F\u7528\u4E0D\u540C\u7684\u7C7B\u578B\u58F0\u660E\u4E86\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF\u3002\u6B64\u65F6,\u4F60\u5C31\u53EF\u4EE5\u4F7F\u7528 skipLibCheck \u8DF3\u8FC7\u5BF9\u8FD9\u4E9B\u7C7B\u578B\u58F0\u660E\u6587\u4EF6\u7684\u68C0\u67E5,\u8FD9\u4E5F\u80FD\u8FDB\u4E00\u6B65\u52A0\u5FEB\u7F16\u8BD1\u901F\u5EA6\u3002",paraId:118,tocIndex:18},{value:`{
  "compilerOptions": {
    "skipLibCheck": true // \u63A8\u8350\u5F00\u542F
  }
}
`,paraId:119,tocIndex:18},{value:"\u751F\u6210 source map,\u4FBF\u4E8E\u8C03\u8BD5\u3002",paraId:120,tocIndex:19},{value:`{
  "compilerOptions": {
    "sourceMap": true // \u5F00\u53D1\u73AF\u5883\u63A8\u8350
  }
}
`,paraId:121,tocIndex:19},{value:"incremental \u914D\u7F6E\u5C06\u542F\u7528\u589E\u91CF\u6784\u5EFA,\u5728\u6BCF\u6B21\u7F16\u8BD1\u65F6\u9996\u5148 diff \u51FA\u53D1\u751F\u53D8\u66F4\u7684\u6587\u4EF6,\u4EC5\u5BF9\u8FD9\u4E9B\u6587\u4EF6\u8FDB\u884C\u6784\u5EFA,\u7136\u540E\u5C06\u65B0\u7684\u7F16\u8BD1\u4FE1\u606F\u901A\u8FC7 ",paraId:122,tocIndex:20},{value:".tsbuildinfo",paraId:122,tocIndex:20},{value:" \u5B58\u50A8\u8D77\u6765\u3002\u4F60\u53EF\u4EE5\u4F7F\u7528 tsBuildInfoFile \u914D\u7F6E\u9879\u6765\u63A7\u5236\u8FD9\u4E9B\u7F16\u8BD1\u4FE1\u606F\u6587\u4EF6\u7684\u8F93\u51FA\u4F4D\u7F6E\u3002",paraId:122,tocIndex:20},{value:`{
  "compilerOptions": {
    "incremental": true
  }
}
`,paraId:123,tocIndex:20},{value:"\u5728 TS \u9879\u76EE\u4E2D\u4F7F\u7528 JS \u6587\u4EF6\u3002",paraId:124,tocIndex:21},{value:`{
  "compilerOptions": {
    "allowJs": true, // \u5141\u8BB8\u5BFC\u5165 .js \u6587\u4EF6
    "checkJs": false // \u662F\u5426\u68C0\u67E5 JS \u6587\u4EF6\u7C7B\u578B
  }
}
`,paraId:125,tocIndex:21},{value:"\u6211\u4EEC\u5E38\u5E38\u5728\u6784\u5EFA\u8FC7\u7A0B\u4F7F\u7528 TypeScript \u914D\u5408\u5176\u4ED6\u6784\u5EFA\u5668,\u5982 ESBuild\u3001SWC\u3001Babel \u7B49\u3002\u901A\u5E38\u5728\u8FD9\u4E2A\u8FC7\u7A0B\u4E2D,\u7C7B\u578B\u76F8\u5173\u7684\u68C0\u67E5\u4F1A\u5B8C\u5168\u4EA4\u7531 TypeScript \u5904\u7406,\u56E0\u4E3A\u8FD9\u4E9B\u6784\u5EFA\u5668\u53EA\u80FD\u6267\u884C\u8BED\u6CD5\u964D\u7EA7\u4E0E\u6253\u5305\u3002",paraId:126,tocIndex:22},{value:"\u7531\u4E8E\u8FD9\u4E9B\u6784\u5EFA\u5668\u901A\u5E38\u662F\u72EC\u7ACB\u5730\u5904\u7406\u6BCF\u4E2A\u6587\u4EF6,\u8FD9\u4E5F\u5C31\u610F\u5473\u7740\u5982\u679C\u5B58\u5728\u5982\u7C7B\u578B\u5BFC\u5165\u3001namespace \u7B49\u7279\u6B8A\u8BED\u6CD5\u65F6,\u5B83\u4EEC\u65E0\u6CD5\u50CF tsc \u90A3\u6837\u53BB\u5168\u9762\u5206\u6790\u8FD9\u4E9B\u5173\u7CFB\u540E\u518D\u8FDB\u884C\u5904\u7406\u3002\u6B64\u65F6\u6211\u4EEC\u53EF\u4EE5\u542F\u7528 isolatedModules \u914D\u7F6E,\u5B83\u4F1A\u786E\u4FDD\u6BCF\u4E2A\u6587\u4EF6\u90FD\u80FD\u88AB\u89C6\u4E3A\u4E00\u4E2A\u72EC\u7ACB\u6A21\u5757,\u56E0\u6B64\u4E5F\u5C31\u80FD\u591F\u88AB\u8FD9\u4E9B\u6784\u5EFA\u5668\u5904\u7406\u3002",paraId:127,tocIndex:22},{value:`{
  "compilerOptions": {
    "isolatedModules": true
  }
}
`,paraId:128,tocIndex:22},{value:"\u542F\u7528\u540E\u7684\u9650\u5236:",paraId:129,tocIndex:22},{value:"\u6240\u6709\u4EE3\u7801\u6587\u4EF6\u5FC5\u987B\u81F3\u5C11\u6709\u4E00\u4E2A\u5BFC\u5165\u6216\u5BFC\u51FA",paraId:130,tocIndex:22},{value:"\u4E0D\u80FD\u4F7F\u7528 ",paraId:130,tocIndex:22},{value:"const enum",paraId:130,tocIndex:22},{value:"(\u4F1A\u88AB\u5185\u8054)",paraId:130,tocIndex:22},{value:"\u4E0D\u80FD\u4F7F\u7528 ",paraId:130,tocIndex:22},{value:"namespace",paraId:130,tocIndex:22},{value:`{
  "compilerOptions": {
    // \u7C7B\u578B\u68C0\u67E5
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,

    // \u6784\u5EFA\u914D\u7F6E
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "react-jsx",

    // \u8F93\u51FA\u914D\u7F6E
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,

    // \u8DEF\u5F84\u914D\u7F6E
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    },

    // \u517C\u5BB9\u6027
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,

    // \u6027\u80FD\u4F18\u5316
    "incremental": true,

    // \u6784\u5EFA\u5DE5\u5177\u517C\u5BB9
    "isolatedModules": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
`,paraId:131,tocIndex:24},{value:`{
  "compilerOptions": {
    // \u7C7B\u578B\u68C0\u67E5
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    // \u6784\u5EFA\u914D\u7F6E
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "CommonJS",
    "moduleResolution": "node",

    // \u8F93\u51FA\u914D\u7F6E
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,

    // \u517C\u5BB9\u6027
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,

    // \u6027\u80FD\u4F18\u5316
    "incremental": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
`,paraId:132,tocIndex:25},{value:`{
  "compilerOptions": {
    // \u7C7B\u578B\u68C0\u67E5
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    // \u6784\u5EFA\u914D\u7F6E
    "target": "ES2018",
    "lib": ["ES2018"],
    "module": "ESNext",
    "moduleResolution": "node",

    // \u8F93\u51FA\u914D\u7F6E
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,

    // \u517C\u5BB9\u6027
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
`,paraId:133,tocIndex:26},{value:"\u4EE5\u4E0B\u914D\u7F6E\u9002\u7528\u4E8E\u7279\u5B9A\u573A\u666F,\u5927\u591A\u6570\u9879\u76EE\u4E0D\u9700\u8981\u5173\u6CE8\u3002",paraId:134,tocIndex:27},{value:`{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
`,paraId:135,tocIndex:28},{value:"\u7528\u4E8E\u652F\u6301\u88C5\u9970\u5668\u8BED\u6CD5(\u5982 NestJS\u3001TypeORM):",paraId:136,tocIndex:28},{value:`@Controller()
class UserController {
  @Get()
  getUsers() {}
}
`,paraId:137,tocIndex:28},{value:"\u7528\u4E8E\u5927\u578B\u9879\u76EE\u62C6\u5206,\u7C7B\u4F3C Monorepo:",paraId:138,tocIndex:29},{value:`{
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist"
  },
  "references": [
    { "path": "../ui-components" },
    { "path": "../hooks" },
    { "path": "../utils" }
  ]
}
`,paraId:139,tocIndex:29},{value:"Project References \u8FD9\u4E00\u914D\u7F6E\u4F7F\u5F97\u4F60\u53EF\u4EE5\u5C06\u6574\u4E2A\u5DE5\u7A0B\u62C6\u5206\u6210\u591A\u4E2A\u90E8\u5206,\u6BD4\u5982\u4F60\u7684 UI \u90E8\u5206\u3001Hooks \u90E8\u5206\u4EE5\u53CA\u4E3B\u5E94\u7528\u7B49\u7B49\u3002\u8FD9\u4E00\u529F\u80FD\u548C Monorepo \u975E\u5E38\u76F8\u4F3C,\u4F46\u5B83\u5E76\u4E0D\u9700\u8981\u5404\u4E2A\u5B50\u9879\u76EE\u62E5\u6709\u81EA\u5DF1\u72EC\u7ACB\u7684 package.json\u3001\u72EC\u7ACB\u5B89\u88C5\u4F9D\u8D56\u3001\u72EC\u7ACB\u6784\u5EFA\u7B49\u3002\u901A\u8FC7 Project References,\u6211\u4EEC\u53EF\u4EE5\u5B9A\u4E49\u8FD9\u4E9B\u90E8\u5206\u7684\u5F15\u7528\u5173\u7CFB,\u4E3A\u5B83\u4EEC\u4F7F\u7528\u72EC\u7ACB\u7684 tsconfig \u914D\u7F6E\u3002",paraId:140,tocIndex:29},{value:"\u8FD9\u4E00\u7279\u6027\u5B9E\u9645\u4E0A\u4E5F\u8BA9 tsc \u4E0D\u518D\u53EA\u662F\u4E00\u4E2A\u7F16\u8BD1\u5668\u4E86,\u5B83\u73B0\u5728\u8FD8\u53EF\u4EE5\u662F\u4E00\u4E2A\u7C7B\u4F3C\u4E8E lerna \u90A3\u6837\u7684 Script Runner,\u5373\u5728\u591A\u4E2A\u5B50\u9879\u76EE\u4E4B\u95F4\u53BB\u786E\u5B9A\u4E00\u6761\u987A\u5E8F\u6B63\u786E\u7684\u6784\u5EFA\u94FE\u8DEF\u3002\u4E5F\u56E0\u6B64,\u5728\u4F7F\u7528 Project References \u7684\u9879\u76EE\u4E2D,\u9700\u8981\u4F7F\u7528 ",paraId:141,tocIndex:29},{value:"tsc --build",paraId:141,tocIndex:29},{value:" \u800C\u975E ",paraId:141,tocIndex:29},{value:"tsc",paraId:141,tocIndex:29},{value:" \u6765\u8FDB\u884C\u6784\u5EFA,\u6B64\u65F6 tsc \u4F1A\u9996\u5148\u786E\u5B9A\u6574\u4E2A\u5F15\u7528\u5173\u7CFB\u56FE,\u7136\u540E\u68C0\u67E5\u4E0A\u9762\u4F5C\u4E3A\u5B50\u7ED3\u70B9\u7684\u9879\u76EE\u662F\u5426\u662F\u6700\u65B0\u6784\u5EFA\u7684,\u6700\u540E\u624D\u57FA\u4E8E\u5F15\u7528\u987A\u5E8F\u53BB\u6784\u5EFA\u8FD9\u4E9B\u975E\u6700\u65B0\u7684\u9879\u76EE\u3002",paraId:141,tocIndex:29},{value:"\u6B64\u65F6\u5982\u679C\u4F60\u4FEE\u6539\u4E00\u4E2A\u5B50\u9879\u76EE,tsc \u4F1A\u81EA\u52A8\u8FDB\u884C\u589E\u91CF\u6784\u5EFA,\u8DF3\u8FC7\u6CA1\u6709\u53D1\u751F\u53D8\u5316\u7684\u9879\u76EE,\u53EA\u6784\u5EFA\u90A3\u4E9B\u53D1\u751F\u4E86\u66F4\u6539\u7684\u90E8\u5206\u3002",paraId:142,tocIndex:29},{value:"composite \u5C5E\u4E8E compilerOptions \u5185\u90E8\u7684\u914D\u7F6E,\u5728 Project References \u7684\u88AB\u5F15\u7528\u5B50\u9879\u76EE ",paraId:143,tocIndex:29},{value:"tsconfig.json",paraId:143,tocIndex:29},{value:" \u4E2D\u5FC5\u987B\u4E3A\u542F\u7528\u72B6\u6001,\u5B83\u901A\u8FC7\u4E00\u7CFB\u5217\u989D\u5916\u7684\u914D\u7F6E\u9879,\u786E\u4FDD\u4F60\u7684\u5B50\u9879\u76EE\u80FD\u88AB Project References \u5F15\u7528,\u800C\u5728\u5B50\u9879\u76EE\u4E2D\u5FC5\u987B\u542F\u7528 declaration,\u5FC5\u987B\u901A\u8FC7 files \u6216 includes \u58F0\u660E\u5B50\u9879\u76EE\u5185\u9700\u8981\u5305\u542B\u7684\u6587\u4EF6\u7B49\u3002",paraId:143,tocIndex:29},{value:"\u9ED8\u8BA4\u60C5\u51B5\u4E0B,TypeScript \u4F1A\u52A0\u8F7D ",paraId:144,tocIndex:30},{value:"node_modules/@types/",paraId:144,tocIndex:30},{value:" \u4E0B\u7684\u6240\u6709\u58F0\u660E\u6587\u4EF6,\u5305\u62EC\u5D4C\u5957\u7684 ",paraId:144,tocIndex:30},{value:"../../node_modules/@types",paraId:144,tocIndex:30},{value:" \u8DEF\u5F84,\u8FD9\u4E48\u505A\u53EF\u4EE5\u8BA9\u4F60\u66F4\u65B9\u4FBF\u5730\u4F7F\u7528\u7B2C\u4E09\u65B9\u5E93\u7684\u7C7B\u578B\u3002\u4F46\u5982\u679C\u4F60\u5E0C\u671B\u53EA\u52A0\u8F7D\u5B9E\u9645\u4F7F\u7528\u7684\u7C7B\u578B\u5B9A\u4E49\u5305,\u5C31\u53EF\u4EE5\u901A\u8FC7 types \u914D\u7F6E:",paraId:144,tocIndex:30},{value:`{
  "compilerOptions": {
    "types": ["node", "jest", "react"]
  }
}
`,paraId:145,tocIndex:30},{value:"\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B,\u53EA\u6709 ",paraId:146,tocIndex:30},{value:"@types/node",paraId:146,tocIndex:30},{value:"\u3001",paraId:146,tocIndex:30},{value:"@types/jest",paraId:146,tocIndex:30},{value:" \u4EE5\u53CA ",paraId:146,tocIndex:30},{value:"@types/react",paraId:146,tocIndex:30},{value:" \u4F1A\u88AB\u52A0\u8F7D\u3002",paraId:146,tocIndex:30},{value:"\u5373\u4F7F\u5176\u4ED6 ",paraId:147,tocIndex:30},{value:"@types/",paraId:147,tocIndex:30},{value:" \u5305\u6CA1\u6709\u88AB\u5305\u542B,\u5B83\u4EEC\u4E5F\u4ECD\u7136\u80FD\u62E5\u6709\u5B8C\u6574\u7684\u7C7B\u578B,\u4F46\u5176\u4E2D\u7684\u5168\u5C40\u58F0\u660E(\u5982 ",paraId:147,tocIndex:30},{value:"process",paraId:147,tocIndex:30},{value:"\u3001",paraId:147,tocIndex:30},{value:"expect",paraId:147,tocIndex:30},{value:"\u3001",paraId:147,tocIndex:30},{value:"describe",paraId:147,tocIndex:30},{value:" \u7B49\u5168\u5C40\u53D8\u91CF)\u5C06\u4E0D\u4F1A\u88AB\u5305\u542B,\u540C\u65F6\u4E5F\u65E0\u6CD5\u518D\u4EAB\u53D7\u5230\u57FA\u4E8E\u7C7B\u578B\u7684\u63D0\u793A\u3002",paraId:147,tocIndex:30},{value:"\u5982\u679C\u4F60\u751A\u81F3\u5E0C\u671B\u6539\u53D8\u52A0\u8F7D ",paraId:148,tocIndex:30},{value:"@types/",paraId:148,tocIndex:30},{value:" \u4E0B\u6587\u4EF6\u7684\u884C\u4E3A,\u53EF\u4EE5\u4F7F\u7528 typeRoots \u9009\u9879,\u5176\u9ED8\u8BA4\u4E3A ",paraId:148,tocIndex:30},{value:"@types",paraId:148,tocIndex:30},{value:",\u5373\u6307\u5B9A ",paraId:148,tocIndex:30},{value:"node_modules/@types",paraId:148,tocIndex:30},{value:" \u4E0B\u7684\u6240\u6709\u6587\u4EF6(\u4ECD\u7136\u5305\u62EC\u5D4C\u5957\u7684)\u3002",paraId:148,tocIndex:30},{value:`{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@types",
      "./node_modules/@team-types",
      "./typings"
    ],
    "types": ["react"],
    "skipLibCheck": true
  }
}
`,paraId:149,tocIndex:30},{value:"\u4EE5\u4E0A\u914D\u7F6E\u4F1A\u5C1D\u8BD5\u52A0\u8F7D ",paraId:150,tocIndex:30},{value:"node_modules/@types/react",paraId:150,tocIndex:30},{value:" \u4EE5\u53CA ",paraId:150,tocIndex:30},{value:"./node_modules/@team-types/react",paraId:150,tocIndex:30},{value:"\u3001",paraId:150,tocIndex:30},{value:"./typings/react",paraId:150,tocIndex:30},{value:" \u4E2D\u7684\u58F0\u660E\u6587\u4EF6,\u6CE8\u610F\u6211\u4EEC\u9700\u8981\u4F7F\u7528",paraId:150,tocIndex:30},{value:"\u76F8\u5BF9\u4E8E baseUrl \u7684\u76F8\u5BF9\u8DEF\u5F84",paraId:150,tocIndex:30},{value:"\u3002",paraId:150,tocIndex:30},{value:"\u52A0\u8F7D\u591A\u4E2A\u58F0\u660E\u6587\u4EF6\u53EF\u80FD\u4F1A\u5BFC\u81F4\u5185\u90E8\u7684\u58F0\u660E\u51B2\u7A81,\u6240\u4EE5\u4F60\u53EF\u80FD\u4F1A\u9700\u8981 skipLibCheck \u914D\u7F6E\u6765\u7981\u7528\u6389\u5BF9\u52A0\u8F7D\u7684\u7C7B\u578B\u58F0\u660E\u7684\u68C0\u67E5\u3002",paraId:151,tocIndex:30},{value:`{
  "compilerOptions": {
    // \u53EF\u9009\u5C5E\u6027\u4E25\u683C\u68C0\u67E5
    "exactOptionalPropertyTypes": true,

    // \u7D22\u5F15\u7B7E\u540D\u68C0\u67E5
    "noUncheckedIndexedAccess": true,

    // \u7C7B\u65B9\u6CD5\u8986\u76D6\u68C0\u67E5
    "noImplicitOverride": true,

    // Switch \u8BED\u53E5\u5B8C\u6574\u6027\u68C0\u67E5
    "noFallthroughCasesInSwitch": true
  }
}
`,paraId:152,tocIndex:31},{value:`{
  "compilerOptions": {
    // \u53EA\u751F\u6210\u7C7B\u578B\u6587\u4EF6,\u4E0D\u751F\u6210 JS
    "noEmit": true, // \u6216 "emitDeclarationOnly": true

    // \u4ECE tslib \u5BFC\u5165\u8F85\u52A9\u51FD\u6570(\u51CF\u5C0F\u4F53\u79EF)
    "importHelpers": true,

    // \u4FDD\u7559\u5E38\u91CF\u679A\u4E3E
    "preserveConstEnums": true,

    // \u79FB\u9664\u6CE8\u91CA
    "removeComments": true
  }
}
`,paraId:153,tocIndex:32},{value:`{
  "compilerOptions": {
    // \u6A21\u5757\u540E\u7F00(React Native \u7B49)
    "moduleSuffixes": [".ios", ".native", ""],

    // \u865A\u62DF\u76EE\u5F55\u5408\u5E76
    "rootDirs": ["src/locales", "generated/messages"]
  }
}
`,paraId:154,tocIndex:33},{value:`{
  "watchOptions": {
    "watchFile": "useFsEvents",
    "watchDirectory": "useFsEvents",
    "excludeDirectories": ["**/node_modules", "_build"],
    "excludeFiles": ["build/temp.ts"]
  }
}
`,paraId:155,tocIndex:34},{value:"\u6700\u5C0F\u63A8\u8350\u914D\u7F6E",paraId:156,tocIndex:36},{value:"(\u9002\u5408\u5FEB\u901F\u5F00\u59CB):",paraId:156,tocIndex:36},{value:`{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
`,paraId:157,tocIndex:36},{value:"\u9010\u6B65\u542F\u7528\u89C4\u5219:",paraId:158,tocIndex:37},{value:`{
  "compilerOptions": {
    "strict": false,
    // \u5148\u542F\u7528\u8FD9\u4E9B
    "noImplicitAny": true,
    "strictNullChecks": true,
    // \u9010\u6B65\u542F\u7528\u5176\u4ED6\u89C4\u5219
    "strictFunctionTypes": true
  }
}
`,paraId:159,tocIndex:37},{value:"\u786E\u4FDD\u540C\u65F6\u914D\u7F6E\u4E86 ",paraId:160,tocIndex:38},{value:"baseUrl",paraId:160,tocIndex:38},{value:" \u548C ",paraId:160,tocIndex:38},{value:"paths",paraId:160,tocIndex:38},{value:":",paraId:160,tocIndex:38},{value:`{
  "compilerOptions": {
    "baseUrl": "./", // \u5FC5\u987B\u8BBE\u7F6E
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
`,paraId:161,tocIndex:38},{value:"\u6CE8\u610F",paraId:162,tocIndex:38},{value:": \u5982\u679C\u4F7F\u7528 Webpack/Vite,\u8FD8\u9700\u8981\u5728\u6784\u5EFA\u5DE5\u5177\u4E2D\u914D\u7F6E\u5BF9\u5E94\u7684\u522B\u540D\u3002",paraId:162,tocIndex:38},{value:`{
  "compilerOptions": {
    "isolatedModules": true, // \u5FC5\u9700
    "noEmit": true, // \u4E0D\u751F\u6210 JS,\u53EA\u505A\u7C7B\u578B\u68C0\u67E5
    "esModuleInterop": true
  }
}
`,paraId:163,tocIndex:39},{value:`{
  "compilerOptions": {
    "incremental": true, // \u589E\u91CF\u7F16\u8BD1
    "skipLibCheck": true, // \u8DF3\u8FC7\u5E93\u68C0\u67E5
    "noEmit": true // \u5982\u679C\u7528\u5176\u4ED6\u5DE5\u5177\u6784\u5EFA
  },
  "exclude": [
    "node_modules",
    "**/*.test.ts" // \u6392\u9664\u6D4B\u8BD5\u6587\u4EF6
  ]
}
`,paraId:164,tocIndex:40},{value:`{
  "compilerOptions": {
    "declaration": true, // \u751F\u6210 .d.ts
    "declarationMap": true, // \u751F\u6210 source map
    "target": "ES2018", // \u517C\u5BB9\u6027\u76EE\u6807
    "module": "ESNext",
    "removeComments": true // \u79FB\u9664\u6CE8\u91CA
  }
}
`,paraId:165,tocIndex:41},{value:"\u540C\u65F6\u5728 ",paraId:166,tocIndex:41},{value:"package.json",paraId:166,tocIndex:41},{value:" \u4E2D\u914D\u7F6E:",paraId:166,tocIndex:41},{value:`{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"]
}
`,paraId:167,tocIndex:41},{value:"\u573A\u666F",paraId:168,tocIndex:43},{value:"\u6838\u5FC3\u914D\u7F6E",paraId:168,tocIndex:43},{value:"Web \u5E94\u7528",paraId:168,tocIndex:43},{value:"strict",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"target: ES2020",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"module: ESNext",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"jsx",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"esModuleInterop",paraId:168,tocIndex:43},{value:"Node \u5E94\u7528",paraId:168,tocIndex:43},{value:"strict",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"target: ES2020",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"module: CommonJS",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"esModuleInterop",paraId:168,tocIndex:43},{value:"npm \u5E93",paraId:168,tocIndex:43},{value:"strict",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"declaration",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"target: ES2018",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"module: ESNext",paraId:168,tocIndex:43},{value:"Monorepo",paraId:168,tocIndex:43},{value:"composite",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"references",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"incremental",paraId:168,tocIndex:43},{value:"\u4F7F\u7528 Babel/ESBuild",paraId:168,tocIndex:43},{value:"isolatedModules",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"noEmit",paraId:168,tocIndex:43},{value:", ",paraId:168,tocIndex:43},{value:"esModuleInterop",paraId:168,tocIndex:43},{value:"\u529F\u80FD",paraId:169,tocIndex:44},{value:"\u914D\u7F6E\u9879",paraId:169,tocIndex:44},{value:"\u63A8\u8350\u503C",paraId:169,tocIndex:44},{value:"\u7C7B\u578B\u5B89\u5168",paraId:169,tocIndex:44},{value:"strict",paraId:169,tocIndex:44},{value:"true",paraId:169,tocIndex:44},{value:"\u7F16\u8BD1\u76EE\u6807",paraId:169,tocIndex:44},{value:"target",paraId:169,tocIndex:44},{value:"ES2020",paraId:169,tocIndex:44},{value:"\u6A21\u5757\u7CFB\u7EDF",paraId:169,tocIndex:44},{value:"module",paraId:169,tocIndex:44},{value:"ESNext",paraId:169,tocIndex:44},{value:" / ",paraId:169,tocIndex:44},{value:"CommonJS",paraId:169,tocIndex:44},{value:"\u8DEF\u5F84\u522B\u540D",paraId:169,tocIndex:44},{value:"baseUrl",paraId:169,tocIndex:44},{value:", ",paraId:169,tocIndex:44},{value:"paths",paraId:169,tocIndex:44},{value:"\u6309\u9700\u914D\u7F6E",paraId:169,tocIndex:44},{value:"\u751F\u6210\u7C7B\u578B",paraId:169,tocIndex:44},{value:"declaration",paraId:169,tocIndex:44},{value:"\u5E93\u9879\u76EE ",paraId:169,tocIndex:44},{value:"true",paraId:169,tocIndex:44},{value:"\u52A0\u901F\u7F16\u8BD1",paraId:169,tocIndex:44},{value:"incremental",paraId:169,tocIndex:44},{value:", ",paraId:169,tocIndex:44},{value:"skipLibCheck",paraId:169,tocIndex:44},{value:"true",paraId:169,tocIndex:44},{value:"\u8C03\u8BD5\u652F\u6301",paraId:169,tocIndex:44},{value:"sourceMap",paraId:169,tocIndex:44},{value:"\u5F00\u53D1\u73AF\u5883 ",paraId:169,tocIndex:44},{value:"true",paraId:169,tocIndex:44},{value:"\u517C\u5BB9\u6027",paraId:169,tocIndex:44},{value:"esModuleInterop",paraId:169,tocIndex:44},{value:"true",paraId:169,tocIndex:44},{value:"TypeScript \u5B98\u65B9\u6587\u6863",paraId:170,tocIndex:45},{value:"TSConfig \u53C2\u8003",paraId:170,tocIndex:45},{value:"TSConfig Bases",paraId:170,tocIndex:45},{value:" - \u793E\u533A\u63A8\u8350\u914D\u7F6E\u96C6\u5408",paraId:170,tocIndex:45}]}}]);
