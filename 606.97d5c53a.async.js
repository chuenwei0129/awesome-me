"use strict";(self.webpackChunk_c6i_playground=self.webpackChunk_c6i_playground||[]).push([[606],{85606:function(d,a,n){n.r(a),n.d(a,{texts:function(){return e}});const e=[{value:"Tailwind CSS v4 \u5E26\u6765\u4E86\u9769\u547D\u6027\u7684\u53D8\u5316\uFF0C\u6838\u5FC3\u7406\u5FF5\u4ECE ",paraId:0,tocIndex:0},{value:"JavaScript \u914D\u7F6E\u4F18\u5148",paraId:0,tocIndex:0},{value:" \u8F6C\u53D8\u4E3A ",paraId:0,tocIndex:0},{value:"CSS \u539F\u751F\u4F18\u5148",paraId:0,tocIndex:0},{value:"\u3002",paraId:0,tocIndex:0},{value:"\u7279\u6027",paraId:1,tocIndex:1},{value:"v3",paraId:1,tocIndex:1},{value:"v4",paraId:1,tocIndex:1},{value:"\u4F18\u52BF",paraId:1,tocIndex:1},{value:"\u914D\u7F6E\u65B9\u5F0F",paraId:1,tocIndex:1},{value:"tailwind.config.js",paraId:1,tocIndex:1},{value:"CSS \u4E2D\u7684 ",paraId:1,tocIndex:1},{value:"@theme",paraId:1,tocIndex:1},{value:"\u66F4\u7B26\u5408 Web \u6807\u51C6\uFF0C\u65E0\u9700 JS \u914D\u7F6E",paraId:1,tocIndex:1},{value:"\u5BFC\u5165\u65B9\u5F0F",paraId:1,tocIndex:1},{value:"@tailwind base/components/utilities",paraId:1,tocIndex:1},{value:'@import "tailwindcss"',paraId:1,tocIndex:1},{value:"\u6807\u51C6 CSS \u8BED\u6CD5\uFF0C\u66F4\u7B80\u6D01",paraId:1,tocIndex:1},{value:"\u6027\u80FD",paraId:1,tocIndex:1},{value:"\u8F83\u5FEB",paraId:1,tocIndex:1},{value:"\u66F4\u5FEB",paraId:1,tocIndex:1},{value:"\u539F\u751F CSS \u5904\u7406\uFF0C\u96F6 JS \u8FD0\u884C\u65F6",paraId:1,tocIndex:1},{value:"\u4E3B\u9898\u8BBF\u95EE",paraId:1,tocIndex:1},{value:"resolveConfig()",paraId:1,tocIndex:1},{value:"CSS \u53D8\u91CF",paraId:1,tocIndex:1},{value:"\u76F4\u63A5\u5728 CSS/JS \u4E2D\u4F7F\u7528\uFF0Cbundle \u66F4\u5C0F",paraId:1,tocIndex:1},{value:"\u5DE5\u5177\u94FE",paraId:1,tocIndex:1},{value:"PostCSS \u4F9D\u8D56\u591A",paraId:1,tocIndex:1},{value:"\u5185\u7F6E\u5904\u7406",paraId:1,tocIndex:1},{value:"\u66F4\u5C11\u7684\u4F9D\u8D56\uFF0C\u66F4\u7B80\u5355\u7684\u914D\u7F6E",paraId:1,tocIndex:1},{value:"\u6784\u5EFA\u901F\u5EA6",paraId:1,tocIndex:1},{value:"\u5FEB",paraId:1,tocIndex:1},{value:"\u6781\u5FEB",paraId:1,tocIndex:1},{value:"Rust \u5F15\u64CE\uFF0C\u5927\u5E45\u63D0\u5347",paraId:1,tocIndex:1},{value:"v3 \u65B9\u5F0F\uFF1A",paraId:2,tocIndex:2},{value:`/* app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
`,paraId:3,tocIndex:2},{value:`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6',
      },
    },
  },
};
`,paraId:4,tocIndex:2},{value:"v4 \u65B9\u5F0F\uFF1A",paraId:5,tocIndex:2},{value:`/* app.css */
@import 'tailwindcss';

@theme {
  --color-brand: #3b82f6;
}
`,paraId:6,tocIndex:2},{value:"\u66F4\u7B80\u6D01\u3001\u66F4\u6807\u51C6\u3001\u66F4\u5FEB\uFF01",paraId:7,tocIndex:2},{value:`# 1. \u5B89\u88C5\u4F9D\u8D56
npm install tailwindcss @tailwindcss/vite

# 2. \u914D\u7F6E Vite
`,paraId:8,tocIndex:4},{value:`// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
`,paraId:9,tocIndex:4},{value:`/* src/app.css */
@import 'tailwindcss';
`,paraId:10,tocIndex:4},{value:"\u5C31\u8FD9\u4E48\u7B80\u5355\uFF01\u4E0D\u9700\u8981 ",paraId:11,tocIndex:4},{value:"tailwind.config.js",paraId:11,tocIndex:4},{value:"\uFF0C\u4E0D\u9700\u8981 PostCSS \u914D\u7F6E\u3002",paraId:11,tocIndex:4},{value:`npm install tailwindcss @tailwindcss/postcss
`,paraId:12,tocIndex:5},{value:`// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
`,paraId:13,tocIndex:5},{value:`/* app.css */
@import 'tailwindcss';
`,paraId:14,tocIndex:5},{value:`npm install tailwindcss @tailwindcss/cli
`,paraId:15,tocIndex:6},{value:`npx @tailwindcss/cli -i input.css -o output.css --watch
`,paraId:16,tocIndex:6},{value:"Tailwind \u63D0\u4F9B\u4E86\u5B98\u65B9\u7684\u81EA\u52A8\u5347\u7EA7\u5DE5\u5177\uFF0C\u53EF\u4EE5\u5904\u7406 90% \u7684\u5347\u7EA7\u5DE5\u4F5C\uFF1A",paraId:17,tocIndex:8},{value:`npx @tailwindcss/upgrade
`,paraId:18,tocIndex:8},{value:"\u5DE5\u5177\u4F1A\u81EA\u52A8\uFF1A",paraId:19,tocIndex:8},{value:"\u2705 \u66F4\u65B0 package.json \u4E2D\u7684\u4F9D\u8D56",paraId:20,tocIndex:8},{value:"\u2705 \u8FC1\u79FB ",paraId:20,tocIndex:8},{value:"@tailwind",paraId:20,tocIndex:8},{value:" \u6307\u4EE4\u5230 ",paraId:20,tocIndex:8},{value:"@import",paraId:20,tocIndex:8},{value:"\u2705 \u8F6C\u6362 ",paraId:20,tocIndex:8},{value:"tailwind.config.js",paraId:20,tocIndex:8},{value:" \u5230 CSS ",paraId:20,tocIndex:8},{value:"@theme",paraId:20,tocIndex:8},{value:"\u2705 \u66F4\u65B0\u5E9F\u5F03\u7684\u7C7B\u540D",paraId:20,tocIndex:8},{value:"\u2705 \u4FEE\u590D\u53D8\u4F53\u5806\u53E0\u987A\u5E8F",paraId:20,tocIndex:8},{value:"\u2705 \u8C03\u6574 PostCSS \u914D\u7F6E",paraId:20,tocIndex:8},{value:"\u8981\u6C42\uFF1A",paraId:21,tocIndex:8},{value:" Node.js 20 \u6216\u66F4\u9AD8\u7248\u672C",paraId:21,tocIndex:8},{value:"\u5982\u679C\u4F60\u66F4\u559C\u6B22\u624B\u52A8\u63A7\u5236\u5347\u7EA7\u8FC7\u7A0B\uFF1A",paraId:22,tocIndex:9},{value:`// package.json
{
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0"  // \u5982\u679C\u4F7F\u7528 Vite
    // \u6216
    "@tailwindcss/postcss": "^4.0.0"  // \u5982\u679C\u4F7F\u7528 PostCSS
  }
}
`,paraId:23,tocIndex:10},{value:`npm install
`,paraId:24,tocIndex:10},{value:"\u4E4B\u524D (v3)\uFF1A",paraId:25,tocIndex:11},{value:`@tailwind base;
@tailwind components;
@tailwind utilities;
`,paraId:26,tocIndex:11},{value:"\u4E4B\u540E (v4)\uFF1A",paraId:27,tocIndex:11},{value:`@import 'tailwindcss';
`,paraId:28,tocIndex:11},{value:"\u4E4B\u524D (v3)\uFF1A",paraId:29,tocIndex:12},{value:`// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        128: '32rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
`,paraId:30,tocIndex:12},{value:"\u4E4B\u540E (v4)\uFF1A",paraId:31,tocIndex:12},{value:`/* app.css */
@import 'tailwindcss';

@theme {
  /* \u989C\u8272 */
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;

  /* \u5B57\u4F53 */
  --font-family-sans: 'Inter', sans-serif;

  /* \u95F4\u8DDD */
  --spacing-128: 32rem;
}
`,paraId:32,tocIndex:12},{value:"\u5982\u679C\u9700\u8981\u52A0\u8F7D\u65E7\u7684 JS \u914D\u7F6E\uFF1A",paraId:33,tocIndex:12},{value:`@config "../../tailwind.config.js";
@import 'tailwindcss';
`,paraId:34,tocIndex:12},{value:"\u4E4B\u524D (v3)\uFF1A",paraId:35,tocIndex:13},{value:`module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,paraId:36,tocIndex:13},{value:"\u4E4B\u540E (v4)\uFF1A",paraId:37,tocIndex:13},{value:`export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
`,paraId:38,tocIndex:13},{value:"\u8BF4\u660E\uFF1A",paraId:39,tocIndex:13},{value:" ",paraId:39,tocIndex:13},{value:"postcss-import",paraId:39,tocIndex:13},{value:" \u548C ",paraId:39,tocIndex:13},{value:"autoprefixer",paraId:39,tocIndex:13},{value:" \u5DF2\u5185\u7F6E\uFF0C\u65E0\u9700\u5355\u72EC\u914D\u7F6E\u3002",paraId:39,tocIndex:13},{value:"\u4E4B\u524D (v3)\uFF1A",paraId:40,tocIndex:14},{value:`import { defineConfig } from 'vite';

export default defineConfig({
  // PostCSS \u81EA\u52A8\u5904\u7406 Tailwind
});
`,paraId:41,tocIndex:14},{value:"\u4E4B\u540E (v4)\uFF1A",paraId:42,tocIndex:14},{value:`import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
`,paraId:43,tocIndex:14},{value:"Tailwind v4 \u4E3A\u4E86\u66F4\u597D\u7684\u4E00\u81F4\u6027\uFF0C\u91CD\u547D\u540D\u4E86\u4E00\u4E9B\u5DE5\u5177\u7C7B\uFF1A",paraId:44,tocIndex:16},{value:"\u7C7B\u522B",paraId:45,tocIndex:16},{value:"v3",paraId:45,tocIndex:16},{value:"v4",paraId:45,tocIndex:16},{value:"\u9634\u5F71",paraId:45,tocIndex:16},{value:"shadow-sm",paraId:45,tocIndex:16},{value:"shadow-xs",paraId:45,tocIndex:16},{value:"shadow",paraId:45,tocIndex:16},{value:"shadow-sm",paraId:45,tocIndex:16},{value:"shadow-md",paraId:45,tocIndex:16},{value:"shadow",paraId:45,tocIndex:16},{value:"shadow-lg",paraId:45,tocIndex:16},{value:"shadow-md",paraId:45,tocIndex:16},{value:"shadow-xl",paraId:45,tocIndex:16},{value:"shadow-lg",paraId:45,tocIndex:16},{value:"shadow-2xl",paraId:45,tocIndex:16},{value:"shadow-xl",paraId:45,tocIndex:16},{value:"\u5706\u89D2",paraId:45,tocIndex:16},{value:"rounded-sm",paraId:45,tocIndex:16},{value:"rounded-xs",paraId:45,tocIndex:16},{value:"rounded",paraId:45,tocIndex:16},{value:"rounded-sm",paraId:45,tocIndex:16},{value:"rounded-md",paraId:45,tocIndex:16},{value:"rounded",paraId:45,tocIndex:16},{value:"rounded-lg",paraId:45,tocIndex:16},{value:"rounded-md",paraId:45,tocIndex:16},{value:"rounded-xl",paraId:45,tocIndex:16},{value:"rounded-lg",paraId:45,tocIndex:16},{value:"rounded-2xl",paraId:45,tocIndex:16},{value:"rounded-xl",paraId:45,tocIndex:16},{value:"rounded-3xl",paraId:45,tocIndex:16},{value:"rounded-2xl",paraId:45,tocIndex:16},{value:"\u6A21\u7CCA",paraId:45,tocIndex:16},{value:"blur-sm",paraId:45,tocIndex:16},{value:"blur-xs",paraId:45,tocIndex:16},{value:"blur",paraId:45,tocIndex:16},{value:"blur-sm",paraId:45,tocIndex:16},{value:"blur-md",paraId:45,tocIndex:16},{value:"blur",paraId:45,tocIndex:16},{value:"blur-lg",paraId:45,tocIndex:16},{value:"blur-md",paraId:45,tocIndex:16},{value:"blur-xl",paraId:45,tocIndex:16},{value:"blur-lg",paraId:45,tocIndex:16},{value:"blur-2xl",paraId:45,tocIndex:16},{value:"blur-xl",paraId:45,tocIndex:16},{value:"blur-3xl",paraId:45,tocIndex:16},{value:"blur-2xl",paraId:45,tocIndex:16},{value:"\u81EA\u52A8\u5347\u7EA7\u5DE5\u5177\u4F1A\u5904\u7406\u8FD9\u4E9B\u53D8\u5316\u3002",paraId:46,tocIndex:16},{value:"\u4EE5\u4E0B\u5DE5\u5177\u7C7B\u5DF2\u88AB\u73B0\u4EE3\u66FF\u4EE3\u65B9\u6848\u53D6\u4EE3\uFF1A",paraId:47,tocIndex:17},{value:"\u5E9F\u5F03\u7684\u7C7B",paraId:48,tocIndex:17},{value:"\u66FF\u4EE3\u65B9\u6848",paraId:48,tocIndex:17},{value:"\u8BF4\u660E",paraId:48,tocIndex:17},{value:"flex-grow-*",paraId:48,tocIndex:17},{value:"grow-*",paraId:48,tocIndex:17},{value:"\u66F4\u7B80\u6D01\u7684\u540D\u79F0",paraId:48,tocIndex:17},{value:"flex-shrink-*",paraId:48,tocIndex:17},{value:"shrink-*",paraId:48,tocIndex:17},{value:"\u66F4\u7B80\u6D01\u7684\u540D\u79F0",paraId:48,tocIndex:17},{value:"bg-opacity-*",paraId:48,tocIndex:17},{value:"bg-black/50",paraId:48,tocIndex:17},{value:"\u4F7F\u7528\u4E0D\u900F\u660E\u5EA6\u4FEE\u9970\u7B26",paraId:48,tocIndex:17},{value:"text-opacity-*",paraId:48,tocIndex:17},{value:"text-black/50",paraId:48,tocIndex:17},{value:"\u4F7F\u7528\u4E0D\u900F\u660E\u5EA6\u4FEE\u9970\u7B26",paraId:48,tocIndex:17},{value:"border-opacity-*",paraId:48,tocIndex:17},{value:"border-black/50",paraId:48,tocIndex:17},{value:"\u4F7F\u7528\u4E0D\u900F\u660E\u5EA6\u4FEE\u9970\u7B26",paraId:48,tocIndex:17},{value:"ring-opacity-*",paraId:48,tocIndex:17},{value:"ring-black/50",paraId:48,tocIndex:17},{value:"\u4F7F\u7528\u4E0D\u900F\u660E\u5EA6\u4FEE\u9970\u7B26",paraId:48,tocIndex:17},{value:"placeholder-opacity-*",paraId:48,tocIndex:17},{value:"placeholder-black/50",paraId:48,tocIndex:17},{value:"\u4F7F\u7528\u4E0D\u900F\u660E\u5EA6\u4FEE\u9970\u7B26",paraId:48,tocIndex:17},{value:"divide-opacity-*",paraId:48,tocIndex:17},{value:"divide-black/50",paraId:48,tocIndex:17},{value:"\u4F7F\u7528\u4E0D\u900F\u660E\u5EA6\u4FEE\u9970\u7B26",paraId:48,tocIndex:17},{value:"decoration-slice",paraId:48,tocIndex:17},{value:"box-decoration-slice",paraId:48,tocIndex:17},{value:"\u66F4\u51C6\u786E\u7684\u540D\u79F0",paraId:48,tocIndex:17},{value:"decoration-clone",paraId:48,tocIndex:17},{value:"box-decoration-clone",paraId:48,tocIndex:17},{value:"\u66F4\u51C6\u786E\u7684\u540D\u79F0",paraId:48,tocIndex:17},{value:"overflow-ellipsis",paraId:48,tocIndex:17},{value:"text-ellipsis",paraId:48,tocIndex:17},{value:"\u66F4\u8BED\u4E49\u5316",paraId:48,tocIndex:17},{value:"\u8FC1\u79FB\u793A\u4F8B\uFF1A",paraId:49,tocIndex:17},{value:`<!-- v3 -->
<div class="bg-blue-500 bg-opacity-50 flex-grow-1">Old way</div>

<!-- v4 -->
<div class="bg-blue-500/50 grow-1">New way</div>
`,paraId:50,tocIndex:17},{value:"\u5C5E\u6027",paraId:51,tocIndex:18},{value:"v3 \u9ED8\u8BA4\u503C",paraId:51,tocIndex:18},{value:"v4 \u9ED8\u8BA4\u503C",paraId:51,tocIndex:18},{value:"\u5F71\u54CD",paraId:51,tocIndex:18},{value:"border",paraId:51,tocIndex:18},{value:" \u989C\u8272",paraId:51,tocIndex:18},{value:"gray-200",paraId:51,tocIndex:18},{value:"currentColor",paraId:51,tocIndex:18},{value:"\u8FB9\u6846\u73B0\u5728\u7EE7\u627F\u6587\u672C\u989C\u8272",paraId:51,tocIndex:18},{value:"divide",paraId:51,tocIndex:18},{value:" \u989C\u8272",paraId:51,tocIndex:18},{value:"gray-200",paraId:51,tocIndex:18},{value:"currentColor",paraId:51,tocIndex:18},{value:"\u5206\u5272\u7EBF\u7EE7\u627F\u6587\u672C\u989C\u8272",paraId:51,tocIndex:18},{value:"ring",paraId:51,tocIndex:18},{value:" \u9ED8\u8BA4\u5BBD\u5EA6",paraId:51,tocIndex:18},{value:"3px",paraId:51,tocIndex:18},{value:"1px",paraId:51,tocIndex:18},{value:"\u73AF\u5F62\u66F4\u7EC6",paraId:51,tocIndex:18},{value:"\u6062\u590D v3 \u884C\u4E3A\uFF1A",paraId:52,tocIndex:18},{value:`/* \u6062\u590D v3 \u7684\u8FB9\u6846\u9ED8\u8BA4\u989C\u8272 */
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
`,paraId:53,tocIndex:18},{value:`<!-- \u6216\u660E\u786E\u6307\u5B9A -->
<div class="border border-gray-200">Content</div>

<!-- v4 \u4E2D\u9700\u8981\u660E\u786E\u5BBD\u5EA6\u6765\u83B7\u5F97 3px ring -->
<input class="ring-3 ring-blue-500" />
`,paraId:54,tocIndex:18},{value:"v4 \u5C06\u53D8\u4F53\u5806\u53E0\u987A\u5E8F\u4ECE",paraId:55,tocIndex:19},{value:"\u53F3\u5230\u5DE6",paraId:55,tocIndex:19},{value:"\u6539\u4E3A",paraId:55,tocIndex:19},{value:"\u5DE6\u5230\u53F3",paraId:55,tocIndex:19},{value:"\uFF08\u66F4\u7B26\u5408\u76F4\u89C9\uFF09\uFF1A",paraId:55,tocIndex:19},{value:`<!-- v3: \u53F3\u5230\u5DE6 -->
<ul class="first:*:pt-0 last:*:pb-0">
  <!-- first:*:pt-0 \u5148\u5E94\u7528 * \u9009\u62E9\u5668\uFF0C\u518D\u5E94\u7528 first -->
</ul>

<!-- v4: \u5DE6\u5230\u53F3 -->
<ul class="*:first:pt-0 *:last:pb-0">
  <!-- *:first:pt-0 \u5148\u5E94\u7528 *\uFF0C\u518D\u5E94\u7528 first -->
</ul>
`,paraId:56,tocIndex:19},{value:"\u5728\u4EFB\u610F\u503C\u4E2D\u4F7F\u7528 CSS \u53D8\u91CF\u65F6\uFF0C\u8BED\u6CD5\u6709\u6240\u53D8\u5316\uFF1A",paraId:57,tocIndex:20},{value:`<!-- v3 -->
<div class="bg-[--brand-color]">Old syntax</div>

<!-- v4 -->
<div class="bg-(--brand-color)">New syntax</div>
`,paraId:58,tocIndex:20},{value:"\u5EFA\u8BAE\uFF1A",paraId:59,tocIndex:20},{value:" \u4F7F\u7528 ",paraId:59,tocIndex:20},{value:"@theme",paraId:59,tocIndex:20},{value:" \u5B9A\u4E49\u989C\u8272\uFF0C\u7136\u540E\u76F4\u63A5\u4F7F\u7528\u7C7B\u540D\uFF1A",paraId:59,tocIndex:20},{value:`@theme {
  --color-brand: #3b82f6;
}
`,paraId:60,tocIndex:20},{value:`<div class="bg-brand">Clean and simple</div>
`,paraId:61,tocIndex:20},{value:"container",paraId:62,tocIndex:21},{value:" \u7684 ",paraId:62,tocIndex:21},{value:"center",paraId:62,tocIndex:21},{value:" \u548C ",paraId:62,tocIndex:21},{value:"padding",paraId:62,tocIndex:21},{value:" \u914D\u7F6E\u9009\u9879\u5DF2\u79FB\u9664\uFF0C\u4F7F\u7528 ",paraId:62,tocIndex:21},{value:"@utility",paraId:62,tocIndex:21},{value:" \u81EA\u5B9A\u4E49\uFF1A",paraId:62,tocIndex:21},{value:"v3:",paraId:63,tocIndex:21},{value:`module.exports = {
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
  },
};
`,paraId:64,tocIndex:21},{value:"v4:",paraId:65,tocIndex:21},{value:`@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
`,paraId:66,tocIndex:21},{value:"space-x-*",paraId:67,tocIndex:22},{value:" \u548C ",paraId:67,tocIndex:22},{value:"space-y-*",paraId:67,tocIndex:22},{value:" \u7684\u5185\u90E8\u9009\u62E9\u5668\u5DF2\u66F4\u65B0\uFF0C\u53EF\u80FD\u5F71\u54CD\u67D0\u4E9B\u8FB9\u7F18\u60C5\u51B5\u3002",paraId:67,tocIndex:22},{value:"\u5EFA\u8BAE\uFF1A",paraId:68,tocIndex:22},{value:" \u4F18\u5148\u4F7F\u7528 ",paraId:68,tocIndex:22},{value:"gap",paraId:68,tocIndex:22},{value:" \u4EE3\u66FF ",paraId:68,tocIndex:22},{value:"space-*",paraId:68,tocIndex:22},{value:"\uFF1A",paraId:68,tocIndex:22},{value:`<!-- \u63A8\u8350 -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- \u800C\u975E -->
<div class="flex flex-col space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
`,paraId:69,tocIndex:22},{value:"@theme",paraId:70,tocIndex:24},{value:" \u662F v4 \u7684\u6838\u5FC3\u7279\u6027\uFF0C\u8BA9\u4F60\u76F4\u63A5\u5728 CSS \u4E2D\u5B9A\u4E49\u8BBE\u8BA1\u7CFB\u7EDF\uFF1A",paraId:70,tocIndex:24},{value:`@theme {
  /* \u5355\u4E00\u989C\u8272 */
  --color-brand: #3b82f6;

  /* \u989C\u8272\u8272\u9636 */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;

  /* \u4F7F\u7528 oklch\uFF08\u63A8\u8350\uFF09 */
  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-900: oklch(0.53 0.12 118.34);
}
`,paraId:71,tocIndex:25},{value:"\u4F7F\u7528\uFF1A",paraId:72,tocIndex:25},{value:`<div class="bg-brand text-white">Brand color</div>
<div class="bg-primary-500 hover:bg-primary-600">Primary</div>
<div class="bg-avocado-500">Avocado</div>
`,paraId:73,tocIndex:25},{value:`@theme {
  /* \u5B57\u4F53\u65CF */
  --font-family-sans: 'Inter', ui-sans-serif, sans-serif;
  --font-family-serif: 'Merriweather', ui-serif, serif;
  --font-family-mono: 'JetBrains Mono', ui-monospace, monospace;
  --font-family-display: 'Satoshi', sans-serif;

  /* \u5B57\u4F53\u5927\u5C0F\uFF08\u53EF\u9009\uFF0C\u5DF2\u6709\u9ED8\u8BA4\u503C\uFF09 */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;

  /* \u5B57\u4F53\u7C97\u7EC6\uFF08\u53EF\u9009\uFF09 */
  --font-weight-thin: 100;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
}
`,paraId:74,tocIndex:26},{value:"\u4F7F\u7528\uFF1A",paraId:75,tocIndex:26},{value:`<h1 class="font-display text-4xl font-bold">Display Heading</h1>
<p class="font-sans text-base">Body text</p>
<code class="font-mono text-sm">const code = true;</code>
`,paraId:76,tocIndex:26},{value:`@theme {
  /* \u81EA\u5B9A\u4E49\u95F4\u8DDD */
  --spacing-18: 4.5rem; /* 72px */
  --spacing-128: 32rem; /* 512px */

  /* \u8D1F\u503C\u95F4\u8DDD */
  --spacing--4: -1rem;
}
`,paraId:77,tocIndex:27},{value:"\u4F7F\u7528\uFF1A",paraId:78,tocIndex:27},{value:`<div class="p-18 m-128">Large spacing</div>
<div class="mt--4">Negative margin</div>
`,paraId:79,tocIndex:27},{value:`@theme {
  /* \u989D\u5916\u7684\u65AD\u70B9 */
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;

  /* \u5BB9\u5668\u67E5\u8BE2\u65AD\u70B9 */
  --container-xs: 20rem;
  --container-md: 28rem;
}
`,paraId:80,tocIndex:28},{value:"\u4F7F\u7528\uFF1A",paraId:81,tocIndex:28},{value:`<div class="text-base 3xl:text-lg 4xl:text-xl">Responsive text</div>
`,paraId:82,tocIndex:28},{value:`@theme {
  --radius-xs: 0.125rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-4xl: 2rem;
}
`,paraId:83,tocIndex:29},{value:`@theme {
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-brutal: 4px 4px 0 0 black;

  /* Drop shadow */
  --drop-shadow-brutal: drop-shadow(4px 4px 0 black);
}
`,paraId:84,tocIndex:30},{value:`@theme {
  /* \u7F13\u52A8\u51FD\u6570 */
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);

  /* \u52A8\u753B\u65F6\u957F */
  --duration-150: 150ms;
  --duration-300: 300ms;
}
`,paraId:85,tocIndex:31},{value:`@import 'tailwindcss';

@theme {
  /* \u54C1\u724C\u989C\u8272 */
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;
  --color-brand-accent: #f59e0b;

  /* \u5B57\u4F53 */
  --font-family-sans: 'Inter', sans-serif;
  --font-family-display: 'Satoshi', sans-serif;

  /* \u95F4\u8DDD */
  --spacing-18: 4.5rem;

  /* \u65AD\u70B9 */
  --breakpoint-3xl: 1920px;

  /* \u9634\u5F71 */
  --shadow-brutal: 4px 4px 0 0 black;

  /* \u52A8\u753B */
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
}
`,paraId:86,tocIndex:32},{value:"\u7528\u4E8E\u521B\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177\u7C7B\uFF0C\u66FF\u4EE3 v3 \u7684 ",paraId:87,tocIndex:33},{value:"@layer utilities",paraId:87,tocIndex:33},{value:"\uFF1A",paraId:87,tocIndex:33},{value:`/* \u7B80\u5355\u5DE5\u5177\u7C7B */
@utility tab-4 {
  tab-size: 4;
}

/* \u5E26\u53C2\u6570\u7684\u5DE5\u5177\u7C7B */
@utility tab-* {
  tab-size: *;
}
`,paraId:88,tocIndex:34},{value:"\u4F7F\u7528\uFF1A",paraId:89,tocIndex:34},{value:`<pre class="tab-4">Code with 4-space tabs</pre>
<pre class="tab-2">Code with 2-space tabs</pre>
<pre class="tab-8">Code with 8-space tabs</pre>
`,paraId:90,tocIndex:34},{value:`@utility btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 150ms;
}

@utility btn-primary {
  background-color: var(--color-blue-500);
  color: white;
}

@utility btn-primary:hover {
  background-color: var(--color-blue-600);
}
`,paraId:91,tocIndex:35},{value:"\u4F7F\u7528\uFF1A",paraId:92,tocIndex:35},{value:`<button class="btn btn-primary">Click me</button>
`,paraId:93,tocIndex:35},{value:`@utility card {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

@utility card-hover:hover {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
}
`,paraId:94,tocIndex:36},{value:"\u4F7F\u7528\uFF1A",paraId:95,tocIndex:36},{value:`<div class="card card-hover">
  <h2 class="text-xl font-bold">Card Title</h2>
  <p class="text-gray-600">Card content</p>
</div>
`,paraId:96,tocIndex:36},{value:"\u521B\u5EFA\u81EA\u5B9A\u4E49\u53D8\u4F53\uFF1A",paraId:97,tocIndex:37},{value:`/* \u81EA\u5B9A\u4E49\u6DF1\u8272\u6A21\u5F0F\u53D8\u4F53 */
@variant dark (&:where(.dark, .dark *));

/* \u81EA\u5B9A\u4E49\u6570\u636E\u5C5E\u6027\u53D8\u4F53 */
@variant theme-midnight (&:where([data-theme="midnight"] *));
`,paraId:98,tocIndex:37},{value:"\u4F7F\u7528\uFF1A",paraId:99,tocIndex:37},{value:`<html class="dark">
  <div class="bg-white dark:bg-black">Dark mode support</div>
</html>

<div data-theme="midnight">
  <p class="text-gray-900 theme-midnight:text-blue-400">Themed text</p>
</div>
`,paraId:100,tocIndex:37},{value:"\u5728 Vue/Svelte \u5355\u6587\u4EF6\u7EC4\u4EF6\u6216 CSS Modules \u4E2D\u4F7F\u7528 ",paraId:101,tocIndex:38},{value:"@apply",paraId:101,tocIndex:38},{value:" \u65F6\u9700\u8981\uFF1A",paraId:101,tocIndex:38},{value:`<template>
  <h1>Hello world!</h1>
</template>

<style>
@reference "../../app.css";

h1 {
  @apply text-2xl font-bold text-red-500;
}
</style>
`,paraId:102,tocIndex:38},{value:"\u66F4\u597D\u7684\u65B9\u5F0F\uFF08\u63A8\u8350\uFF09\uFF1A",paraId:103,tocIndex:38},{value:`<style>
h1 {
  color: var(--color-red-500);
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
}
</style>
`,paraId:104,tocIndex:38},{value:"v4 \u4F7F\u7528\u539F\u751F CSS \u53D8\u91CF\uFF0C\u4E3B\u9898\u5207\u6362\u53D8\u5F97\u8D85\u7EA7\u7B80\u5355\uFF1A",paraId:105,tocIndex:40},{value:`@import 'tailwindcss';

/* \u6D45\u8272\u4E3B\u9898 */
@theme {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f3f4f6;
  --color-text-primary: #111827;
  --color-text-secondary: #6b7280;
}

/* \u6DF1\u8272\u4E3B\u9898 */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-bg-primary: #111827;
    --color-bg-secondary: #1f2937;
    --color-text-primary: #f9fafb;
    --color-text-secondary: #d1d5db;
  }
}

/* \u6216\u4F7F\u7528\u7C7B\u540D\u5207\u6362 */
.dark {
  @theme {
    --color-bg-primary: #111827;
    --color-bg-secondary: #1f2937;
    --color-text-primary: #f9fafb;
    --color-text-secondary: #d1d5db;
  }
}
`,paraId:106,tocIndex:40},{value:"\u4F7F\u7528\uFF1A",paraId:107,tocIndex:40},{value:`<div class="bg-bg-primary text-text-primary">
  Automatically adapts to light/dark mode
</div>
`,paraId:108,tocIndex:40},{value:"v4 \u7684 CSS \u53D8\u91CF\u4F7F\u5F97\u4E0E\u5176\u4ED6 UI \u5E93\u96C6\u6210\u66F4\u7B80\u5355\uFF1A",paraId:109,tocIndex:41},{value:`// \u4F7F\u7528 Framer Motion
import { motion } from 'framer-motion';

export function AnimatedBox() {
  return (
    <motion.div
      initial={{ y: 'var(--spacing-8)' }}
      animate={{ y: 0 }}
      exit={{ y: 'var(--spacing-8)' }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      Animated content
    </motion.div>
  );
}
`,paraId:110,tocIndex:41},{value:`// \u76F4\u63A5\u5728 JS \u4E2D\u8BBF\u95EE\u4E3B\u9898\u503C
const styles = getComputedStyle(document.documentElement);
const primaryColor = styles.getPropertyValue('--color-primary-500');
`,paraId:111,tocIndex:41},{value:"\u5982\u679C\u9700\u8981\u4E0E\u5176\u4ED6 CSS \u6846\u67B6\u5171\u5B58\uFF0C\u53EF\u4EE5\u6DFB\u52A0\u524D\u7F00\uFF1A",paraId:112,tocIndex:42},{value:`@import 'tailwindcss' prefix(tw);

@theme {
  --color-primary: #3b82f6;
}
`,paraId:113,tocIndex:42},{value:"\u751F\u6210\u7684\u7C7B\u540D\uFF1A",paraId:114,tocIndex:42},{value:`<div class="tw-flex tw-items-center tw-bg-primary">Prefixed utilities</div>
`,paraId:115,tocIndex:42},{value:"\u751F\u6210\u7684 CSS \u53D8\u91CF\uFF1A",paraId:116,tocIndex:42},{value:`:root {
  --tw-color-primary: #3b82f6;
}
`,paraId:117,tocIndex:42},{value:`/* \u5168\u5C40 important */
@import 'tailwindcss' important;

/* \u6216\u5728\u7279\u5B9A\u9009\u62E9\u5668\u4E0B */
@import 'tailwindcss' important(#app);
`,paraId:118,tocIndex:43},{value:`/* \u751F\u6210\u7684 CSS */
@layer utilities {
  .flex {
    display: flex !important;
  }
}

/* \u6216 */
#app .flex {
  display: flex;
}
`,paraId:119,tocIndex:43},{value:"\u5982\u679C\u4E0D\u9700\u8981\u6837\u5F0F\u91CD\u7F6E\uFF1A",paraId:120,tocIndex:44},{value:`@layer theme, base, components, utilities;

@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
/* \u4E0D\u5BFC\u5165 preflight */
`,paraId:121,tocIndex:44},{value:"\u5728\u5927\u578B\u9879\u76EE\u6216 Monorepo \u4E2D\u5171\u4EAB\u4E3B\u9898\uFF1A",paraId:122,tocIndex:45},{value:`/* packages/brand/theme.css */
@theme {
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;
  --font-family-sans: 'Inter', sans-serif;
}
`,paraId:123,tocIndex:45},{value:`/* apps/web/app.css */
@import 'tailwindcss';
@import '@company/brand/theme.css';

/* \u53EF\u4EE5\u8986\u76D6\u6216\u6269\u5C55 */
@theme {
  --color-accent: #f59e0b;
}
`,paraId:124,tocIndex:45},{value:"\u4F7F\u7528\u4E0D\u540C\u7684\u4E3B\u9898\u6587\u4EF6\uFF1A",paraId:125,tocIndex:46},{value:`/* app.css */
@import 'tailwindcss';

/* \u5F00\u53D1\u73AF\u5883 */
@import './theme.dev.css' layer(theme);

/* \u751F\u4EA7\u73AF\u5883 */
@import './theme.prod.css' layer(theme);
`,paraId:126,tocIndex:46},{value:"\u521B\u5EFA\u53EF\u590D\u7528\u7684\u5DE5\u5177\u7C7B\u5E93\uFF1A",paraId:127,tocIndex:47},{value:`/* utils/buttons.css */
@utility btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: all 150ms;
  cursor: pointer;
}

@utility btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

@utility btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

@utility btn-primary {
  background-color: var(--color-blue-500);
  color: white;
}

@utility btn-primary:hover {
  background-color: var(--color-blue-600);
}
`,paraId:128,tocIndex:47},{value:`/* app.css */
@import 'tailwindcss';
@import './utils/buttons.css';
`,paraId:129,tocIndex:47},{value:`/* \u53EA\u5BFC\u5165\u9700\u8981\u7684\u90E8\u5206 */
@import 'tailwindcss/preflight' layer(base);
@import 'tailwindcss/utilities' layer(utilities);

/* \u8DF3\u8FC7\u9ED8\u8BA4\u4E3B\u9898\uFF0C\u5B8C\u5168\u81EA\u5B9A\u4E49 */
@theme {
  --color-*: initial;
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  /* \u53EA\u5B9A\u4E49\u9700\u8981\u7684\u989C\u8272 */
}
`,paraId:130,tocIndex:48},{value:`// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@tailwindcss/node'],
};

export default nextConfig;
`,paraId:131,tocIndex:50},{value:`/* app/globals.css */
@import 'tailwindcss';

@theme {
  --color-primary: #3b82f6;
}
`,paraId:132,tocIndex:50},{value:`// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-950">{children}</body>
    </html>
  );
}
`,paraId:133,tocIndex:50},{value:"content",paraId:134},{value:"\u4E0D\u9700\u8981\uFF01v4 \u4F1A\u81EA\u52A8\u68C0\u6D4B\u4F60\u7684\u6A21\u677F\u6587\u4EF6\u3002\u4F46\u5982\u679C\u9700\u8981\u81EA\u5B9A\u4E49\uFF0C\u53EF\u4EE5\u4F7F\u7528\uFF1A",paraId:135,tocIndex:51},{value:`@import 'tailwindcss' source('./src/**/*.{js,jsx,ts,tsx}');
`,paraId:136,tocIndex:51},{value:"\u5927\u591A\u6570\u63D2\u4EF6\u9700\u8981\u66F4\u65B0\u4EE5\u652F\u6301 v4\u3002\u4F7F\u7528 ",paraId:137,tocIndex:52},{value:"@plugin",paraId:137,tocIndex:52},{value:" \u6307\u4EE4\u52A0\u8F7D\uFF1A",paraId:137,tocIndex:52},{value:`@import 'tailwindcss';
@plugin "@tailwindcss/typography";
`,paraId:138,tocIndex:52},{value:"theme()",paraId:134},{value:`/* v3 \u65B9\u5F0F - theme() \u51FD\u6570 */
.my-class {
  background-color: theme('colors.red.500');
}

/* v4 \u65B9\u5F0F - CSS \u53D8\u91CF\uFF08\u63A8\u8350\uFF09 */
.my-class {
  background-color: var(--color-red-500);
}

/* v4 \u4E2D theme() \u4E3B\u8981\u7528\u4E8E media query */
@media (width >= theme(--breakpoint-xl)) {
  /* ... */
}
`,paraId:139,tocIndex:53},{value:"v4 \u4F1A\u663E\u793A\u5E9F\u5F03\u8B66\u544A\u3002\u67E5\u770B\u8B66\u544A\u4FE1\u606F\u5E76\u6839\u636E\u63D0\u793A\u66F4\u65B0\u4EE3\u7801\uFF1A",paraId:140,tocIndex:54},{value:`\u26A0 Using deprecated utilities:
  - 'flex-grow-1' is deprecated, use 'grow-1' instead
  - 'bg-opacity-50' is deprecated, use 'bg-*/50' instead
`,paraId:141,tocIndex:54},{value:"\u4F7F\u7528\u524D\u7F00\uFF1A",paraId:142,tocIndex:55},{value:`@import 'tailwindcss' prefix(tw);
`,paraId:143,tocIndex:55},{value:"\u6216\u4F7F\u7528 ",paraId:144,tocIndex:55},{value:"important",paraId:144,tocIndex:55},{value:"\uFF1A",paraId:144,tocIndex:55},{value:`@import 'tailwindcss' important;
`,paraId:145,tocIndex:55},{value:"tailwind.config.js",paraId:134},{value:"\u4FDD\u7559\u914D\u7F6E\u6587\u4EF6\u5E76\u4F7F\u7528 ",paraId:146,tocIndex:56},{value:"@config",paraId:146,tocIndex:56},{value:"\uFF1A",paraId:146,tocIndex:56},{value:`@config "./tailwind.config.js";
@import 'tailwindcss';
`,paraId:147,tocIndex:56},{value:"\u9010\u6B65\u8FC1\u79FB\u5230 ",paraId:148,tocIndex:56},{value:"@theme",paraId:148,tocIndex:56},{value:"\u3002",paraId:148,tocIndex:56},{value:"\u4E0D\u8981\u4E00\u6B21\u6027\u5347\u7EA7\u6574\u4E2A\u9879\u76EE\uFF1A",paraId:149,tocIndex:58},{value:"\u7B2C\u4E00\u9636\u6BB5",paraId:150,tocIndex:58},{value:"\uFF1A\u8FD0\u884C\u81EA\u52A8\u5347\u7EA7\u5DE5\u5177",paraId:150,tocIndex:58},{value:"\u7B2C\u4E8C\u9636\u6BB5",paraId:150,tocIndex:58},{value:"\uFF1A\u4FEE\u590D\u8B66\u544A\u548C\u9519\u8BEF",paraId:150,tocIndex:58},{value:"\u7B2C\u4E09\u9636\u6BB5",paraId:150,tocIndex:58},{value:"\uFF1A\u9010\u6B65\u8FC1\u79FB\u914D\u7F6E\u5230 CSS",paraId:150,tocIndex:58},{value:"\u7B2C\u56DB\u9636\u6BB5",paraId:150,tocIndex:58},{value:"\uFF1A\u4F18\u5316\u548C\u6E05\u7406",paraId:150,tocIndex:58},{value:"\u5145\u5206\u5229\u7528 v4 \u7684 CSS \u53D8\u91CF\u7279\u6027\uFF1A",paraId:151,tocIndex:59},{value:`@theme {
  /* \u5B9A\u4E49\u8BED\u4E49\u5316\u989C\u8272 */
  --color-bg-primary: var(--color-white);
  --color-bg-secondary: var(--color-gray-50);
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-bg-primary: var(--color-gray-900);
    --color-bg-secondary: var(--color-gray-800);
    --color-text-primary: var(--color-gray-50);
    --color-text-secondary: var(--color-gray-300);
  }
}
`,paraId:152,tocIndex:59},{value:`/* app.css */
@import 'tailwindcss';

/* \u4E3B\u9898\u914D\u7F6E */
@import './theme/colors.css';
@import './theme/typography.css';
@import './theme/spacing.css';

/* \u81EA\u5B9A\u4E49\u5DE5\u5177\u7C7B */
@import './utils/buttons.css';
@import './utils/forms.css';
@import './utils/cards.css';
`,paraId:153,tocIndex:60},{value:`/**
 * \u54C1\u724C\u989C\u8272\u7CFB\u7EDF
 * Primary: \u7528\u4E8E\u4E3B\u8981\u64CD\u4F5C\u6309\u94AE\u3001\u94FE\u63A5
 * Secondary: \u7528\u4E8E\u6B21\u8981\u64CD\u4F5C
 * Accent: \u7528\u4E8E\u5F3A\u8C03\u548C\u63D0\u793A
 */
@theme {
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;
  --color-brand-accent: #f59e0b;
}
`,paraId:154,tocIndex:61},{value:`# \u67E5\u770B\u751F\u6210\u7684 CSS \u5927\u5C0F
npx @tailwindcss/cli -i input.css -o output.css --minify

# \u5206\u6790\u672A\u4F7F\u7528\u7684\u6837\u5F0F
# v4 \u81EA\u52A8\u53EA\u751F\u6210\u7528\u5230\u7684\u6837\u5F0F\uFF0C\u65E0\u9700\u989D\u5916\u914D\u7F6E
`,paraId:155,tocIndex:62},{value:"Tailwind CSS v4 \u5E26\u6765\u4E86\uFF1A",paraId:156,tocIndex:63},{value:"\u2705 ",paraId:157,tocIndex:63},{value:"\u66F4\u7B80\u5355\u7684\u914D\u7F6E",paraId:157,tocIndex:63},{value:"\uFF1ACSS-first\uFF0C\u65E0\u9700 JS \u914D\u7F6E\u6587\u4EF6",paraId:157,tocIndex:63},{value:"\u2705 ",paraId:157,tocIndex:63},{value:"\u66F4\u597D\u7684\u6027\u80FD",paraId:157,tocIndex:63},{value:"\uFF1A\u539F\u751F CSS \u5904\u7406\uFF0C\u66F4\u5FEB\u7684\u6784\u5EFA\u901F\u5EA6",paraId:157,tocIndex:63},{value:"\u2705 ",paraId:157,tocIndex:63},{value:"\u66F4\u6807\u51C6\u7684\u8BED\u6CD5",paraId:157,tocIndex:63},{value:"\uFF1A\u4F7F\u7528\u6807\u51C6 CSS \u7279\u6027",paraId:157,tocIndex:63},{value:"\u2705 ",paraId:157,tocIndex:63},{value:"\u66F4\u5C0F\u7684 Bundle",paraId:157,tocIndex:63},{value:"\uFF1ACSS \u53D8\u91CF\u4EE3\u66FF JS \u914D\u7F6E",paraId:157,tocIndex:63},{value:"\u2705 ",paraId:157,tocIndex:63},{value:"\u66F4\u597D\u7684 DX",paraId:157,tocIndex:63},{value:"\uFF1A\u81EA\u52A8\u68C0\u6D4B\uFF0C\u96F6\u914D\u7F6E",paraId:157,tocIndex:63},{value:"\u2705 ",paraId:157,tocIndex:63},{value:"\u5411\u540E\u517C\u5BB9",paraId:157,tocIndex:63},{value:"\uFF1A\u63D0\u4F9B\u8FC1\u79FB\u5DE5\u5177\u548C\u517C\u5BB9\u5C42",paraId:157,tocIndex:63},{value:"v4 \u662F Tailwind \u7684\u672A\u6765\uFF0C\u5347\u7EA7\u662F\u503C\u5F97\u7684\uFF01",paraId:158,tocIndex:63},{value:"Tailwind CSS v4 \u5B98\u65B9\u6587\u6863",paraId:159,tocIndex:64},{value:"\u5347\u7EA7\u6307\u5357",paraId:159,tocIndex:64},{value:"v4 \u53D1\u5E03\u535A\u5BA2",paraId:159,tocIndex:64},{value:"GitHub Discussions",paraId:159,tocIndex:64}]}}]);
