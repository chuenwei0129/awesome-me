"use strict";(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[3132],{43132:function(a,e,n){n.r(e),n.d(e,{texts:function(){return t}});const t=[{value:`npm i -D jest@29
`,paraId:0,tocIndex:2},{value:"\u5B89\u88C5 Jest \u540E\uFF0C\u7528 jest-cli \u521D\u59CB\u5316 jest \u914D\u7F6E\u6587\u4EF6\uFF1A",paraId:1,tocIndex:3},{value:`npx jest --init
`,paraId:2,tocIndex:3},{value:"\u521D\u59CB\u5316\u914D\u7F6E\u6587\u4EF6\u65F6\uFF0CJest \u4F1A\u95EE\u4F60\u4E00\u5806\u95EE\u9898\uFF0C\u53EF\u4EE5\u5148\u6309\u6211\u4E0B\u9762\u7684\u56FE\u6765\u9009\u62E9\uFF08\u53EA\u6253\u5F00\u8986\u76D6\u7387\u548C\u81EA\u52A8\u6E05\u9664 Mock\uFF09\uFF0C\u522B\u7684\u4EE5\u540E\u518D\u8BF4\uFF1A",paraId:3,tocIndex:3},{value:"\u6267\u884C\u5B8C\u4E4B\u540E\uFF0C\u5C31\u4F1A\u770B\u5230\u6709\u4E00\u4E2A ",paraId:4,tocIndex:3},{value:"jest.config.js",paraId:4,tocIndex:3},{value:" \u7684\u914D\u7F6E\u6587\u4EF6\u3002",paraId:4,tocIndex:3},{value:"\u5EFA\u8BAE\u4E0D\u8981\u72AF\u4E86\u5F3A\u8FEB\u75C7\u628A ",paraId:5,tocIndex:3},{value:"jest.config.js",paraId:5,tocIndex:3},{value:" \u7684\u6CE8\u91CA\u53BB\u6389\uFF0C\u5B83\u4EEC\u53EF\u4EE5\u4F5C\u4E3A\u914D\u7F6E Jest \u7684\u7B80\u5355\u7248\u6587\u6863\u3002",paraId:5,tocIndex:3},{value:"\u6709\u4E86\u57FA\u672C\u914D\u7F6E\u540E\uFF0C\u6DFB\u52A0\u4E00\u4E2A\u5DE5\u5177\u51FD\u6570\u6587\u4EF6 ",paraId:6,tocIndex:4},{value:"sum.js",paraId:6,tocIndex:4},{value:" \u4F5C\u4E3A\u6211\u4EEC\u7B2C\u4E00\u4E2A\u4E1A\u52A1\u6587\u4EF6\uFF1A",paraId:6,tocIndex:4},{value:`const sum = (a, b) => {
  return a + b;
};

module.exports = sum;
`,paraId:7,tocIndex:4},{value:"\u7136\u540E\uFF0C\u6DFB\u52A0\u6211\u4EEC\u9879\u76EE\u7684\u7B2C\u4E00\u4E2A\u6D4B\u8BD5\u7528\u4F8B ",paraId:8,tocIndex:4},{value:"sum.test.js",paraId:8,tocIndex:4},{value:"\uFF1A",paraId:8,tocIndex:4},{value:`const sum = require('./sum');

describe('sum', () => {
  it('\u53EF\u4EE5\u505A\u52A0\u6CD5', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});
`,paraId:9,tocIndex:4},{value:"\u4E00\u5207\u5C31\u7EEA\uFF0C\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\u542F\u52A8\u6D4B\u8BD5\uFF1A",paraId:10,tocIndex:4},{value:`npx jest
`,paraId:11,tocIndex:4},{value:"Jest \u4F1A\u5728 ",paraId:12,tocIndex:4},{value:"coverage",paraId:12,tocIndex:4},{value:" \u76EE\u5F55\u4E0B\u751F\u6210\u5404\u79CD\u4E0D\u540C\u683C\u5F0F\u7684\u8986\u76D6\u7387\u62A5\u544A\u6587\u4EF6\uFF0C\u6709 XML\u3001JSON\uFF0C\u4E5F\u6709 HTML \u7684\u3002\u751F\u6210\u8FD9\u4E48\u591A\u4E0D\u540C\u683C\u5F0F\u7684\u6D4B\u8BD5\u62A5\u544A\u662F\u4E3A\u4E86\u65B9\u4FBF\u4E0D\u540C\u5DE5\u5177\u7684\u8BFB\u53D6\uFF0C\u6BD4\u5982 JS \u8BFB JSON \u5C31\u6BD4\u8BFB XML \u5BB9\u6613\uFF0C\u5B83\u4EEC\u63CF\u8FF0\u7684\u5185\u5BB9\u90FD\u662F\u4E00\u6837\u7684\u3002",paraId:12,tocIndex:4},{value:"\u5728\u73B0\u4EE3\u524D\u7AEF\u5F00\u53D1\u4E2D\uFF0C\u65E0\u8BBA\u6211\u4EEC\u5199\u4E1A\u52A1\u8FD8\u662F\u5199\u6D4B\u8BD5\uFF0C\u90FD\u4F1A\u91C7\u7528\u6BD4\u8F83\u9AD8\u7EA7\u7684 JavaScript \u8BED\u6CD5\uFF0C\u6216\u8005 TypeScript\u3002",paraId:13,tocIndex:5},{value:"\u4F46\u662F\uFF0CJest \u672C\u8EAB\u4E0D\u505A\u4EE3\u7801\u8F6C\u8BD1\u5DE5\u4F5C\u3002\u5728\u6267\u884C\u6D4B\u8BD5\u65F6\uFF0C\u5B83\u4F1A\u8C03\u7528\u5DF2\u6709\u7684\u8F6C\u8BD1\u5668/\u7F16\u8BD1\u5668\u6765\u505A\u4EE3\u7801\u8F6C\u8BD1\u3002\u5728\u524D\u7AEF\uFF0C\u6211\u4EEC\u6700\u719F\u6089\u7684\u4E24\u4E2A\u8F6C\u8BD1\u5668\u5C31\u662F Babel \u4EE5\u53CA TSC \u4E86\u3002",paraId:14,tocIndex:5},{value:"\u4F7F\u7528 ts-jest\uFF1A",paraId:15,tocIndex:5},{value:"Jest \u672C\u8EAB\u4E0D\u505A\u8F6C\u8BD1\uFF0C\u800C\u662F\u5229\u7528\u522B\u7684\u8F6C\u8BD1\u5668\u7684\u80FD\u529B\u6765\u8F6C\u8BD1\u3002\u56E0\u6B64\uFF0C\u6211\u4EEC\u9664\u4E86\u7528 tsc \u6765\u8F6C\u8BD1\uFF0C\u8FD8\u80FD\u7528\u5176\u5B83\u8F6C\u8BD1\u5668\u3002",paraId:16,tocIndex:5},{value:"Babel \u505A\u8F6C\u8BD1\u7684\u7F3A\u70B9\u662F\u65E0\u6CD5\u8BA9 Jest \u5728\u8FD0\u884C\u65F6\u505A\u7C7B\u578B\u68C0\u67E5\uFF0C\u6240\u4EE5\u66F4\u63A8\u8350\u4F7F\u7528 ",paraId:17},{value:"ts-jest",paraId:17},{value:"\uFF0C\u5229\u7528 tsc \u6765\u8F6C\u8BD1 TypeScript\u3002",paraId:17},{value:"\u5B89\u88C5 ts-jest\uFF1A",paraId:18},{value:`npm i -D typescript ts-jest@29 @types/jest@29
`,paraId:19},{value:"\u8FD9\u91CC ",paraId:20},{value:"ts-jest",paraId:20},{value:" \u4E00\u5B9A\u8981\u548C ",paraId:20},{value:"jest",paraId:20},{value:" \u7684\u5927\u7248\u672C\u4E00\u81F4\uFF01\u6BD4\u5982 29 \u5BF9 29\uFF0C\u5426\u5219\u4F1A\u6709\u517C\u5BB9\u95EE\u9898\uFF01\u540C\u6837\u5730\uFF0C",paraId:20},{value:"@types/jest",paraId:20},{value:" \u7684\u5927\u7248\u672C\u6700\u597D\u548C jest \u4E00\u6837\u3002",paraId:20},{value:"\u914D\u7F6E ts-jest\uFF1A",paraId:21},{value:"\u5728 ",paraId:22},{value:"jest.config.js",paraId:22},{value:" \u91CC\u6DFB\u52A0\u914D\u7F6E\uFF1A",paraId:22},{value:`/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  // ...
};
`,paraId:23},{value:"\u5728\u5927\u578B\u9879\u76EE\u4E2D\uFF0C\u6211\u4EEC\u4E0D\u5E0C\u671B\u5199 ",paraId:24,tocIndex:6},{value:"../../src/utils/sum",paraId:24,tocIndex:6},{value:" \u8FD9\u4E48\u957F\u7684\u8DEF\u5F84\uFF0C\u800C\u662F\u5199\u6210 ",paraId:24,tocIndex:6},{value:"utils/sum",paraId:24,tocIndex:6},{value:" \u8FD9\u6837\u66F4\u7B80\u6D01\u7684\u5F62\u5F0F\u3002",paraId:24,tocIndex:6},{value:"\u96BE\u9053\u6BCF\u6B21\u90FD\u8981\u5728 ",paraId:25,tocIndex:6},{value:"tsconfig.json",paraId:25,tocIndex:6},{value:" \u548C ",paraId:25,tocIndex:6},{value:"jest.config.js",paraId:25,tocIndex:6},{value:" \u5199\u4E24\u4EFD\u914D\u7F6E\u5417\uFF1F",paraId:25,tocIndex:6},{value:"\u5F88\u9057\u61BE\uFF0C\u786E\u5B9E\u5982\u6B64\u3002\u9020\u6210\u8FD9\u4E2A\u95EE\u9898\u7684\u4E3B\u8981\u539F\u56E0\u662F jest \u6839\u672C\u4E0D\u7BA1 tsc\u3002",paraId:26,tocIndex:6},{value:"\u6211\u4EEC\u9700\u8981\u5728 ",paraId:27,tocIndex:7},{value:"tsconfig.json",paraId:27,tocIndex:7},{value:" \u91CC\u6307\u5B9A ",paraId:27,tocIndex:7},{value:"baseUrl",paraId:27,tocIndex:7},{value:" \u548C ",paraId:27,tocIndex:7},{value:"paths",paraId:27,tocIndex:7},{value:"\uFF1A",paraId:27,tocIndex:7},{value:`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "utils/*": ["src/utils/*"]
    }
  }
}
`,paraId:28,tocIndex:7},{value:"ts-jest",paraId:29,tocIndex:8},{value:" \u63D0\u4F9B\u4E86 ",paraId:29,tocIndex:8},{value:"pathsToModuleNameMapper",paraId:29,tocIndex:8},{value:" \u5DE5\u5177\u51FD\u6570\uFF0C\u53EF\u4EE5\u81EA\u52A8\u590D\u5236 ",paraId:29,tocIndex:8},{value:"tsconfig.json",paraId:29,tocIndex:8},{value:" \u7684\u914D\u7F6E\u5230 ",paraId:29,tocIndex:8},{value:"jest.config.js",paraId:29,tocIndex:8},{value:"\uFF1A",paraId:29,tocIndex:8},{value:`const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
`,paraId:30,tocIndex:8},{value:"\u5728\u5F88\u591A\u65F6\u5019\uFF0C\u6211\u4EEC\u524D\u7AEF\u7684\u4EE3\u7801\u5F80\u5F80\u53EA\u5728\u6D4F\u89C8\u5668\u91CC\u8FD0\u884C\uFF0C\u7ECF\u5E38\u8981\u7528\u5230\u6D4F\u89C8\u5668\u7684 API\u3002",paraId:31,tocIndex:9},{value:"\u521B\u5EFA\u4E00\u4E2A\u4F7F\u7528 ",paraId:32,tocIndex:10},{value:"localStorage",paraId:32,tocIndex:10},{value:" \u7684\u6A21\u5757\uFF1A",paraId:32,tocIndex:10},{value:`// storage.ts
const KEY_NAME = 'my-app-';

const set = (key: string, value: string) => {
  localStorage.setItem(KEY_NAME + key, value);
};

const get = (key: string) => {
  return localStorage.getItem(KEY_NAME + key);
};

export default {
  get,
  set,
};
`,paraId:33,tocIndex:10},{value:"\u7F16\u5199\u6D4B\u8BD5\u7528\u4F8B\uFF1A",paraId:34,tocIndex:10},{value:`// storage.test.ts
import storage from './storage';

describe('storage', () => {
  it('\u8BBE\u7F6E\u503C', () => {
    storage.set('key', 'value');
    expect(localStorage.getItem('my-app-key')).toEqual('value');
  });

  it('\u83B7\u53D6\u503C', () => {
    localStorage.setItem('my-app-newKey', 'newValue');
    expect(storage.get('newKey')).toEqual('newValue');
  });
});
`,paraId:35,tocIndex:10},{value:"\u7531\u4E8E Node.js \u73AF\u5883\u5E76\u6CA1\u6709 ",paraId:36,tocIndex:11},{value:"localStorage",paraId:36,tocIndex:11},{value:"\uFF0C\u9700\u8981\u5B89\u88C5 ",paraId:36,tocIndex:11},{value:"jest-environment-jsdom",paraId:36,tocIndex:11},{value:"\uFF1A",paraId:36,tocIndex:11},{value:`npm i -D jest-environment-jsdom@29
`,paraId:37,tocIndex:11},{value:"\u5728 ",paraId:38,tocIndex:12},{value:"jest.config.js",paraId:38,tocIndex:12},{value:" \u4E2D\u914D\u7F6E\uFF1A",paraId:38,tocIndex:12},{value:`/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  // ...
};
`,paraId:39,tocIndex:12},{value:"\u6DFB\u52A0 jsdom \u6D4B\u8BD5\u73AF\u5883\u540E\uFF0C\u5168\u5C40\u4F1A\u81EA\u52A8\u62E5\u6709\u5B8C\u6574\u7684\u6D4F\u89C8\u5668\u6807\u51C6 API\u3002\u539F\u7406\u662F\u4F7F\u7528\u4E86 ",paraId:40,tocIndex:12},{value:"jsdom",paraId:40,tocIndex:12},{value:"\uFF0C\u8FD9\u4E2A\u5E93\u7528 JavaScript \u5B9E\u73B0\u4E86\u4E00\u5957 Node.js \u73AF\u5883\u4E0B\u7684 Web \u6807\u51C6 API\u3002",paraId:40,tocIndex:12},{value:"\u4F60\u4E5F\u53EF\u4EE5\u4F7F\u7528\u6CE8\u91CA\u4E3A\u5355\u4E2A\u6D4B\u8BD5\u6587\u4EF6\u6307\u5B9A\u73AF\u5883\uFF1A",paraId:41,tocIndex:13},{value:`/**
 * @jest-environment jsdom
 */

test('\u4F7F\u7528 jsdom \u73AF\u5883', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
`,paraId:42,tocIndex:13},{value:"\u4ECE Jest 28 \u5F00\u59CB\uFF0C\u4F60\u53EF\u4EE5\u5728\u6D4B\u8BD5\u4E2D\u4F7F\u7528\u5185\u8054\u6CE8\u91CA\u4E3A JSDOM \u63D0\u4F9B\u9009\u9879\u3002\u4F8B\u5982\uFF0C\u8BBE\u7F6E URL \u548C\u81EA\u5B9A\u4E49 HTML\uFF1A",paraId:43,tocIndex:14},{value:`/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */

test('\u4F7F\u7528 jsdom \u5E76\u8BBE\u7F6E URL', () => {
  expect(window.location.href).toBe('https://jestjs.io/');
});
`,paraId:44,tocIndex:14},{value:"\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u8BBE\u7F6E\uFF1A",paraId:45,tocIndex:14},{value:`/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007',
  },
};
`,paraId:46,tocIndex:14},{value:"JSDOM \u4E0D\u652F\u6301\u6240\u6709\u6D4F\u89C8\u5668 API\uFF0C\u6BD4\u5982 ",paraId:47,tocIndex:15},{value:"window.matchMedia",paraId:47,tocIndex:15},{value:"\u3002\u4F60\u9700\u8981\u624B\u52A8 mock\uFF1A",paraId:47,tocIndex:15},{value:`// matchMedia.mock.js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
`,paraId:48,tocIndex:15},{value:"\u5728\u6D4B\u8BD5\u6587\u4EF6\u4E2D\u5BFC\u5165\uFF1A",paraId:49,tocIndex:15},{value:`import './matchMedia.mock'; // \u5FC5\u987B\u5728\u88AB\u6D4B\u8BD5\u6587\u4EF6\u4E4B\u524D\u5BFC\u5165
import { myMethod } from './file-to-test';

describe('myMethod()', () => {
  // \u6D4B\u8BD5\u4EE3\u7801...
});
`,paraId:50,tocIndex:15},{value:"Jest \u63D0\u4F9B\u4E86\u5F3A\u5927\u7684 mock \u529F\u80FD\uFF1A",paraId:51,tocIndex:17},{value:`// \u521B\u5EFA\u4E00\u4E2A\u7B80\u5355\u7684 mock \u51FD\u6570
const mockFn = jest.fn();

// \u521B\u5EFA\u5E26\u6709\u8FD4\u56DE\u503C\u7684 mock \u51FD\u6570
const mockFnWithReturn = jest.fn(() => 'default value');

// \u94FE\u5F0F\u8C03\u7528\u8BBE\u7F6E\u4E0D\u540C\u7684\u8FD4\u56DE\u503C
const myMock = jest.fn();
myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// \u8F93\u51FA: 10, 'x', true, true
`,paraId:52,tocIndex:17},{value:`import { expect, jest, test } from '@jest/globals';
import type add from './add';

test('mock \u51FD\u6570\u7C7B\u578B\u63A8\u65AD', () => {
  // \u521B\u5EFA\u5E26\u7C7B\u578B\u7684 mock \u51FD\u6570
  const mockAdd = jest.fn<typeof add>();

  // mockImplementation \u73B0\u5728\u53EF\u4EE5\u6B63\u786E\u63A8\u65AD\u53C2\u6570\u7C7B\u578B
  mockAdd.mockImplementation((a, b) => {
    return a + b;
  });

  expect(mockAdd(1, 2)).toBe(3);
  expect(mockAdd).toHaveBeenCalledTimes(1);
  expect(mockAdd).toHaveBeenCalledWith(1, 2);
});
`,paraId:53,tocIndex:18},{value:`// utils.js
export default {
  authorize: () => 'token',
  isAuthorized: (secret) => secret === 'wizard',
};
`,paraId:54,tocIndex:19},{value:`// utils.test.js
import utils from './utils';

jest.mock('./utils');

test('mock \u6A21\u5757\u6D4B\u8BD5', () => {
  // \u6A21\u5757\u65B9\u6CD5\u81EA\u52A8\u53D8\u6210 mock \u51FD\u6570
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.isAuthorized.mock).toBeTruthy();

  // \u63D0\u4F9B\u81EA\u5B9A\u4E49\u5B9E\u73B0\u6216\u8FD4\u56DE\u503C
  utils.authorize.mockReturnValue('mocked_token');
  utils.isAuthorized.mockReturnValue(true);

  expect(utils.authorize()).toBe('mocked_token');
  expect(utils.isAuthorized('not_wizard')).toBeTruthy();
});
`,paraId:55,tocIndex:19},{value:`import { jest } from '@jest/globals';
import { song } from './song';

jest.mock('./song');

const mockedSong = jest.mocked(song);

test('\u6DF1\u5EA6\u65B9\u6CD5\u7C7B\u578B\u6B63\u786E', () => {
  mockedSong.one.more.time.mockReturnValue(12);

  expect(mockedSong.one.more.time(10)).toBe(12);
  expect(mockedSong.one.more.time.mock.calls).toHaveLength(1);
});
`,paraId:56,tocIndex:20},{value:"\u901A\u8FC7 Fake Timer\uFF0C\u6211\u4EEC\u53EF\u4EE5\u63A7\u5236\u65F6\u95F4\u6D41\u901D\uFF0C\u800C\u4E0D\u9700\u8981\u771F\u7684\u7B49\u5F85\u5EF6\u65F6\u3002",paraId:57,tocIndex:21},{value:`describe('Timer \u6D4B\u8BD5', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('\u5728\u6307\u5B9A\u65F6\u95F4\u540E\u6267\u884C\u56DE\u8C03', () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);

    // \u5FEB\u8FDB 500ms
    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    // \u518D\u5FEB\u8FDB 500ms
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('\u6267\u884C\u6240\u6709 timer', () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);
    setTimeout(callback, 2000);

    // \u6267\u884C\u6240\u6709 pending \u7684 timer
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('\u53EA\u6267\u884C\u5F53\u524D pending \u7684 timer', () => {
    const callback = jest.fn();

    setTimeout(() => {
      callback();
      // \u8FD9\u4E2A timer \u5728\u7B2C\u4E00\u4E2A timer \u7684\u56DE\u8C03\u4E2D\u521B\u5EFA
      setTimeout(callback, 1000);
    }, 1000);

    // \u53EA\u8FD0\u884C\u5F53\u524D\u961F\u5217\u4E2D\u7684 timer
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
`,paraId:58,tocIndex:22},{value:"Jest \u63D0\u4F9B\u4E86\u4E24\u4E2A\u914D\u7F6E\u9009\u9879\u6765\u5728\u6D4B\u8BD5\u524D\u8FD0\u884C\u8BBE\u7F6E\u4EE3\u7801\uFF1A",paraId:59,tocIndex:24},{value:"setupFiles",paraId:60,tocIndex:24},{value:"\uFF1A\u5728\u5F15\u5165\u6D4B\u8BD5\u73AF\u5883\uFF08\u6BD4\u5982 jsdom\uFF09",paraId:60,tocIndex:24},{value:"\u4E4B\u540E",paraId:60,tocIndex:24},{value:"\u6267\u884C\u7684\u4EE3\u7801",paraId:60,tocIndex:24},{value:"setupFilesAfterEnv",paraId:60,tocIndex:24},{value:"\uFF1A\u5728\u5B89\u88C5\u6D4B\u8BD5\u6846\u67B6\uFF08Jest/Jasmine\uFF09",paraId:60,tocIndex:24},{value:"\u4E4B\u540E",paraId:60,tocIndex:24},{value:"\u6267\u884C\u7684\u4EE3\u7801",paraId:60,tocIndex:24},{value:"setupFilesAfterEnv",paraId:61},{value:" \u53EF\u4EE5\u8BBF\u95EE Jest \u7684\u5168\u5C40\u53D8\u91CF\uFF08\u5982 ",paraId:61},{value:"expect",paraId:61},{value:"\uFF09\uFF0C\u9002\u5408\u6DFB\u52A0\u81EA\u5B9A\u4E49\u5339\u914D\u5668\u3001\u914D\u7F6E\u6D4B\u8BD5\u6846\u67B6\u63D2\u4EF6\u3002",paraId:61},{value:`/** @type {import('jest').Config} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
`,paraId:62,tocIndex:25},{value:`// jest-setup.ts
import { expect } from '@jest/globals';
import matchers from 'jest-extended';

// \u6269\u5C55 Jest \u5339\u914D\u5668
expect.extend(matchers);

// \u5168\u5C40\u6D4B\u8BD5\u94A9\u5B50
afterEach(() => {
  jest.useRealTimers();
});

// \u6DFB\u52A0\u81EA\u5B9A\u4E49\u5339\u914D\u5668
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          \`expected \${received} not to be within range \${floor} - \${ceiling}\`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          \`expected \${received} to be within range \${floor} - \${ceiling}\`,
        pass: false,
      };
    }
  },
});
`,paraId:63,tocIndex:25},{value:`// \u5728\u6240\u6709\u6D4B\u8BD5\u6587\u4EF6\u4E4B\u524D\u8FD0\u884C\u4E00\u6B21
beforeAll(() => {
  const globalDatabase = makeGlobalDatabase();
  return globalDatabase.clear().then(() => {
    return globalDatabase.insert({ testData: 'foo' });
  });
});

// \u6BCF\u4E2A\u6D4B\u8BD5\u4E4B\u524D\u8FD0\u884C
beforeEach(() => {
  // \u91CD\u7F6E mocks
  jest.clearAllMocks();
});

// \u6BCF\u4E2A\u6D4B\u8BD5\u4E4B\u540E\u8FD0\u884C
afterEach(() => {
  // \u6E05\u7406\u5DE5\u4F5C
  jest.useRealTimers();
});

// \u6240\u6709\u6D4B\u8BD5\u4E4B\u540E\u8FD0\u884C\u4E00\u6B21
afterAll(() => {
  // \u6E05\u7406\u5168\u5C40\u8D44\u6E90
});
`,paraId:64,tocIndex:26},{value:`/** @type {import('jest').Config} */
module.exports = {
  // \u57FA\u7840\u914D\u7F6E
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '.',

  // \u6587\u4EF6\u5339\u914D
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // \u8DEF\u5F84\u6620\u5C04
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // \u8F6C\u6362\u5668
  transform: {
    '^.+\\\\.tsx?$': 'ts-jest',
  },

  // \u8986\u76D6\u7387
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/__tests__/'],

  // \u5168\u5C40\u8BBE\u7F6E
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  clearMocks: true,
  restoreMocks: true,

  // \u6027\u80FD
  maxWorkers: '50%',

  // \u5176\u4ED6
  verbose: true,
};
`,paraId:65,tocIndex:28},{value:`import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};

export default config;
`,paraId:66,tocIndex:29},{value:`// Promise
test('\u5F02\u6B65\u6D4B\u8BD5 - Promise', () => {
  return fetchData().then((data) => {
    expect(data).toBe('peanut butter');
  });
});

// async/await
test('\u5F02\u6B65\u6D4B\u8BD5 - async/await', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

// \u6D4B\u8BD5 Promise reject
test('\u6D4B\u8BD5\u5931\u8D25\u60C5\u51B5', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

// \u4F7F\u7528 rejects
test('\u4F7F\u7528 rejects', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});
`,paraId:67,tocIndex:31},{value:`// SoundPlayer.js
export default class SoundPlayer {
  constructor() {
    this.foo = 'bar';
  }

  playSoundFile(fileName) {
    console.log('Playing sound file ' + fileName);
  }
}
`,paraId:68,tocIndex:32},{value:`// SoundPlayer.test.js
import SoundPlayer from './SoundPlayer';

jest.mock('./SoundPlayer');

const mockPlaySoundFile = jest.fn();
SoundPlayer.mockImplementation(() => {
  return { playSoundFile: mockPlaySoundFile };
});

beforeEach(() => {
  SoundPlayer.mockClear();
  mockPlaySoundFile.mockClear();
});

test('\u68C0\u67E5\u6784\u9020\u51FD\u6570\u662F\u5426\u88AB\u8C03\u7528', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  expect(SoundPlayer).toHaveBeenCalledTimes(1);
});

test('\u68C0\u67E5\u5B9E\u4F8B\u65B9\u6CD5\u662F\u5426\u88AB\u8C03\u7528', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  const coolSoundFileName = 'song.mp3';
  soundPlayerConsumer.playSomethingCool();
  expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
});
`,paraId:69,tocIndex:32},{value:`test('\u5FEB\u7167\u6D4B\u8BD5', () => {
  const tree = renderer
    .create(<Link page="https://example.com">Example</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// \u5185\u8054\u5FEB\u7167
test('\u5185\u8054\u5FEB\u7167', () => {
  expect(data).toMatchInlineSnapshot(\`
    Object {
      "name": "John",
      "age": 30,
    }
  \`);
});
`,paraId:70,tocIndex:33},{value:`// \u76F8\u7B49\u6027
expect(value).toBe(4); // \u4E25\u683C\u76F8\u7B49 ===
expect(value).toEqual(4); // \u6DF1\u5EA6\u76F8\u7B49
expect(value).not.toBe(4); // \u53D6\u53CD

// \u771F\u503C
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// \u6570\u5B57
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3.5);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(4.5);
expect(0.1 + 0.2).toBeCloseTo(0.3); // \u6D6E\u70B9\u6570

// \u5B57\u7B26\u4E32
expect('team').toMatch(/I/);
expect('Christoph').toMatch(/stop/);

// \u6570\u7EC4\u548C\u53EF\u8FED\u4EE3\u5BF9\u8C61
expect(['apple', 'banana']).toContain('apple');
expect(new Set(['apple', 'banana'])).toContain('apple');

// \u5F02\u5E38
expect(() => {
  throw new Error('error');
}).toThrow();
expect(() => {
  throw new Error('error');
}).toThrow('error');
expect(() => {
  throw new Error('error');
}).toThrow(/error/);
`,paraId:71,tocIndex:35},{value:`// resolves
await expect(Promise.resolve('lemon')).resolves.toBe('lemon');

// rejects
await expect(Promise.reject(new Error('octopus'))).rejects.toThrow('octopus');
`,paraId:72,tocIndex:36},{value:`const mockFn = jest.fn();
mockFn(1, 2);
mockFn(3, 4);

// \u68C0\u67E5\u8C03\u7528
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith(1, 2);
expect(mockFn).toHaveBeenLastCalledWith(3, 4);
expect(mockFn).toHaveBeenNthCalledWith(1, 1, 2);

// \u68C0\u67E5\u8FD4\u56DE\u503C
mockFn.mockReturnValue('result');
expect(mockFn()).toBe('result');
`,paraId:73,tocIndex:37},{value:`// \u53EA\u8FD0\u884C\u8FD9\u4E2A\u6D4B\u8BD5
test.only('\u53EA\u8FD0\u884C\u8FD9\u4E2A\u6D4B\u8BD5', () => {
  expect(1 + 1).toBe(2);
});

// \u8DF3\u8FC7\u8FD9\u4E2A\u6D4B\u8BD5
test.skip('\u8DF3\u8FC7\u8FD9\u4E2A\u6D4B\u8BD5', () => {
  expect(1 + 1).toBe(2);
});

// describe \u4E5F\u652F\u6301 only \u548C skip
describe.only('\u53EA\u8FD0\u884C\u8FD9\u4E2A\u6D4B\u8BD5\u5957\u4EF6', () => {
  // ...
});
`,paraId:74,tocIndex:39},{value:`// \u5728\u6D4B\u8BD5\u4E2D\u6253\u5370\u8C03\u8BD5\u4FE1\u606F
test('\u8C03\u8BD5', () => {
  console.log('Debug info:', value);
  expect(value).toBe(expected);
});

// \u4F7F\u7528 debug \u5DE5\u5177
import { debug } from 'jest-preview';

test('\u53EF\u89C6\u5316\u8C03\u8BD5', () => {
  const { container } = render(<MyComponent />);
  debug(container); // \u5728\u6D4F\u89C8\u5668\u4E2D\u67E5\u770B DOM
});
`,paraId:75,tocIndex:40},{value:"\u6D4B\u8BD5\u547D\u540D\u6E05\u6670",paraId:76,tocIndex:41},{value:"\uFF1A\u4F7F\u7528\u63CF\u8FF0\u6027\u7684\u6D4B\u8BD5\u540D\u79F0\uFF0C\u6E05\u695A\u8BF4\u660E\u6D4B\u8BD5\u7684\u5185\u5BB9",paraId:76,tocIndex:41},{value:"\u4FDD\u6301\u6D4B\u8BD5\u72EC\u7ACB",paraId:76,tocIndex:41},{value:"\uFF1A\u6BCF\u4E2A\u6D4B\u8BD5\u5E94\u8BE5\u72EC\u7ACB\u8FD0\u884C\uFF0C\u4E0D\u4F9D\u8D56\u5176\u4ED6\u6D4B\u8BD5",paraId:76,tocIndex:41},{value:"\u4F7F\u7528 beforeEach/afterEach",paraId:76,tocIndex:41},{value:"\uFF1A\u5728\u6BCF\u4E2A\u6D4B\u8BD5\u524D\u540E\u6E05\u7406\u72B6\u6001",paraId:76,tocIndex:41},{value:"\u907F\u514D\u6D4B\u8BD5\u5B9E\u73B0\u7EC6\u8282",paraId:76,tocIndex:41},{value:"\uFF1A\u6D4B\u8BD5\u884C\u4E3A\u800C\u4E0D\u662F\u5B9E\u73B0",paraId:76,tocIndex:41},{value:"\u5408\u7406\u4F7F\u7528 Mock",paraId:76,tocIndex:41},{value:"\uFF1A\u53EA mock \u5FC5\u8981\u7684\u4F9D\u8D56",paraId:76,tocIndex:41},{value:"\u4FDD\u6301\u6D4B\u8BD5\u7B80\u5355",paraId:76,tocIndex:41},{value:"\uFF1A\u4E00\u4E2A\u6D4B\u8BD5\u53EA\u6D4B\u8BD5\u4E00\u4EF6\u4E8B",paraId:76,tocIndex:41},{value:"\u4F7F\u7528\u6709\u610F\u4E49\u7684\u65AD\u8A00\u6D88\u606F",paraId:76,tocIndex:41},{value:"\uFF1A\u5E2E\u52A9\u5FEB\u901F\u5B9A\u4F4D\u95EE\u9898",paraId:76,tocIndex:41},{value:"\u5B9A\u671F\u8FD0\u884C\u6D4B\u8BD5",paraId:76,tocIndex:41},{value:"\uFF1A\u96C6\u6210\u5230 CI/CD \u6D41\u7A0B\u4E2D",paraId:76,tocIndex:41},{value:"React Testing Library \u662F\u6D4B\u8BD5 React \u7EC4\u4EF6\u7684\u63A8\u8350\u5DE5\u5177\uFF0C\u5B83\u9F13\u52B1\u7F16\u5199\u66F4\u63A5\u8FD1\u7528\u6237\u884C\u4E3A\u7684\u6D4B\u8BD5\u3002",paraId:77,tocIndex:43},{value:`npm i -D @testing-library/react@latest @testing-library/jest-dom@latest @testing-library/user-event@latest
`,paraId:78,tocIndex:43},{value:`:::tip React 19 \u652F\u6301
\u6700\u65B0\u7248\u672C\u7684 React Testing Library \u5B8C\u5168\u652F\u6301 React 19 \u7684\u65B0\u7279\u6027\u3002
:::`,paraId:79,tocIndex:43},{value:"\u5728 ",paraId:80,tocIndex:44},{value:"jest-setup.ts",paraId:80,tocIndex:44},{value:" \u4E2D\u5BFC\u5165 jest-dom \u6269\u5C55\u5339\u914D\u5668\uFF1A",paraId:80,tocIndex:44},{value:`// jest-setup.ts
import '@testing-library/jest-dom';
`,paraId:81,tocIndex:44},{value:"\u5728 ",paraId:82,tocIndex:44},{value:"jest.config.js",paraId:82,tocIndex:44},{value:" \u4E2D\u914D\u7F6E\uFF1A",paraId:82,tocIndex:44},{value:`/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  // ...
};
`,paraId:83,tocIndex:44},{value:`import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Greeting } from './Greeting';

test('\u6E32\u67D3\u6B22\u8FCE\u4FE1\u606F', () => {
  render(<Greeting name="\u5F20\u4E09" />);

  // \u4F7F\u7528 screen \u67E5\u8BE2\u5143\u7D20
  expect(screen.getByText('\u4F60\u597D, \u5F20\u4E09!')).toBeInTheDocument();
});
`,paraId:84,tocIndex:46},{value:`// Greeting.tsx
interface GreetingProps {
  name: string;
}

export function Greeting({ name }: GreetingProps) {
  return <h1>\u4F60\u597D, {name}!</h1>;
}
`,paraId:85,tocIndex:47},{value:"React Testing Library \u63D0\u4F9B\u4E86\u591A\u79CD\u67E5\u8BE2\u65B9\u5F0F\uFF0C\u4F18\u5148\u7EA7\u4ECE\u9AD8\u5230\u4F4E\uFF1A",paraId:86,tocIndex:48},{value:"\u6309\u7167\u53EF\u8BBF\u95EE\u6027\u89D2\u8272\u67E5\u8BE2\uFF0C\u6700\u63A5\u8FD1\u7528\u6237\u4F53\u9A8C\uFF1A",paraId:87,tocIndex:49},{value:`test('\u4F7F\u7528 role \u67E5\u8BE2', () => {
  render(
    <div>
      <button>\u63D0\u4EA4</button>
      <input type="text" />
      <h1>\u6807\u9898</h1>
    </div>
  );

  // \u67E5\u8BE2\u6309\u94AE
  const button = screen.getByRole('button', { name: '\u63D0\u4EA4' });

  // \u67E5\u8BE2\u8F93\u5165\u6846
  const input = screen.getByRole('textbox');

  // \u67E5\u8BE2\u6807\u9898
  const heading = screen.getByRole('heading', { level: 1 });
});
`,paraId:88,tocIndex:49},{value:"\u901A\u8FC7 label \u6807\u7B7E\u67E5\u8BE2\u8868\u5355\u5143\u7D20\uFF1A",paraId:89,tocIndex:50},{value:`test('\u901A\u8FC7 label \u67E5\u8BE2', () => {
  render(
    <div>
      <label htmlFor="username">\u7528\u6237\u540D</label>
      <input id="username" />
    </div>
  );

  const input = screen.getByLabelText('\u7528\u6237\u540D');
  expect(input).toBeInTheDocument();
});
`,paraId:90,tocIndex:50},{value:"\u901A\u8FC7\u6587\u672C\u5185\u5BB9\u67E5\u8BE2\uFF1A",paraId:91,tocIndex:51},{value:`test('\u901A\u8FC7\u6587\u672C\u67E5\u8BE2', () => {
  render(<button>\u70B9\u51FB\u6211</button>);

  // \u5B8C\u5168\u5339\u914D
  screen.getByText('\u70B9\u51FB\u6211');

  // \u6B63\u5219\u8868\u8FBE\u5F0F
  screen.getByText(/\u70B9\u51FB/i);
});
`,paraId:92,tocIndex:51},{value:"\u6700\u540E\u7684\u9009\u62E9\uFF0C\u7528\u4E8E\u96BE\u4EE5\u901A\u8FC7\u5176\u4ED6\u65B9\u5F0F\u67E5\u8BE2\u7684\u5143\u7D20\uFF1A",paraId:93,tocIndex:52},{value:`test('\u901A\u8FC7 testId \u67E5\u8BE2', () => {
  render(<div data-testid="custom-element">\u5185\u5BB9</div>);

  const element = screen.getByTestId('custom-element');
  expect(element).toHaveTextContent('\u5185\u5BB9');
});
`,paraId:94,tocIndex:52},{value:"\u6BCF\u79CD\u67E5\u8BE2\u90FD\u6709\u4E09\u4E2A\u53D8\u4F53\uFF1A",paraId:95,tocIndex:53},{value:`// getBy\uFF1A\u627E\u4E0D\u5230\u5143\u7D20\u65F6\u629B\u51FA\u9519\u8BEF
const button = screen.getByRole('button');

// queryBy\uFF1A\u627E\u4E0D\u5230\u5143\u7D20\u65F6\u8FD4\u56DE null\uFF08\u7528\u4E8E\u65AD\u8A00\u5143\u7D20\u4E0D\u5B58\u5728\uFF09
const button = screen.queryByRole('button');
expect(button).not.toBeInTheDocument();

// findBy\uFF1A\u5F02\u6B65\u67E5\u8BE2\uFF0C\u8FD4\u56DE Promise\uFF08\u7528\u4E8E\u7B49\u5F85\u5143\u7D20\u51FA\u73B0\uFF09
const button = await screen.findByRole('button');
`,paraId:96,tocIndex:53},{value:"\u4F7F\u7528 ",paraId:97,tocIndex:54},{value:"@testing-library/user-event",paraId:97,tocIndex:54},{value:" \u6A21\u62DF\u7528\u6237\u64CD\u4F5C\uFF08\u63A8\u8350\uFF09\uFF1A",paraId:97,tocIndex:54},{value:`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('\u7528\u6237\u4EA4\u4E92\u6D4B\u8BD5', async () => {
  const user = userEvent.setup();

  render(<LoginForm />);

  // \u5728\u8F93\u5165\u6846\u4E2D\u8F93\u5165
  await user.type(
    screen.getByLabelText('\u7528\u6237\u540D'),
    '\u5F20\u4E09'
  );

  // \u70B9\u51FB\u6309\u94AE
  await user.click(screen.getByRole('button', { name: '\u767B\u5F55' }));

  // \u53CC\u51FB
  await user.dblClick(screen.getByRole('button'));

  // \u60AC\u505C
  await user.hover(screen.getByText('\u63D0\u793A'));

  // \u9009\u62E9\u4E0B\u62C9\u9009\u9879
  await user.selectOptions(
    screen.getByRole('combobox'),
    '\u9009\u98791'
  );

  // \u4E0A\u4F20\u6587\u4EF6
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  await user.upload(screen.getByLabelText('\u4E0A\u4F20\u6587\u4EF6'), file);
});
`,paraId:98,tocIndex:54},{value:`test('\u7B49\u5F85\u5143\u7D20\u51FA\u73B0', async () => {
  render(<AsyncComponent />);

  // \u70B9\u51FB\u52A0\u8F7D\u6309\u94AE
  const user = userEvent.setup();
  await user.click(screen.getByText('\u52A0\u8F7D\u6570\u636E'));

  // \u7B49\u5F85\u6570\u636E\u52A0\u8F7D\u5B8C\u6210
  const data = await screen.findByText('\u6570\u636E\u5DF2\u52A0\u8F7D');
  expect(data).toBeInTheDocument();
});
`,paraId:99,tocIndex:56},{value:`import { render, screen, waitFor } from '@testing-library/react';

test('\u7B49\u5F85\u5F02\u6B65\u64CD\u4F5C', async () => {
  const { rerender } = render(<Counter />);

  await waitFor(() => {
    expect(screen.getByText('\u8BA1\u6570: 0')).toBeInTheDocument();
  });

  // \u7B49\u5F85\u7279\u5B9A\u6761\u4EF6
  await waitFor(
    () => {
      expect(screen.getByText('\u52A0\u8F7D\u5B8C\u6210')).toBeInTheDocument();
    },
    { timeout: 3000 } // \u81EA\u5B9A\u4E49\u8D85\u65F6\u65F6\u95F4
  );
});
`,paraId:100,tocIndex:57},{value:`test('\u63D0\u4EA4\u8868\u5355', async () => {
  const handleSubmit = jest.fn();
  const user = userEvent.setup();

  render(<MyForm onSubmit={handleSubmit} />);

  // \u586B\u5199\u8868\u5355
  await user.type(screen.getByLabelText('\u59D3\u540D'), '\u5F20\u4E09');
  await user.type(screen.getByLabelText('\u90AE\u7BB1'), 'zhang@example.com');

  // \u63D0\u4EA4\u8868\u5355
  await user.click(screen.getByRole('button', { name: '\u63D0\u4EA4' }));

  // \u7B49\u5F85\u63D0\u4EA4\u5B8C\u6210
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({
      name: '\u5F20\u4E09',
      email: 'zhang@example.com',
    });
  });
});
`,paraId:101,tocIndex:58},{value:`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function TestComponent() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>\u8BA1\u6570: {count}</p>
      <button onClick={() => setCount(count + 1)}>\u589E\u52A0</button>
    </div>
  );
}

test('\u6D4B\u8BD5 useState hook', async () => {
  const user = userEvent.setup();
  render(<TestComponent />);

  expect(screen.getByText('\u8BA1\u6570: 0')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: '\u589E\u52A0' }));

  expect(screen.getByText('\u8BA1\u6570: 1')).toBeInTheDocument();
});
`,paraId:102,tocIndex:60},{value:`// useCounter.ts
export function useCounter(initialValue = 0) {
  const [count, setCount] = React.useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
`,paraId:103,tocIndex:61},{value:`// useCounter.test.tsx
function TestHarness({ initialValue = 0 }: { initialValue?: number }) {
  const { count, increment, decrement, reset } = useCounter(initialValue);

  return (
    <div>
      <p>\u8BA1\u6570: {count}</p>
      <button onClick={increment}>\u589E\u52A0</button>
      <button onClick={decrement}>\u51CF\u5C11</button>
      <button onClick={reset}>\u91CD\u7F6E</button>
    </div>
  );
}

test('useCounter hook', async () => {
  const user = userEvent.setup();
  render(<TestHarness initialValue={5} />);

  expect(screen.getByText('\u8BA1\u6570: 5')).toBeInTheDocument();

  await user.click(screen.getByText('\u589E\u52A0'));
  expect(screen.getByText('\u8BA1\u6570: 6')).toBeInTheDocument();

  await user.click(screen.getByText('\u91CD\u7F6E'));
  expect(screen.getByText('\u8BA1\u6570: 5')).toBeInTheDocument();
});
`,paraId:104,tocIndex:61},{value:`// ThemeContext.tsx
const ThemeContext = React.createContext({ theme: 'light' });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
`,paraId:105,tocIndex:62},{value:`// ThemeButton.test.tsx
function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      \u5F53\u524D\u4E3B\u9898: {theme}
    </button>
  );
}

test('\u6D4B\u8BD5 Context', async () => {
  const user = userEvent.setup();

  render(
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>
  );

  expect(screen.getByText(/\u5F53\u524D\u4E3B\u9898: light/)).toBeInTheDocument();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText(/\u5F53\u524D\u4E3B\u9898: dark/)).toBeInTheDocument();
});
`,paraId:106,tocIndex:62},{value:"\u521B\u5EFA\u4E00\u4E2A\u81EA\u5B9A\u4E49 render \u51FD\u6570\u6765\u5305\u88C5\u5E38\u7528\u7684 Provider\uFF1A",paraId:107,tocIndex:63},{value:`// test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}

export function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// \u91CD\u65B0\u5BFC\u51FA\u6240\u6709\u5185\u5BB9
export * from '@testing-library/react';
export { customRender as render };
`,paraId:108,tocIndex:63},{value:"\u4F7F\u7528\u81EA\u5B9A\u4E49 render\uFF1A",paraId:109,tocIndex:63},{value:`import { render, screen } from './test-utils';

test('\u4F7F\u7528\u81EA\u5B9A\u4E49 render', () => {
  render(<MyComponent />);
  // \u7EC4\u4EF6\u5DF2\u7ECF\u88AB providers \u5305\u88C5
});
`,paraId:110,tocIndex:63},{value:`// api.ts
export async function fetchUser(id: string) {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}
`,paraId:111,tocIndex:65},{value:`// UserProfile.test.tsx
import { fetchUser } from './api';

jest.mock('./api');
const mockFetchUser = fetchUser as jest.MockedFunction<typeof fetchUser>;

test('\u52A0\u8F7D\u7528\u6237\u6570\u636E', async () => {
  mockFetchUser.mockResolvedValue({
    id: '1',
    name: '\u5F20\u4E09',
    email: 'zhang@example.com',
  });

  render(<UserProfile userId="1" />);

  expect(screen.getByText('\u52A0\u8F7D\u4E2D...')).toBeInTheDocument();

  const userName = await screen.findByText('\u5F20\u4E09');
  expect(userName).toBeInTheDocument();
  expect(screen.getByText('zhang@example.com')).toBeInTheDocument();
});
`,paraId:112,tocIndex:65},{value:`npm i -D msw@latest
`,paraId:113,tocIndex:66},{value:`// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: '\u5F20\u4E09',
      email: 'zhang@example.com',
    });
  }),

  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json();

    if (username === 'admin' && password === 'password') {
      return HttpResponse.json({ token: 'fake-token' });
    }

    return new HttpResponse(null, { status: 401 });
  }),
];
`,paraId:114,tocIndex:66},{value:`// mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
`,paraId:115,tocIndex:66},{value:`// jest-setup.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// \u5728\u6240\u6709\u6D4B\u8BD5\u524D\u542F\u52A8 MSW server
beforeAll(() => server.listen());

// \u6BCF\u4E2A\u6D4B\u8BD5\u540E\u91CD\u7F6E handlers
afterEach(() => server.resetHandlers());

// \u6240\u6709\u6D4B\u8BD5\u540E\u5173\u95ED server
afterAll(() => server.close());
`,paraId:116,tocIndex:66},{value:`// UserProfile.test.tsx
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';

test('\u5904\u7406 API \u9519\u8BEF', async () => {
  // \u8986\u76D6\u9ED8\u8BA4 handler
  server.use(
    http.get('/api/users/:id', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<UserProfile userId="1" />);

  const error = await screen.findByText('\u52A0\u8F7D\u5931\u8D25');
  expect(error).toBeInTheDocument();
});
`,paraId:117,tocIndex:66},{value:"\u4F18\u5148\u4F7F\u7528 getByRole",paraId:118,tocIndex:67},{value:"\uFF1A\u8FD9\u662F\u6700\u63A5\u8FD1\u7528\u6237\u4F53\u9A8C\u7684\u67E5\u8BE2\u65B9\u5F0F",paraId:118,tocIndex:67},{value:"\u907F\u514D\u4F7F\u7528 container.querySelector",paraId:118,tocIndex:67},{value:"\uFF1A\u8FD9\u662F\u5B9E\u73B0\u7EC6\u8282",paraId:118,tocIndex:67},{value:"\u6D4B\u8BD5\u7528\u6237\u884C\u4E3A\u800C\u975E\u5B9E\u73B0",paraId:118,tocIndex:67},{value:"\uFF1A\u4E0D\u8981\u6D4B\u8BD5\u7EC4\u4EF6\u5185\u90E8\u72B6\u6001",paraId:118,tocIndex:67},{value:"\u4F7F\u7528 userEvent \u800C\u975E fireEvent",paraId:118,tocIndex:67},{value:"\uFF1AuserEvent \u66F4\u63A5\u8FD1\u771F\u5B9E\u7528\u6237\u884C\u4E3A",paraId:118,tocIndex:67},{value:"\u7B49\u5F85\u5F02\u6B65\u64CD\u4F5C",paraId:118,tocIndex:67},{value:"\uFF1A\u4F7F\u7528 findBy \u6216 waitFor",paraId:118,tocIndex:67},{value:"\u907F\u514D\u4F7F\u7528 testId",paraId:118,tocIndex:67},{value:"\uFF1A\u9664\u975E\u6CA1\u6709\u5176\u4ED6\u65B9\u5F0F\u67E5\u8BE2\u5143\u7D20",paraId:118,tocIndex:67},{value:"\u6D4B\u8BD5\u53EF\u8BBF\u95EE\u6027",paraId:118,tocIndex:67},{value:"\uFF1A\u4F7F\u7528 role \u67E5\u8BE2\u53EF\u4EE5\u540C\u65F6\u9A8C\u8BC1\u53EF\u8BBF\u95EE\u6027",paraId:118,tocIndex:67},{value:`// \u5143\u7D20\u662F\u5426\u5728\u6587\u6863\u4E2D
expect(element).toBeInTheDocument();
expect(element).not.toBeInTheDocument();

// \u5143\u7D20\u662F\u5426\u53EF\u89C1
expect(element).toBeVisible();
expect(element).not.toBeVisible();

// \u6587\u672C\u5185\u5BB9
expect(element).toHaveTextContent('\u6587\u672C');
expect(element).toHaveTextContent(/\u6B63\u5219/);

// \u8868\u5355\u5143\u7D20
expect(input).toHaveValue('value');
expect(checkbox).toBeChecked();
expect(button).toBeDisabled();
expect(button).toBeEnabled();

// \u5C5E\u6027
expect(element).toHaveAttribute('href', '/path');
expect(element).toHaveClass('className');

// \u6837\u5F0F
expect(element).toHaveStyle('display: none');
expect(element).toHaveStyle({
  display: 'none',
  color: 'red',
});

// \u7126\u70B9
expect(input).toHaveFocus();
`,paraId:119,tocIndex:68},{value:"Jest \u5B98\u65B9\u6587\u6863",paraId:120,tocIndex:69},{value:"ts-jest \u6587\u6863",paraId:120,tocIndex:69},{value:"Testing Library",paraId:120,tocIndex:69},{value:"React Testing Library",paraId:120,tocIndex:69},{value:"user-event",paraId:120,tocIndex:69},{value:"jest-dom",paraId:120,tocIndex:69},{value:"MSW (Mock Service Worker)",paraId:120,tocIndex:69},{value:"Jest Extended",paraId:120,tocIndex:69}]}}]);
