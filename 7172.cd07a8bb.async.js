"use strict";(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[7172],{47172:function(d,a,n){n.r(a),n.d(a,{texts:function(){return e}});const e=[{value:"\u5305\u542B\u5757",paraId:0,tocIndex:1},{value:"\u662F CSS \u5E03\u5C40\u7CFB\u7EDF\u4E2D\u7684\u4E00\u4E2A\u6838\u5FC3\u6982\u5FF5\uFF0C\u5B83\u5B9A\u4E49\u4E86\u5143\u7D20\u8FDB\u884C\u5C3A\u5BF8\u8BA1\u7B97\u548C\u5B9A\u4F4D\u65F6\u7684\u53C2\u7167\u5BF9\u8C61\u3002",paraId:0,tocIndex:1},{value:"\u901A\u4FD7\u7406\u89E3",paraId:1,tocIndex:1},{value:"\uFF1A",paraId:1,tocIndex:1},{value:"\u5305\u542B\u5757\u662F\u4E00\u4E2A",paraId:2,tocIndex:1},{value:"\u77E9\u5F62\u533A\u57DF",paraId:2,tocIndex:1},{value:"\uFF0C\u5143\u7D20\u4F1A\u57FA\u4E8E\u8FD9\u4E2A\u533A\u57DF\u8FDB\u884C\u5E03\u5C40\u548C\u5B9A\u4F4D",paraId:2,tocIndex:1},{value:"\u5305\u542B\u5757\u51B3\u5B9A\u4E86\u5143\u7D20\u7684\u767E\u5206\u6BD4\u5C3A\u5BF8\uFF08\u5982 ",paraId:2,tocIndex:1},{value:"width: 50%",paraId:2,tocIndex:1},{value:"\uFF09\u548C\u5B9A\u4F4D\u504F\u79FB\uFF08\u5982 ",paraId:2,tocIndex:1},{value:"top: 10%",paraId:2,tocIndex:1},{value:"\uFF09\u7684\u8BA1\u7B97\u57FA\u51C6",paraId:2,tocIndex:1},{value:"\u5305\u542B\u5757\u4E0D\u7B49\u4E8E\u7236\u5143\u7D20",paraId:2,tocIndex:1},{value:"\uFF0C\u8FD9\u662F\u6700\u5BB9\u6613\u6DF7\u6DC6\u7684\u5730\u65B9",paraId:2,tocIndex:1},{value:"position",paraId:3,tocIndex:2},{value:" \u5C5E\u6027\u6307\u5B9A\u4E86\u5143\u7D20\u7684\u5B9A\u4F4D\u65B9\u5F0F\uFF0C\u5B83\u76F4\u63A5\u5F71\u54CD\u5143\u7D20\u7684\u5305\u542B\u5757\u662F\u4EC0\u4E48\u3002",paraId:3,tocIndex:2},{value:"\u4E94\u79CD\u5B9A\u4F4D\u65B9\u5F0F",paraId:4,tocIndex:2},{value:"\uFF1A",paraId:4,tocIndex:2},{value:`position: static; /* \u9ED8\u8BA4\u503C\uFF1A\u9759\u6001\u5B9A\u4F4D\uFF08\u6B63\u5E38\u6587\u6863\u6D41\uFF09 */
position: relative; /* \u76F8\u5BF9\u5B9A\u4F4D\uFF1A\u76F8\u5BF9\u4E8E\u81EA\u8EAB\u539F\u59CB\u4F4D\u7F6E */
position: absolute; /* \u7EDD\u5BF9\u5B9A\u4F4D\uFF1A\u76F8\u5BF9\u4E8E\u6700\u8FD1\u7684\u5B9A\u4F4D\u7956\u5148 */
position: fixed; /* \u56FA\u5B9A\u5B9A\u4F4D\uFF1A\u76F8\u5BF9\u4E8E\u89C6\u53E3 */
position: sticky; /* \u7C98\u6027\u5B9A\u4F4D\uFF1A\u76F8\u5BF9/\u56FA\u5B9A\u7684\u6DF7\u5408 */
`,paraId:5,tocIndex:2},{value:"\u95EE\u9898 1\uFF1A\u767E\u5206\u6BD4\u5982\u4F55\u8BA1\u7B97\uFF1F",paraId:6,tocIndex:4},{value:`<div class="parent">
  <div class="child" style="width: 50%; height: 50%;">
    <!-- \u8FD9\u4E2A 50% \u662F\u76F8\u5BF9\u4E8E\u8C01\u8BA1\u7B97\u7684\uFF1F -->
  </div>
</div>
`,paraId:7,tocIndex:4},{value:"\u95EE\u9898 2\uFF1A\u7EDD\u5BF9\u5B9A\u4F4D\u5143\u7D20\u5982\u4F55\u786E\u5B9A\u4F4D\u7F6E\uFF1F",paraId:8,tocIndex:4},{value:`.element {
  position: absolute;
  top: 10%;
  left: 20%;
  /* \u8FD9\u4E2A 10% \u548C 20% \u662F\u76F8\u5BF9\u4E8E\u8C01\u7684\uFF1F */
}
`,paraId:9,tocIndex:4},{value:"\u95EE\u9898 3\uFF1A\u7236\u5143\u7D20\u548C\u5B9A\u4F4D\u7956\u5148\u4E0D\u662F\u540C\u4E00\u4E2A\u5143\u7D20\u65F6\u600E\u4E48\u529E\uFF1F",paraId:10,tocIndex:4},{value:`<div style="position: relative;">
  <!-- \u7956\u7236 -->
  <div>
    <!-- \u7236\u5143\u7D20\uFF0C\u65E0\u5B9A\u4F4D -->
    <div style="position: absolute; top: 0;">
      <!-- \u8FD9\u4E2A\u5143\u7D20\u7684 top: 0 \u662F\u76F8\u5BF9\u4E8E\u7956\u7236\u8FD8\u662F\u7236\u5143\u7D20\uFF1F -->
    </div>
  </div>
</div>
`,paraId:11,tocIndex:4},{value:"\u7B54\u6848\uFF1A\u5305\u542B\u5757\u5C31\u662F\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E9B\u95EE\u9898",paraId:12,tocIndex:4},{value:"\u5305\u542B\u5757\u63D0\u4F9B\u4E86\u4E00\u4E2A",paraId:13,tocIndex:4},{value:"\u660E\u786E\u7684\u3001\u7EDF\u4E00\u7684\u53C2\u7167\u6807\u51C6",paraId:13,tocIndex:4},{value:"\u4E0D\u540C\u7684\u5B9A\u4F4D\u65B9\u5F0F\u6709\u4E0D\u540C\u7684\u5305\u542B\u5757\u786E\u5B9A\u89C4\u5219",paraId:13,tocIndex:4},{value:"\u767E\u5206\u6BD4\u5C3A\u5BF8\u548C\u5B9A\u4F4D\u504F\u79FB\u90FD\u57FA\u4E8E\u5305\u542B\u5757\u8BA1\u7B97",paraId:13,tocIndex:4},{value:"\u8BBE\u8BA1\u539F\u56E0",paraId:14,tocIndex:5},{value:"\uFF1A",paraId:14,tocIndex:5},{value:"\u7075\u6D3B\u6027",paraId:15,tocIndex:5},{value:"\uFF1A\u7EDD\u5BF9\u5B9A\u4F4D\u5143\u7D20\u53EF\u4EE5\u76F8\u5BF9\u4E8E\u4EFB\u610F\u5B9A\u4F4D\u7956\u5148\u5B9A\u4F4D\uFF0C\u800C\u4E0D\u9650\u4E8E\u76F4\u63A5\u7236\u5143\u7D20",paraId:15,tocIndex:5},{value:"\u5C42\u7EA7\u63A7\u5236",paraId:15,tocIndex:5},{value:"\uFF1A\u5141\u8BB8\u5143\u7D20\u8DE8\u8D8A\u591A\u5C42 DOM \u7ED3\u6784\u8FDB\u884C\u5B9A\u4F4D",paraId:15,tocIndex:5},{value:"\u89C6\u89C9\u72EC\u7ACB\u6027",paraId:15,tocIndex:5},{value:"\uFF1A\u56FA\u5B9A\u5B9A\u4F4D\u5143\u7D20\u76F8\u5BF9\u4E8E\u89C6\u53E3\uFF0C\u4E0D\u53D7\u4EFB\u4F55\u7956\u5148\u5143\u7D20\u5F71\u54CD",paraId:15,tocIndex:5},{value:"\u5B9E\u9645\u573A\u666F",paraId:16,tocIndex:5},{value:"\uFF1A",paraId:16,tocIndex:5},{value:`<!-- \u5178\u578B\u7684\u6A21\u6001\u6846\u573A\u666F -->
<div class="page-container" style="position: relative;">
  <div class="header">
    <nav>
      <button>
        <!-- \u70B9\u51FB\u6309\u94AE\u663E\u793A\u4E0B\u62C9\u83DC\u5355 -->
        <div class="dropdown" style="position: absolute; top: 100%;">
          <!-- \u8FD9\u4E2A\u4E0B\u62C9\u83DC\u5355\u7684\u5305\u542B\u5757\u662F .page-container\uFF0C\u800C\u975E\u76F4\u63A5\u7236\u5143\u7D20 button -->
        </div>
      </button>
    </nav>
  </div>
</div>
`,paraId:17,tocIndex:5},{value:"\u5305\u542B\u5757\u7684\u786E\u5B9A\u89C4\u5219\u53D6\u51B3\u4E8E\u5143\u7D20\u7684 ",paraId:18,tocIndex:7},{value:"position",paraId:18,tocIndex:7},{value:" \u5C5E\u6027\u503C\u3002",paraId:18,tocIndex:7},{value:"\u5305\u542B\u5757 = \u6700\u8FD1\u7684\u5757\u7EA7\u7956\u5148\u5143\u7D20\u7684\u5185\u5BB9\u533A\u57DF\uFF08content box\uFF09",paraId:19,tocIndex:8},{value:`<div class="grandparent" style="width: 1000px; padding: 50px;">
  <div class="parent" style="width: 800px; padding: 30px; border: 10px solid;">
    <div class="child" style="position: relative; width: 50%;">
      <!-- \u5305\u542B\u5757\uFF1Aparent \u7684 content box -->
      <!-- width: 50% = (800px - 30px*2 - 10px*2) * 50% = 360px -->
    </div>
  </div>
</div>
`,paraId:20,tocIndex:8},{value:"\u5173\u952E\u70B9",paraId:21,tocIndex:8},{value:"\uFF1A",paraId:21,tocIndex:8},{value:"\u5305\u542B\u5757\u662F\u7236\u5143\u7D20\u7684",paraId:22,tocIndex:8},{value:"\u5185\u5BB9\u533A\u57DF",paraId:22,tocIndex:8},{value:"\uFF08\u4E0D\u5305\u62EC padding \u548C border\uFF09",paraId:22,tocIndex:8},{value:"position: static",paraId:22,tocIndex:8},{value:" \u548C ",paraId:22,tocIndex:8},{value:"position: relative",paraId:22,tocIndex:8},{value:" \u7684\u5305\u542B\u5757\u786E\u5B9A\u89C4\u5219\u76F8\u540C",paraId:22,tocIndex:8},{value:"relative",paraId:22,tocIndex:8},{value:" \u5B9A\u4F4D\u4E0D\u6539\u53D8\u5143\u7D20\u7684\u5305\u542B\u5757\uFF0C\u53EA\u662F\u504F\u79FB\u4E86\u5143\u7D20\u81EA\u8EAB",paraId:22,tocIndex:8},{value:"\u5305\u542B\u5757 = \u6700\u8FD1\u7684\u5B9A\u4F4D\u7956\u5148\u5143\u7D20\uFF08position \u4E0D\u4E3A static\uFF09\u7684 padding box",paraId:23,tocIndex:9},{value:`<div
  class="ancestor"
  style="position: relative; width: 1000px; padding: 50px; border: 10px solid;"
>
  <div class="parent" style="width: 800px;">
    <!-- \u65E0\u5B9A\u4F4D -->
    <div class="child" style="position: absolute; width: 50%; top: 0; left: 0;">
      <!-- \u5305\u542B\u5757\uFF1Aancestor \u7684 padding box -->
      <!-- width: 50% = (1000px - 10px*2) * 50% = 490px -->
      <!-- top: 0 \u548C left: 0 \u76F8\u5BF9\u4E8E ancestor \u7684 padding \u8FB9\u7F18 -->
    </div>
  </div>
</div>
`,paraId:24,tocIndex:9},{value:"\u5173\u952E\u70B9",paraId:25,tocIndex:9},{value:"\uFF1A",paraId:25,tocIndex:9},{value:"\u8DF3\u8FC7\u6240\u6709\u975E\u5B9A\u4F4D\u7236\u5143\u7D20\uFF0C\u627E\u5230\u6700\u8FD1\u7684",paraId:26,tocIndex:9},{value:"\u5B9A\u4F4D\u7956\u5148",paraId:26,tocIndex:9},{value:"\uFF08",paraId:26,tocIndex:9},{value:"position",paraId:26,tocIndex:9},{value:" \u4E0D\u4E3A ",paraId:26,tocIndex:9},{value:"static",paraId:26,tocIndex:9},{value:"\uFF09",paraId:26,tocIndex:9},{value:"\u5305\u542B\u5757\u662F\u8BE5\u7956\u5148\u7684 ",paraId:26,tocIndex:9},{value:"padding box",paraId:26,tocIndex:9},{value:"\uFF08\u5305\u62EC padding\uFF0C\u4E0D\u5305\u62EC border\uFF09",paraId:26,tocIndex:9},{value:"\u5982\u679C\u6CA1\u6709\u5B9A\u4F4D\u7956\u5148\uFF0C\u5219\u5305\u542B\u5757\u662F\u521D\u59CB\u5305\u542B\u5757\uFF08\u901A\u5E38\u662F\u89C6\u53E3\uFF09",paraId:26,tocIndex:9},{value:"\u5BF9\u6BD4\u793A\u4F8B",paraId:27,tocIndex:9},{value:"\uFF1A",paraId:27,tocIndex:9},{value:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>\u7EDD\u5BF9\u5B9A\u4F4D\u5305\u542B\u5757\u793A\u4F8B</title>
    <style>
      .scenario {
        margin-bottom: 40px;
        border: 2px dashed #ccc;
        padding: 20px;
      }

      /* \u573A\u666F\u4E00\uFF1A\u7236\u5143\u7D20\u662F\u5B9A\u4F4D\u5143\u7D20 */
      .parent-positioned {
        position: relative;
        width: 400px;
        height: 200px;
        background-color: lightblue;
        padding: 20px;
        border: 5px solid blue;
      }

      /* \u573A\u666F\u4E8C\uFF1A\u7956\u7236\u5143\u7D20\u662F\u5B9A\u4F4D\u5143\u7D20\uFF0C\u7236\u5143\u7D20\u65E0\u5B9A\u4F4D */
      .grandparent-positioned {
        position: relative;
        width: 400px;
        height: 300px;
        background-color: lightgreen;
        padding: 20px;
        border: 5px solid green;
      }

      .parent-not-positioned {
        width: 300px;
        height: 150px;
        background-color: lightyellow;
        padding: 10px;
        border: 3px solid yellow;
      }

      .absolute-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 50px;
        background-color: coral;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="scenario">
      <h3>\u573A\u666F\u4E00\uFF1A\u7236\u5143\u7D20\u662F\u5B9A\u4F4D\u5143\u7D20</h3>
      <div class="parent-positioned">
        \u7236\u5143\u7D20 (position: relative)
        <div class="absolute-child">
          \u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20<br />
          \u5305\u542B\u5757\uFF1A\u7236\u5143\u7D20
        </div>
      </div>
    </div>

    <div class="scenario">
      <h3>\u573A\u666F\u4E8C\uFF1A\u7956\u7236\u5143\u7D20\u662F\u5B9A\u4F4D\u5143\u7D20\uFF0C\u7236\u5143\u7D20\u65E0\u5B9A\u4F4D</h3>
      <div class="grandparent-positioned">
        \u7956\u7236\u5143\u7D20 (position: relative)
        <div class="parent-not-positioned">
          \u7236\u5143\u7D20 (position: static)
          <div class="absolute-child">
            \u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20<br />
            \u5305\u542B\u5757\uFF1A\u7956\u7236\u5143\u7D20
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`,paraId:28,tocIndex:9},{value:"\u6548\u679C\u8BF4\u660E",paraId:29,tocIndex:9},{value:"\uFF1A",paraId:29,tocIndex:9},{value:"\u573A\u666F\u4E00\uFF1A\u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20\u7684 ",paraId:30,tocIndex:9},{value:"top: 0; left: 0",paraId:30,tocIndex:9},{value:" \u76F8\u5BF9\u4E8E",paraId:30,tocIndex:9},{value:"\u7236\u5143\u7D20\u7684 padding \u8FB9\u7F18",paraId:30,tocIndex:9},{value:"\u573A\u666F\u4E8C\uFF1A\u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20",paraId:30,tocIndex:9},{value:"\u8DF3\u8FC7\u65E0\u5B9A\u4F4D\u7684\u7236\u5143\u7D20",paraId:30,tocIndex:9},{value:"\uFF0C",paraId:30,tocIndex:9},{value:"top: 0; left: 0",paraId:30,tocIndex:9},{value:" \u76F8\u5BF9\u4E8E",paraId:30,tocIndex:9},{value:"\u7956\u7236\u5143\u7D20\u7684 padding \u8FB9\u7F18",paraId:30,tocIndex:9},{value:"\u5305\u542B\u5757 = \u89C6\u53E3\uFF08viewport\uFF09\u6216\u5177\u6709 transform/filter/perspective \u5C5E\u6027\u7684\u7956\u5148\u5143\u7D20",paraId:31,tocIndex:10},{value:`<div style="height: 2000px;">
  <div
    class="fixed-element"
    style="position: fixed; top: 20px; right: 20px; width: 200px;"
  >
    <!-- \u5305\u542B\u5757\uFF1A\u89C6\u53E3 -->
    <!-- top: 20px \u548C right: 20px \u76F8\u5BF9\u4E8E\u89C6\u53E3 -->
    <!-- \u6EDA\u52A8\u9875\u9762\u65F6\uFF0C\u5143\u7D20\u4E0D\u4F1A\u79FB\u52A8 -->
  </div>
</div>
`,paraId:32,tocIndex:10},{value:"\u26A0\uFE0F \u7279\u6B8A\u60C5\u51B5\uFF1Atransform \u4F1A\u6539\u53D8 fixed \u7684\u5305\u542B\u5757",paraId:33,tocIndex:10},{value:`<div
  class="parent"
  style="transform: translateZ(0); width: 500px; height: 300px; margin: 100px;"
>
  <div class="child" style="position: fixed; top: 0; left: 0;">
    <!-- \u26A0\uFE0F \u5305\u542B\u5757\u4E0D\u662F\u89C6\u53E3\uFF0C\u800C\u662F\u8BBE\u7F6E\u4E86 transform \u7684\u7236\u5143\u7D20\uFF01 -->
    <!-- \u8FD9\u662F\u4E00\u4E2A\u5E38\u89C1\u7684"\u5751" -->
  </div>
</div>
`,paraId:34,tocIndex:10},{value:"\u5BF9\u6BD4\u793A\u4F8B",paraId:35,tocIndex:10},{value:"\uFF1A",paraId:35,tocIndex:10},{value:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Fixed \u5B9A\u4F4D\u5305\u542B\u5757\u53D8\u5316</title>
    <style>
      body {
        margin: 0;
        height: 2000px;
      }

      .container {
        width: 400px;
        height: 300px;
        margin: 100px auto;
        background-color: lightblue;
        padding: 20px;
        border: 3px solid blue;
      }

      .with-transform {
        transform: translateZ(0); /* \u89E6\u53D1\u65B0\u7684\u5C42\u53E0\u4E0A\u4E0B\u6587 */
      }

      .fixed-box {
        position: fixed;
        top: 20px;
        left: 20px;
        width: 150px;
        height: 100px;
        background-color: coral;
        padding: 10px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <h2>\u573A\u666F\u4E00\uFF1A\u6B63\u5E38\u7684 Fixed \u5B9A\u4F4D\uFF08\u76F8\u5BF9\u4E8E\u89C6\u53E3\uFF09</h2>
    <div class="container">
      \u7236\u5BB9\u5668\uFF08\u65E0 transform\uFF09
      <div class="fixed-box">
        Fixed \u5143\u7D20<br />
        \u5305\u542B\u5757\uFF1A\u89C6\u53E3<br />
        \u6EDA\u52A8\u9875\u9762\uFF0C\u6211\u4E0D\u52A8
      </div>
    </div>

    <h2>\u573A\u666F\u4E8C\uFF1A\u7236\u5143\u7D20\u6709 Transform \u5C5E\u6027</h2>
    <div class="container with-transform">
      \u7236\u5BB9\u5668\uFF08\u6709 transform\uFF09
      <div class="fixed-box">
        Fixed \u5143\u7D20<br />
        \u5305\u542B\u5757\uFF1A\u7236\u5BB9\u5668<br />
        \u6EDA\u52A8\u9875\u9762\uFF0C\u6211\u8DDF\u7740\u52A8\uFF01
      </div>
    </div>

    <div style="height: 1000px;"></div>
  </body>
</html>
`,paraId:36,tocIndex:10},{value:"\u5305\u542B\u5757 = \u6700\u8FD1\u7684\u6EDA\u52A8\u7956\u5148\u5143\u7D20\u7684\u6EDA\u52A8\u533A\u57DF",paraId:37,tocIndex:11},{value:`<div class="scroll-container" style="height: 300px; overflow-y: scroll;">
  <div style="height: 100px;"></div>

  <div
    class="sticky-element"
    style="position: sticky; top: 10px; background: yellow;"
  >
    <!-- \u5305\u542B\u5757\uFF1A.scroll-container \u7684\u6EDA\u52A8\u533A\u57DF -->
    <!-- \u5F53\u6EDA\u52A8\u5230\u8DDD\u79BB\u5BB9\u5668\u9876\u90E8 10px \u65F6\uFF0C\u5143\u7D20\u4F1A"\u7C98"\u5728\u90A3\u91CC -->
  </div>

  <div style="height: 1000px;"></div>
</div>
`,paraId:38,tocIndex:11},{value:"Sticky \u5B9A\u4F4D\u7684\u7279\u70B9",paraId:39,tocIndex:11},{value:"\uFF1A",paraId:39,tocIndex:11},{value:"\u5728\u5230\u8FBE\u6307\u5B9A\u4F4D\u7F6E\u524D\uFF0C\u8868\u73B0\u4E3A ",paraId:40,tocIndex:11},{value:"relative",paraId:40,tocIndex:11},{value:"\u5230\u8FBE\u6307\u5B9A\u4F4D\u7F6E\u540E\uFF0C\u8868\u73B0\u4E3A ",paraId:40,tocIndex:11},{value:"fixed",paraId:40,tocIndex:11},{value:"\uFF08\u76F8\u5BF9\u4E8E\u6700\u8FD1\u7684\u6EDA\u52A8\u5BB9\u5668\uFF09",paraId:40,tocIndex:11},{value:"\u6EDA\u52A8\u8D85\u51FA\u5305\u542B\u5757\u8303\u56F4\u540E\uFF0C\u5143\u7D20\u4F1A\u968F\u7740\u5305\u542B\u5757\u79FB\u52A8",paraId:40,tocIndex:11},{value:"position \u503C",paraId:41,tocIndex:12},{value:"\u5305\u542B\u5757",paraId:41,tocIndex:12},{value:"\u8BA1\u7B97\u57FA\u51C6",paraId:41,tocIndex:12},{value:"\u5178\u578B\u573A\u666F",paraId:41,tocIndex:12},{value:"static",paraId:41,tocIndex:12},{value:"\u6700\u8FD1\u7684\u5757\u7EA7\u7956\u5148\u7684 content box",paraId:41,tocIndex:12},{value:"\u5185\u5BB9\u533A\u57DF",paraId:41,tocIndex:12},{value:"\u9ED8\u8BA4\u5E03\u5C40",paraId:41,tocIndex:12},{value:"relative",paraId:41,tocIndex:12},{value:"\u6700\u8FD1\u7684\u5757\u7EA7\u7956\u5148\u7684 content box",paraId:41,tocIndex:12},{value:"\u5185\u5BB9\u533A\u57DF",paraId:41,tocIndex:12},{value:"\u5FAE\u8C03\u4F4D\u7F6E",paraId:41,tocIndex:12},{value:"absolute",paraId:41,tocIndex:12},{value:"\u6700\u8FD1\u7684\u5B9A\u4F4D\u7956\u5148\u7684 padding box",paraId:41,tocIndex:12},{value:"\u5185\u5BB9 + padding \u533A\u57DF",paraId:41,tocIndex:12},{value:"\u7EDD\u5BF9\u5B9A\u4F4D\u3001\u5F39\u7A97",paraId:41,tocIndex:12},{value:"fixed",paraId:41,tocIndex:12},{value:"\u89C6\u53E3\uFF08\u6216\u6709 transform/filter \u7684\u7956\u5148\uFF09",paraId:41,tocIndex:12},{value:"\u89C6\u53E3",paraId:41,tocIndex:12},{value:"\u56FA\u5B9A\u5BFC\u822A\u3001\u8FD4\u56DE\u9876\u90E8",paraId:41,tocIndex:12},{value:"sticky",paraId:41,tocIndex:12},{value:"\u6700\u8FD1\u7684\u6EDA\u52A8\u7956\u5148\u7684\u6EDA\u52A8\u533A\u57DF",paraId:41,tocIndex:12},{value:"\u6EDA\u52A8\u5BB9\u5668",paraId:41,tocIndex:12},{value:"\u7C98\u6027\u8868\u5934",paraId:41,tocIndex:12},{value:"\u767E\u5206\u6BD4\u5C3A\u5BF8\u7684\u8BA1\u7B97\u5B8C\u5168\u4F9D\u8D56\u4E8E\u5305\u542B\u5757\u3002",paraId:42,tocIndex:13},{value:`<div
  class="parent"
  style="position: relative; width: 1000px; height: 500px; padding: 50px; border: 10px solid;"
>
  <!-- \u573A\u666F A\uFF1Astatic/relative \u5B9A\u4F4D -->
  <div class="child-A" style="position: relative; width: 50%; height: 50%;">
    <!-- \u5305\u542B\u5757\uFF1Aparent \u7684 content box -->
    <!-- width: 50% = (1000px - 50px*2 - 10px*2) * 50% = 440px -->
    <!-- height: 50% = (500px - 50px*2 - 10px*2) * 50% = 190px -->
  </div>

  <!-- \u573A\u666F B\uFF1Aabsolute \u5B9A\u4F4D -->
  <div class="child-B" style="position: absolute; width: 50%; height: 50%;">
    <!-- \u5305\u542B\u5757\uFF1Aparent \u7684 padding box -->
    <!-- width: 50% = (1000px - 10px*2) * 50% = 490px -->
    <!-- height: 50% = (500px - 10px*2) * 50% = 240px -->
  </div>
</div>
`,paraId:43,tocIndex:14},{value:"\u26A0\uFE0F \u91CD\u8981\u7279\u6027\uFF1A\u6240\u6709\u65B9\u5411\u7684\u767E\u5206\u6BD4 padding \u548C margin \u90FD\u57FA\u4E8E\u5305\u542B\u5757\u7684\u5BBD\u5EA6\uFF01",paraId:44,tocIndex:15},{value:`.parent {
  width: 1000px;
  height: 500px;
}

.child {
  /* \u26A0\uFE0F \u6CE8\u610F\uFF1A\u6240\u6709\u65B9\u5411\u90FD\u57FA\u4E8E\u5305\u542B\u5757\u7684\u5BBD\u5EA6\uFF01 */
  padding-top: 10%; /* = 1000px * 10% = 100px\uFF08\u4E0D\u662F\u57FA\u4E8E\u9AD8\u5EA6\uFF01\uFF09 */
  padding-bottom: 10%; /* = 1000px * 10% = 100px */
  padding-left: 10%; /* = 1000px * 10% = 100px */
  padding-right: 10%; /* = 1000px * 10% = 100px */

  margin-top: 5%; /* = 1000px * 5% = 50px */
  margin-bottom: 5%; /* = 1000px * 5% = 50px */
  margin-left: 5%; /* = 1000px * 5% = 50px */
  margin-right: 5%; /* = 1000px * 5% = 50px */
}
`,paraId:45,tocIndex:15},{value:"\u4E3A\u4EC0\u4E48\u5782\u76F4\u65B9\u5411\u4E5F\u57FA\u4E8E\u5BBD\u5EA6\uFF1F",paraId:46,tocIndex:15},{value:"CSS \u89C4\u8303\u4E3A\u4E86\u4FDD\u6301\u4E00\u81F4\u6027\u505A\u7684\u8BBE\u8BA1\u51B3\u7B56",paraId:47,tocIndex:15},{value:"\u8FD9\u6837\u53EF\u4EE5\u786E\u4FDD\u4F7F\u7528\u76F8\u540C\u767E\u5206\u6BD4\u65F6\uFF0C\u80FD\u5F97\u5230\u6B63\u65B9\u5F62\u7684\u5185\u5916\u8FB9\u8DDD",paraId:47,tocIndex:15},{value:"\u5E38\u7528\u4E8E\u5B9E\u73B0\u56FA\u5B9A\u5BBD\u9AD8\u6BD4\u7684\u54CD\u5E94\u5F0F\u5BB9\u5668",paraId:47,tocIndex:15},{value:"\u5B9E\u6218\u5E94\u7528\uFF1A\u54CD\u5E94\u5F0F\u5BBD\u9AD8\u6BD4\u5BB9\u5668",paraId:48,tocIndex:15},{value:`/* \u5229\u7528 padding \u7684\u7279\u6027\u521B\u5EFA 16:9 \u7684\u54CD\u5E94\u5F0F\u5BB9\u5668 */
.video-container {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 9/16 = 0.5625 */
  position: relative;
  background: #000;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* \u54CD\u5E94\u5F0F\u6B63\u65B9\u5F62 */
.square {
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* \u6B63\u65B9\u5F62\uFF1A1:1 */
  position: relative;
}
`,paraId:49,tocIndex:15},{value:`.parent {
  position: relative;
  width: 1000px;
  height: 500px;
}

.child {
  position: absolute;

  /* top/bottom: \u76F8\u5BF9\u4E8E\u5305\u542B\u5757\u7684 height */
  top: 10%; /* = 500px * 10% = 50px */
  bottom: 20%; /* = 500px * 20% = 100px */

  /* left/right: \u76F8\u5BF9\u4E8E\u5305\u542B\u5757\u7684 width */
  left: 10%; /* = 1000px * 10% = 100px */
  right: 20%; /* = 1000px * 20% = 200px */
}
`,paraId:50,tocIndex:16},{value:"\u7ECF\u5178\u5C45\u4E2D\u6280\u5DE7",paraId:51,tocIndex:16},{value:"\uFF1A",paraId:51,tocIndex:16},{value:`.parent {
  position: relative;
  width: 800px;
  height: 600px;
}

.centered {
  position: absolute;
  top: 50%; /* \u5411\u4E0B\u504F\u79FB\u7236\u5143\u7D20\u9AD8\u5EA6\u7684 50% */
  left: 50%; /* \u5411\u53F3\u504F\u79FB\u7236\u5143\u7D20\u5BBD\u5EA6\u7684 50% */
  transform: translate(-50%, -50%); /* \u5411\u5DE6\u4E0A\u504F\u79FB\u81EA\u8EAB\u5BBD\u9AD8\u7684 50% */
}
`,paraId:52,tocIndex:16},{value:"\u9ED8\u8BA4\u503C",paraId:53,tocIndex:18},{value:"\uFF0C\u5143\u7D20\u6309\u7167\u6B63\u5E38\u6587\u6863\u6D41\u5E03\u5C40\u3002",paraId:53,tocIndex:18},{value:`.element {
  position: static; /* \u9ED8\u8BA4\u503C\uFF0C\u53EF\u4EE5\u7701\u7565 */
  /* top/right/bottom/left/z-index \u65E0\u6548 */
}
`,paraId:54,tocIndex:18},{value:"\u7279\u70B9",paraId:55,tocIndex:18},{value:"\uFF1A",paraId:55,tocIndex:18},{value:"\u5143\u7D20\u5728\u6B63\u5E38\u6587\u6863\u6D41\u4E2D",paraId:56,tocIndex:18},{value:"top/right/bottom/left",paraId:56,tocIndex:18},{value:" \u5C5E\u6027\u65E0\u6548",paraId:56,tocIndex:18},{value:"z-index",paraId:56,tocIndex:18},{value:" \u65E0\u6548",paraId:56,tocIndex:18},{value:"\u4E0D\u521B\u5EFA\u65B0\u7684\u5C42\u53E0\u4E0A\u4E0B\u6587",paraId:56,tocIndex:18},{value:"\u76F8\u5BF9\u4E8E\u5143\u7D20\u81EA\u8EAB\u7684\u539F\u59CB\u4F4D\u7F6E\u8FDB\u884C\u504F\u79FB",paraId:57,tocIndex:19},{value:"\uFF0C\u4F46\u5728\u6587\u6863\u6D41\u4E2D\u4ECD\u7136\u5360\u636E\u539F\u6765\u7684\u7A7A\u95F4\u3002",paraId:57,tocIndex:19},{value:`<div class="container">
  <div class="box">Box 1</div>
  <div class="box relative">Box 2 (Relative)</div>
  <div class="box">Box 3</div>
</div>

<style>
  .box {
    width: 100px;
    height: 100px;
    background-color: lightblue;
    margin: 10px;
  }

  .relative {
    position: relative;
    top: 20px; /* \u5411\u4E0B\u504F\u79FB 20px */
    left: 30px; /* \u5411\u53F3\u504F\u79FB 30px */
    background-color: coral;
  }
  /* Box 2 \u5411\u4E0B\u5411\u53F3\u504F\u79FB\u4E86\uFF0C\u4F46 Box 3 \u4ECD\u7136\u5728 Box 2 \u539F\u6765\u7684\u4F4D\u7F6E\u4E0B\u65B9 */
</style>
`,paraId:58,tocIndex:19},{value:"\u7279\u70B9",paraId:59,tocIndex:19},{value:"\uFF1A",paraId:59,tocIndex:19},{value:"\u5143\u7D20\u4ECD\u5360\u636E\u6587\u6863\u6D41\u4E2D\u7684\u539F\u59CB\u7A7A\u95F4",paraId:60,tocIndex:19},{value:"\u901A\u8FC7 ",paraId:60,tocIndex:19},{value:"top/right/bottom/left",paraId:60,tocIndex:19},{value:" \u76F8\u5BF9\u4E8E\u81EA\u8EAB\u539F\u59CB\u4F4D\u7F6E\u504F\u79FB",paraId:60,tocIndex:19},{value:"\u53EF\u4EE5\u4F7F\u7528 ",paraId:60,tocIndex:19},{value:"z-index",paraId:60,tocIndex:19},{value:"\u4E0D\u5F71\u54CD\u5176\u4ED6\u5143\u7D20\u7684\u5E03\u5C40",paraId:60,tocIndex:19},{value:"\u5E38\u7528\u4F5C\u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20\u7684\u5B9A\u4F4D\u53C2\u8003\uFF08\u5305\u542B\u5757\uFF09",paraId:60,tocIndex:19},{value:"\u5178\u578B\u573A\u666F",paraId:61,tocIndex:19},{value:"\uFF1A",paraId:61,tocIndex:19},{value:`/* \u5FAE\u8C03\u5143\u7D20\u4F4D\u7F6E */
.icon {
  position: relative;
  top: 2px; /* \u56FE\u6807\u4E0E\u6587\u5B57\u5BF9\u9F50\u65F6\u7684\u5FAE\u8C03 */
}

/* \u4F5C\u4E3A\u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20\u7684\u5BB9\u5668 */
.card {
  position: relative; /* \u4E3A\u5185\u90E8\u7684\u7EDD\u5BF9\u5B9A\u4F4D\u5143\u7D20\u63D0\u4F9B\u5B9A\u4F4D\u53C2\u8003 */
}

.card .badge {
  position: absolute;
  top: -10px;
  right: -10px;
}
`,paraId:62,tocIndex:19},{value:"\u76F8\u5BF9\u4E8E\u6700\u8FD1\u7684\u5B9A\u4F4D\u7956\u5148\u5143\u7D20\u8FDB\u884C\u5B9A\u4F4D",paraId:63,tocIndex:20},{value:"\uFF0C\u5143\u7D20\u8131\u79BB\u6587\u6863\u6D41\u3002",paraId:63,tocIndex:20},{value:`<div
  class="grandparent"
  style="position: relative; width: 400px; height: 300px; background: lightblue;"
>
  \u7956\u7236\u5143\u7D20 (\u5B9A\u4F4D\u7956\u5148)

  <div
    class="parent"
    style="width: 300px; height: 200px; background: lightyellow; margin: 20px;"
  >
    \u7236\u5143\u7D20 (\u65E0\u5B9A\u4F4D)

    <div
      class="child"
      style="position: absolute; top: 10px; right: 10px; width: 100px; height: 100px; background: coral;"
    >
      \u7EDD\u5BF9\u5B9A\u4F4D\u5B50\u5143\u7D20
      <!-- \u76F8\u5BF9\u4E8E\u7956\u7236\u5143\u7D20\u5B9A\u4F4D\uFF0C\u56E0\u4E3A\u7236\u5143\u7D20\u6CA1\u6709\u5B9A\u4F4D -->
    </div>
  </div>
</div>
`,paraId:64,tocIndex:20},{value:"\u7279\u70B9",paraId:65,tocIndex:20},{value:"\uFF1A",paraId:65,tocIndex:20},{value:"\u8131\u79BB\u6587\u6863\u6D41\uFF0C\u4E0D\u5360\u636E\u7A7A\u95F4",paraId:66,tocIndex:20},{value:"\u76F8\u5BF9\u4E8E\u6700\u8FD1\u7684",paraId:66,tocIndex:20},{value:"\u5B9A\u4F4D\u7956\u5148",paraId:66,tocIndex:20},{value:"\uFF08",paraId:66,tocIndex:20},{value:"position",paraId:66,tocIndex:20},{value:" \u4E0D\u4E3A ",paraId:66,tocIndex:20},{value:"static",paraId:66,tocIndex:20},{value:"\uFF09\u5B9A\u4F4D",paraId:66,tocIndex:20},{value:"\u5982\u679C\u6CA1\u6709\u5B9A\u4F4D\u7956\u5148\uFF0C\u5219\u76F8\u5BF9\u4E8E\u521D\u59CB\u5305\u542B\u5757\uFF08",paraId:66,tocIndex:20},{value:"<html>",paraId:66,tocIndex:20},{value:"\uFF09\u5B9A\u4F4D",paraId:66,tocIndex:20},{value:"\u53EF\u4EE5\u4F7F\u7528 ",paraId:66,tocIndex:20},{value:"top/right/bottom/left",paraId:66,tocIndex:20},{value:" \u8FDB\u884C\u7CBE\u786E\u5B9A\u4F4D",paraId:66,tocIndex:20},{value:"\u53EF\u4EE5\u4F7F\u7528 ",paraId:66,tocIndex:20},{value:"z-index",paraId:66,tocIndex:20},{value:" \u63A7\u5236\u5C42\u53E0\u987A\u5E8F",paraId:66,tocIndex:20},{value:"\u5BBD\u5EA6\u9ED8\u8BA4\u7531\u5185\u5BB9\u51B3\u5B9A\uFF08\u4E0D\u518D\u662F 100%\uFF09",paraId:66,tocIndex:20},{value:"\u5178\u578B\u573A\u666F",paraId:67,tocIndex:20},{value:"\uFF1A",paraId:67,tocIndex:20},{value:`/* \u6A21\u6001\u6846\uFF08Modal\uFF09 */
.modal {
  position: fixed; /* \u901A\u5E38\u7528 fixed\uFF0C\u4F46\u539F\u7406\u7C7B\u4F3C */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

/* \u4E0B\u62C9\u83DC\u5355 */
.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%; /* \u5728\u89E6\u53D1\u5143\u7D20\u4E0B\u65B9 */
  left: 0;
  z-index: 10;
}

/* \u89D2\u6807\uFF08Badge\uFF09 */
.avatar {
  position: relative;
  width: 50px;
  height: 50px;
}

.online-indicator {
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: green;
  border-radius: 50%;
}
`,paraId:68,tocIndex:20},{value:"\u76F8\u5BF9\u4E8E\u89C6\u53E3\u8FDB\u884C\u5B9A\u4F4D",paraId:69,tocIndex:21},{value:"\uFF0C\u6EDA\u52A8\u9875\u9762\u65F6\u5143\u7D20\u4F4D\u7F6E\u4E0D\u53D8\u3002",paraId:69,tocIndex:21},{value:`<div
  class="fixed-header"
  style="position: fixed; top: 0; left: 0; width: 100%; height: 60px; background: #333; color: white; z-index: 100;"
>
  \u56FA\u5B9A\u5934\u90E8\u5BFC\u822A\u680F
  <!-- \u6EDA\u52A8\u9875\u9762\u65F6\uFF0C\u59CB\u7EC8\u5728\u89C6\u53E3\u9876\u90E8 -->
</div>

<div class="content" style="margin-top: 60px; height: 2000px;">\u9875\u9762\u5185\u5BB9...</div>
`,paraId:70,tocIndex:21},{value:"\u7279\u70B9",paraId:71,tocIndex:21},{value:"\uFF1A",paraId:71,tocIndex:21},{value:"\u76F8\u5BF9\u4E8E",paraId:72,tocIndex:21},{value:"\u89C6\u53E3",paraId:72,tocIndex:21},{value:"\u5B9A\u4F4D",paraId:72,tocIndex:21},{value:"\u8131\u79BB\u6587\u6863\u6D41",paraId:72,tocIndex:21},{value:"\u6EDA\u52A8\u9875\u9762\u65F6\u4F4D\u7F6E\u4E0D\u53D8",paraId:72,tocIndex:21},{value:"\u26A0\uFE0F \u5982\u679C\u7956\u5148\u5143\u7D20\u6709 ",paraId:72,tocIndex:21},{value:"transform",paraId:72,tocIndex:21},{value:"\u3001",paraId:72,tocIndex:21},{value:"perspective",paraId:72,tocIndex:21},{value:"\u3001",paraId:72,tocIndex:21},{value:"filter",paraId:72,tocIndex:21},{value:" \u7B49\u5C5E\u6027\uFF0C\u5305\u542B\u5757\u4F1A\u53D8\u6210\u8BE5\u7956\u5148\u5143\u7D20",paraId:72,tocIndex:21},{value:"\u5178\u578B\u573A\u666F",paraId:73,tocIndex:21},{value:"\uFF1A",paraId:73,tocIndex:21},{value:`/* \u56FA\u5B9A\u5BFC\u822A\u680F */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* \u8FD4\u56DE\u9876\u90E8\u6309\u94AE */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  z-index: 999;
}

/* \u60AC\u6D6E\u64CD\u4F5C\u9762\u677F */
.floating-panel {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
`,paraId:74,tocIndex:21},{value:"\u26A0\uFE0F \u5E38\u89C1\u9677\u9631\uFF1ATransform \u6539\u53D8 Fixed \u7684\u5305\u542B\u5757",paraId:75,tocIndex:21},{value:`<div class="container" style="transform: translateZ(0);">
  <div class="fixed-element" style="position: fixed; top: 0; left: 0;">
    <!-- \u26A0\uFE0F \u8FD9\u4E2A\u5143\u7D20\u4E0D\u4F1A\u56FA\u5B9A\u5728\u89C6\u53E3\uFF0C\u800C\u662F\u76F8\u5BF9\u4E8E .container -->
  </div>
</div>
`,paraId:76,tocIndex:21},{value:"\u89E3\u51B3\u65B9\u6848",paraId:77,tocIndex:21},{value:"\uFF1A",paraId:77,tocIndex:21},{value:`<!-- \u5C06 fixed \u5143\u7D20\u79FB\u5230\u6CA1\u6709 transform \u7684\u7236\u5143\u7D20\u5916 -->
<div class="fixed-element" style="position: fixed; top: 0; left: 0;">
  \u56FA\u5B9A\u5143\u7D20
</div>

<div class="container" style="transform: translateZ(0);">\u666E\u901A\u5185\u5BB9</div>
`,paraId:78,tocIndex:21},{value:"\u76F8\u5BF9\u5B9A\u4F4D\u548C\u56FA\u5B9A\u5B9A\u4F4D\u7684\u6DF7\u5408\u4F53",paraId:79,tocIndex:22},{value:"\uFF0C\u5143\u7D20\u5728\u5230\u8FBE\u6307\u5B9A\u4F4D\u7F6E\u524D\u8868\u73B0\u4E3A\u76F8\u5BF9\u5B9A\u4F4D\uFF0C\u4E4B\u540E\u8868\u73B0\u4E3A\u56FA\u5B9A\u5B9A\u4F4D\u3002",paraId:79,tocIndex:22},{value:`<div
  class="scroll-container"
  style="height: 400px; overflow-y: scroll; border: 2px solid #ccc;"
>
  <div style="height: 100px; background: lightblue;">\u9876\u90E8\u5185\u5BB9</div>

  <div
    class="sticky-header"
    style="position: sticky; top: 0; background: coral; padding: 10px;"
  >
    \u7C98\u6027\u8868\u5934\uFF08\u6EDA\u52A8\u5230\u5BB9\u5668\u9876\u90E8\u540E\u4F1A"\u7C98"\u4F4F\uFF09
  </div>

  <div style="height: 1000px; background: lightgreen;">\u53EF\u6EDA\u52A8\u5185\u5BB9...</div>
</div>
`,paraId:80,tocIndex:22},{value:"\u7279\u70B9",paraId:81,tocIndex:22},{value:"\uFF1A",paraId:81,tocIndex:22},{value:"\u5728\u5230\u8FBE ",paraId:82,tocIndex:22},{value:"top/right/bottom/left",paraId:82,tocIndex:22},{value:" \u6307\u5B9A\u4F4D\u7F6E\u524D\uFF0C\u8868\u73B0\u4E3A ",paraId:82,tocIndex:22},{value:"relative",paraId:82,tocIndex:22},{value:"\u5230\u8FBE\u6307\u5B9A\u4F4D\u7F6E\u540E\uFF0C\u8868\u73B0\u4E3A ",paraId:82,tocIndex:22},{value:"fixed",paraId:82,tocIndex:22},{value:"\uFF08\u76F8\u5BF9\u4E8E\u6700\u8FD1\u7684\u6EDA\u52A8\u5BB9\u5668\uFF09",paraId:82,tocIndex:22},{value:"\u4E0D\u8131\u79BB\u6587\u6863\u6D41\uFF08\u59CB\u7EC8\u5360\u636E\u7A7A\u95F4\uFF09",paraId:82,tocIndex:22},{value:"\u5FC5\u987B\u6307\u5B9A ",paraId:82,tocIndex:22},{value:"top/right/bottom/left",paraId:82,tocIndex:22},{value:" \u4E2D\u7684\u81F3\u5C11\u4E00\u4E2A\u503C\u624D\u751F\u6548",paraId:82,tocIndex:22},{value:"\u5305\u542B\u5757\u662F\u6700\u8FD1\u7684\u6EDA\u52A8\u7956\u5148\u5143\u7D20",paraId:82,tocIndex:22},{value:"\u5178\u578B\u573A\u666F",paraId:83,tocIndex:22},{value:"\uFF1A",paraId:83,tocIndex:22},{value:`/* \u7C98\u6027\u8868\u5934 */
.table-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

/* \u4FA7\u8FB9\u680F\u76EE\u5F55\uFF08\u6EDA\u52A8\u65F6\u8DDF\u968F\uFF0C\u4F46\u4E0D\u8D85\u51FA\u5BB9\u5668\uFF09 */
.sidebar {
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

/* \u5206\u7C7B\u6807\u9898 */
.category-title {
  position: sticky;
  top: 60px; /* \u5728\u56FA\u5B9A\u5BFC\u822A\u680F\u4E0B\u65B9 */
  background: white;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
`,paraId:84,tocIndex:22},{value:"\u26A0\uFE0F Sticky \u5E38\u89C1\u95EE\u9898",paraId:85,tocIndex:22},{value:"\u95EE\u9898 1\uFF1A\u7236\u5143\u7D20\u6709 overflow: hidden/auto/scroll",paraId:86,tocIndex:22},{value:`<!-- \u274C \u4E0D\u751F\u6548\uFF1A\u7236\u5143\u7D20\u6709 overflow -->
<div style="overflow: hidden;">
  <div style="position: sticky; top: 0;">\u4E0D\u4F1A\u7C98\u4F4F\uFF01</div>
</div>

<!-- \u2705 \u751F\u6548\uFF1A\u6EDA\u52A8\u5BB9\u5668\u5728\u7956\u5148\u5143\u7D20 -->
<div style="height: 300px; overflow-y: scroll;">
  <div>
    <div style="position: sticky; top: 0;">\u4F1A\u7C98\u4F4F\uFF01</div>
  </div>
</div>
`,paraId:87,tocIndex:22},{value:"\u95EE\u9898 2\uFF1A\u7236\u5143\u7D20\u9AD8\u5EA6\u4E0D\u8DB3",paraId:88,tocIndex:22},{value:`<!-- \u274C \u4E0D\u751F\u6548\uFF1A\u7236\u5143\u7D20\u9AD8\u5EA6\u7B49\u4E8E sticky \u5143\u7D20\u9AD8\u5EA6 -->
<div style="height: 50px;">
  <div style="position: sticky; top: 0; height: 50px;">
    \u6CA1\u6709\u6EDA\u52A8\u7A7A\u95F4\uFF0C\u4E0D\u4F1A\u7C98\u4F4F\uFF01
  </div>
</div>
`,paraId:89,tocIndex:22},{value:"\u95EE\u9898 3\uFF1A\u6CA1\u6709\u6307\u5B9A\u504F\u79FB\u503C",paraId:90,tocIndex:22},{value:`/* \u274C \u4E0D\u751F\u6548 */
.sticky {
  position: sticky;
  /* \u5FC5\u987B\u6307\u5B9A top/right/bottom/left \u4E4B\u4E00 */
}

/* \u2705 \u751F\u6548 */
.sticky {
  position: sticky;
  top: 0;
}
`,paraId:91,tocIndex:22},{value:"position",paraId:92,tocIndex:23},{value:"\u662F\u5426\u8131\u79BB\u6587\u6863\u6D41",paraId:92,tocIndex:23},{value:"\u5B9A\u4F4D\u53C2\u8003",paraId:92,tocIndex:23},{value:"\u504F\u79FB\u5C5E\u6027",paraId:92,tocIndex:23},{value:"z-index",paraId:92,tocIndex:23},{value:"\u5178\u578B\u573A\u666F",paraId:92,tocIndex:23},{value:"static",paraId:92,tocIndex:23},{value:"\u274C",paraId:92,tocIndex:23},{value:"-",paraId:92,tocIndex:23},{value:"\u274C",paraId:92,tocIndex:23},{value:"\u274C",paraId:92,tocIndex:23},{value:"\u9ED8\u8BA4\u5E03\u5C40",paraId:92,tocIndex:23},{value:"relative",paraId:92,tocIndex:23},{value:"\u274C",paraId:92,tocIndex:23},{value:"\u81EA\u8EAB\u539F\u59CB\u4F4D\u7F6E",paraId:92,tocIndex:23},{value:"\u2705",paraId:92,tocIndex:23},{value:"\u2705",paraId:92,tocIndex:23},{value:"\u5FAE\u8C03\u3001\u4F5C\u4E3A\u5B9A\u4F4D\u5BB9\u5668",paraId:92,tocIndex:23},{value:"absolute",paraId:92,tocIndex:23},{value:"\u2705",paraId:92,tocIndex:23},{value:"\u6700\u8FD1\u7684\u5B9A\u4F4D\u7956\u5148",paraId:92,tocIndex:23},{value:"\u2705",paraId:92,tocIndex:23},{value:"\u2705",paraId:92,tocIndex:23},{value:"\u5F39\u7A97\u3001\u4E0B\u62C9\u83DC\u5355\u3001\u89D2\u6807",paraId:92,tocIndex:23},{value:"fixed",paraId:92,tocIndex:23},{value:"\u2705",paraId:92,tocIndex:23},{value:"\u89C6\u53E3\uFF08\u6216 transform \u7956\u5148\uFF09",paraId:92,tocIndex:23},{value:"\u2705",paraId:92,tocIndex:23},{value:"\u2705",paraId:92,tocIndex:23},{value:"\u56FA\u5B9A\u5BFC\u822A\u3001\u8FD4\u56DE\u9876\u90E8",paraId:92,tocIndex:23},{value:"sticky",paraId:92,tocIndex:23},{value:"\u274C",paraId:92,tocIndex:23},{value:"\u6700\u8FD1\u7684\u6EDA\u52A8\u7956\u5148\uFF08\u5230\u8FBE\u9608\u503C\u540E\uFF09",paraId:92,tocIndex:23},{value:"\u2705",paraId:92,tocIndex:23},{value:"\u2705",paraId:92,tocIndex:23},{value:"\u7C98\u6027\u8868\u5934\u3001\u4FA7\u8FB9\u680F\u76EE\u5F55",paraId:92,tocIndex:23},{value:"\u5305\u542B\u5757\u662F\u4E00\u4E2A\u77E9\u5F62\u53C2\u7167\u533A\u57DF",paraId:93,tocIndex:26},{value:"\uFF0C\u7528\u4E8E\u5C3A\u5BF8\u8BA1\u7B97\u548C\u5B9A\u4F4D",paraId:93,tocIndex:26},{value:"\u5305\u542B\u5757 \u2260 \u7236\u5143\u7D20",paraId:93,tocIndex:26},{value:"\uFF0C\u7531\u5143\u7D20\u7684 ",paraId:93,tocIndex:26},{value:"position",paraId:93,tocIndex:26},{value:" \u503C\u51B3\u5B9A",paraId:93,tocIndex:26},{value:"\u7406\u89E3\u5305\u542B\u5757\u662F\u7406\u89E3 CSS \u5E03\u5C40\u7684\u5173\u952E",paraId:93,tocIndex:26},{value:"position \u503C",paraId:94,tocIndex:27},{value:"\u5305\u542B\u5757",paraId:94,tocIndex:27},{value:"\u76D2\u5B50\u7C7B\u578B",paraId:94,tocIndex:27},{value:"static",paraId:94,tocIndex:27},{value:"\u6700\u8FD1\u7684\u5757\u7EA7\u7956\u5148",paraId:94,tocIndex:27},{value:"content box",paraId:94,tocIndex:27},{value:"relative",paraId:94,tocIndex:27},{value:"\u6700\u8FD1\u7684\u5757\u7EA7\u7956\u5148",paraId:94,tocIndex:27},{value:"content box",paraId:94,tocIndex:27},{value:"absolute",paraId:94,tocIndex:27},{value:"\u6700\u8FD1\u7684",paraId:94,tocIndex:27},{value:"\u5B9A\u4F4D",paraId:94,tocIndex:27},{value:"\u7956\u5148\uFF08\u975E static\uFF09",paraId:94,tocIndex:27},{value:"padding box",paraId:94,tocIndex:27},{value:"fixed",paraId:94,tocIndex:27},{value:"\u89C6\u53E3\uFF08\u6216 transform/filter/perspective \u7956\u5148\uFF09",paraId:94,tocIndex:27},{value:"\u89C6\u53E3",paraId:94,tocIndex:27},{value:"sticky",paraId:94,tocIndex:27},{value:"\u6700\u8FD1\u7684\u6EDA\u52A8\u7956\u5148",paraId:94,tocIndex:27},{value:"\u6EDA\u52A8\u5BB9\u5668",paraId:94,tocIndex:27},{value:"\u5C5E\u6027",paraId:95,tocIndex:28},{value:"\u76F8\u5BF9\u4E8E\u5305\u542B\u5757\u7684",paraId:95,tocIndex:28},{value:"\u7279\u6B8A\u6027",paraId:95,tocIndex:28},{value:"width",paraId:95,tocIndex:28},{value:"\u5BBD\u5EA6",paraId:95,tocIndex:28},{value:"-",paraId:95,tocIndex:28},{value:"height",paraId:95,tocIndex:28},{value:"\u9AD8\u5EA6",paraId:95,tocIndex:28},{value:"\u7236\u5143\u7D20\u9700\u8981\u660E\u786E\u9AD8\u5EA6",paraId:95,tocIndex:28},{value:"padding",paraId:95,tocIndex:28},{value:"\uFF08\u6240\u6709\u65B9\u5411\uFF09",paraId:95,tocIndex:28},{value:"\u5BBD\u5EA6",paraId:95,tocIndex:28},{value:"\u26A0\uFE0F \u5782\u76F4\u65B9\u5411\u4E5F\u662F\u5BBD\u5EA6\uFF01",paraId:95,tocIndex:28},{value:"margin",paraId:95,tocIndex:28},{value:"\uFF08\u6240\u6709\u65B9\u5411\uFF09",paraId:95,tocIndex:28},{value:"\u5BBD\u5EA6",paraId:95,tocIndex:28},{value:"\u26A0\uFE0F \u5782\u76F4\u65B9\u5411\u4E5F\u662F\u5BBD\u5EA6\uFF01",paraId:95,tocIndex:28},{value:"top",paraId:95,tocIndex:28},{value:" / ",paraId:95,tocIndex:28},{value:"bottom",paraId:95,tocIndex:28},{value:"\u9AD8\u5EA6",paraId:95,tocIndex:28},{value:"-",paraId:95,tocIndex:28},{value:"left",paraId:95,tocIndex:28},{value:" / ",paraId:95,tocIndex:28},{value:"right",paraId:95,tocIndex:28},{value:"\u5BBD\u5EA6",paraId:95,tocIndex:28},{value:"-",paraId:95,tocIndex:28},{value:"transform: translate",paraId:95,tocIndex:28},{value:"\u81EA\u8EAB\u5C3A\u5BF8",paraId:95,tocIndex:28},{value:"translateX \u76F8\u5BF9\u81EA\u8EAB\u5BBD\u5EA6\uFF0CtranslateY \u76F8\u5BF9\u81EA\u8EAB\u9AD8\u5EA6",paraId:95,tocIndex:28},{value:`\u9700\u8981\u5143\u7D20\u8131\u79BB\u6587\u6863\u6D41\uFF1F
\u251C\u2500 \u5426 \u2192 \u4F7F\u7528 static / relative
\u2502  \u251C\u2500 \u9700\u8981\u5FAE\u8C03\u4F4D\u7F6E\uFF1F \u2192 relative
\u2502  \u2514\u2500 \u9ED8\u8BA4\u5E03\u5C40 \u2192 static
\u2502
\u2514\u2500 \u662F \u2192 \u7EE7\u7EED\u5224\u65AD
   \u251C\u2500 \u9700\u8981\u56FA\u5B9A\u5728\u89C6\u53E3\uFF1F \u2192 fixed
   \u251C\u2500 \u76F8\u5BF9\u4E8E\u67D0\u4E2A\u5BB9\u5668\u5B9A\u4F4D\uFF1F \u2192 absolute
   \u2514\u2500 \u6EDA\u52A8\u5230\u67D0\u5904\u540E\u56FA\u5B9A\uFF1F \u2192 sticky
`,paraId:96,tocIndex:29},{value:`/* \u2705 \u63A8\u8350\u6A21\u5F0F */
.card {
  position: relative; /* \u4F5C\u4E3A\u5B9A\u4F4D\u53C2\u8003 */
}

.card .badge {
  position: absolute;
  top: -8px;
  right: -8px;
}
`,paraId:97,tocIndex:31},{value:`<!-- \u274C \u95EE\u9898\uFF1Afixed \u5143\u7D20\u5728\u6709 transform \u7684\u5BB9\u5668\u5185 -->
<div style="transform: translateZ(0);">
  <div style="position: fixed; top: 0;">\u4E0D\u4F1A\u56FA\u5B9A\u5728\u89C6\u53E3\uFF01</div>
</div>

<!-- \u2705 \u89E3\u51B3\uFF1Afixed \u5143\u7D20\u79FB\u5230\u5916\u5C42 -->
<div style="position: fixed; top: 0;">\u56FA\u5B9A\u5143\u7D20</div>
<div style="transform: translateZ(0);">\u666E\u901A\u5185\u5BB9</div>
`,paraId:98,tocIndex:32},{value:`/* \u2705 \u786E\u4FDD sticky \u751F\u6548 */
.sticky-element {
  position: sticky;
  top: 0; /* \u5FC5\u987B\u6307\u5B9A\u504F\u79FB\u503C */
  z-index: 10; /* \u907F\u514D\u88AB\u5176\u4ED6\u5143\u7D20\u8986\u76D6 */
}

/* \u786E\u4FDD\u7236\u5143\u7D20\u6CA1\u6709 overflow: hidden */
/* \u786E\u4FDD\u7236\u5143\u7D20\u6709\u8DB3\u591F\u7684\u6EDA\u52A8\u7A7A\u95F4 */
`,paraId:99,tocIndex:33},{value:`/* \u5229\u7528\u767E\u5206\u6BD4 padding \u57FA\u4E8E\u5BBD\u5EA6\u7684\u7279\u6027 */
.aspect-ratio {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 */
  position: relative;
}

.aspect-ratio > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
`,paraId:100,tocIndex:34},{value:"\u539F\u56E0",paraId:101,tocIndex:36},{value:"\uFF1A\u7236\u5143\u7D20\u6CA1\u6709\u660E\u786E\u7684\u9AD8\u5EA6\u3002",paraId:101,tocIndex:36},{value:`/* \u274C \u4E0D\u751F\u6548 */
.parent {
  /* height \u672A\u8BBE\u7F6E */
}
.child {
  height: 100%; /* \u65E0\u6CD5\u8BA1\u7B97 */
}

/* \u2705 \u89E3\u51B3\u65B9\u6848 1 */
html,
body {
  height: 100%;
}
.parent {
  height: 100%;
}
.child {
  height: 100%;
}

/* \u2705 \u89E3\u51B3\u65B9\u6848 2 */
.child {
  height: 100vh; /* \u4F7F\u7528\u89C6\u53E3\u5355\u4F4D */
}

/* \u2705 \u89E3\u51B3\u65B9\u6848 3 */
.parent {
  display: flex;
  min-height: 100vh;
}
.child {
  flex: 1;
}
`,paraId:102,tocIndex:36},{value:"\u539F\u56E0",paraId:103,tocIndex:37},{value:"\uFF1A\u7236\u5143\u7D20\u7684 ",paraId:103,tocIndex:37},{value:"position",paraId:103,tocIndex:37},{value:" \u662F ",paraId:103,tocIndex:37},{value:"static",paraId:103,tocIndex:37},{value:"\uFF08\u9ED8\u8BA4\u503C\uFF09\u3002",paraId:103,tocIndex:37},{value:`<!-- \u274C \u95EE\u9898 -->
<div class="parent">
  <div class="child" style="position: absolute; top: 0;">\u76F8\u5BF9\u4E8E\u8C01\u5B9A\u4F4D\uFF1F</div>
</div>

<!-- \u2705 \u89E3\u51B3 -->
<div class="parent" style="position: relative;">
  <div class="child" style="position: absolute; top: 0;">
    \u76F8\u5BF9\u4E8E .parent \u5B9A\u4F4D
  </div>
</div>
`,paraId:104,tocIndex:37},{value:"\u539F\u56E0",paraId:105,tocIndex:38},{value:"\uFF1A\u7956\u5148\u5143\u7D20\u6709 ",paraId:105,tocIndex:38},{value:"transform",paraId:105,tocIndex:38},{value:"\u3001",paraId:105,tocIndex:38},{value:"perspective",paraId:105,tocIndex:38},{value:"\u3001",paraId:105,tocIndex:38},{value:"filter",paraId:105,tocIndex:38},{value:" \u7B49\u5C5E\u6027\u3002",paraId:105,tocIndex:38},{value:`<!-- \u274C \u95EE\u9898 -->
<div style="transform: translateZ(0);">
  <div style="position: fixed; top: 0;">\u4E0D\u56FA\u5B9A\u5728\u89C6\u53E3\uFF01</div>
</div>

<!-- \u2705 \u89E3\u51B3 -->
<div style="position: fixed; top: 0;">\u56FA\u5B9A\u5728\u89C6\u53E3</div>
`,paraId:106,tocIndex:38},{value:"\u5E38\u89C1\u539F\u56E0",paraId:107,tocIndex:39},{value:"\uFF1A",paraId:107,tocIndex:39},{value:"\u6CA1\u6709\u6307\u5B9A\u504F\u79FB\u503C",paraId:108,tocIndex:39},{value:"\uFF1A",paraId:108,tocIndex:39},{value:`/* \u274C */
.sticky {
  position: sticky;
}

/* \u2705 */
.sticky {
  position: sticky;
  top: 0;
}
`,paraId:109,tocIndex:39},{value:"\u7236\u5143\u7D20\u6709 overflow: hidden",paraId:110,tocIndex:39},{value:"\uFF1A",paraId:110,tocIndex:39},{value:`<!-- \u274C -->
<div style="overflow: hidden;">
  <div style="position: sticky; top: 0;">\u4E0D\u7C98\u4F4F</div>
</div>
`,paraId:111,tocIndex:39},{value:"\u7236\u5143\u7D20\u9AD8\u5EA6\u4E0D\u8DB3",paraId:112,tocIndex:39},{value:"\uFF1A",paraId:112,tocIndex:39},{value:`<!-- \u274C \u7236\u5143\u7D20\u9AD8\u5EA6\u7B49\u4E8E sticky \u5143\u7D20\u9AD8\u5EA6 -->
<div style="height: 50px;">
  <div style="position: sticky; top: 0; height: 50px;">\u65E0\u6EDA\u52A8\u7A7A\u95F4</div>
</div>
`,paraId:113,tocIndex:39},{value:`/* \u7ED9\u5B9A\u4F4D\u7956\u5148\u6DFB\u52A0\u80CC\u666F\u8272\uFF0C\u5E2E\u52A9\u7406\u89E3\u5305\u542B\u5757 */
.positioning-context {
  position: relative;
  background-color: rgba(255, 0, 0, 0.1); /* \u534A\u900F\u660E\u7EA2\u8272 */
  border: 2px dashed red;
}
`,paraId:114,tocIndex:41},{value:`// \u6D4F\u89C8\u5668\u63A7\u5236\u53F0\u4E2D\u68C0\u67E5\u5143\u7D20\u7684\u5B9A\u4F4D\u53C2\u8003
const element = document.querySelector('.my-element');
console.log('Position:', getComputedStyle(element).position);

// \u627E\u5230\u7EDD\u5BF9\u5B9A\u4F4D\u5143\u7D20\u7684\u5B9A\u4F4D\u7956\u5148
function findPositioningAncestor(element) {
  let parent = element.parentElement;
  while (parent) {
    const position = getComputedStyle(parent).position;
    if (position !== 'static') {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.documentElement; // \u521D\u59CB\u5305\u542B\u5757
}
`,paraId:115,tocIndex:42},{value:"Chrome DevTools",paraId:116,tocIndex:43},{value:"\uFF1A\u9009\u4E2D\u5143\u7D20\u540E\uFF0C\u67E5\u770B ",paraId:116,tocIndex:43},{value:"Computed",paraId:116,tocIndex:43},{value:" \u9762\u677F\u7684 ",paraId:116,tocIndex:43},{value:"position",paraId:116,tocIndex:43},{value:" \u503C",paraId:116,tocIndex:43},{value:"Layout \u9762\u677F",paraId:116,tocIndex:43},{value:"\uFF1A\u53EF\u89C6\u5316\u5143\u7D20\u7684\u76D2\u6A21\u578B\u548C\u5B9A\u4F4D\u5173\u7CFB",paraId:116,tocIndex:43},{value:"Layers \u9762\u677F",paraId:116,tocIndex:43},{value:"\uFF1A\u67E5\u770B\u5C42\u53E0\u4E0A\u4E0B\u6587\u548C\u6E32\u67D3\u5C42",paraId:116,tocIndex:43},{value:"MDN - Containing Block",paraId:117,tocIndex:44},{value:"MDN - Position",paraId:117,tocIndex:44},{value:"W3C CSS 2.2 \u89C4\u8303 - Visual formatting model details",paraId:117,tocIndex:44},{value:"W3C CSS Positioned Layout Module Level 3",paraId:117,tocIndex:44}]}}]);
