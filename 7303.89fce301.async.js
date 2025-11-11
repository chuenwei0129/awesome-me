"use strict";(self.webpackChunk_c6i_playground=self.webpackChunk_c6i_playground||[]).push([[7303],{37303:function(r,e,a){a.r(e),a.d(e,{texts:function(){return n}});const n=[{value:"JavaScript \u4E2D\u7684\u9519\u8BEF\u7531 ",paraId:0,tocIndex:1},{value:"Error",paraId:0,tocIndex:1},{value:" \u5BF9\u8C61\u8868\u793A\uFF0C\u5B83\u5305\u542B\u4EE5\u4E0B\u4E3B\u8981\u5C5E\u6027\uFF1A",paraId:0,tocIndex:1},{value:"message",paraId:1,tocIndex:1},{value:"\uFF1A\u9519\u8BEF\u4FE1\u606F\u63CF\u8FF0",paraId:1,tocIndex:1},{value:"name",paraId:1,tocIndex:1},{value:"\uFF1A\u9519\u8BEF\u7C7B\u578B\u540D\u79F0\uFF08\u5982 ",paraId:1,tocIndex:1},{value:"Error",paraId:1,tocIndex:1},{value:"\u3001",paraId:1,tocIndex:1},{value:"TypeError",paraId:1,tocIndex:1},{value:"\u3001",paraId:1,tocIndex:1},{value:"ReferenceError",paraId:1,tocIndex:1},{value:" \u7B49\uFF09",paraId:1,tocIndex:1},{value:"stack",paraId:1,tocIndex:1},{value:"\uFF1A\u9519\u8BEF\u5806\u6808\u8DDF\u8E2A\uFF08\u975E\u6807\u51C6\uFF0C\u4F46\u88AB\u5E7F\u6CDB\u652F\u6301\uFF09",paraId:1,tocIndex:1},{value:`const error = new Error('\u51FA\u9519\u4E86');
console.log(error.message); // "\u51FA\u9519\u4E86"
console.log(error.name); // "Error"
console.log(error.stack); // \u5806\u6808\u4FE1\u606F
`,paraId:2,tocIndex:1},{value:"JavaScript \u5185\u7F6E\u4E86\u51E0\u79CD\u9519\u8BEF\u7C7B\u578B\uFF1A",paraId:3,tocIndex:1},{value:"Error",paraId:4,tocIndex:1},{value:"\uFF1A\u901A\u7528\u9519\u8BEF",paraId:4,tocIndex:1},{value:"TypeError",paraId:4,tocIndex:1},{value:"\uFF1A\u7C7B\u578B\u9519\u8BEF",paraId:4,tocIndex:1},{value:"ReferenceError",paraId:4,tocIndex:1},{value:"\uFF1A\u5F15\u7528\u9519\u8BEF",paraId:4,tocIndex:1},{value:"SyntaxError",paraId:4,tocIndex:1},{value:"\uFF1A\u8BED\u6CD5\u9519\u8BEF",paraId:4,tocIndex:1},{value:"RangeError",paraId:4,tocIndex:1},{value:"\uFF1A\u8303\u56F4\u9519\u8BEF",paraId:4,tocIndex:1},{value:"URIError",paraId:4,tocIndex:1},{value:"\uFF1AURI \u5904\u7406\u9519\u8BEF",paraId:4,tocIndex:1},{value:"\u53EF\u4EE5\u901A\u8FC7\u7EE7\u627F ",paraId:5,tocIndex:2},{value:"Error",paraId:5,tocIndex:2},{value:" \u7C7B\u6765\u521B\u5EFA\u81EA\u5B9A\u4E49\u9519\u8BEF\uFF1A",paraId:5,tocIndex:2},{value:`class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

// \u4F7F\u7528
throw new ValidationError('\u6570\u636E\u9A8C\u8BC1\u5931\u8D25');
throw new NetworkError('\u8BF7\u6C42\u5931\u8D25', 404);
`,paraId:6,tocIndex:2},{value:"throw",paraId:7,tocIndex:3},{value:" \u8BED\u53E5\u7528\u4E8E\u629B\u51FA\u4E00\u4E2A\u5F02\u5E38\uFF0C\u53EF\u4EE5\u629B\u51FA\u4EFB\u4F55\u7C7B\u578B\u7684\u503C\uFF0C\u4F46\u63A8\u8350\u629B\u51FA ",paraId:7,tocIndex:3},{value:"Error",paraId:7,tocIndex:3},{value:" \u5BF9\u8C61\uFF1A",paraId:7,tocIndex:3},{value:`throw new Error('\u51FA\u9519\u4E86'); // \u63A8\u8350
throw '\u9519\u8BEF\u4FE1\u606F'; // \u4E0D\u63A8\u8350
throw 404; // \u4E0D\u63A8\u8350
`,paraId:8,tocIndex:3},{value:"try-catch-finally",paraId:9,tocIndex:4},{value:" \u662F JavaScript \u4E2D\u5904\u7406\u5F02\u5E38\u7684\u57FA\u672C\u7ED3\u6784\uFF1A",paraId:9,tocIndex:4},{value:`try {
  // \u53EF\u80FD\u629B\u51FA\u5F02\u5E38\u7684\u4EE3\u7801
  console.log('\u5F00\u59CB\u6267\u884C');
  throw new Error('\u51FA\u9519\u4E86');
  console.log('\u8FD9\u884C\u4E0D\u4F1A\u6267\u884C'); // \u5F02\u5E38\u540E\u7684\u4EE3\u7801\u4E0D\u4F1A\u6267\u884C
} catch (error) {
  // \u6355\u83B7\u5E76\u5904\u7406\u5F02\u5E38
  console.log('\u6355\u83B7\u5230\u9519\u8BEF\uFF1A', error.message);
} finally {
  // \u65E0\u8BBA\u662F\u5426\u53D1\u751F\u5F02\u5E38\u90FD\u4F1A\u6267\u884C
  console.log('\u6E05\u7406\u8D44\u6E90');
}
`,paraId:10,tocIndex:4},{value:"\u6267\u884C\u89C4\u5219\uFF1A",paraId:11,tocIndex:4},{value:"try",paraId:12,tocIndex:4},{value:" \u5757\u4E2D\u53D1\u751F\u5F02\u5E38\u540E\uFF0C\u4F1A\u7ACB\u5373\u8DF3\u8F6C\u5230 ",paraId:12,tocIndex:4},{value:"catch",paraId:12,tocIndex:4},{value:" \u5757",paraId:12,tocIndex:4},{value:"finally",paraId:12,tocIndex:4},{value:" \u5757\u59CB\u7EC8\u4F1A\u6267\u884C\uFF0C\u5373\u4F7F\u5728 ",paraId:12,tocIndex:4},{value:"try",paraId:12,tocIndex:4},{value:" \u6216 ",paraId:12,tocIndex:4},{value:"catch",paraId:12,tocIndex:4},{value:" \u4E2D\u6709 ",paraId:12,tocIndex:4},{value:"return",paraId:12,tocIndex:4},{value:" \u8BED\u53E5",paraId:12,tocIndex:4},{value:"\u5982\u679C\u6CA1\u6709 ",paraId:12,tocIndex:4},{value:"catch",paraId:12,tocIndex:4},{value:" \u5757\uFF0C\u5F02\u5E38\u4F1A\u7EE7\u7EED\u5411\u4E0A\u629B\u51FA\uFF0C\u4F46 ",paraId:12,tocIndex:4},{value:"finally",paraId:12,tocIndex:4},{value:" \u4ECD\u4F1A\u6267\u884C",paraId:12,tocIndex:4},{value:`function test() {
  try {
    return 'try';
  } finally {
    return 'finally'; // \u6700\u7EC8\u8FD4\u56DE "finally"
  }
}
`,paraId:13,tocIndex:4},{value:"\u540C\u6B65\u4EE3\u7801\u4E2D\u7684\u9519\u8BEF\u53EF\u4EE5\u76F4\u63A5\u7528 ",paraId:14,tocIndex:5},{value:"try-catch",paraId:14,tocIndex:5},{value:" \u6355\u83B7\uFF1A",paraId:14,tocIndex:5},{value:`const f = () => {
  throw new Error('\u540C\u6B65\u9519\u8BEF');
};

try {
  f();
} catch (e) {
  console.log(e.message); // "\u540C\u6B65\u9519\u8BEF"
}
`,paraId:15,tocIndex:5},{value:"async",paraId:16,tocIndex:7},{value:" \u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A Promise\uFF0C\u51FD\u6570\u5185\u629B\u51FA\u7684\u9519\u8BEF\u4F1A\u5BFC\u81F4 Promise \u88AB rejected\u3002",paraId:16,tocIndex:7},{value:"\u9519\u8BEF\u793A\u4F8B\uFF1A\u65E0\u6CD5\u6355\u83B7",paraId:17,tocIndex:7},{value:`const f = async () => {
  throw new Error('\u5F02\u6B65\u9519\u8BEF');
};

try {
  f(); // \u6CA1\u6709 await\uFF0C\u53EA\u662F\u8C03\u7528\u51FD\u6570\u8FD4\u56DE Promise
} catch (error) {
  // \u65E0\u6CD5\u6355\u83B7\uFF0C\u56E0\u4E3A\u9519\u8BEF\u5728 Promise \u5185\u90E8
  console.log(error.message);
}
`,paraId:18,tocIndex:7},{value:"\u6B63\u786E\u65B9\u5F0F 1\uFF1A\u4F7F\u7528 .catch()",paraId:19,tocIndex:7},{value:`const f = async () => {
  throw new Error('\u5F02\u6B65\u9519\u8BEF');
};

f().catch((error) => {
  console.log(error.message); // "\u5F02\u6B65\u9519\u8BEF"
});
`,paraId:20,tocIndex:7},{value:"\u6B63\u786E\u65B9\u5F0F 2\uFF1A\u4F7F\u7528 await + try-catch",paraId:21,tocIndex:7},{value:`const f = async () => {
  throw new Error('\u5F02\u6B65\u9519\u8BEF');
};

(async () => {
  try {
    await f(); // \u4F7F\u7528 await \u7B49\u5F85 Promise
  } catch (error) {
    console.log(error.message); // "\u5F02\u6B65\u9519\u8BEF"
  }
})();
`,paraId:22,tocIndex:7},{value:"\u5728 async \u51FD\u6570\u5185\u90E8\u4F7F\u7528 try-catch",paraId:23,tocIndex:7},{value:`(async () => {
  try {
    throw new Error('\u9519\u8BEF');
  } catch (e) {
    console.log(e.message); // "\u9519\u8BEF"
  }
})();
`,paraId:24,tocIndex:7},{value:"\u6839\u636E ECMA-262 \u89C4\u8303\uFF0C",paraId:25,tocIndex:8},{value:"await",paraId:25,tocIndex:8},{value:" \u4F1A\u5C06\u503C\u8F6C\u6362\u4E3A Promise \u5E76\u7B49\u5F85\u5176\u5B8C\u6210\uFF1A",paraId:25,tocIndex:8},{value:"await v",paraId:26,tocIndex:8},{value:" \u4F1A\u5C06 ",paraId:26,tocIndex:8},{value:"v",paraId:26,tocIndex:8},{value:" \u8F6C\u6362\u4E3A Promise\uFF08\u4F7F\u7528 ",paraId:26,tocIndex:8},{value:"Promise.resolve(v)",paraId:26,tocIndex:8},{value:"\uFF09",paraId:26,tocIndex:8},{value:"\u5982\u679C Promise \u88AB rejected\uFF0C",paraId:26,tocIndex:8},{value:"await",paraId:26,tocIndex:8},{value:" \u4F1A\u629B\u51FA\u9519\u8BEF\uFF08\u7C7B\u4F3C ",paraId:26,tocIndex:8},{value:"throw",paraId:26,tocIndex:8},{value:"\uFF09",paraId:26,tocIndex:8},{value:"\u8FD9\u4E2A\u9519\u8BEF\u53EF\u4EE5\u88AB\u5916\u5C42\u7684 ",paraId:26,tocIndex:8},{value:"try-catch",paraId:26,tocIndex:8},{value:" \u6355\u83B7",paraId:26,tocIndex:8},{value:`async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('\u8BF7\u6C42\u5931\u8D25\uFF1A', error);
    throw error; // \u53EF\u4EE5\u9009\u62E9\u91CD\u65B0\u629B\u51FA
  }
}
`,paraId:27,tocIndex:8},{value:"Promise \u6784\u9020\u51FD\u6570\u5185\u7684\u540C\u6B65\u9519\u8BEF\u4F1A\u88AB\u81EA\u52A8\u6355\u83B7\u5E76\u8F6C\u4E3A rejection\uFF1A",paraId:28,tocIndex:9},{value:`new Promise(() => {
  throw new Error('\u540C\u6B65\u9519\u8BEF');
}).catch((e) => {
  console.log(e.message); // "\u540C\u6B65\u9519\u8BEF"
});
`,paraId:29,tocIndex:9},{value:"\u6CE8\u610F\uFF1A",paraId:30,tocIndex:9},{value:" \u8FD9\u662F Promise \u7684\u5185\u90E8\u673A\u5236\uFF0C\u5B83\u4F1A\u7528 ",paraId:30,tocIndex:9},{value:"try-catch",paraId:30,tocIndex:9},{value:" \u5305\u88F9\u6267\u884C\u5668\u51FD\u6570\uFF0C\u5E76\u5728\u6355\u83B7\u5230\u9519\u8BEF\u65F6\u8C03\u7528 ",paraId:30,tocIndex:9},{value:"reject",paraId:30,tocIndex:9},{value:"\u3002",paraId:30,tocIndex:9},{value:"Promise \u5185\u7684\u5F02\u6B65\u64CD\u4F5C\uFF08\u5982 ",paraId:31,tocIndex:10},{value:"setTimeout",paraId:31,tocIndex:10},{value:"\uFF09\u629B\u51FA\u7684\u9519\u8BEF\u65E0\u6CD5\u88AB\u81EA\u52A8\u6355\u83B7\uFF1A",paraId:31,tocIndex:10},{value:`// \u274C \u65E0\u6CD5\u6355\u83B7
new Promise(() => {
  setTimeout(() => {
    throw new Error('\u5F02\u6B65\u9519\u8BEF'); // \u672A\u6355\u83B7\u9519\u8BEF
  }, 0);
}).catch((e) => {
  console.log(e); // \u4E0D\u4F1A\u6267\u884C
});
`,paraId:32,tocIndex:10},{value:"\u5FC5\u987B\u624B\u52A8\u4F7F\u7528 ",paraId:33,tocIndex:10},{value:"reject",paraId:33,tocIndex:10},{value:" \u6216\u5728\u56DE\u8C03\u5185\u4F7F\u7528 ",paraId:33,tocIndex:10},{value:"try-catch",paraId:33,tocIndex:10},{value:"\uFF1A",paraId:33,tocIndex:10},{value:`// \u2705 \u6B63\u786E\u505A\u6CD5
new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      throw new Error('\u5F02\u6B65\u9519\u8BEF');
    } catch (error) {
      reject(error); // \u624B\u52A8 reject
    }
  }, 0);
}).catch((e) => {
  console.log(e.message); // "\u5F02\u6B65\u9519\u8BEF"
});
`,paraId:34,tocIndex:10},{value:"\u66F4\u597D\u7684\u65B9\u5F0F\u662F\u5728\u5F02\u6B65\u56DE\u8C03\u4E2D\u4F7F\u7528 async/await\uFF1A",paraId:35,tocIndex:10},{value:`new Promise(async (resolve, reject) => {
  try {
    await someAsyncOperation();
    resolve('\u6210\u529F');
  } catch (error) {
    reject(error);
  }
});
`,paraId:36,tocIndex:10},{value:"\u6DF7\u7528 ",paraId:37,tocIndex:12},{value:".then()",paraId:37,tocIndex:12},{value:" \u548C ",paraId:37,tocIndex:12},{value:"await",paraId:37,tocIndex:12},{value:" \u65F6\uFF0C\u53EA\u6709\u88AB ",paraId:37,tocIndex:12},{value:"await",paraId:37,tocIndex:12},{value:" \u7684 Promise \u9519\u8BEF\u80FD\u88AB ",paraId:37,tocIndex:12},{value:"try-catch",paraId:37,tocIndex:12},{value:" \u6355\u83B7\uFF1A",paraId:37,tocIndex:12},{value:`const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  try {
    // \u573A\u666F 1\uFF1A\u6CA1\u6709 await \u7684 Promise
    const p1 = wait(3000).then(() => {
      console.log('3\u79D2\u540E');
      throw new Error('\u9519\u8BEF 1');
    }); // \u274C \u65E0\u6CD5\u6355\u83B7\uFF0C\u4F1A\u89E6\u53D1 unhandledrejection

    // \u573A\u666F 2\uFF1A\u4F7F\u7528 await \u7684 Promise
    await wait(2000).then(() => {
      console.log('2\u79D2\u540E');
      throw new Error('\u9519\u8BEF 2');
    }); // \u2705 \u53EF\u4EE5\u6355\u83B7

    console.log('\u8FD9\u884C\u4E0D\u4F1A\u6267\u884C');
    await p1; // \u8FD9\u884C\u4E5F\u4E0D\u4F1A\u6267\u884C\uFF08\u5DF2\u7ECF\u8FDB\u5165 catch\uFF09
  } catch (e) {
    console.log('\u6355\u83B7\u5230\uFF1A', e.message); // "\u9519\u8BEF 2"
  }
})();
`,paraId:38,tocIndex:12},{value:"\u89E3\u91CA\uFF1A",paraId:39,tocIndex:12},{value:"p1",paraId:40,tocIndex:12},{value:" \u7684\u9519\u8BEF\u53D1\u751F\u65F6\u6CA1\u6709\u88AB ",paraId:40,tocIndex:12},{value:"await",paraId:40,tocIndex:12},{value:"\uFF0C\u6240\u4EE5\u65E0\u6CD5\u88AB ",paraId:40,tocIndex:12},{value:"try-catch",paraId:40,tocIndex:12},{value:" \u6355\u83B7",paraId:40,tocIndex:12},{value:"await wait(2000)",paraId:40,tocIndex:12},{value:" \u7684\u9519\u8BEF\u4F1A\u88AB\u6355\u83B7\uFF0C\u5BFC\u81F4\u7ACB\u5373\u8DF3\u8F6C\u5230 ",paraId:40,tocIndex:12},{value:"catch",paraId:40,tocIndex:12},{value:" \u5757",paraId:40,tocIndex:12},{value:"\u4E00\u65E6\u8FDB\u5165 ",paraId:40,tocIndex:12},{value:"catch",paraId:40,tocIndex:12},{value:" \u5757\uFF0C",paraId:40,tocIndex:12},{value:"try",paraId:40,tocIndex:12},{value:" \u5757\u5269\u4F59\u4EE3\u7801\u4E0D\u4F1A\u6267\u884C",paraId:40,tocIndex:12},{value:"\u5EF6\u8FDF await \u7684\u60C5\u51B5\uFF1A",paraId:41,tocIndex:12},{value:`const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  try {
    const p1 = wait(1000).then(() => {
      throw new Error('\u9519\u8BEF');
    });

    await wait(3000); // \u7B49\u5F85 3 \u79D2
    await p1; // \u6B64\u65F6 p1 \u5DF2\u7ECF rejected
  } catch (e) {
    console.log('\u6355\u83B7\u5230\uFF1A', e.message); // "\u9519\u8BEF"
  }
})();
`,paraId:42,tocIndex:12},{value:"\u6267\u884C\u8FC7\u7A0B\uFF1A",paraId:43,tocIndex:12},{value:"1 \u79D2\u540E\uFF0C",paraId:44,tocIndex:12},{value:"p1",paraId:44,tocIndex:12},{value:" rejected\uFF0C\u89E6\u53D1 ",paraId:44,tocIndex:12},{value:"unhandledrejection",paraId:44,tocIndex:12},{value:" \u4E8B\u4EF6",paraId:44,tocIndex:12},{value:"3 \u79D2\u540E\uFF0C",paraId:44,tocIndex:12},{value:"await p1",paraId:44,tocIndex:12},{value:" \u6355\u83B7\u5230\u9519\u8BEF\uFF0C\u8FDB\u5165 ",paraId:44,tocIndex:12},{value:"catch",paraId:44,tocIndex:12},{value:" \u5757",paraId:44,tocIndex:12},{value:"unhandledrejection",paraId:44,tocIndex:12},{value:" \u4E8B\u4EF6\u88AB\u53D6\u6D88\uFF08\u9519\u8BEF\u5DF2\u88AB\u5904\u7406\uFF09",paraId:44,tocIndex:12},{value:"\u4E8B\u4EF6\u76D1\u542C\u5668\u4E2D\u7684\u9519\u8BEF\u65E0\u6CD5\u88AB\u5916\u90E8\u7684 ",paraId:45,tocIndex:13},{value:"try-catch",paraId:45,tocIndex:13},{value:" \u6216\u5168\u5C40\u9519\u8BEF\u5904\u7406\u5668\u6355\u83B7\uFF1A",paraId:45,tocIndex:13},{value:`// \u274C \u65E0\u6CD5\u6355\u83B7\u4E8B\u4EF6\u5185\u7684\u9519\u8BEF
try {
  document.querySelector('button').addEventListener('click', () => {
    throw new Error('\u70B9\u51FB\u9519\u8BEF');
  });
} catch (e) {
  // \u4E0D\u4F1A\u6267\u884C
}
`,paraId:46,tocIndex:13},{value:"\u5FC5\u987B\u5728\u4E8B\u4EF6\u5904\u7406\u5668\u5185\u90E8\u4F7F\u7528 ",paraId:47,tocIndex:13},{value:"try-catch",paraId:47,tocIndex:13},{value:"\uFF1A",paraId:47,tocIndex:13},{value:`// \u2705 \u6B63\u786E\u505A\u6CD5
document.querySelector('button').addEventListener('click', async () => {
  try {
    await someAsyncOperation();
  } catch (e) {
    console.error('\u64CD\u4F5C\u5931\u8D25\uFF1A', e);
  }
});
`,paraId:48,tocIndex:13},{value:"window.onerror",paraId:49,tocIndex:15},{value:" \u6216 ",paraId:49,tocIndex:15},{value:"error",paraId:49,tocIndex:15},{value:" \u4E8B\u4EF6\u53EF\u4EE5\u6355\u83B7\u5927\u90E8\u5206\u672A\u5904\u7406\u7684\u540C\u6B65\u9519\u8BEF\uFF1A",paraId:49,tocIndex:15},{value:`window.addEventListener('error', (event) => {
  console.log('\u5168\u5C40\u9519\u8BEF\uFF1A', event.message);
  console.log('\u6587\u4EF6\uFF1A', event.filename);
  console.log('\u884C\u53F7\uFF1A', event.lineno);
  console.log('\u5217\u53F7\uFF1A', event.colno);
  console.log('\u9519\u8BEF\u5BF9\u8C61\uFF1A', event.error);

  // \u963B\u6B62\u9ED8\u8BA4\u884C\u4E3A\uFF08\u63A7\u5236\u53F0\u62A5\u9519\uFF09
  event.preventDefault();
});
`,paraId:50,tocIndex:15},{value:"\u6355\u83B7\u8303\u56F4\uFF1A",paraId:51,tocIndex:15},{value:"\u2705 \u540C\u6B65\u8FD0\u884C\u65F6\u9519\u8BEF",paraId:52,tocIndex:15},{value:"\u2705 \u8D44\u6E90\u52A0\u8F7D\u9519\u8BEF\uFF08\u9700\u4F7F\u7528\u6355\u83B7\u9636\u6BB5\uFF1A",paraId:52,tocIndex:15},{value:"useCapture: true",paraId:52,tocIndex:15},{value:"\uFF09",paraId:52,tocIndex:15},{value:"\u274C \u8BED\u6CD5\u9519\u8BEF\uFF08\u811A\u672C\u65E0\u6CD5\u6267\u884C\uFF09",paraId:52,tocIndex:15},{value:"\u274C Promise rejection\uFF08\u9700\u8981 ",paraId:52,tocIndex:15},{value:"unhandledrejection",paraId:52,tocIndex:15},{value:"\uFF09",paraId:52,tocIndex:15},{value:"\u274C async \u51FD\u6570\u672A\u6355\u83B7\u9519\u8BEF\uFF08\u9700\u8981 ",paraId:52,tocIndex:15},{value:"unhandledrejection",paraId:52,tocIndex:15},{value:"\uFF09",paraId:52,tocIndex:15},{value:"\u76D1\u542C\u672A\u88AB ",paraId:53,tocIndex:16},{value:".catch()",paraId:53,tocIndex:16},{value:" \u6355\u83B7\u7684 Promise rejection\uFF1A",paraId:53,tocIndex:16},{value:`window.addEventListener('unhandledrejection', (event) => {
  console.log('\u672A\u5904\u7406\u7684 Promise rejection\uFF1A', event.reason);
  console.log('Promise \u5BF9\u8C61\uFF1A', event.promise);

  // \u963B\u6B62\u9ED8\u8BA4\u884C\u4E3A\uFF08\u63A7\u5236\u53F0\u8B66\u544A\uFF09
  event.preventDefault();
});
`,paraId:54,tocIndex:16},{value:"\u793A\u4F8B\uFF1A",paraId:55,tocIndex:16},{value:`// \u89E6\u53D1 unhandledrejection
Promise.reject('\u5931\u8D25\u539F\u56E0');

// \u4E0D\u89E6\u53D1\uFF08\u5DF2\u88AB\u6355\u83B7\uFF09
Promise.reject('\u5931\u8D25\u539F\u56E0').catch((e) => console.log(e));
`,paraId:56,tocIndex:16},{value:`// \u540C\u6B65\u9519\u8BEF\u548C\u8D44\u6E90\u52A0\u8F7D\u9519\u8BEF
window.addEventListener(
  'error',
  (event) => {
    if (event.target !== window) {
      // \u8D44\u6E90\u52A0\u8F7D\u9519\u8BEF
      console.error('\u8D44\u6E90\u52A0\u8F7D\u5931\u8D25\uFF1A', event.target);
    } else {
      // \u8FD0\u884C\u65F6\u9519\u8BEF
      console.error('\u8FD0\u884C\u65F6\u9519\u8BEF\uFF1A', event.message);
    }
    // \u4E0A\u62A5\u9519\u8BEF\u5230\u76D1\u63A7\u7CFB\u7EDF
    reportError(event);
  },
  true, // \u4F7F\u7528\u6355\u83B7\u9636\u6BB5
);

// Promise rejection \u9519\u8BEF
window.addEventListener('unhandledrejection', (event) => {
  console.error('\u672A\u5904\u7406\u7684 Promise \u9519\u8BEF\uFF1A', event.reason);
  // \u4E0A\u62A5\u9519\u8BEF\u5230\u76D1\u63A7\u7CFB\u7EDF
  reportError(event.reason);
  event.preventDefault();
});
`,paraId:57,tocIndex:17},{value:"\u5916\u90E8\u6570\u636E\uFF08API \u54CD\u5E94\u3001\u7528\u6237\u8F93\u5165\u3001localStorage \u7B49\uFF09\u662F\u4E0D\u53EF\u4FE1\u7684\uFF0C\u5E94\u8BE5\u4F7F\u7528\u9519\u8BEF\u5904\u7406\uFF1A",paraId:58,tocIndex:19},{value:`// \u2705 \u5B89\u5168\u7684 JSON \u89E3\u6790
function safeParseJSON<T>(input: string, defaultValue: T): T {
  try {
    // \u6DFB\u52A0\u7C7B\u578B\u68C0\u67E5
    if (typeof input !== 'string') {
      return defaultValue;
    }
    return JSON.parse(input) as T;
  } catch (error) {
    console.warn('JSON \u89E3\u6790\u5931\u8D25\uFF1A', error);
    return defaultValue;
  }
}

// \u4F7F\u7528
const data = safeParseJSON(localStorage.getItem('user'), { name: 'Guest' });
`,paraId:59,tocIndex:19},{value:"\u5904\u7406 HTTP \u8BF7\u6C42\u65F6\u8981\u8003\u8651\u591A\u79CD\u9519\u8BEF\u60C5\u51B5\uFF1A",paraId:60,tocIndex:20},{value:`async function fetchUser(id: string) {
  try {
    const response = await fetch(\`/api/users/\${id}\`);

    // \u68C0\u67E5 HTTP \u72B6\u6001
    if (!response.ok) {
      throw new NetworkError(\`\u8BF7\u6C42\u5931\u8D25: \${response.status}\`, response.status);
    }

    const data = await response.json();

    // \u9A8C\u8BC1\u6570\u636E\u7ED3\u6784
    if (!data || typeof data.name !== 'string') {
      throw new ValidationError('\u6570\u636E\u683C\u5F0F\u4E0D\u6B63\u786E');
    }

    return data;
  } catch (error) {
    if (error instanceof NetworkError) {
      // \u5904\u7406\u7F51\u7EDC\u9519\u8BEF
      if (error.statusCode === 404) {
        console.error('\u7528\u6237\u4E0D\u5B58\u5728');
      } else if (error.statusCode >= 500) {
        console.error('\u670D\u52A1\u5668\u9519\u8BEF');
      }
    } else if (error instanceof ValidationError) {
      // \u5904\u7406\u6570\u636E\u9A8C\u8BC1\u9519\u8BEF
      console.error('\u6570\u636E\u9A8C\u8BC1\u5931\u8D25');
    } else {
      // \u5904\u7406\u5176\u4ED6\u9519\u8BEF\uFF08\u5982\u7F51\u7EDC\u65AD\u5F00\uFF09
      console.error('\u672A\u77E5\u9519\u8BEF', error);
    }
    throw error; // \u91CD\u65B0\u629B\u51FA\uFF0C\u8BA9\u4E0A\u5C42\u5904\u7406
  }
}
`,paraId:61,tocIndex:20},{value:"\u4E0D\u662F\u6240\u6709\u4EE3\u7801\u90FD\u9700\u8981 ",paraId:62,tocIndex:21},{value:"try-catch",paraId:62,tocIndex:21},{value:"\uFF0C\u8FC7\u5EA6\u4F7F\u7528\u4F1A\u5BFC\u81F4\u4EE3\u7801\u5197\u4F59\uFF1A",paraId:62,tocIndex:21},{value:`// \u274C \u8FC7\u5EA6\u4F7F\u7528
try {
  const sum = 1 + 2;
  console.log(sum);
} catch (e) {
  // \u8FD9\u6BB5\u4EE3\u7801\u4E0D\u4F1A\u629B\u51FA\u9519\u8BEF
}

// \u2705 \u53EA\u5728\u5FC5\u8981\u65F6\u4F7F\u7528
function divide(a, b) {
  if (b === 0) {
    throw new Error('\u9664\u6570\u4E0D\u80FD\u4E3A 0');
  }
  return a / b;
}
`,paraId:63,tocIndex:21},{value:"\u9519\u8BEF\u4FE1\u606F\u5E94\u8BE5\u6E05\u6670\u3001\u5177\u4F53\uFF0C\u4FBF\u4E8E\u8C03\u8BD5\uFF1A",paraId:64,tocIndex:22},{value:`// \u274C \u4E0D\u597D\u7684\u9519\u8BEF\u4FE1\u606F
throw new Error('\u9519\u8BEF');

// \u2705 \u597D\u7684\u9519\u8BEF\u4FE1\u606F
throw new ValidationError(\`\u7528\u6237\u540D\u957F\u5EA6\u5FC5\u987B\u5728 3-20 \u4E4B\u95F4\uFF0C\u5F53\u524D\u957F\u5EA6\uFF1A\${username.length}\`);
`,paraId:65,tocIndex:22},{value:"\u4F7F\u7528 ",paraId:66,tocIndex:23},{value:"finally",paraId:66,tocIndex:23},{value:" \u786E\u4FDD\u8D44\u6E90\u88AB\u6B63\u786E\u91CA\u653E\uFF1A",paraId:66,tocIndex:23},{value:`let file;
try {
  file = await openFile('data.txt');
  const content = await file.read();
  return content;
} catch (error) {
  console.error('\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25\uFF1A', error);
  throw error;
} finally {
  // \u65E0\u8BBA\u6210\u529F\u6216\u5931\u8D25\u90FD\u5173\u95ED\u6587\u4EF6
  if (file) {
    await file.close();
  }
}
`,paraId:67,tocIndex:23},{value:"\u6355\u83B7\u9519\u8BEF\u540E\u5E94\u8BE5\u8BB0\u5F55\u6216\u91CD\u65B0\u629B\u51FA\uFF0C\u4E0D\u8981\u9ED8\u9ED8\u541E\u6389\uFF1A",paraId:68,tocIndex:24},{value:`// \u274C \u541E\u6389\u9519\u8BEF
try {
  await importantOperation();
} catch (e) {
  // \u4EC0\u4E48\u90FD\u4E0D\u505A
}

// \u2705 \u8BB0\u5F55\u5E76\u5904\u7406
try {
  await importantOperation();
} catch (e) {
  console.error('\u64CD\u4F5C\u5931\u8D25\uFF1A', e);
  // \u6839\u636E\u60C5\u51B5\u51B3\u5B9A\u662F\u5426\u91CD\u65B0\u629B\u51FA
  throw e;
}
`,paraId:69,tocIndex:24},{value:'\u5728\u5B9E\u9645\u5F00\u53D1\u4E2D\uFF0C\u9519\u8BEF\u5904\u7406\u4E0D\u4EC5\u4EC5\u662F\u4E3A\u4E86\u9632\u6B62\u7A0B\u5E8F\u5D29\u6E83\uFF0C\u66F4\u91CD\u8981\u7684\u662F\u5904\u7406"\u4E0D\u53EF\u4FE1\u4EFB\u7684\u5916\u90E8\u6765\u6E90"\u3002',paraId:70,tocIndex:26},{value:"\u5E38\u89C1\u573A\u666F\uFF1AHTTP \u8BF7\u6C42",paraId:71,tocIndex:26},{value:"HTTP \u8BF7\u6C42\u901A\u5E38\u6709\u4E24\u7C7B\u9519\u8BEF\uFF1A",paraId:72,tocIndex:26},{value:"\u63A5\u53E3\u9519\u8BEF",paraId:73,tocIndex:26},{value:"\uFF1A\u540E\u7AEF\u8FD4\u56DE 4xx/5xx \u72B6\u6001\u7801",paraId:73,tocIndex:26},{value:"\u6570\u636E\u5904\u7406\u9519\u8BEF",paraId:73,tocIndex:26},{value:"\uFF1A\u6570\u636E\u7ED3\u6784\u4E0E\u9884\u671F\u4E0D\u7B26",paraId:73,tocIndex:26},{value:"\u7B2C\u4E8C\u7C7B\u662F\u6700\u5E38\u89C1\u7684 Bug \u6765\u6E90\uFF1A",paraId:74,tocIndex:26},{value:"\u63A5\u53E3\u53EA\u8FD4\u56DE\u6570\u636E\uFF0C\u4E0D\u8FD4\u56DE\u6570\u636E\u7C7B\u578B\u4FE1\u606F",paraId:74,tocIndex:26},{value:"\u3002",paraId:74,tocIndex:26},{value:"\u771F\u5B9E\u6848\u4F8B\uFF1A",paraId:75,tocIndex:26},{value:'\u4E00\u5F00\u59CB\u540E\u7AEF\u5BF9\u4E8E\u503C\u4E3A"\u7A7A"\u7684\u5B57\u6BB5\u76F4\u63A5\u4E0D\u8FD4\u56DE\u8BE5\u5B57\u6BB5\uFF0C\u6B64\u65F6\u524D\u7AEF\u7684\u9ED8\u8BA4\u503C\u8D4B\u503C\u53EF\u4EE5\u751F\u6548\uFF08',paraId:76,tocIndex:26},{value:"undefined ?? '\u9ED8\u8BA4\u503C'",paraId:76,tocIndex:26},{value:"\uFF09\u3002",paraId:76,tocIndex:26},{value:'\u540E\u6765\u540E\u7AEF\u65B0\u540C\u4E8B\u4FEE\u6539\u4E86\u914D\u7F6E\uFF0C\u503C\u4E3A"\u7A7A"\u7684\u5B57\u6BB5\u4E5F\u8FD4\u56DE\u4E86\uFF0C\u4F46\u503C\u662F ',paraId:77,tocIndex:26},{value:"null",paraId:77,tocIndex:26},{value:"\u3002",paraId:77,tocIndex:26},{value:"\u6B64\u65F6 ",paraId:78,tocIndex:26},{value:"null ?? '\u9ED8\u8BA4\u503C'",paraId:78,tocIndex:26},{value:" \u4E0D\u4F1A\u751F\u6548\uFF08",paraId:78,tocIndex:26},{value:"null",paraId:78,tocIndex:26},{value:" \u4E0D\u662F ",paraId:78,tocIndex:26},{value:"undefined",paraId:78,tocIndex:26},{value:"\uFF09\uFF0C\u540E\u7EED\u903B\u8F91\u76F4\u63A5\u62A5\u9519\u3002",paraId:78,tocIndex:26},{value:"\u89E3\u51B3\u65B9\u6848\uFF1A",paraId:79,tocIndex:26},{value:`interface UserResponse {
  name?: string | null;
  age?: number | null;
}

function normalizeUser(data: UserResponse) {
  return {
    name: data.name ?? '\u533F\u540D\u7528\u6237', // \u274C null \u4E0D\u4F1A\u89E6\u53D1\u9ED8\u8BA4\u503C
    age: data.age ?? 0,
  };
}

// \u2705 \u66F4\u5065\u58EE\u7684\u5904\u7406
function normalizeUser(data: UserResponse) {
  return {
    name: data.name || '\u533F\u540D\u7528\u6237', // \u540C\u65F6\u5904\u7406 null \u548C undefined
    age: data.age || 0,
  };
}

// \u2705 \u6216\u8005\u4F7F\u7528\u7C7B\u578B\u5B88\u536B
function normalizeUser(data: UserResponse) {
  return {
    name: typeof data.name === 'string' ? data.name : '\u533F\u540D\u7528\u6237',
    age: typeof data.age === 'number' ? data.age : 0,
  };
}
`,paraId:80,tocIndex:26},{value:`// \u901A\u7528\u8BF7\u6C42\u5C01\u88C5
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new NetworkError(\`HTTP \${response.status}: \${response.statusText}\`, response.status);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof NetworkError) {
      // \u6839\u636E\u72B6\u6001\u7801\u5904\u7406
      handleNetworkError(error);
    } else if (error instanceof SyntaxError) {
      // JSON \u89E3\u6790\u9519\u8BEF
      console.error('\u54CD\u5E94\u4E0D\u662F\u6709\u6548\u7684 JSON');
    } else {
      // \u7F51\u7EDC\u9519\u8BEF\u3001\u8D85\u65F6\u7B49
      console.error('\u8BF7\u6C42\u5931\u8D25\uFF1A', error);
    }
    throw error;
  }
}

function handleNetworkError(error: NetworkError) {
  switch (true) {
    case error.statusCode >= 500:
      showToast('\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5');
      break;
    case error.statusCode === 404:
      showToast('\u8D44\u6E90\u4E0D\u5B58\u5728');
      break;
    case error.statusCode === 401:
      redirectToLogin();
      break;
    default:
      showToast('\u8BF7\u6C42\u5931\u8D25');
  }
}
`,paraId:81,tocIndex:27},{value:"MDN - Error",paraId:82,tocIndex:28},{value:"MDN - try...catch",paraId:82,tocIndex:28},{value:"\u5728 JavaScript \u4E2D\u7528 try/catch \u662F\u4E0D\u662F\u5F88 low\uFF1F",paraId:82,tocIndex:28}]}}]);
