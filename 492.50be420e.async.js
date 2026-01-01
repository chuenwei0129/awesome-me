"use strict";(self.webpackChunk_c6i_ui=self.webpackChunk_c6i_ui||[]).push([[492],{492:function(d,e,a){a.r(e),a.d(e,{texts:function(){return n}});const n=[{value:"\u4E0B\u9762\u6211\u4EEC",paraId:0},{value:"\u523B\u610F\u201C\u62AC\u9AD8\u4E00\u5C42\u62BD\u8C61\u201D",paraId:0},{value:"\uFF0C\u4E0D\u518D\u9010\u4E2A\u8BB2 Hook\uFF0C\u800C\u662F\u4ECE ",paraId:0},{value:"\u4EE3\u6570\u6548\u5E94\uFF08Algebraic Effects\uFF09",paraId:0},{value:" \u7684\u89C6\u89D2\uFF0C\u7EDF\u4E00\u89E3\u91CA ",paraId:0},{value:"Hooks \u5230\u5E95\u5728\u89E3\u51B3\u4EC0\u4E48\u95EE\u9898\u3001React \u4E3A\u4EC0\u4E48\u8981\u8FD9\u6837\u8BBE\u8BA1\u3001\u4EE5\u53CA\u4F60\u5728\u5DE5\u7A0B\u4E2D\u5E94\u8BE5\u5982\u4F55\u201C\u987A\u7740\u5B83\u7684\u529B\u201D\u5199\u4EE3\u7801",paraId:0},{value:"\u3002",paraId:0},{value:"\u6211\u4F1A\u6309\u8FD9\u4E2A\u7ED3\u6784\u6765\uFF1A",paraId:1},{value:"\u4E3A\u4EC0\u4E48\u8981\u5F15\u5165\u201C\u4EE3\u6570\u6548\u5E94\u201D\u8FD9\u4E2A\u89C6\u89D2",paraId:2},{value:"\u4EC0\u4E48\u662F\u4EE3\u6570\u6548\u5E94\uFF08\u7528\u524D\u7AEF\u80FD\u7406\u89E3\u7684\u65B9\u5F0F\uFF09",paraId:2},{value:"Hooks \u5982\u4F55\u6620\u5C04\u5230\u300C\u6548\u5E94\u58F0\u660E / \u6548\u5E94\u5904\u7406\u300D",paraId:2},{value:"\u4E00\u4E2A\u5B8C\u6574\u7684 Hooks \u5FC3\u667A\u6A21\u578B",paraId:2},{value:"\u5BF9\u65E5\u5E38\u5DE5\u7A0B\u5B9E\u8DF5\u7684\u76F4\u63A5\u6307\u5BFC\u539F\u5219",paraId:2},{value:"\u5982\u679C\u4F60\u53EA\u628A Hooks \u5F53\u6210 API\uFF0C\u4F60\u4F1A\u957F\u671F\u56F0\u60D1\u8FD9\u4E9B\u95EE\u9898\uFF1A",paraId:3,tocIndex:0},{value:"\u4E3A\u4EC0\u4E48 Hook \u4E0D\u80FD\u5199\u5728 if \u91CC\uFF1F",paraId:4,tocIndex:0},{value:"\u4E3A\u4EC0\u4E48 useEffect \u4E0D\u662F\u751F\u547D\u5468\u671F\uFF1F",paraId:4,tocIndex:0},{value:"\u4E3A\u4EC0\u4E48 state \u66F4\u65B0\u770B\u8D77\u6765\u50CF\u201C\u5EF6\u8FDF\u6267\u884C\u201D\uFF1F",paraId:4,tocIndex:0},{value:"\u4E3A\u4EC0\u4E48 React \u80FD\u968F\u65F6\u91CD\u6E32\u67D3\u3001\u6253\u65AD\u3001\u91CD\u6765\uFF1F",paraId:4,tocIndex:0},{value:`\u8FD9\u4E9B\u95EE\u9898\uFF0C\u7528\u300C\u7EC4\u4EF6 = \u51FD\u6570\u300D\u662F\u89E3\u91CA\u4E0D\u5B8C\u7684\u3002
`,paraId:5,tocIndex:0},{value:"\u771F\u6B63\u5408\u7406\u7684\u89E3\u91CA\u6A21\u578B\u662F\uFF1A",paraId:5,tocIndex:0},{value:"\u51FD\u6570\u7EC4\u4EF6\u4E0D\u662F\u666E\u901A\u51FD\u6570\uFF0C\u800C\u662F\u4E00\u4E2A\u201C\u58F0\u660E\u6548\u5E94\u7684\u7A0B\u5E8F\u201D\u3002",paraId:6,tocIndex:0},{value:"Hooks \u662F ",paraId:7,tocIndex:0},{value:"\u6548\u5E94\u58F0\u660E\u8BED\u6CD5",paraId:7,tocIndex:0},{value:"\uFF0CReact \u662F ",paraId:7,tocIndex:0},{value:"\u6548\u5E94\u8C03\u5EA6\u5668\uFF08handler / runtime\uFF09",paraId:7,tocIndex:0},{value:"\u3002",paraId:7,tocIndex:0},{value:`function foo() {
  const x = getState(); // \u8BFB\u72B6\u6001
  const y = fetchData(); // I/O
  log(x, y); // \u526F\u4F5C\u7528
}
`,paraId:8,tocIndex:2},{value:"\u5728\u666E\u901A JS \u91CC\uFF1A",paraId:9,tocIndex:2},{value:"getState / fetchData / log",paraId:10,tocIndex:2},{value:" ",paraId:10,tocIndex:2},{value:"\u7ACB\u523B\u6267\u884C",paraId:10,tocIndex:2},{value:"\u63A7\u5236\u6743\u5728\u51FD\u6570\u624B\u91CC",paraId:10,tocIndex:2},{value:"\u628A\u4E8B\u60C5\u62C6\u6210\u4E24\u90E8\u5206\uFF1A",paraId:11,tocIndex:3},{value:"\u6211\u9700\u8981\u505A\u4EC0\u4E48\uFF08\u58F0\u660E\uFF09",paraId:12,tocIndex:3},{value:"\u4EC0\u4E48\u65F6\u5019\u3001\u600E\u4E48\u505A\uFF08\u5904\u7406\uFF09",paraId:12,tocIndex:3},{value:`perform(GetState);
perform(FetchData);
`,paraId:13,tocIndex:3},{value:"\u51FD\u6570\u53EA ",paraId:14,tocIndex:3},{value:"\u58F0\u660E\u201C\u6211\u8981\u4E00\u4E2A\u72B6\u6001\u201D",paraId:14,tocIndex:3},{value:"runtime \u51B3\u5B9A\uFF1A",paraId:15,tocIndex:3},{value:"\u73B0\u5728\u7ED9\u5417\uFF1F",paraId:16,tocIndex:3},{value:"\u7A0D\u540E\u7ED9\u5417\uFF1F",paraId:16,tocIndex:3},{value:"\u91CD\u6765\u4E00\u904D\uFF1F",paraId:16,tocIndex:3},{value:"\u4E22\u5F03\u8FD9\u6B21\u6267\u884C\uFF1F",paraId:16,tocIndex:3},{value:`\u7EC4\u4EF6\u51FD\u6570 = \u6548\u5E94\u63CF\u8FF0\u5668
React = \u6548\u5E94\u8C03\u5EA6\u5668`,paraId:17,tocIndex:4},{value:"\u6211\u4EEC\u628A\u5E38\u7528 Hooks \u5BF9\u5E94\u5230\u6548\u5E94\u7C7B\u578B\uFF1A",paraId:18,tocIndex:5},{value:`const [count, setCount] = useState(0);
`,paraId:19,tocIndex:6},{value:"\u7B49\u4EF7\u4E8E\uFF1A",paraId:20,tocIndex:6},{value:`perform(ReadState, key = 0)
perform(WriteState, newValue)
`,paraId:21,tocIndex:6},{value:"\u5173\u952E\u70B9\uFF1A",paraId:22,tocIndex:6},{value:"state ",paraId:23,tocIndex:6},{value:"\u4E0D\u5728\u51FD\u6570\u91CC",paraId:23,tocIndex:6},{value:"\u51FD\u6570\u53EA\u662F\u201C\u8BF7\u6C42\u201D\u4E00\u4E2A\u72B6\u6001\u69FD\u4F4D",paraId:23,tocIndex:6},{value:`if (cond) {
  useState();
}
`,paraId:24,tocIndex:7},{value:"\u56E0\u4E3A\uFF1A",paraId:25,tocIndex:7},{value:"\u6548\u5E94\u7684\u58F0\u660E\u987A\u5E8F = \u7A0B\u5E8F\u7ED3\u6784\u672C\u8EAB",paraId:26,tocIndex:7},{value:"React \u9760 ",paraId:27,tocIndex:7},{value:"\u8C03\u7528\u987A\u5E8F",paraId:27,tocIndex:7},{value:" \u7ED9\u72B6\u6001\u5206\u914D\u201C\u69FD\u4F4D\u201D\u3002",paraId:27,tocIndex:7},{value:`useEffect(() => {
  subscribe();
  return unsubscribe;
}, [dep]);
`,paraId:28,tocIndex:8},{value:"\u7B49\u4EF7\u4E8E\uFF1A",paraId:29,tocIndex:8},{value:`perform(Effect, when = commit, deps)
`,paraId:30,tocIndex:8},{value:"effect ",paraId:31,tocIndex:8},{value:"\u4E0D\u662F\u51FD\u6570\u6267\u884C\u7684\u4E00\u90E8\u5206",paraId:31,tocIndex:8},{value:"\u5B83\u662F\uFF1A",paraId:32,tocIndex:8},{value:"\u201C\u5F53\u8FD9\u4E9B\u4F9D\u8D56\u6210\u7ACB\u65F6\uFF0C\u8BF7\u5728\u5408\u9002\u7684\u65F6\u5019\u6267\u884C\u201D",paraId:33,tocIndex:8},{value:"\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48\uFF1A",paraId:34,tocIndex:8},{value:"render \u53EF\u4EE5\u88AB\u4E22\u5F03",paraId:35,tocIndex:8},{value:"effect \u4E0D\u4F1A\u5728 render \u9636\u6BB5\u6267\u884C",paraId:35,tocIndex:8},{value:`perform(LayoutEffect, beforePaint);
`,paraId:36,tocIndex:9},{value:"\u533A\u522B\u53EA\u6709\u4E00\u4E2A\uFF1A",paraId:37,tocIndex:9},{value:"\u6267\u884C\u65F6\u673A\u4E0D\u540C",paraId:38,tocIndex:9},{value:"\u672C\u8D28\u4ECD\u662F\u201C\u58F0\u660E\u4E00\u4E2A\u6548\u5E94\u201D",paraId:38,tocIndex:9},{value:`dispatch(action);
`,paraId:39,tocIndex:10},{value:"\u4E0D\u662F\u201C\u8C03\u7528 reducer\u201D\uFF0C\u800C\u662F\uFF1A",paraId:40,tocIndex:10},{value:`perform(Dispatch, action)
`,paraId:41,tocIndex:10},{value:"React \u51B3\u5B9A\uFF1A",paraId:42,tocIndex:10},{value:"\u4EC0\u4E48\u65F6\u5019\u5408\u5E76",paraId:43,tocIndex:10},{value:"\u662F\u5426\u4E2D\u65AD",paraId:43,tocIndex:10},{value:"\u662F\u5426\u56DE\u653E",paraId:43,tocIndex:10},{value:`const ref = useRef(x);
`,paraId:44,tocIndex:11},{value:"\u7B49\u4EF7\u4E8E\uFF1A",paraId:45,tocIndex:11},{value:`perform(AllocateCell, mutable = true, no-render)
`,paraId:46,tocIndex:11},{value:"\u8FD9\u5C31\u662F\u4E3A\u4EC0\u4E48\uFF1A",paraId:47,tocIndex:11},{value:"\u6539 ",paraId:48,tocIndex:11},{value:"ref.current",paraId:48,tocIndex:11},{value:" \u4E0D\u89E6\u53D1\u6E32\u67D3",paraId:48,tocIndex:11},{value:"ref \u8DE8 render \u4FDD\u6301",paraId:48,tocIndex:11},{value:`const theme = useContext(ThemeContext);
`,paraId:49,tocIndex:12},{value:"\u7B49\u4EF7\u4E8E\uFF1A",paraId:50,tocIndex:12},{value:`perform(ReadContext, key = ThemeContext)
`,paraId:51,tocIndex:12},{value:"React \u51B3\u5B9A\uFF1A",paraId:52,tocIndex:12},{value:"\u8C01\u4F9D\u8D56\u5B83",paraId:53,tocIndex:12},{value:"\u4EC0\u4E48\u65F6\u5019\u9700\u8981\u91CD\u6E32\u67D3",paraId:53,tocIndex:12},{value:"\u800C\u662F\uFF1A",paraId:54,tocIndex:14},{value:"\u7EC4\u4EF6\u51FD\u6570 = \u53EF\u88AB\u591A\u6B21\u6267\u884C\u3001\u56DE\u653E\u3001\u4E22\u5F03\u7684\u201C\u63CF\u8FF0\u811A\u672C\u201D",paraId:55,tocIndex:14},{value:"React \u53EF\u4EE5\uFF1A",paraId:56,tocIndex:14},{value:"\u6267\u884C\u4E00\u534A \u2192 \u4E22\u5F03",paraId:57,tocIndex:14},{value:"\u6267\u884C\u4E24\u6B21 \u2192 \u53D6\u6700\u540E\u4E00\u6B21",paraId:57,tocIndex:14},{value:"\u5E76\u53D1\u6267\u884C\u591A\u4E2A\u7248\u672C",paraId:57,tocIndex:14},{value:"\u9636\u6BB5",paraId:58,tocIndex:15},{value:"\u672C\u8D28",paraId:58,tocIndex:15},{value:"render",paraId:58,tocIndex:15},{value:"\u8BA1\u7B97 UI + \u58F0\u660E\u6548\u5E94",paraId:58,tocIndex:15},{value:"commit",paraId:58,tocIndex:15},{value:"\u5E94\u7528 DOM + \u6267\u884C effect",paraId:58,tocIndex:15},{value:"\u8FD9\u5C31\u662F\u4E3A\u4EC0\u4E48\uFF1A",paraId:59,tocIndex:15},{value:"render \u5FC5\u987B\u662F\u7EAF\u7684",paraId:60,tocIndex:15},{value:"\u526F\u4F5C\u7528\u5FC5\u987B\u8FDB effect",paraId:60,tocIndex:15},{value:"Hooks \u7684\u89C4\u5219\uFF0C\u672C\u8D28\u4E0A\u53EA\u6709\u4E00\u53E5\u8BDD\uFF1A",paraId:61,tocIndex:16},{value:"\u4E0D\u8981\u8BA9\u6548\u5E94\u58F0\u660E\u7684\u7ED3\u6784\u968F\u6267\u884C\u8DEF\u5F84\u53D8\u5316",paraId:62,tocIndex:16},{value:"\u8FD9\u5C31\u662F\uFF1A",paraId:63,tocIndex:16},{value:"\u4E0D\u80FD\u5199\u5728 if",paraId:64,tocIndex:16},{value:"\u4E0D\u80FD\u5199\u5728\u5FAA\u73AF",paraId:64,tocIndex:16},{value:"\u4E0D\u80FD\u5199\u5728\u666E\u901A\u51FD\u6570\u91CC",paraId:64,tocIndex:16},{value:"\u4E0D\u8981",paraId:65,tocIndex:18},{value:"\u5728 render \u91CC\u505A\u8FD9\u4E9B\u4E8B\uFF1A",paraId:65,tocIndex:18},{value:"\u8BF7\u6C42",paraId:66,tocIndex:18},{value:"\u65E5\u5FD7",paraId:66,tocIndex:18},{value:"\u8BA2\u9605",paraId:66,tocIndex:18},{value:"\u968F\u673A\u6570",paraId:66,tocIndex:18},{value:"\u65F6\u95F4\u8BFB\u53D6",paraId:66,tocIndex:18},{value:`setState(x);
`,paraId:67,tocIndex:19},{value:"\u4E0D\u662F\uFF1A",paraId:68,tocIndex:19},{value:"\u201C\u73B0\u5728\u6539\u6210 x\u201D",paraId:69,tocIndex:19},{value:"\u800C\u662F\uFF1A",paraId:70,tocIndex:19},{value:"\u201C\u6211\u58F0\u660E\u4E00\u6B21\u72B6\u6001\u66F4\u65B0\u8BF7\u6C42\u201D",paraId:71,tocIndex:19},{value:"React \u53EF\u80FD\uFF1A",paraId:72,tocIndex:19},{value:"\u5408\u5E76",paraId:73,tocIndex:19},{value:"\u5EF6\u8FDF",paraId:73,tocIndex:19},{value:"\u56DE\u6EDA",paraId:73,tocIndex:19},{value:"\u91CD\u7B97",paraId:73,tocIndex:19},{value:"\u9519\u8BEF\u5FC3\u667A\uFF1A",paraId:74,tocIndex:20},{value:"componentDidMount \u7684\u66FF\u4EE3\u54C1",paraId:75,tocIndex:20},{value:"\u6B63\u786E\u5FC3\u667A\uFF1A",paraId:76,tocIndex:20},{value:"\u5F53\u4F9D\u8D56\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u6211\u5E0C\u671B\u8FD9\u4E2A\u6548\u5E94\u6210\u7ACB",paraId:77,tocIndex:20},{value:"useMemo / useCallback",paraId:78,tocIndex:21},{value:"\u672C\u8D28\u662F\uFF1A",paraId:79,tocIndex:21},{value:"\u8BA9\u201C\u58F0\u660E\u7ED3\u6784\u201D\u5728\u591A\u6B21 render \u4E2D\u4FDD\u6301\u7A33\u5B9A",paraId:80,tocIndex:21},{value:`React Hooks \u7684\u672C\u8D28\u4E0D\u662F\u201C\u51FD\u6570 API\u201D\uFF0C
\u800C\u662F\u4E00\u5957\u300C\u58F0\u660E\u5F0F\u526F\u4F5C\u7528 + \u53EF\u4E2D\u65AD\u6267\u884C\u6A21\u578B\u300D`,paraId:81,tocIndex:22},{value:"\u4F60\u5199\u7684\u4E0D\u662F\uFF1A",paraId:82,tocIndex:22},{value:"\u4E00\u6B21\u6027\u903B\u8F91",paraId:83,tocIndex:22},{value:"\u547D\u4EE4\u5F0F\u6D41\u7A0B",paraId:83,tocIndex:22},{value:"\u800C\u662F\uFF1A",paraId:84,tocIndex:22},{value:"\u4E00\u4E2A\u53EF\u88AB\u8C03\u5EA6\u3001\u56DE\u653E\u3001\u62C6\u89E3\u7684\u7A0B\u5E8F",paraId:85,tocIndex:22},{value:"\u5982\u679C\u4F60\u613F\u610F\uFF0C\u4E0B\u4E00\u6B65\u6211\u53EF\u4EE5\u7EE7\u7EED\u5F80\u4E0A\u8D70\u4E09\u6761\u8DEF\u7EBF\u4E4B\u4E00\uFF1A",paraId:86,tocIndex:22},{value:"\u628A\u8FD9\u4E2A\u6A21\u578B\u843D\u56DE\u771F\u5B9E\u4E1A\u52A1\u4EE3\u7801",paraId:87,tocIndex:22},{value:"\uFF08\u4E3A\u4EC0\u4E48\u4F60\u7684 effect \u603B\u662F\u5199\u9519\uFF09",paraId:87,tocIndex:22},{value:"\u628A Hooks \u5FC3\u667A\u6A21\u578B\u6620\u5C04\u5230 React Fiber / Concurrent",paraId:87,tocIndex:22},{value:"\u89E3\u91CA\u4E3A\u4EC0\u4E48 Hooks \u975E\u5E38\u9002\u5408\u8BBE\u8BA1\u7CFB\u7EDF / \u7EC4\u4EF6\u5E93\uFF08\u4F60\u6B63\u5728\u505A\u7684\u4E8B\u60C5\uFF09",paraId:87,tocIndex:22},{value:"\u4F60\u9009\u54EA\u4E00\u6761\uFF0C\u6211\u5C31\u7EE7\u7EED\u5F80\u4E0A\u63A8\u4E00\u5C42\u3002",paraId:88,tocIndex:22},{value:"\u597D\u3002\u6211\u6309\u4F60\u7ED9\u7684\u987A\u5E8F\uFF0C",paraId:89,tocIndex:22},{value:"\u5148\u628A\u62BD\u8C61\u7EE7\u7EED\u201C\u62AC\u9AD8\u201D\u5230 React Fiber / Concurrent\uFF0C\u518D\u843D\u5230\u8BBE\u8BA1\u7CFB\u7EDF\uFF0C\u6700\u540E\u518D\u56DE\u5230\u771F\u5B9E\u4E1A\u52A1\u4EE3\u7801",paraId:89,tocIndex:22},{value:"\u3002\u4E09\u6BB5\u4E4B\u95F4\u662F",paraId:89,tocIndex:22},{value:"\u540C\u4E00\u5957\u5FC3\u667A\u6A21\u578B\u7684\u9010\u7EA7\u843D\u5730",paraId:89,tocIndex:22},{value:"\uFF0C\u4E0D\u662F\u4E09\u5957\u89E3\u91CA\u3002",paraId:89,tocIndex:22},{value:"\u8FD9\u4E00\u5C42\u8981\u89E3\u51B3\u7684\u95EE\u9898\u662F\uFF1A",paraId:90,tocIndex:23},{value:"\u65E2\u7136 Hooks \u662F\u201C\u6548\u5E94\u58F0\u660E\u201D\uFF0C\u90A3 React \u51ED\u4EC0\u4E48\u53EF\u4EE5\u6253\u65AD\u3001\u91CD\u505A\u3001\u5E76\u53D1\u6267\u884C\u7EC4\u4EF6\uFF1F",paraId:91,tocIndex:23},{value:`\u7B54\u6848\u53EA\u6709\u4E00\u4E2A\uFF1A
`,paraId:92,tocIndex:23},{value:"Fiber \u672C\u8EAB\u5C31\u662F\u4E3A\u4E86\u627F\u8F7D\u201C\u53EF\u4E2D\u65AD\u7684\u6548\u5E94\u7A0B\u5E8F\u201D\u3002",paraId:92,tocIndex:23},{value:"\u5F88\u591A\u4EBA\u8BEF\u4EE5\u4E3A Fiber \u662F Virtual DOM \u7684\u4F18\u5316\uFF0C\u8FD9\u662F\u4E0D\u51C6\u786E\u7684\u3002",paraId:93,tocIndex:24},{value:"\u66F4\u51C6\u786E\u7684\u8BF4\u6CD5\u662F\uFF1A",paraId:94,tocIndex:24},{value:"Fiber = \u4E00\u68F5\u300C\u53EF\u6682\u505C\u3001\u53EF\u6062\u590D\u3001\u53EF\u4E22\u5F03\u300D\u7684\u6267\u884C\u6808",paraId:95,tocIndex:24},{value:"\u6BCF\u4E00\u4E2A Fiber \u8282\u70B9\u5305\u542B\u4E09\u7C7B\u4FE1\u606F\uFF1A",paraId:96,tocIndex:24},{value:"\u6211\u662F\u4EC0\u4E48\uFF08\u7EC4\u4EF6\u7C7B\u578B\u3001props\uFF09",paraId:97,tocIndex:24},{value:"\u6211\u6267\u884C\u5230\u54EA\u4E86\uFF08Hooks \u94FE\u8868\u3001effect \u6807\u8BB0\uFF09",paraId:97,tocIndex:24},{value:"\u6211\u4EA7\u751F\u4E86\u54EA\u4E9B\u6548\u5E94\uFF08flags\uFF09",paraId:97,tocIndex:24},{value:"\u5728 Fiber \u4E2D\uFF1A",paraId:98,tocIndex:25},{value:"\u6BCF\u4E00\u6B21 render",paraId:99,tocIndex:25},{value:"\u90FD\u662F\u5728 ",paraId:99,tocIndex:25},{value:"\u987A\u5E8F\u904D\u5386 Hooks \u94FE\u8868",paraId:99,tocIndex:25},{value:"\u6BCF\u4E00\u4E2A ",paraId:99,tocIndex:25},{value:"useXxx",paraId:99,tocIndex:25},{value:" \u90FD\u662F\u5728 ",paraId:99,tocIndex:25},{value:"\u6D88\u8D39\u4E00\u4E2A effect slot",paraId:99,tocIndex:25},{value:`Fiber
 \u251C\u2500 Hook #0: useState
 \u251C\u2500 Hook #1: useEffect
 \u251C\u2500 Hook #2: useMemo
`,paraId:100,tocIndex:25},{value:"\u8FD9\u4E0D\u662F\u8BED\u6CD5\u9650\u5236\uFF0C\u800C\u662F\u8C03\u5EA6\u7ED3\u6784\u3002",paraId:101,tocIndex:25},{value:`if (cond) {
  useEffect(...)
}
useState(...)
`,paraId:102,tocIndex:26},{value:"Fiber \u65E0\u6CD5\u5224\u65AD\uFF1A",paraId:103,tocIndex:26},{value:"\u73B0\u5728\u7684 ",paraId:104,tocIndex:26},{value:"useState",paraId:104,tocIndex:26},{value:" \u662F\u4E0D\u662F\u4E0A\u4E00\u6B21\u7684 ",paraId:104,tocIndex:26},{value:"useEffect",paraId:104,tocIndex:26},{value:"slot \u5BF9\u4E0D\u4E0A\uFF0C\u6574\u4E2A effect \u7CFB\u7EDF\u5D29\u6E83",paraId:104,tocIndex:26},{value:"\u6240\u4EE5\u89C4\u5219\u7684\u672C\u8D28\u662F\uFF1A",paraId:105,tocIndex:26},{value:"\u4FDD\u6301\u201C\u6548\u5E94\u58F0\u660E\u7ED3\u6784\u201D\u7684\u7A33\u5B9A\u6027",paraId:106,tocIndex:26},{value:"\u5728\u5E76\u53D1\u6A21\u5F0F\u4E2D\uFF0CReact \u53EF\u4EE5\uFF1A",paraId:107,tocIndex:27},{value:"render A\uFF08\u4F4E\u4F18\u5148\u7EA7\uFF09",paraId:108,tocIndex:27},{value:"render B\uFF08\u9AD8\u4F18\u5148\u7EA7\uFF09",paraId:108,tocIndex:27},{value:"\u4E22\u5F03 A",paraId:108,tocIndex:27},{value:"commit B",paraId:108,tocIndex:27},{value:"\u5173\u952E\u70B9\uFF1A",paraId:109,tocIndex:27},{value:"render \u9636\u6BB5\u662F\u201C\u53EF\u56DE\u653E\u7684\u201D",paraId:110,tocIndex:27},{value:"commit \u9636\u6BB5\u624D\u662F\u771F\u5B9E\u4E16\u754C",paraId:110,tocIndex:27},{value:"\u884C\u4E3A",paraId:111,tocIndex:28},{value:"render",paraId:111,tocIndex:28},{value:"commit",paraId:111,tocIndex:28},{value:"\u8BFB props/state",paraId:111,tocIndex:28},{value:"\u2705",paraId:111,tocIndex:28},{value:"\u274C",paraId:111,tocIndex:28},{value:"setState",paraId:111,tocIndex:28},{value:"\u274C\uFF08\u53EA\u8BB0\u5F55\uFF09",paraId:111,tocIndex:28},{value:"\u2705",paraId:111,tocIndex:28},{value:"useEffect",paraId:111,tocIndex:28},{value:"\u274C",paraId:111,tocIndex:28},{value:"\u2705",paraId:111,tocIndex:28},{value:"DOM \u64CD\u4F5C",paraId:111,tocIndex:28},{value:"\u274C",paraId:111,tocIndex:28},{value:"\u2705",paraId:111,tocIndex:28},{value:"\u5F53\u4F60\u5199\uFF1A",paraId:112,tocIndex:29},{value:`useEffect(fn, deps);
`,paraId:113,tocIndex:29},{value:"React \u5B9E\u9645\u4E0A\u53EA\u662F\u505A\u4E86\u4E00\u4EF6\u4E8B\uFF1A",paraId:114,tocIndex:29},{value:`fiber.flags |= PassiveEffect
`,paraId:115,tocIndex:29},{value:"\u7B49 commit \u5B8C\u6210\u540E\uFF0C\u8C03\u5EA6\u5668\u7EDF\u4E00\u5904\u7406\u8FD9\u4E9B flags\u3002",paraId:116,tocIndex:29},{value:"\u8FD9\u89E3\u91CA\u4E86\u4E09\u4E2A\u5E38\u89C1\u7591\u95EE\uFF1A",paraId:117,tocIndex:29},{value:"\u4E3A\u4EC0\u4E48 effect \u53EF\u80FD\u201C\u665A\u6267\u884C\u201D",paraId:118,tocIndex:29},{value:"\u4E3A\u4EC0\u4E48 render \u91CC\u4E0D\u80FD\u505A\u526F\u4F5C\u7528",paraId:118,tocIndex:29},{value:"\u4E3A\u4EC0\u4E48 StrictMode \u4F1A double render\uFF08\u4F46 effect \u4E0D double commit\uFF09",paraId:118,tocIndex:29},{value:`Hooks \u63D0\u4F9B\u201C\u6548\u5E94\u58F0\u660E\u8BED\u6CD5\u201D\uFF0C
Fiber \u63D0\u4F9B\u201C\u53EF\u4E2D\u65AD\u7684\u6267\u884C\u8F7D\u4F53\u201D\uFF0C
Concurrent \u63D0\u4F9B\u201C\u8C03\u5EA6\u7B56\u7565\u201D\u3002`,paraId:119,tocIndex:30},{value:"\u4E09\u8005\u662F\u4E00\u4E2A\u6574\u4F53\u8BBE\u8BA1\u3002",paraId:120,tocIndex:30},{value:"\u73B0\u5728\u6211\u4EEC\u628A\u89C6\u89D2\u4ECE ",paraId:121,tocIndex:31},{value:"React \u5185\u6838",paraId:121,tocIndex:31},{value:`\uFF0C\u5207\u6362\u5230\u4F60\u6B63\u5728\u505A\u7684\u4E8B\u60C5\uFF1A
`,paraId:121,tocIndex:31},{value:"Base UI / \u7EC4\u4EF6\u5E93 / Design Token / \u53EF\u7EC4\u5408\u6027\u3002",paraId:121,tocIndex:31},{value:"\u4E00\u4E2A\u6210\u719F\u7EC4\u4EF6\u5E93\uFF0C\u771F\u6B63\u96BE\u7684\u4E0D\u662F\u6837\u5F0F\uFF0C\u800C\u662F\uFF1A",paraId:122,tocIndex:32},{value:"\u8C01\u62E5\u6709 state\uFF1F",paraId:123,tocIndex:32},{value:"\u8C01\u58F0\u660E effect\uFF1F",paraId:123,tocIndex:32},{value:"\u8C01\u66B4\u9732 imperative \u80FD\u529B\uFF1F",paraId:123,tocIndex:32},{value:"\u8C01\u53EA\u662F\u7EAF\u63CF\u8FF0\uFF1F",paraId:123,tocIndex:32},{value:"\u7279\u5F81\uFF1A",paraId:124,tocIndex:34},{value:"\u7BA1\u7406 state",paraId:125,tocIndex:34},{value:"\u58F0\u660E effect",paraId:125,tocIndex:34},{value:"\u4E0D\u5173\u5FC3\u6837\u5F0F",paraId:125,tocIndex:34},{value:`function useButton(props) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    // \u5904\u7406\u952E\u76D8 / pointer / focus
  }, []);
}
`,paraId:126,tocIndex:34},{value:"\u8FD9\u7C7B\u7EC4\u4EF6\uFF1A",paraId:127,tocIndex:34},{value:"\u662F",paraId:128,tocIndex:34},{value:"\u6548\u5E94\u58F0\u660E\u4E2D\u5FC3",paraId:128,tocIndex:34},{value:"\u5BF9\u6807\uFF1ARadix / Base UI",paraId:128,tocIndex:34},{value:"\u7279\u5F81\uFF1A",paraId:129,tocIndex:35},{value:"\u7EAF render",paraId:130,tocIndex:35},{value:"\u65E0 effect",paraId:130,tocIndex:35},{value:"props \u5373 UI",paraId:130,tocIndex:35},{value:`const ButtonView = memo((props) => {
  return <button {...props} />;
});
`,paraId:131,tocIndex:35},{value:"Token \u672C\u8D28\u662F\uFF1A",paraId:132,tocIndex:36},{value:"Context + \u4E0D\u53D8\u7EA6\u5B9A",paraId:133,tocIndex:36},{value:`const ThemeContext = createContext(tokens);
`,paraId:134,tocIndex:36},{value:"Token \u662F\u4F4E\u9891\u53D8\u5316",paraId:135,tocIndex:36},{value:"\u9002\u5408 Context",paraId:135,tocIndex:36},{value:"\u4E0D\u5E94\u8BE5\u662F useState \u9AD8\u9891\u66F4\u65B0",paraId:135,tocIndex:36},{value:"\u5728\u7EC4\u4EF6\u5E93\u91CC\uFF1A",paraId:136,tocIndex:37},{value:`useImperativeHandle(ref, () => ({
  focus,
  blur,
}));
`,paraId:137,tocIndex:37},{value:"\u8FD9\u4E0D\u662F\u201C\u9AD8\u7EA7\u6280\u5DE7\u201D\uFF0C\u800C\u662F\uFF1A",paraId:138,tocIndex:37},{value:"\u663E\u5F0F\u58F0\u660E\uFF1A\u8FD9\u662F\u4E00\u4E2A\u547D\u4EE4\u5F0F\u8FB9\u754C",paraId:139,tocIndex:37},{value:"\u4F60\u5728\u505A\u7684\u662F\uFF1A",paraId:140,tocIndex:37},{value:"\u628A imperative effect ",paraId:141,tocIndex:37},{value:"\u96C6\u4E2D\u3001\u7EA6\u675F\u3001\u53EF\u63A7",paraId:141,tocIndex:37},{value:"\u4ED6\u4EEC\u7684\u5171\u540C\u70B9\uFF1A",paraId:142,tocIndex:38},{value:"hooks \u7BA1\u884C\u4E3A",paraId:143,tocIndex:38},{value:"\u7EC4\u4EF6\u7BA1\u7ED3\u6784",paraId:143,tocIndex:38},{value:"\u6837\u5F0F\u5B8C\u5168\u53EF\u66FF\u6362",paraId:143,tocIndex:38},{value:"\u8FD9\u662F",paraId:144,tocIndex:38},{value:"\u4EE3\u6570\u6548\u5E94\u6A21\u578B\u5929\u7136\u63A8\u5BFC\u51FA\u6765\u7684\u67B6\u6784",paraId:144,tocIndex:38},{value:"\uFF0C\u4E0D\u662F\u98CE\u683C\u504F\u597D\u3002",paraId:144,tocIndex:38},{value:`\u4E00\u4E2A\u597D\u7684\u7EC4\u4EF6\u5E93\uFF0C\u662F\u628A\u526F\u4F5C\u7528\u96C6\u4E2D\u5728\u6700\u5C11\u7684\u5730\u65B9\uFF0C
\u628A\u5176\u4F59\u7EC4\u4EF6\u53D8\u6210\u201C\u7EAF\u63CF\u8FF0\u201D\u3002`,paraId:145,tocIndex:39},{value:"\u73B0\u5728\u6211\u4EEC\u56DE\u5230\u6700\u843D\u5730\u7684\u4E00\u5C42\u3002",paraId:146,tocIndex:40},{value:"\u201C\u7EC4\u4EF6 render \u4E00\u6B21\uFF0C\u6211\u5728\u8FD9\u91CC\u987A\u4FBF\u505A\u70B9\u4E8B\u201D",paraId:147,tocIndex:42},{value:`if (open) {
  fetchData();
}
`,paraId:148,tocIndex:42},{value:"\u8FD9\u5728\u5E76\u53D1\u6A21\u578B\u4E0B\u662F",paraId:149,tocIndex:42},{value:"\u672A\u5B9A\u4E49\u884C\u4E3A",paraId:149,tocIndex:42},{value:"\u3002",paraId:149,tocIndex:42},{value:`render = \u58F0\u660E\u6211\u9700\u8981\u4EC0\u4E48\u72B6\u6001\u548C\u6548\u5E94
effect = \u5F53\u8FD9\u4E9B\u6761\u4EF6\u6210\u7ACB\u65F6\uFF0C\u8BF7\u6267\u884C`,paraId:150,tocIndex:43},{value:`useEffect(() => {
  if (!open) return;
  fetchData();
}, [open]);
`,paraId:151,tocIndex:43},{value:"\u56E0\u4E3A\u4F60\u5728\u60F3\uFF1A",paraId:152,tocIndex:44},{value:"\u201C\u6211\u60F3\u4EC0\u4E48\u65F6\u5019\u6267\u884C\u201D",paraId:153,tocIndex:44},{value:"\u800C React \u8981\u7684\u662F\uFF1A",paraId:154,tocIndex:44},{value:"\u201C\u8FD9\u4E2A\u6548\u5E94\u4F9D\u8D56\u54EA\u4E9B\u8F93\u5165\u201D",paraId:155,tocIndex:44},{value:"\u4F9D\u8D56\u6570\u7EC4\u4E0D\u662F\u89E6\u53D1\u5668\uFF0C\u662F ",paraId:156,tocIndex:44},{value:"\u6570\u5B66\u610F\u4E49\u4E0A\u7684\u8F93\u5165\u96C6\u5408",paraId:156,tocIndex:44},{value:"\u3002",paraId:156,tocIndex:44},{value:`function UserPanel({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let alive = true;

    fetchUser(userId).then((data) => {
      if (alive) setUser(data);
    });

    return () => {
      alive = false;
    };
  }, [userId]);
}
`,paraId:157,tocIndex:45},{value:"\u8FD9\u6BB5\u4EE3\u7801\u7684\u771F\u5B9E\u542B\u4E49\u662F\uFF1A",paraId:158,tocIndex:45},{value:"\u5F53 ",paraId:159,tocIndex:45},{value:"userId",paraId:159,tocIndex:45},{value:` \u8FD9\u4E2A\u8F93\u5165\u6210\u7ACB\u65F6\uFF0C
\u6211\u58F0\u660E\u4E00\u4E2A\u201C\u83B7\u53D6\u7528\u6237\u201D\u7684\u6548\u5E94\uFF0C
React \u53EF\u4EE5\u968F\u65F6\u53D6\u6D88\u5B83\u3002`,paraId:159,tocIndex:45},{value:"Hooks \u662F\u6548\u5E94\u58F0\u660E\u8BED\u8A00",paraId:160,tocIndex:46},{value:"Fiber \u662F\u53EF\u4E2D\u65AD\u6267\u884C\u6A21\u578B",paraId:160,tocIndex:46},{value:"Concurrent \u662F\u8C03\u5EA6\u7B56\u7565",paraId:160,tocIndex:46},{value:"\u7EC4\u4EF6\u5E93\u662F\u6548\u5E94\u8FB9\u754C\u7684\u5DE5\u7A0B\u5316\u7ED3\u679C",paraId:160,tocIndex:46},{value:"\u4E1A\u52A1\u4EE3\u7801\u662F\u6548\u5E94\u5BF9\u72B6\u6001\u53D8\u5316\u7684\u54CD\u5E94",paraId:160,tocIndex:46},{value:"\u5982\u679C\u4F60\u613F\u610F\uFF0C\u4E0B\u4E00\u6B65\u6211\u53EF\u4EE5\u5E2E\u4F60\u505A\u4E00\u4EF6\u201C\u771F\u6B63\u6709\u6740\u4F24\u529B\u201D\u7684\u4E8B\u4E4B\u4E00\uFF1A",paraId:161,tocIndex:46},{value:"\u7528 ",paraId:162,tocIndex:46},{value:"\u4E00\u5957\u9519\u8BEF \u2192 \u6B63\u786E\u5BF9\u7167",paraId:162,tocIndex:46},{value:"\uFF0C\u5F7B\u5E95\u6CBB\u597D effect \u4F9D\u8D56\u6050\u60E7",paraId:162,tocIndex:46},{value:"\u628A\u4F60\u6B63\u5728\u505A\u7684 ",paraId:162,tocIndex:46},{value:"Base UI Button",paraId:162,tocIndex:46},{value:"\uFF0C\u5B8C\u6574\u7528\u201C\u6548\u5E94\u8FB9\u754C\u201D\u91CD\u6784\u4E00\u904D",paraId:162,tocIndex:46},{value:"\u628A\u8FD9\u6574\u5957\u5185\u5BB9\u6574\u7406\u6210\u4E00\u7BC7 ",paraId:162,tocIndex:46},{value:"\u53EF\u516C\u5F00\u53D1\u5E03\u7684\u6280\u672F\u6587\u7AE0\u7ED3\u6784",paraId:162,tocIndex:46},{value:"\u4F60\u76F4\u63A5\u9009\u4E00\u4E2A\uFF0C\u6211\u7EE7\u7EED\u5F80\u4E0B\u63A8\u8FDB\u3002",paraId:163,tocIndex:46},{value:"\u4E0B\u9762\u662F\u4E00\u4E2A",paraId:164,tocIndex:46},{value:"\u6781\u5C0F\u3001\u4F46\u8BED\u4E49\u5B8C\u6574\u7684 \u201CReact-like\u201D Generator Runtime",paraId:164,tocIndex:46},{value:`\u3002
\u76EE\u6807\u4E0D\u662F\u53EF\u7528\u6027\uFF0C\u800C\u662F`,paraId:164,tocIndex:46},{value:"\u628A React \u7684\u4E09\u4EF6\u4E8B\u663E\u6027\u5316",paraId:164,tocIndex:46},{value:"\uFF1A",paraId:164,tocIndex:46},{value:"\u58F0\u660E\uFF08Hooks \u2248 yield\uFF09",paraId:165,tocIndex:46},{value:"\u987A\u5E8F\u69FD\u4F4D\uFF08hookIndex\uFF09",paraId:165,tocIndex:46},{value:"\u8C03\u5EA6\uFF08render / commit \u5206\u79BB\uFF09",paraId:165,tocIndex:46},{value:"\u6211\u4F1A\u5148\u7ED9",paraId:166,tocIndex:46},{value:"\u5B8C\u6574\u4EE3\u7801",paraId:166,tocIndex:46},{value:"\uFF08\u224850 \u884C\uFF09\uFF0C\u518D\u9010\u6BB5\u5BF9\u7167 React\u3002",paraId:166,tocIndex:46},{value:`// ===== Runtime =====
function createRuntime() {
  let hooks = [];
  let effects = [];
  let i = 0;

  return {
    render(gen) {
      i = 0;
      const it = gen();
      let res = it.next();

      while (!res.done) {
        const eff = res.value;
        const idx = i++;

        if (eff.type === 'state') {
          if (hooks[idx] === undefined) hooks[idx] = eff.init;
          res = it.next(hooks[idx]);
        }

        if (eff.type === 'effect') {
          effects[idx] = eff.fn;
          res = it.next();
        }
      }

      return res.value;
    },

    commit() {
      effects.forEach((fn) => fn && fn());
      effects = [];
    },
  };
}

// ===== Hooks (\u58F0\u660E\u5C42) =====
const useState = (init) => ({ type: 'state', init });
const useEffect = (fn) => ({ type: 'effect', fn });

// ===== Component =====
function* Counter() {
  const count = yield useState(0);

  yield useEffect(() => {
    console.log('effect:', count);
  });

  return \`<button>\${count}</button>\`;
}

// ===== Run =====
const rt = createRuntime();
console.log(rt.render(Counter));
rt.commit();
`,paraId:167,tocIndex:47},{value:"\u6211\u4EEC\u9010\u5C42\u5BF9\u7167\u3002",paraId:168,tocIndex:48},{value:`function* Counter() {
  const count = yield useState(0);
  yield useEffect(() => {...});
  return \`<button>\${count}</button>\`;
}
`,paraId:169,tocIndex:49},{value:"\u5BF9\u5E94 React\uFF1A",paraId:170,tocIndex:49},{value:`function Counter() {
  const [count] = useState(0);
  useEffect(() => {...});
  return <button>{count}</button>;
}
`,paraId:171,tocIndex:49},{value:"\u5173\u952E\u70B9\uFF1A",paraId:172,tocIndex:49},{value:"yield",paraId:173,tocIndex:49},{value:" = \u201C\u6682\u505C\u5E76\u58F0\u660E\u4E00\u4E2A\u6548\u5E94\u201D",paraId:173,tocIndex:49},{value:`let i = 0;
const idx = i++;
`,paraId:174,tocIndex:50},{value:"\u8FD9\u5C31\u662F\uFF1A",paraId:175,tocIndex:50},{value:"React \u5185\u90E8\u7684 ",paraId:176,tocIndex:50},{value:"currentlyRenderingFiber.memoizedState",paraId:176,tocIndex:50},{value:"Hooks \u987A\u5E8F\u89C4\u5219\u7684",paraId:176,tocIndex:50},{value:"\u7269\u7406\u539F\u56E0",paraId:176,tocIndex:50},{value:"\u5982\u679C\u4F60\u5728 if \u91CC\u5199 Hook\uFF0C\u8FD9\u4E2A ",paraId:177,tocIndex:50},{value:"idx",paraId:177,tocIndex:50},{value:" \u5C31\u4E71\u4E86\u3002",paraId:177,tocIndex:50},{value:`if (hooks[idx] === undefined) hooks[idx] = eff.init;
`,paraId:178,tocIndex:51},{value:"\u5BF9\u5E94\uFF1A",paraId:179,tocIndex:51},{value:"useState",paraId:180,tocIndex:51},{value:" \u4E0D\u662F\u5B58\u5728\u51FD\u6570\u91CC",paraId:180,tocIndex:51},{value:"\u800C\u662F\u5B58\u5728 ",paraId:180,tocIndex:51},{value:"Fiber \u7684 Hook \u94FE\u8868\u8282\u70B9\u4E0A",paraId:180,tocIndex:51},{value:`effects[idx] = eff.fn;
`,paraId:181,tocIndex:52},{value:`\u6CE8\u610F\uFF1A
\u8FD9\u91CC `,paraId:182,tocIndex:52},{value:"\u6CA1\u6709\u6267\u884C effect",paraId:182,tocIndex:52},{value:"\u3002",paraId:182,tocIndex:52},{value:"\u8FD9\u7CBE\u786E\u5BF9\u5E94 React\uFF1A",paraId:183,tocIndex:52},{value:"render \u9636\u6BB5\uFF1A",paraId:184,tocIndex:52},{value:"\u6807\u8BB0 PassiveEffect",paraId:184,tocIndex:52},{value:"commit \u9636\u6BB5\uFF1A\u7EDF\u4E00\u6267\u884C",paraId:184,tocIndex:52},{value:`rt.render(Counter);
rt.commit();
`,paraId:185,tocIndex:53},{value:"\u8FD9\u5C31\u662F React \u7684\u6838\u5FC3\u5206\u5C42\uFF1A",paraId:186,tocIndex:53},{value:"\u9636\u6BB5",paraId:187,tocIndex:53},{value:"\u505A\u4EC0\u4E48",paraId:187,tocIndex:53},{value:"render",paraId:187,tocIndex:53},{value:"\u8BA1\u7B97 UI + \u58F0\u660E\u6548\u5E94",paraId:187,tocIndex:53},{value:"commit",paraId:187,tocIndex:53},{value:"\u6267\u884C\u526F\u4F5C\u7528",paraId:187,tocIndex:53},{value:"render \u662F\u53EF\u4E22\u5F03\u7684\uFF0Ccommit \u624D\u662F\u771F\u7684",paraId:188,tocIndex:53},{value:"\u53EA\u9700\u8981\u6781\u5C11\u6269\u5C55\uFF0C\u5C31\u80FD\u770B\u5230\u66F4\u591A React \u7279\u6027\u51FA\u73B0\uFF1A",paraId:189,tocIndex:54},{value:`hooks[idx] = next;
scheduleRender();
`,paraId:190,tocIndex:55},{value:"\u2192 Concurrent / lane \u96CF\u5F62",paraId:191,tocIndex:55},{value:`if (!shallowEqual(prevDeps, deps)) queueEffect();
`,paraId:192,tocIndex:56},{value:"\u2192 ",paraId:193,tocIndex:56},{value:"useEffect",paraId:193,tocIndex:56},{value:" \u4F9D\u8D56\u6570\u7EC4",paraId:193,tocIndex:56},{value:`if (shouldYield()) return;
`,paraId:194,tocIndex:57},{value:"\u2192 Cooperative Scheduling / Fiber",paraId:195,tocIndex:57},{value:"\u56E0\u4E3A\u5B83\u6EE1\u8DB3\u4E86 React \u7684",paraId:196,tocIndex:58},{value:"\u672C\u8D28\u7EA6\u675F",paraId:196,tocIndex:58},{value:"\uFF1A",paraId:196,tocIndex:58},{value:"\u7EC4\u4EF6\u662F\u53EF\u91CD\u653E\u7684",paraId:197,tocIndex:58},{value:"\u526F\u4F5C\u7528\u4E0D\u5728 render \u91CC\u6267\u884C",paraId:197,tocIndex:58},{value:"\u72B6\u6001\u4E0D\u5728\u51FD\u6570\u6808\u4E0A",paraId:197,tocIndex:58},{value:"Hooks \u662F\u987A\u5E8F\u58F0\u660E\uFF0C\u4E0D\u662F\u8BED\u6CD5\u7CD6",paraId:197,tocIndex:58},{value:"React \u53EA\u662F\u628A\u8FD9\u4E9B\uFF1A",paraId:198,tocIndex:58},{value:"Generator",paraId:199,tocIndex:58},{value:"CPS",paraId:199,tocIndex:58},{value:"Effect Handler",paraId:199,tocIndex:58},{value:"\u624B\u5199\u6210\u4E86\u4E00\u5957 JS Runtime",paraId:200,tocIndex:58},{value:"\u3002",paraId:200,tocIndex:58},{value:`\u4F60\u521A\u521A\u770B\u5230\u7684\u4E0D\u662F\u201C\u7C7B React\u201D\uFF0C
\u800C\u662F React \u5728\u7F16\u7A0B\u8BED\u8A00\u5C42\u9762\u7684\u6700\u5C0F\u6A21\u578B\u3002`,paraId:201,tocIndex:59},{value:`Hooks \u4E0D\u662F\u53D1\u660E\u51FA\u6765\u7684 API\uFF0C
\u800C\u662F `,paraId:202,tocIndex:59},{value:"Generator / \u4EE3\u6570\u6548\u5E94\u5728 JS \u91CC\u7684\u5DE5\u7A0B\u5316\u66FF\u8EAB",paraId:202,tocIndex:59},{value:"\u3002",paraId:202,tocIndex:59},{value:"\u5982\u679C\u4F60\u613F\u610F\uFF0C\u4E0B\u4E00\u6B65\u6211\u53EF\u4EE5\u7EE7\u7EED\u505A\u4E09\u4EF6\u4E8B\u4E4B\u4E00\uFF08\u90FD\u5F88\u786C\uFF09\uFF1A",paraId:203,tocIndex:59},{value:"\u628A\u8FD9\u4E2A Demo ",paraId:204,tocIndex:59},{value:"\u6269\u5C55\u5230\u652F\u6301 setState + rerender",paraId:204,tocIndex:59},{value:"\u628A\u5B83 ",paraId:204,tocIndex:59},{value:"\u6539\u5199\u6210 CPS\uFF08next \u56DE\u8C03\uFF09\u7248\u672C",paraId:204,tocIndex:59},{value:"\u5BF9\u7167 ",paraId:204,tocIndex:59},{value:"\u771F\u5B9E React Fiber \u6E90\u7801",paraId:204,tocIndex:59},{value:"\uFF0C\u6807\u6CE8\u6BCF\u4E00\u884C\u5BF9\u5E94\u4F4D\u7F6E",paraId:204,tocIndex:59},{value:"\u4F60\u9009\u54EA\u4E00\u6761\uFF0C\u6211\u7EE7\u7EED\u3002",paraId:205,tocIndex:59},{value:"\u4E0B\u9762\u6211\u628A",paraId:206,tocIndex:59},{value:"\u521A\u624D\u90A3\u4E2A Generator Runtime",paraId:206,tocIndex:59},{value:"\uFF0C\u5728",paraId:206,tocIndex:59},{value:"\u4E0D\u7834\u574F\u5FC3\u667A\u6A21\u578B\u7684\u524D\u63D0\u4E0B",paraId:206,tocIndex:59},{value:"\uFF0C",paraId:206,tocIndex:59},{value:"\u6700\u5C0F\u5E45\u5EA6\u6269\u5C55",paraId:206,tocIndex:59},{value:"\u5230\u652F\u6301\uFF1A",paraId:206,tocIndex:59},{value:"setState",paraId:207,tocIndex:59},{value:"\u89E6\u53D1 ",paraId:207,tocIndex:59},{value:"rerender",paraId:207,tocIndex:59},{value:"render / commit \u4ECD\u7136\u4E25\u683C\u5206\u79BB",paraId:207,tocIndex:59},{value:"\u76EE\u6807\u4F9D\u7136\u4E0D\u662F\u201C\u529F\u80FD\u5B8C\u6574\u201D\uFF0C\u800C\u662F",paraId:208,tocIndex:59},{value:"\u8BA9\u4F60\u770B\u5230 React \u66F4\u65B0\u94FE\u8DEF\u662F\u5982\u4F55\u81EA\u7136\u51FA\u73B0\u7684",paraId:208,tocIndex:59},{value:"\u3002",paraId:208,tocIndex:59},{value:"\u8FD9\u6B21\u6211\u4EEC\u53EA\u52A0\u4E09\u6837\u4E1C\u897F\uFF1A",paraId:209,tocIndex:60},{value:"useState",paraId:210,tocIndex:60},{value:" \u8FD4\u56DE ",paraId:210,tocIndex:60},{value:"[state, setState]",paraId:210,tocIndex:60},{value:"setState",paraId:210,tocIndex:60},{value:" \u89E6\u53D1\u4E00\u6B21\u65B0\u7684 render",paraId:210,tocIndex:60},{value:"\u6240\u6709\u66F4\u65B0\u4ECD\u7136\u8D70 ",paraId:210,tocIndex:60},{value:"\u201C\u58F0\u660E \u2192 \u8C03\u5EA6\u201D",paraId:210,tocIndex:60},{value:`// ===== Runtime =====
function createRuntime() {
  let hooks = [];
  let effects = [];
  let i = 0;
  let component = null;

  function render() {
    i = 0;
    effects = [];

    const it = component();
    let res = it.next();

    while (!res.done) {
      const eff = res.value;
      const idx = i++;

      if (eff.type === 'state') {
        if (!hooks[idx]) {
          hooks[idx] = { value: eff.init };
        }

        const setState = (next) => {
          hooks[idx].value =
            typeof next === 'function' ? next(hooks[idx].value) : next;
          render(); // \u8C03\u5EA6\u4E00\u6B21\u66F4\u65B0
          commit();
        };

        res = it.next([hooks[idx].value, setState]);
      }

      if (eff.type === 'effect') {
        effects[idx] = eff.fn;
        res = it.next();
      }
    }

    console.log('render:', res.value);
  }

  function commit() {
    effects.forEach((fn) => fn && fn());
  }

  return {
    mount(gen) {
      component = gen;
      render();
      commit();
    },
  };
}

// ===== Hooks (\u58F0\u660E\u5C42) =====
const useState = (init) => ({ type: 'state', init });
const useEffect = (fn) => ({ type: 'effect', fn });

// ===== Component =====
function* Counter() {
  const [count, setCount] = yield useState(0);

  yield useEffect(() => {
    console.log('effect \u2192 count:', count);
  });

  if (count < 2) {
    setTimeout(() => setCount((c) => c + 1), 0);
  }

  return \`<button>\${count}</button>\`;
}

// ===== Run =====
const rt = createRuntime();
rt.mount(Counter);
`,paraId:211,tocIndex:61},{value:"\u4E0B\u9762\u662F",paraId:212,tocIndex:62},{value:"\u5173\u952E\u70B9\u62C6\u89E3",paraId:212,tocIndex:62},{value:"\uFF0C\u6BCF\u4E00\u6761\u90FD\u5BF9\u5E94\u771F\u5B9E React\u3002",paraId:212,tocIndex:62},{value:`hooks[idx].value = next;
`,paraId:213,tocIndex:63},{value:"\u8FD9\u610F\u5473\u7740\uFF1A",paraId:214,tocIndex:63},{value:"state \u5B58\u5728 runtime\uFF08\u2248 Fiber\uFF09",paraId:215,tocIndex:63},{value:"\u7EC4\u4EF6\u51FD\u6570 ",paraId:215,tocIndex:63},{value:"\u53EA\u662F\u8BFB\u53D6",paraId:215,tocIndex:63},{value:"\u2705 \u8FD9\u662F React \u80FD rerender\u3001\u56DE\u653E\u3001\u4E22\u5F03\u7684\u6839\u672C\u539F\u56E0",paraId:216,tocIndex:63},{value:`setState \u2192 render() \u2192 commit()
`,paraId:217,tocIndex:64},{value:"\u6CE8\u610F\uFF1A",paraId:218,tocIndex:64},{value:"\u7EC4\u4EF6\u51FD\u6570 ",paraId:219,tocIndex:64},{value:"\u88AB\u91CD\u65B0\u6267\u884C",paraId:219,tocIndex:64},{value:"Generator ",paraId:219,tocIndex:64},{value:"\u4ECE\u5934\u5F00\u59CB",paraId:219,tocIndex:64},{value:"state \u4ECE hooks[] \u4E2D\u6062\u590D",paraId:219,tocIndex:64},{value:"\u8FD9\u6B63\u662F React \u7684\uFF1A",paraId:220,tocIndex:64},{value:"\u201C\u6BCF\u6B21\u66F4\u65B0\u90FD\u662F\u4E00\u6B21\u5168\u65B0\u7684 render\u201D",paraId:221,tocIndex:64},{value:"\u73B0\u5728\u4F60\u80FD\u76F4\u89C2\u770B\u5230\u539F\u56E0\u4E86\uFF1A",paraId:222,tocIndex:65},{value:`render()
  \u21B3 \u6267\u884C Counter()
    \u21B3 \u53EF\u80FD\u88AB\u53CD\u590D\u8C03\u7528
    \u21B3 \u53EF\u80FD\u88AB\u4E2D\u65AD
`,paraId:223,tocIndex:65},{value:"\u5982\u679C\u4F60\u5728 render \u91CC\uFF1A",paraId:224,tocIndex:65},{value:"fetch",paraId:225,tocIndex:65},{value:"log",paraId:225,tocIndex:65},{value:"mutate",paraId:225,tocIndex:65},{value:"\u90FD\u4F1A\u88AB ",paraId:226,tocIndex:65},{value:"\u91CD\u590D\u6267\u884C / \u4E71\u5E8F\u6267\u884C",paraId:226,tocIndex:65},{value:"\u3002",paraId:226,tocIndex:65},{value:`effects[idx] = eff.fn;
`,paraId:227,tocIndex:66},{value:"\u76F4\u5230\uFF1A",paraId:228,tocIndex:66},{value:`commit();
`,paraId:229,tocIndex:66},{value:"\u8FD9\u5C31\u662F\uFF1A",paraId:230,tocIndex:66},{value:"render \u9636\u6BB5\uFF1A\u58F0\u660E",paraId:231,tocIndex:66},{value:"commit \u9636\u6BB5\uFF1A\u751F\u6548",paraId:231,tocIndex:66},{value:`const idx = i++;
`,paraId:232,tocIndex:67},{value:"\u6BCF\u4E00\u6B21 render",paraId:233,tocIndex:67},{value:"\u6BCF\u4E00\u4E2A yield",paraId:233,tocIndex:67},{value:"\u5FC5\u987B\u987A\u5E8F\u4E00\u81F4",paraId:233,tocIndex:67},{value:"\u5426\u5219\uFF1A",paraId:234,tocIndex:67},{value:"state / effect \u5BF9\u4E0D\u4E0A",paraId:235,tocIndex:67},{value:"\u884C\u4E3A\u7ACB\u5373\u9519\u4E71",paraId:235,tocIndex:67},{value:"\u901A\u8FC7\u8FD9\u4E2A Demo\uFF0C\u4F60\u53EF\u4EE5",paraId:236,tocIndex:68},{value:"\u4E00\u773C\u89E3\u91CA",paraId:236,tocIndex:68},{value:"\u4E0B\u9762\u8FD9\u4E9B\u95EE\u9898\uFF1A",paraId:236,tocIndex:68},{value:"\u56E0\u4E3A\u5B83\u53EA\u662F\u89E6\u53D1\u4E00\u6B21\u65B0\u7684 render \u8BF7\u6C42",paraId:237,tocIndex:69},{value:"\u56E0\u4E3A\u7EC4\u4EF6\u662F ",paraId:238,tocIndex:70},{value:"\u6548\u5E94\u58F0\u660E\u811A\u672C\uFF0C\u4E0D\u662F\u5B9E\u4F8B",paraId:238,tocIndex:70},{value:"render \u53EF\u56DE\u653E\uFF0Ccommit \u624D\u662F\u771F\u5B9E\u4E16\u754C",paraId:239,tocIndex:71},{value:"\u56E0\u4E3A runtime \u4F9D\u8D56\u201C\u58F0\u660E\u987A\u5E8F\u201D\u5BF9\u9F50\u72B6\u6001\u69FD\u4F4D",paraId:240,tocIndex:72},{value:"\u8FD9\u4E2A Demo ",paraId:241,tocIndex:73},{value:"\u523B\u610F\u6CA1\u505A",paraId:241,tocIndex:73},{value:"\uFF1A",paraId:241,tocIndex:73},{value:"\u6279\u91CF\u66F4\u65B0",paraId:242,tocIndex:73},{value:"\u4F18\u5148\u7EA7 / lane",paraId:242,tocIndex:73},{value:"\u4E2D\u65AD / \u65F6\u95F4\u5207\u7247",paraId:242,tocIndex:73},{value:"deps \u5BF9\u6BD4",paraId:242,tocIndex:73},{value:"cleanup",paraId:242,tocIndex:73},{value:"\u4F46\u91CD\u8981\u7684\u662F\uFF1A",paraId:243,tocIndex:73},{value:`\u8FD9\u4E9B\u90FD\u662F\u201C\u8C03\u5EA6\u7B56\u7565\u95EE\u9898\u201D\uFF0C
\u4E0D\u662F\u5FC3\u667A\u6A21\u578B\u95EE\u9898\u3002`,paraId:244,tocIndex:73},{value:`React \u5E76\u4E0D\u662F\u201C\u5728\u7EC4\u4EF6\u91CC\u7BA1\u7406\u72B6\u6001\u201D\uFF0C
\u800C\u662F\u5728 runtime \u91CC\u8C03\u5EA6\u4E00\u6BB5\u53EF\u91CD\u590D\u6267\u884C\u7684\u7A0B\u5E8F\u3002`,paraId:245,tocIndex:74},{value:"\u4F60\u521A\u624D\u5199\u7684\u8FD9 60 \u884C\u4EE3\u7801\uFF0C\u5DF2\u7ECF\u5177\u5907\u4E86\uFF1A",paraId:246,tocIndex:74},{value:"Hooks \u7684\u672C\u8D28",paraId:247,tocIndex:74},{value:"Fiber \u7684\u6267\u884C\u6A21\u578B",paraId:247,tocIndex:74},{value:"Concurrent \u7684\u7406\u8BBA\u57FA\u7840",paraId:247,tocIndex:74},{value:"\u5982\u679C\u4F60\u613F\u610F\uFF0C\u4E0B\u4E00\u6B65\u6211\u53EF\u4EE5\u7EE7\u7EED\u505A\u4E00\u4EF6",paraId:248,tocIndex:74},{value:"\u771F\u6B63\u5C01\u795E",paraId:248,tocIndex:74},{value:"\u7684\u4E8B\u4E4B\u4E00\uFF1A",paraId:248,tocIndex:74},{value:"\u5728\u8FD9\u4E2A Demo \u4E0A\u52A0\u201C\u65F6\u95F4\u5207\u7247 + shouldYield\u201D",paraId:249,tocIndex:74},{value:"\u52A0 deps + cleanup\uFF0C\u5B8C\u6574\u590D\u523B useEffect",paraId:249,tocIndex:74},{value:"\u628A\u5B83\u6539\u5199\u6210 CPS\uFF08next \u56DE\u8C03\uFF09\u7248\u672C\uFF0C\u5BF9\u7167 Generator",paraId:249,tocIndex:74},{value:"\u4F60\u9009\u54EA\u4E2A\uFF0C\u6211\u7EE7\u7EED\u5F80\u4E0B\u63A8\u3002",paraId:250,tocIndex:74},{value:"\u5F88\u597D\uFF0C\u8FD9\u4E00\u6B65",paraId:251,tocIndex:74},{value:"\u6B63\u4E2D React \u7684\u201C\u7075\u9B42\u90E8\u4F4D\u201D",paraId:251,tocIndex:74},{value:`\u3002
\u6211\u4F1A\u5728`,paraId:251,tocIndex:74},{value:"\u4E0D\u7834\u574F\u4E4B\u524D\u6A21\u578B",paraId:251,tocIndex:74},{value:"\u7684\u524D\u63D0\u4E0B\uFF0C\u628A Demo ",paraId:251,tocIndex:74},{value:"\u6700\u5C0F\u5E45\u5EA6\u5347\u7EA7",paraId:251,tocIndex:74},{value:"\u5230\uFF1A",paraId:251,tocIndex:74},{value:"useEffect(fn, deps)",paraId:252,tocIndex:74},{value:"deps \u5BF9\u6BD4",paraId:252,tocIndex:74},{value:"cleanup\uFF08\u5728\u4E0B\u4E00\u6B21 effect \u524D\u6267\u884C\uFF09",paraId:252,tocIndex:74},{value:"\u4ECD\u7136\u4FDD\u6301\uFF1A",paraId:252,tocIndex:74},{value:"render / commit \u5206\u79BB",paraId:252,tocIndex:74},{value:"\u76EE\u6807\uFF1A",paraId:253,tocIndex:74},{value:"\u8BA9\u4F60\u5728 80 \u884C\u5DE6\u53F3\u7684\u4EE3\u7801\u91CC\uFF0C",paraId:254,tocIndex:74},{value:"\u4EB2\u773C\u770B\u5230 React useEffect \u7684\u5B8C\u6574\u751F\u547D\u5468\u671F\u662F\u5982\u4F55\u201C\u81EA\u7136\u51FA\u73B0\u201D\u7684",paraId:254,tocIndex:74},{value:"\u3002",paraId:254,tocIndex:74},{value:"React \u4E2D\uFF1A",paraId:255,tocIndex:75},{value:`useEffect(() => {
  // effect
  return () => {
    // cleanup
  };
}, deps);
`,paraId:256,tocIndex:75},{value:"\u771F\u5B9E\u8BED\u4E49\u662F\uFF1A",paraId:257,tocIndex:75},{value:"render \u9636\u6BB5\uFF1A",paraId:258,tocIndex:75},{value:"\u8BB0\u5F55 effect",paraId:259,tocIndex:75},{value:"\u5BF9\u6BD4 deps",paraId:259,tocIndex:75},{value:"\u51B3\u5B9A\u662F\u5426\u9700\u8981\u6267\u884C",paraId:259,tocIndex:75},{value:"commit \u9636\u6BB5\uFF1A",paraId:260,tocIndex:75},{value:"\u5982\u679C deps \u53D8\u5316\uFF1A",paraId:261,tocIndex:75},{value:"\u5148\u6267\u884C\u4E0A\u4E00\u6B21 cleanup",paraId:262,tocIndex:75},{value:"\u518D\u6267\u884C\u65B0\u7684 effect",paraId:262,tocIndex:75},{value:"cleanup ",paraId:263,tocIndex:75},{value:"\u6C38\u8FDC\u4E0D\u4F1A\u5728 render \u9636\u6BB5\u6267\u884C",paraId:263,tocIndex:75},{value:`// ===== Runtime =====
function createRuntime() {
  let hooks = [];
  let effects = [];
  let i = 0;
  let component = null;

  function shallowEqual(a, b) {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => Object.is(v, b[i]));
  }

  function render() {
    i = 0;
    effects = [];

    const it = component();
    let res = it.next();

    while (!res.done) {
      const eff = res.value;
      const idx = i++;

      // ---- useState ----
      if (eff.type === 'state') {
        if (!hooks[idx]) {
          hooks[idx] = { value: eff.init };
        }

        const setState = (next) => {
          hooks[idx].value =
            typeof next === 'function' ? next(hooks[idx].value) : next;
          render();
          commit();
        };

        res = it.next([hooks[idx].value, setState]);
      }

      // ---- useEffect ----
      if (eff.type === 'effect') {
        const prev = hooks[idx];
        const changed = !prev || !shallowEqual(prev.deps, eff.deps);

        hooks[idx] = {
          deps: eff.deps,
          cleanup: prev && prev.cleanup,
        };

        if (changed) {
          effects.push(() => {
            if (hooks[idx].cleanup) {
              hooks[idx].cleanup();
            }
            const cleanup = eff.fn();
            if (typeof cleanup === 'function') {
              hooks[idx].cleanup = cleanup;
            }
          });
        }

        res = it.next();
      }
    }

    console.log('render:', res.value);
  }

  function commit() {
    effects.forEach((run) => run());
  }

  return {
    mount(gen) {
      component = gen;
      render();
      commit();
    },
  };
}

// ===== Hooks (\u58F0\u660E\u5C42) =====
const useState = (init) => ({ type: 'state', init });
const useEffect = (fn, deps) => ({
  type: 'effect',
  fn,
  deps,
});

// ===== Component =====
function* Demo() {
  const [count, setCount] = yield useState(0);

  yield useEffect(() => {
    console.log('effect mount/update:', count);
    return () => {
      console.log('cleanup:', count);
    };
  }, [count]);

  if (count < 2) {
    setTimeout(() => setCount((c) => c + 1), 0);
  }

  return \`<div>\${count}</div>\`;
}

// ===== Run =====
createRuntime().mount(Demo);
`,paraId:264,tocIndex:76},{value:"\u4E0B\u9762\u662F",paraId:265,tocIndex:77},{value:"\u6700\u5173\u952E\u7684\u201C\u5BF9\u9F50\u70B9\u201D",paraId:265,tocIndex:77},{value:"\u3002",paraId:265,tocIndex:77},{value:`const changed = !prev || !shallowEqual(prev.deps, eff.deps);
`,paraId:266,tocIndex:78},{value:"\u5BF9\u5E94 React\uFF1A",paraId:267,tocIndex:78},{value:"render \u9636\u6BB5\u53EA\u505A",paraId:268,tocIndex:78},{value:"\u7EAF\u8BA1\u7B97",paraId:268,tocIndex:78},{value:"\u51B3\u5B9A\uFF1A",paraId:269,tocIndex:78},{value:"\u662F\u5426\u9700\u8981\u6267\u884C effect",paraId:270,tocIndex:78},{value:"\u662F\u5426\u9700\u8981 cleanup",paraId:270,tocIndex:78},{value:"\u6CE8\u610F\uFF1A\u8FD9\u91CC ",paraId:271,tocIndex:78},{value:"\u6CA1\u6709\u6267\u884C\u4EFB\u4F55\u526F\u4F5C\u7528",paraId:271,tocIndex:78},{value:`effects.push(() => {
  if (hooks[idx].cleanup) {
    hooks[idx].cleanup();
  }
  const cleanup = eff.fn();
});
`,paraId:272,tocIndex:79},{value:"\u771F\u5B9E\u8BED\u4E49\uFF1A",paraId:273,tocIndex:79},{value:`cleanup(prev)
effect(next)
`,paraId:274,tocIndex:79},{value:"\u8FD9\u89E3\u91CA\u4E86\u4E00\u4E2A\u7ECF\u5178\u95EE\u9898\uFF1A",paraId:275,tocIndex:79},{value:"\u2753 \u4E3A\u4EC0\u4E48 cleanup \u62FF\u5230\u7684\u662F\u201C\u65E7\u95ED\u5305\u201D\uFF1F",paraId:276,tocIndex:79},{value:"\u56E0\u4E3A\uFF1A",paraId:277,tocIndex:79},{value:"cleanup \u6C38\u8FDC\u7ED1\u5B9A\u7684\u662F ",paraId:278,tocIndex:79},{value:"\u4E0A\u4E00\u6B21 render \u7684 effect",paraId:278,tocIndex:79},{value:"\u4F60\u53EF\u4EE5\u770B\u5230\uFF1A",paraId:279,tocIndex:80},{value:"render\uFF1A\u53EA\u662F\u767B\u8BB0",paraId:280,tocIndex:80},{value:"commit\uFF1A\u624D\u771F\u6B63\u8C03\u7528",paraId:280,tocIndex:80},{value:"\u8FD9\u5C31\u662F\u4E3A\u4EC0\u4E48 React \u53EF\u4EE5\uFF1A",paraId:281,tocIndex:80},{value:"\u4E22\u5F03 render",paraId:282,tocIndex:80},{value:"\u91CD\u6765 render",paraId:282,tocIndex:80},{value:"\u4F46 ",paraId:282,tocIndex:80},{value:"\u4E0D\u4F1A\u91CD\u590D\u6267\u884C\u526F\u4F5C\u7528",paraId:282,tocIndex:80},{value:"\u5982\u679C\u4F60\u5728 ",paraId:283,tocIndex:81},{value:"mount",paraId:283,tocIndex:81},{value:" \u65F6\u8C03\u7528\u4E24\u6B21 ",paraId:283,tocIndex:81},{value:"render()",paraId:283,tocIndex:81},{value:"\uFF1A",paraId:283,tocIndex:81},{value:`render();
render();
commit();
`,paraId:284,tocIndex:81},{value:"\u4F60\u4F1A\u770B\u5230\uFF1A",paraId:285,tocIndex:81},{value:"effect \u53EA\u6267\u884C\u4E00\u6B21",paraId:286,tocIndex:81},{value:"cleanup \u884C\u4E3A\u5B8C\u5168\u5408\u7406",paraId:286,tocIndex:81},{value:"\u8FD9\u6B63\u662F React StrictMode \u7684\u6D4B\u8BD5\u7B56\u7565\u3002",paraId:287,tocIndex:81},{value:"\u901A\u8FC7\u8FD9\u4E2A Demo\uFF0C\u4F60\u5DF2\u7ECF\u80FD\u76F4\u89C2\u770B\u5230\uFF1A",paraId:288,tocIndex:82},{value:"React \u884C\u4E3A",paraId:289,tocIndex:82},{value:"\u4E3A\u4EC0\u4E48",paraId:289,tocIndex:82},{value:"effect \u5EF6\u8FDF",paraId:289,tocIndex:82},{value:"render / commit \u5206\u79BB",paraId:289,tocIndex:82},{value:"cleanup \u62FF\u65E7\u503C",paraId:289,tocIndex:82},{value:"\u95ED\u5305 + \u5EF6\u8FDF\u6267\u884C",paraId:289,tocIndex:82},{value:"deps \u51B3\u5B9A\u6267\u884C",paraId:289,tocIndex:82},{value:"render \u9636\u6BB5\u7EAF\u5BF9\u6BD4",paraId:289,tocIndex:82},{value:"effect \u53EF\u80FD\u8DF3\u8FC7",paraId:289,tocIndex:82},{value:"deps \u672A\u53D8\u5316",paraId:289,tocIndex:82},{value:"render \u53EF\u4E22\u5F03",paraId:289,tocIndex:82},{value:"\u6CA1\u6709\u526F\u4F5C\u7528",paraId:289,tocIndex:82},{value:"\u8FD9\u4E2A\u5B9E\u73B0\u5DF2\u7ECF\u5177\u5907 ",paraId:290,tocIndex:83},{value:"React useEffect \u7684\u5168\u90E8\u672C\u8D28\u7279\u5F81",paraId:290,tocIndex:83},{value:"\uFF1A",paraId:290,tocIndex:83},{value:"\u2714 deps \u7CBE\u786E\u5BF9\u6BD4",paraId:291,tocIndex:83},{value:"\u2714 cleanup \u65F6\u673A\u6B63\u786E",paraId:291,tocIndex:83},{value:"\u2714 \u95ED\u5305\u8BED\u4E49\u4E00\u81F4",paraId:291,tocIndex:83},{value:"\u2714 render \u9636\u6BB5\u7EAF",paraId:291,tocIndex:83},{value:"\u2714 commit \u9636\u6BB5\u526F\u4F5C\u7528",paraId:291,tocIndex:83},{value:"\u5269\u4E0B React \u771F\u6B63\u66F4\u590D\u6742\u7684\u5730\u65B9\uFF0C\u53EA\u662F\uFF1A",paraId:292,tocIndex:83},{value:"\u6279\u91CF\u8C03\u5EA6",paraId:293,tocIndex:83},{value:"\u4F18\u5148\u7EA7",paraId:293,tocIndex:83},{value:"\u591A Fiber \u6811",paraId:293,tocIndex:83},{value:"Suspense / Offscreen",paraId:293,tocIndex:83},{value:"\u4E0D\u662F\u6A21\u578B\u95EE\u9898\uFF0C\u800C\u662F\u5DE5\u7A0B\u89C4\u6A21\u95EE\u9898\u3002",paraId:294,tocIndex:83},{value:`useEffect \u4E0D\u662F\u201C\u751F\u547D\u5468\u671F\u66FF\u4EE3\u54C1\u201D\uFF0C
\u800C\u662F\u4E00\u5957\u201C\u5EF6\u8FDF\u6267\u884C + \u4F9D\u8D56\u611F\u77E5 + \u53EF\u64A4\u9500\u201D\u7684\u526F\u4F5C\u7528\u534F\u8BAE\u3002`,paraId:295,tocIndex:84},{value:"\u4F60\u73B0\u5728\u8FD9 80 \u591A\u884C\u4EE3\u7801\uFF0C\u5DF2\u7ECF\u628A\u8FD9\u5957\u534F\u8BAE",paraId:296,tocIndex:84},{value:"\u5B8C\u5168\u663E\u6027\u5316",paraId:296,tocIndex:84},{value:"\u4E86\u3002",paraId:296,tocIndex:84},{value:"\u5982\u679C\u4F60\u613F\u610F\uFF0C\u4E0B\u4E00\u6B65\u53EF\u4EE5\u7EE7\u7EED\u5F80\u4E24\u4E2A\u201C\u7EC8\u6781\u65B9\u5411\u201D\u8D70\u4E4B\u4E00\uFF1A",paraId:297,tocIndex:84},{value:"\u5728\u8FD9\u4E2A\u6A21\u578B\u4E0A\u52A0\u5165\u65F6\u95F4\u5207\u7247\uFF08shouldYield\uFF09\u2192 \u5B8C\u6574 Fiber",paraId:298,tocIndex:84},{value:"\u628A\u6574\u4E2A Demo \u6539\u5199\u6210 CPS\uFF08next \u56DE\u8C03\uFF09\u2192 \u5BF9\u7167 Generator",paraId:298,tocIndex:84},{value:"\u8FD9\u4E24\u6761\u8DEF\u90FD\u975E\u5E38\u786C\uFF0C\u4F60\u9009\u4E00\u6761\uFF0C\u6211\u7EE7\u7EED\u3002",paraId:299,tocIndex:84},{value:"\u4E0B\u9762\u6211\u4F1A",paraId:300,tocIndex:84},{value:"\u628A\u4F60\u73B0\u5728\u8FD9\u4E2A\u201CGenerator + Fiber\u201D\u6A21\u578B\uFF0C\u7B49\u4EF7\u5730\u6539\u5199\u6210 CPS\uFF08Continuation-Passing Style\uFF0C",paraId:300,tocIndex:84},{value:"next",paraId:300,tocIndex:84},{value:" \u56DE\u8C03\uFF09\u7248\u672C",paraId:300,tocIndex:84},{value:"\uFF0C\u5E76\u4E14",paraId:300,tocIndex:84},{value:"\u9010\u70B9\u5BF9\u7167 Generator",paraId:300,tocIndex:84},{value:"\uFF0C\u8BA9\u4F60\u6E05\u695A\u770B\u5230\uFF1A",paraId:300,tocIndex:84},{value:"React Fiber \u672C\u8D28\u4E0A\u5C31\u662F\u201C\u624B\u5199 CPS \u7684\u6267\u884C\u5F15\u64CE\u201D",paraId:301,tocIndex:84},{value:"\u8FD9\u4E00\u6B65\u4E0D\u662F\u201C\u518D\u5B66\u4E00\u79CD\u5199\u6CD5\u201D\uFF0C\u800C\u662F",paraId:302,tocIndex:84},{value:"\u8BC1\u660E\uFF1AHooks / Fiber / Concurrent \u7684\u6A21\u578B\u4E0E Generator \u65E0\u5173\uFF0C\u53EA\u4E0E CPS \u6709\u5173",paraId:302,tocIndex:84},{value:"\u3002",paraId:302,tocIndex:84},{value:`Generator \u2248 \u8BED\u8A00\u7EA7 CPS
React Fiber \u2248 \u624B\u5199 CPS Runtime
Hooks \u89C4\u5219 \u2248 CPS \u7ED3\u6784\u7EA6\u675F`,paraId:303,tocIndex:85},{value:`Generator \u662F\u201C\u4F60\u628A continuation \u4EA4\u7ED9\u8BED\u8A00\u201D\uFF0C
React \u662F\u201C\u6211\u4E0D\u7528\u8BED\u8A00\u7279\u6027\uFF0C\u81EA\u5DF1\u7EF4\u62A4 continuation\u201D\u3002`,paraId:304,tocIndex:85},{value:`function* Counter() {
  const [count, setCount] = yield useState(0);

  yield useEffect(() => {
    console.log('effect', count);
  }, [count]);

  return \`<div>\${count}</div>\`;
}
`,paraId:305,tocIndex:87},{value:`Counter(state0, state1, next /* continuation */);
`,paraId:306,tocIndex:88},{value:"\u6BCF\u4E00\u4E2A ",paraId:307,tocIndex:88},{value:"yield",paraId:307,tocIndex:88},{value:"\uFF0C\u5728 CPS \u91CC\u5C31\u662F\uFF1A",paraId:307,tocIndex:88},{value:"\u201C\u628A\u540E\u7EED\u903B\u8F91\u5305\u88C5\u6210\u4E00\u4E2A\u51FD\u6570\uFF0C\u4EA4\u7ED9 runtime\u201D",paraId:308,tocIndex:88},{value:"\u4E0B\u9762\u662F",paraId:309,tocIndex:89},{value:"\u5B8C\u6574\u53EF\u8FD0\u884C\u7684 CPS \u7248\u672C",paraId:309,tocIndex:89},{value:"\uFF0C\u7ED3\u6784\u548C Generator \u7248\u4E00\u4E00\u5BF9\u5E94\u3002",paraId:309,tocIndex:89},{value:`const useState = (init) => ({ type: 'state', init });
const useEffect = (fn, deps) => ({ type: 'effect', fn, deps });
`,paraId:310,tocIndex:90},{value:`function Counter(props, next) {
  useStateCPS(0, ([count, setCount]) => {
    useEffectCPS(
      () => {
        console.log('effect:', count);
        return () => console.log('cleanup:', count);
      },
      [count],
      () => {
        next(\`<div>\${count}</div>\`);
      },
    );
  });
}
`,paraId:311,tocIndex:91},{value:"\u5173\u952E\u70B9\uFF1A",paraId:312,tocIndex:91},{value:"\u6CA1\u6709 ",paraId:313,tocIndex:91},{value:"return",paraId:313,tocIndex:91},{value:"\u6BCF\u4E00\u6B65\u90FD\u663E\u5F0F\u8C03\u7528 ",paraId:313,tocIndex:91},{value:"next",paraId:313,tocIndex:91},{value:"continuation \u5C31\u662F\u201C\u51FD\u6570\u5269\u4F59\u90E8\u5206\u201D",paraId:313,tocIndex:91},{value:`function createRuntime() {
  let hooks = [];
  let effects = [];
  let i = 0;
  let work = null;

  function shallowEqual(a, b) {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => Object.is(v, b[i]));
  }

  function useStateCPS(init, cont) {
    const idx = i++;
    if (!hooks[idx]) hooks[idx] = { value: init };

    const setState = (next) => {
      hooks[idx].value =
        typeof next === 'function' ? next(hooks[idx].value) : next;
      schedule();
    };

    work = () => cont([hooks[idx].value, setState]);
  }

  function useEffectCPS(fn, deps, cont) {
    const idx = i++;
    const prev = hooks[idx];
    const changed = !prev || !shallowEqual(prev.deps, deps);

    hooks[idx] = {
      deps,
      cleanup: prev && prev.cleanup,
    };

    if (changed) {
      effects.push(() => {
        if (hooks[idx].cleanup) hooks[idx].cleanup();
        const cleanup = fn();
        if (typeof cleanup === 'function') {
          hooks[idx].cleanup = cleanup;
        }
      });
    }

    work = cont;
  }

  function performWork() {
    const w = work;
    work = null;
    w && w();
  }

  function commit() {
    effects.forEach((fn) => fn());
    effects = [];
  }

  function schedule() {
    i = 0;
    effects = [];
    Counter(null, () => {});
    while (work) performWork();
    commit();
  }

  return { mount: schedule };
}
`,paraId:314,tocIndex:92},{value:`createRuntime().mount();
`,paraId:315,tocIndex:93},{value:"Generator",paraId:316,tocIndex:94},{value:"CPS",paraId:316,tocIndex:94},{value:"yield eff",paraId:316,tocIndex:94},{value:"useXxxCPS(eff, cont)",paraId:316,tocIndex:94},{value:"iterator.next()",paraId:316,tocIndex:94},{value:"cont()",paraId:316,tocIndex:94},{value:"JS \u5F15\u64CE\u4FDD\u5B58\u72B6\u6001",paraId:316,tocIndex:94},{value:"runtime \u4FDD\u5B58 ",paraId:316,tocIndex:94},{value:"work",paraId:316,tocIndex:94},{value:"\u8BED\u8A00\u7EA7\u6682\u505C",paraId:316,tocIndex:94},{value:"\u624B\u5199 continuation",paraId:316,tocIndex:94},{value:"iterator",paraId:316,tocIndex:94},{value:"work queue",paraId:316,tocIndex:94},{value:"\u672C\u8D28\u662F\u4E00\u6837\u7684",paraId:317,tocIndex:94},{value:"\uFF1A",paraId:317,tocIndex:94},{value:"\u6BCF\u4E00\u6B65\u90FD\u628A\u201C\u63A5\u4E0B\u6765\u8981\u505A\u4EC0\u4E48\u201D\u4EA4\u51FA\u53BB",paraId:318,tocIndex:94},{value:"\u8FD9\u662F\u4E00\u4E2A",paraId:319,tocIndex:95},{value:"\u7EAF\u5DE5\u7A0B\u51B3\u7B56",paraId:319,tocIndex:95},{value:"\uFF1A",paraId:319,tocIndex:95},{value:"JS \u6CA1\u6709 ",paraId:320,tocIndex:96},{value:"yield* interrupt",paraId:320,tocIndex:96},{value:"\u5F02\u5E38\u3001\u8C03\u8BD5\u3001\u6808\u8FFD\u8E2A\u6781\u5DEE",paraId:320,tocIndex:96},{value:"\u7EC4\u4EF6\u4E0D\u518D\u662F\u666E\u901A\u51FD\u6570",paraId:321,tocIndex:97},{value:"\u9AD8\u9636\u7EC4\u4EF6 / class \u65E0\u6CD5\u7EDF\u4E00",paraId:321,tocIndex:97},{value:"\u4F18\u5148\u7EA7",paraId:322,tocIndex:98},{value:"lanes",paraId:322,tocIndex:98},{value:"\u4E2D\u65AD / \u6062\u590D",paraId:322,tocIndex:98},{value:"\u56DE\u653E / \u4E22\u5F03",paraId:322,tocIndex:98},{value:"Fiber = CPS Runtime + Scheduler",paraId:323,tocIndex:98},{value:"\u73B0\u5728\u4F60\u53EF\u4EE5\u91CD\u65B0\u7406\u89E3 Hooks \u89C4\u5219\uFF1A",paraId:324,tocIndex:99},{value:"\u2753 \u4E3A\u4EC0\u4E48 Hook \u4E0D\u80FD\u5199\u5728 if \u91CC\uFF1F",paraId:325,tocIndex:99},{value:"\u5728 CPS \u4E0B\u7B54\u6848\u975E\u5E38\u76F4\u89C2\uFF1A",paraId:326,tocIndex:99},{value:`useStateCPS(...)
if (cond) {
  useEffectCPS(...)
}
`,paraId:327,tocIndex:99},{value:`\u{1F449} continuation \u7ED3\u6784\u4E0D\u7A33\u5B9A
\u{1F449} runtime \u65E0\u6CD5\u6B63\u786E\u62FC\u63A5\u540E\u7EED\u6D41\u7A0B`,paraId:328,tocIndex:99},{value:"Hooks \u89C4\u5219 = CPS \u7ED3\u6784\u7EA6\u675F",paraId:329,tocIndex:99},{value:`React \u5E76\u6CA1\u6709\u53D1\u660E\u65B0\u7684\u7F16\u7A0B\u6A21\u578B\u3002
\u5B83\u628A 60 \u5E74\u524D\u7684 CPS / \u534F\u7A0B\u601D\u60F3\uFF0C
\u624B\u5199\u6210\u4E86\u4E00\u5957\u5BF9\u524D\u7AEF\u5DE5\u7A0B\u53CB\u597D\u7684 Runtime\u3002`,paraId:330,tocIndex:100},{value:"Generator\uFF1A\u7406\u8BBA\u4E0A\u66F4\u4F18\u96C5",paraId:331,tocIndex:100},{value:"CPS\uFF1A\u5DE5\u7A0B\u4E0A\u552F\u4E00\u53EF\u63A7",paraId:331,tocIndex:100},{value:"React Hooks\uFF0C\u53EA\u662F\u8FD9\u5957 CPS Runtime \u7684",paraId:332,tocIndex:100},{value:"\u58F0\u660E\u5F0F\u5916\u58F3",paraId:332,tocIndex:100},{value:"\u3002",paraId:332,tocIndex:100},{value:"\u5982\u679C\u4F60\u613F\u610F\uFF0C\u4E0B\u4E00\u6B65\u5DF2\u7ECF\u4E0D\u662F\u201CReact \u6559\u7A0B\u201D\u7EA7\u522B\u4E86\uFF0C\u800C\u662F",paraId:333,tocIndex:100},{value:"\u8BED\u8A00\u4E0E\u6846\u67B6\u8BBE\u8BA1\u5C42\u9762",paraId:333,tocIndex:100},{value:"\uFF0C\u6211\u53EF\u4EE5\u7EE7\u7EED\uFF1A",paraId:333,tocIndex:100},{value:"\u7528 CPS \u6A21\u578B\u53CD\u63A8 Hooks API \u4E3A\u4EC0\u4E48\u53EA\u80FD\u957F\u8FD9\u6837",paraId:334,tocIndex:100},{value:"\u89E3\u91CA\u4E3A\u4EC0\u4E48 ",paraId:334,tocIndex:100},{value:"use",paraId:334,tocIndex:100},{value:" / async rendering \u662F CPS \u7684\u81EA\u7136\u5EF6\u4F38",paraId:334,tocIndex:100},{value:"\u628A\u8FD9\u4E00\u6574\u5957\u5199\u6210\u4E00\u7BC7\u201CReact = CPS Runtime\u201D\u7684\u957F\u6587\u5927\u7EB2",paraId:334,tocIndex:100},{value:"\u4F60\u9009\u4E00\u4E2A\uFF0C\u57FA\u672C\u5C31\u5230\u201C\u4F5C\u8005\u7EA7\u7406\u89E3\u201D\u4E86\u3002",paraId:335,tocIndex:100},{value:"\u597D\uFF0C\u6211\u4EEC",paraId:336,tocIndex:100},{value:"\u56DE\u5230 Generator \u7248\u672C",paraId:336,tocIndex:100},{value:"\uFF0C\u5E76\u4E14\u628A\u5B83\u6574\u7406\u6210\u4E00\u4E2A",paraId:336,tocIndex:100},{value:"\u53EF\u5728\u6D4F\u89C8\u5668\u76F4\u63A5\u6253\u5F00\u7684 HTML Demo",paraId:336,tocIndex:100},{value:"\uFF0C\u6EE1\u8DB3\u4F60\u8FD9\u51E0\u4E2A\u660E\u786E\u76EE\u6807\uFF1A",paraId:336,tocIndex:100},{value:"\u4ECD\u7136\u662F ",paraId:337,tocIndex:100},{value:"Generator Runtime",paraId:337,tocIndex:100},{value:"\u652F\u6301\uFF1A",paraId:338,tocIndex:100},{value:"useState",paraId:339,tocIndex:100},{value:"setState \u2192 rerender",paraId:339,tocIndex:100},{value:"useEffect (deps + cleanup)",paraId:339,tocIndex:100},{value:"\u65F6\u95F4\u5207\u7247 / \u53EF\u4E2D\u65AD\uFF08shouldYield\uFF09",paraId:339,tocIndex:100},{value:"\u5728 ",paraId:340,tocIndex:100},{value:"HTML \u4E2D\u53EF\u89C6\u5316\u5C55\u793A\u7279\u6027",paraId:340,tocIndex:100},{value:"\u5E26",paraId:341,tocIndex:100},{value:"\u7B80\u5355\u6D4B\u8BD5\u7528\u4F8B\uFF08\u884C\u4E3A\u53EF\u9A8C\u8BC1\uFF0C\u800C\u4E0D\u662F Jest\uFF09",paraId:341,tocIndex:100},{value:"\u6211\u4F1A\u6309\u300C",paraId:342,tocIndex:100},{value:"\u6700\u5C0F\u4F46\u5B8C\u6574",paraId:342,tocIndex:100},{value:"\u300D\u539F\u5219\u6765\uFF0C\u4E0D\u5F15\u5165\u4EFB\u4F55\u591A\u4F59\u62BD\u8C61\u3002",paraId:342,tocIndex:100},{value:"\u6253\u5F00 HTML \u540E\u4F60\u4F1A\u770B\u5230\uFF1A",paraId:343,tocIndex:101},{value:"\u4E00\u4E2A\u8BA1\u6570\u5668 UI",paraId:344,tocIndex:101},{value:"\u70B9\u51FB\u6309\u94AE\u4F1A\uFF1A",paraId:345,tocIndex:101},{value:"\u89E6\u53D1 ",paraId:346,tocIndex:101},{value:"setState",paraId:346,tocIndex:101},{value:"\u91CD\u65B0 render",paraId:346,tocIndex:101},{value:"\u6B63\u786E\u6267\u884C effect / cleanup",paraId:346,tocIndex:101},{value:"\u63A7\u5236\u53F0\u53EF\u4EE5\u770B\u5230\uFF1A",paraId:347,tocIndex:101},{value:"render \u88AB\u5207\u7247\uFF08\u4E2D\u9014 yield\uFF09",paraId:348,tocIndex:101},{value:"effect \u5728 commit \u9636\u6BB5\u6267\u884C",paraId:348,tocIndex:101},{value:"\u9875\u9762\u4E0A\u4F1A\u663E\u793A ",paraId:349,tocIndex:101},{value:"\u5F53\u524D render \u6B21\u6570 / effect \u6B21\u6570",paraId:349,tocIndex:101},{value:"\uFF08\u5F53\u4F5C\u6D4B\u8BD5\u65AD\u8A00\uFF09",paraId:349,tocIndex:101},{value:"\u2705 ",paraId:350,tocIndex:102},{value:"\u590D\u5236 \u2192 \u4FDD\u5B58\u4E3A ",paraId:350,tocIndex:102},{value:"index.html",paraId:350,tocIndex:102},{value:" \u2192 \u6D4F\u89C8\u5668\u6253\u5F00",paraId:350,tocIndex:102},{value:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Mini React (Generator Runtime)</title>
    <style>
      body {
        font-family: sans-serif;
        padding: 20px;
      }
      button {
        padding: 6px 12px;
      }
      .box {
        border: 1px solid #ccc;
        padding: 12px;
        margin-top: 12px;
      }
    </style>
  </head>
  <body>
    <h2>Mini React-like (Generator + Fiber)</h2>

    <div id="app"></div>

    <script>
      /* =========================
       *  Scheduler
       * ========================= */

      let deadline = 0;
      function shouldYield() {
        return performance.now() > deadline;
      }

      /* =========================
       *  Hook declarations
       * ========================= */

      const useState = (init) => ({ type: 'state', init });
      const useEffect = (fn, deps) => ({ type: 'effect', fn, deps });

      /* =========================
       *  Component (Generator)
       * ========================= */

      function* Counter() {
        const [count, setCount] = yield useState(0);

        yield useEffect(() => {
          effectRuns++;
          console.log('effect run:', count);
          return () => console.log('cleanup:', count);
        }, [count]);

        renderRuns++;

        return \`
    <div class="box">
      <div>count: \${count}</div>
      <button id="btn">+1</button>
      <div>render runs: \${renderRuns}</div>
      <div>effect runs: \${effectRuns}</div>
    </div>
  \`;
      }

      /* =========================
       *  Runtime
       * ========================= */

      let hooks = [];
      let hookIndex = 0;
      let effects = [];
      let iterator = null;

      let renderRuns = 0;
      let effectRuns = 0;

      function shallowEqual(a, b) {
        if (!a || !b) return false;
        if (a.length !== b.length) return false;
        return a.every((v, i) => Object.is(v, b[i]));
      }

      function run(deadlineTime) {
        deadline = deadlineTime;
        while (true) {
          const { value, done } = iterator.next();
          if (done) {
            commit(value);
            return;
          }

          if (value.type === 'state') {
            const i = hookIndex++;
            if (!hooks[i]) hooks[i] = { value: value.init };

            const setState = (next) => {
              hooks[i].value =
                typeof next === 'function' ? next(hooks[i].value) : next;
              schedule();
            };

            iterator.next([hooks[i].value, setState]);
          }

          if (value.type === 'effect') {
            const i = hookIndex++;
            const prev = hooks[i];
            const changed = !prev || !shallowEqual(prev.deps, value.deps);

            hooks[i] = {
              deps: value.deps,
              cleanup: prev && prev.cleanup,
            };

            if (changed) {
              effects.push(() => {
                if (hooks[i].cleanup) hooks[i].cleanup();
                const cleanup = value.fn();
                if (typeof cleanup === 'function') {
                  hooks[i].cleanup = cleanup;
                }
              });
            }

            iterator.next();
          }

          if (shouldYield()) {
            console.log('\u23F8 yield render');
            requestIdleCallback(run);
            return;
          }
        }
      }

      function commit(html) {
        document.getElementById('app').innerHTML = html;

        document.getElementById('btn').onclick = () => {
          hooks[0].value++;
          schedule();
        };

        effects.forEach((fn) => fn());
        effects = [];
      }

      /* =========================
       *  Schedule
       * ========================= */

      function schedule() {
        hookIndex = 0;
        effects = [];
        iterator = Counter();
        requestIdleCallback(run);
      }

      /* =========================
       *  Mount
       * ========================= */

      schedule();
    <\/script>
  </body>
</html>
`,paraId:351,tocIndex:102},{value:`function* Counter() {
  const [count, setCount] = yield useState(0);
  yield useEffect(...)
  return view;
}
`,paraId:352,tocIndex:104},{value:"yield",paraId:353,tocIndex:104},{value:" \u5C31\u662F ",paraId:353,tocIndex:104},{value:"Hook \u58F0\u660E",paraId:353,tocIndex:104},{value:"Generator \u81EA\u52A8\u4FDD\u5B58\u6267\u884C\u4F4D\u7F6E\uFF08Fiber \u7684\u7406\u8BBA\u6A21\u578B\uFF09",paraId:353,tocIndex:104},{value:`hookIndex++;
hooks[i];
`,paraId:354,tocIndex:105},{value:"\u5B8C\u5168\u590D\u73B0\uFF1A",paraId:355,tocIndex:105},{value:"\u201CHooks \u5FC5\u987B\u6309\u987A\u5E8F\u8C03\u7528\u201D",paraId:356,tocIndex:105},{value:"\u5199\u8FDB ",paraId:357,tocIndex:105},{value:"if",paraId:357,tocIndex:105},{value:" \u91CC\u4F1A\u7ACB\u523B\u70B8\uFF08\u4F60\u53EF\u4EE5\u81EA\u5DF1\u8BD5\uFF09",paraId:357,tocIndex:105},{value:`\u2714 deps \u5BF9\u6BD4
\u2714 cleanup
\u2714 commit \u9636\u6BB5\u6267\u884C
\u2714 render \u9636\u6BB5\u4E0D\u6267\u884C\u526F\u4F5C\u7528`,paraId:358,tocIndex:106},{value:`render \u2192 \u6536\u96C6 effect
commit \u2192 \u6267\u884C effect / cleanup
`,paraId:359,tocIndex:106},{value:`if (shouldYield()) {
  requestIdleCallback(run);
  return;
}
`,paraId:360,tocIndex:107},{value:"\u4F60\u5728\u63A7\u5236\u53F0\u80FD\u770B\u5230\uFF1A",paraId:361,tocIndex:107},{value:`\u23F8 yield render
\u23F8 yield render
effect run: 1
`,paraId:362,tocIndex:107},{value:"\u8FD9\u5C31\u662F ",paraId:363,tocIndex:107},{value:"Fiber \u53EF\u4E2D\u65AD\u6E32\u67D3",paraId:363,tocIndex:107},{value:"\u3002",paraId:363,tocIndex:107},{value:`hooks[0].value++;
schedule();
`,paraId:364,tocIndex:108},{value:"\u9875\u9762\u4E0A\u4F60\u80FD\u770B\u5230\uFF1A",paraId:365,tocIndex:108},{value:"count",paraId:366,tocIndex:108},{value:" \u9012\u589E",paraId:366,tocIndex:108},{value:"render runs",paraId:366,tocIndex:108},{value:" \u6BCF\u6B21\u90FD +1",paraId:366,tocIndex:108},{value:"effect runs",paraId:366,tocIndex:108},{value:" \u53EA\u5728 deps \u53D8\u65F6 +1",paraId:366,tocIndex:108},{value:"\u8FD9\u5C31\u662F ",paraId:367,tocIndex:108},{value:"\u884C\u4E3A\u7EA7\u6D4B\u8BD5",paraId:367,tocIndex:108},{value:"\u3002",paraId:367,tocIndex:108},{value:"\u8FD9\u5DF2\u7ECF\u4E0D\u662F\u201C\u73A9\u5177\u201D\u4E86\uFF0C\u800C\u662F\uFF1A",paraId:368,tocIndex:109},{value:"React Fiber \u7684\u53EF\u6267\u884C\u3001\u53EF\u9A8C\u8BC1\u3001\u53EF\u89C6\u5316\u6A21\u578B",paraId:369,tocIndex:109},{value:"\u4F60\u73B0\u5728\u5DF2\u7ECF\u53EF\u4EE5\uFF1A",paraId:370,tocIndex:109},{value:"\u7528\u5B83\u89E3\u91CA Hooks \u89C4\u5219",paraId:371,tocIndex:109},{value:"\u7528\u5B83\u89E3\u91CA Concurrent",paraId:371,tocIndex:109},{value:"\u7528\u5B83\u89E3\u91CA effect / commit",paraId:371,tocIndex:109},{value:"\u7528\u5B83\u89E3\u91CA\u4E3A\u4EC0\u4E48 React \u6CA1\u9009 Generator\uFF08\u4F46\u601D\u60F3\u7B49\u4EF7\uFF09",paraId:371,tocIndex:109},{value:"\u63A5\u4E0B\u6765\u53EA\u5269\u4E09\u6761\u300C\u5C01\u795E\u8DEF\u7EBF\u300D\uFF1A",paraId:372,tocIndex:110},{value:"\u5728\u8FD9\u4E2A\u6A21\u578B\u4E0A\u52A0 Lane / Priority",paraId:373,tocIndex:110},{value:"\u5BF9\u6BD4 Generator vs CPS \u7684\u6808\u4E0E\u8C03\u5EA6\u6210\u672C",paraId:373,tocIndex:110},{value:"\u628A\u8FD9\u4E2A Demo \u5199\u6210\u4E00\u7BC7\u300AReact = Generator Runtime\u300B\u6280\u672F\u6587\u7AE0",paraId:373,tocIndex:110},{value:`\u4F60\u53EA\u8981\u8BF4\u4E00\u53E5\uFF1A
\u{1F449}\u300C\u5199\u6210\u6587\u7AE0\u300D / \u300C\u7EE7\u7EED\u6269\u5C55 Runtime\u300D / \u300C\u5BF9\u6BD4 CPS\u300D`,paraId:374,tocIndex:110}]}}]);
