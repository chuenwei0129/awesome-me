# 网页元素<!-- omit in toc -->

- [a 元素](#a-元素)
  - [URL 相关属性](#url-相关属性)
  - [accessKey 属性](#accesskey-属性)
  - [download 属性](#download-属性)
  - [target 属性](#target-属性)
  - [type 属性](#type-属性)
- [img 元素](#img-元素)
- [form 元素](#form-元素)
  - [FormData 对象](#formdata-对象)
  - [表单的内置验证](#表单的内置验证)
    - [自动校验](#自动校验)
    - [checkValidity()](#checkvalidity)
    - [willValidate 属性](#willvalidate-属性)
    - [validity 属性](#validity-属性)
    - [表单的 novalidate 属性](#表单的-novalidate-属性)
  - [enctype 属性](#enctype-属性)
- [input 元素](#input-元素)
  - [属性](#属性)
  - [实例方法](#实例方法)
- [video 元素、audio 元素](#video-元素audio-元素)
  - [HTMLMediaElement 接口](#htmlmediaelement-接口)
    - [HTMLMediaElement 接口属性](#htmlmediaelement-接口属性)
    - [HTMLMediaElement 接口方法](#htmlmediaelement-接口方法)
  - [HTMLVideoElement 接口](#htmlvideoelement-接口)
  - [HTMLAudioElement 接口](#htmlaudioelement-接口)
  - [事件](#事件)

## a 元素

### URL 相关属性

`<a>` 元素有一系列 `URL` 相关属性，可以用来操作链接地址。

```js
// HTML 代码如下
// <a id="test" href="http://user:passwd@example.com:8081/index.html?bar=1#foo">test</a>
const a = document.getElementById('test');
a.hash // "#foo"
a.host // "example.com:8081"
a.hostname // "example.com"
a.href // "http://user:passed@example.com:8081/index.html?bar=1#foo"
a.origin // "http://example.com:8081"
a.password // "passwd"
a.pathname // "/index.html"
a.port // "8081"
a.protocol // "http:"
a.search // "?bar=1"
a.username // "user"
```

除了 `origin` 属性是只读的，上面这些属性都是可读写的。

### accessKey 属性

`accessKey` 属性用来读写 `<a>` 元素的快捷键。

```js
// HTML 代码如下
// <a id="test" href="http://example.com">test</a>
var a = document.getElementById('test');
a.accessKey = 'k';
```

### download 属性

表示当前链接不是用来浏览，而是用来下载的。它的值是一个字符串，表示用户下载得到的文件名。

```js
// HTML 代码如下
// <a id="test" href="foo.jpg">下载</a>
var a = document.getElementById('test');
a.download = 'bar.jpg';
```

### target 属性

`target` 属性用来读写 `<a>` 元素的 HTML 属性 `target`。

```js
// HTML 代码如下
// <a id="test" href="https://example.com" target="_blank">test</a>
var a = document.getElementById('test');
a.target // "_blank"
```

### type 属性

`type` 属性用来读写 `<a>` 元素的 HTML 属性 `type`，表示链接目标的 `MIME` 类型。

```js
// HTML 代码如下
// <a id="test" type="video/mp4" href="example.mp4">video</a>
var a = document.getElementById('test');
a.type // "video/mp4"
```

## img 元素

浏览器提供一个原生构造函数 `Image`，用于生成 `HTMLImageElement` 实例。

`Image` 构造函数可以接受两个整数作为参数，分别表示 `<img>` 元素的宽度和高度。

新生成的 `<img>` 实例并不属于文档的一部分。如果想让它显示在文档中，必须手动插入文档。

```js
var img = new Image(200, 300);
img.src = 'image1.png';
document.body.appendChild(img);
```

除了使用 `Image` 构造，下面的方法也可以得到 `HTMLImageElement` 实例。

- `document.images` 的成员
- 节点选取方法（比如 document.getElementById）得到的 `<img>` 节点
- `document.createElement('img')` 生成的 `<img>` 节点

`HTMLImageElement.src` 属性返回图像的完整网址。

```js
// HTML 代码如下
// <img width="300" height="400" id="myImg" src="http://example.com/pic.jpg">
var img = document.getElementById('img');
img.src // http://example.com/pic.jpg
```

`HTMLImageElement.currentSrc` 属性返回当前正在展示的图像的网址。`JavaScript` 和 `CSS` 的 `mediaQuery` 都可能改变正在展示的图像。

`HTMLImageElement.x` 属性返回图像左上角相对于页面左上角的横坐标，`HTMLImageElement.y` 属性返回纵坐标。

图像加载完成，会触发 `onload` 属性指定的回调函数。图像加载过程中发生错误，会触发 `onerror` 属性指定的回调函数。

## form 元素

```html
<form action="/handling-page" method="post" id="myForm">
  <div>
    <label for="name">用户名：</label>
    <input type="text" id="name" name="user_name" />
  </div>
  <div>
    <label for="passwd">密码：</label>
    <input type="password" id="passwd" name="user_passwd" />
  </div>
  <div>
    <input type="submit" id="submit" name="submit_button" value="提交" />
  </div>
</form>
```

用户点击“提交”按钮，每一个控件都会生成一个键值对，键名是控件的 `name` 属性，键值是控件的 `value` 属性，键名和键值之间由等号连接。

所有的键值对都会提交到服务器。但是，提交的数据格式跟 `<form>` 元素的 `method` 属性有关。

如果是 `GET` 方法，所有键值对会以 `URL` 的查询字符串形式，提交到服务器，比如 `/handling-page?user_name=张三&user_passwd=123&submit_button=提交`。

下面就是 `GET` 请求的 `HTTP` 头信息。

```js
GET /handling-page?user_name=张三&user_passwd=123&submit_button=提交
Host: example.com
```

如果是 `POST` 方法，所有键值对会连接成一行，作为 `HTTP` 请求的数据体发送到服务器，比如 `user_name=张三&user_passwd=123&submit_button=提交`。

下面就是 `POST` 请求的头信息。

```js
POST /handling-page HTTP/1.1
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 74

user_name=张三&user_passwd=123&submit_button=提交
```

> 注意，实际提交的时候，只要键值不是 `URL` 的合法字符（比如汉字“张三”和“提交”），浏览器会自动对其进行编码。

表单里面的 `<button>` 元素如果没有用 `type` 属性指定类型，那么默认就是 `submit` 控件。


除了点击 `submit` 控件提交表单，还可以用表单元素的 `submit()` 方法，通过脚本提交表单。

```js
formElement.submit();
```

表单元素的 `reset()` 方法可以重置所有控件的值（重置为默认值）。

```js
formElement.reset()
```

### FormData 对象

表单数据以键值对的形式向服务器发送，这个过程是浏览器自动完成的。但是有时候，我们希望通过脚本完成这个过程，构造或编辑表单的键值对，然后通过脚本发送给服务器。浏览器原生提供了 `FormData` 对象来完成这项工作。

我们用 `FormData()` 处理上面这个表单。

```js
var myForm = document.getElementById('myForm');
var formData = new FormData(myForm);

// 获取某个控件的值
formData.get('username') // ""
// 设置某个控件的值
formData.set('username', '张三');
formData.get('username') // "张三"
```

`FormData` 提供以下实例方法。

- `FormData.get(key)`：获取指定键名对应的键值，参数为键名。如果有多个同名的键值对，则返回第一个键值对的键值。
- `FormData.getAll(key)`：返回一个数组，表示指定键名对应的所有键值。如果有多个同名的键值对，数组会包含所有的键值。
- `FormData.set(key, value)`：设置指定键名的键值，参数为键名。如果键名不存在，会添加这个键值对，否则会更新指定键名的键值。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
- `FormData.delete(key)`：删除一个键值对，参数为键名。
- `FormData.append(key, value)`：添加一个键值对。如果键名重复，则会生成两个相同键名的键值对。如果第二个参数是文件，还可以使用第三个参数，表示文件名。
- `FormData.has(key)`：返回一个布尔值，表示是否具有该键名的键值对。
- `FormData.keys()`：返回一个遍历器对象，用于 `for...of` 循环遍历所有的键名。
- `FormData.values()`：返回一个遍历器对象，用于 `for...of` 循环遍历所有的键值。
- `FormData.entries()`：返回一个遍历器对象，用于 `for...of` 循环遍历所有的键值对。如果直接用 `for...of` 循环遍历 `FormData` 实例，默认就会调用这个方法。

### 表单的内置验证 

#### 自动校验

表单提交的时候，浏览器允许开发者指定一些条件，它会自动验证各个表单控件的值是否符合条件。

```html
<!-- 必填 -->
<input required>

<!-- 必须符合正则表达式 -->
<input pattern="banana|cherry">

<!-- 字符串长度必须为6个字符 -->
<input minlength="6" maxlength="6">

<!-- 数值必须在1到10之间 -->
<input type="number" min="1" max="10">

<!-- 必须填入 Email 地址 -->
<input type="email">

<!-- 必须填入 URL -->
<input type="URL">
```

如果一个控件通过验证，它就会匹配 `:valid` 的 `CSS` 伪类，浏览器会继续进行表单提交的流程。如果没有通过验证，该控件就会匹配 `:invalid` 的 CSS 伪类，浏览器会终止表单提交，并显示一个错误信息。

```css
input:invalid {
	border-color: red;
}
input,
input:valid {
	border-color: #ccc;
}
```

#### checkValidity()

除了提交表单的时候，浏览器自动校验表单，还可以手动触发表单的校验。表单元素和表单控件都有 `checkValidity()` 方法，用于手动触发校验。

`checkValidity()` 方法返回一个布尔值，`true` 表示通过校验，`false` 表示没有通过校验。因此，提交表单可以封装为下面的函数。

```js
function submitForm(action) {
  var form = document.getElementById('form');
  form.action = action;
  if (form.checkValidity()) {
    form.submit();
  }
}
```

#### willValidate 属性

控件元素的 `willValidate` 属性是一个布尔值，表示该控件是否会在提交时进行校验。

```JS
// <form novalidate>
//   <input id="name" name="name" required />
// </form>

var input = document.querySelector('#name');
input.willValidate // true
```

#### validity 属性

控件元素的属性 `validity` 属性返回一个 `ValidityState` 对象，包含当前校验状态的信息。

该对象有以下属性，全部为只读属性。

- `ValidityState.valid`：布尔值，表示用户是否满足所有校验条件。
- `ValidityState.valueMissing`：布尔值，表示用户没有填入必填的值。

```js
var input = document.getElementById('myinput');
if (input.validity.valid) {
  console.log('通过校验');
} else {
  console.log('校验失败');
}
```

#### 表单的 novalidate 属性 

表单元素的 HTML 属性 `novalidate`，可以关闭浏览器的自动校验。

```html
<form novalidate>
</form>
```
这个属性也可以在脚本里设置。

```js
form.noValidate = true;
```

如果表单元素没有设置 `novalidate` 属性，那么提交按钮（`<button>`或`<input>`元素）的 `formnovalidate` 属性也有同样的作用。

```html
<form>
  <input type="submit" value="submit" formnovalidate>
</form>
```

### enctype 属性

如果表单使用 `GET` 方法发送数据，`enctype` 属性无效。

数据将以 `URL` 的查询字符串发出。

```js
?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
```

如果表单用 `POST` 方法发送数据，并省略 `enctype` 属性，那么数据以 `application/x-www-form-urlencoded` 格式发送（因为这是默认值）。

发送的 `HTTP` 请求如下。

```js
Content-Type: application/x-www-form-urlencoded

foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A
```

上面代码中，数据体里面的 `%0D%0A` 代表换行符（\r\n）。

如果表单使用 `POST` 方法发送数据，`enctype` 属性为 `text/plain`，那么数据将以纯文本格式发送。

```js
Content-Type: text/plain

foo=bar
baz=The first line.
The second line.
```

如果表单使用 `POST` 方法，`enctype` 属性为 `multipart/form-data`，那么数据将以混合的格式发送。

发送的 HTTP 请求如下。

```js
Content-Type: multipart/form-data; boundary=---------------------------314911788813839

-----------------------------314911788813839
Content-Disposition: form-data; name="foo"

bar
-----------------------------314911788813839
Content-Disposition: form-data; name="baz"

The first line.
The second line.

-----------------------------314911788813839--
```

这种格式也是文件上传的格式。

## input 元素

### 属性

以下属性只有在 `<input>` 元素可以输入文本时才有效。

- `maxLength`：整数，表示可以输入的字符串最大长度。如果设为负整数，会报错。该属性可读写。
- `pattern`：字符串，表示 `<input>` 节点的值应该满足的正则表达式。该属性可读写。
- `placeholder`：字符串，表示该 `<input>` 节点的占位符，作为对元素的提示。该字符串不能包含回车或换行。该属性可读写。
- `readOnly`：布尔值，表示用户是否可以修改该节点的值。该属性可读写。
- `min`：字符串，表示该节点的最小数值或日期，且不能大于 `max` 属性。该属性可读写。
- `max`：字符串，表示该节点的最大数值或日期，且不能小于 `min` 属性。该属性可读写。
- `selectionStart`：整数，表示选中文本的起始位置。如果没有选中文本，返回光标在 `<input>` 元素内部的位置。该属性可读写。
- `selectionEnd`：整数，表示选中文本的结束位置。如果没有选中文本，返回光标在 `<input>` 元素内部的位置。该属性可读写。
- `selectionDirection`：字符串，表示选中文本的方向。可能的值包括 `forward`（与文字书写方向一致）、`backward`（与文字书写方向相反）和 `none`（文字方向未知）。该属性可读写。
- `labels`：返回一个 `NodeList` 实例，代表绑定当前 `<input>` 节点的 `<label>` 元素。该属性只读。
- `defaultValue`：字符串，表示该 `<input>` 节点的原始值。


如果 `<input>` 元素的类型是复选框（checkbox）或单选框（radio），会有下面的特有属性。

- `checked`：布尔值，表示该 `<input>` 元素是否选中。该属性可读写。
- `defaultChecked`：布尔值，表示该 `<input>` 元素默认是否选中。该属性可读写。
- `indeterminate`：布尔值，表示该 `<input>` 元素是否还没有确定的状态。一旦用户点击过一次，该属性就会变成 `false`，表示用户已经给出确定的状态了。该属性可读写。
图像按钮的特有属性

如果 `<input>` 元素的类型是 `file`，就会变成一个文件上传按钮，会有下面的特有属性。

- `accept`：字符串，表示该元素可以接受的文件类型，类型之间使用逗号分隔。该属性可读写。
- `files`：返回一个 `FileList` 实例对象，包含了选中上传的一组 `File` 实例对象。

### 实例方法

- `focus()`：当前 `<input>` 元素获得焦点。
- `blur()`：移除 `<input>` 元素的焦点。
- `click()`：模拟鼠标点击当前的 `<input>` 元素。
- `checkValidity()`：返回一个布尔值，表示当前节点的校验结果。如果返回 `false`，表示不满足校验要求，否则就是校验成功或不必校验。


## video 元素、audio 元素

`<video>` 元素用来加载视频。`<audio>` 元素用来加载音频。

理论上，这两个 HTML 元素直接用 `src` 属性指定媒体文件，就可以使用了。

```html
<audio src="background_music.mp3"/>
<video src="news.mov" width=320 height=240/>
```

注意，`<video>` 元素有 `width` 属性和 `height` 属性，可以指定宽和高。`<audio>` 元素没有这两个属性，因为它的播放器外形是浏览器给定的，不能指定。

实际上，不同的浏览器支持不同的媒体格式，我们不得不用 `<source>` 元素指定同一个媒体文件的不同格式。

```html
<audio id="music">
  <source src="music.mp3" type="audio/mpeg">  
  <source src="music.ogg" type='audio/ogg; codec="vorbis"'>
</audio>
```

浏览器遇到支持的格式，就会忽略后面的格式。

> 这两个元素都有一个 `controls` 属性，只有打开这个属性，才会显示控制条。注意，`<audio>` 元素如果不打开 `controls` 属性，根本不会显示，而是直接在背景播放。

### HTMLMediaElement 接口

#### HTMLMediaElement 接口属性

- `HTMLMediaElement.audioTracks`：返回一个类似数组的对象，表示媒体文件包含的音轨。
- `HTMLMediaElement.autoplay`：布尔值，表示媒体文件是否自动播放，对应 HTML 属性 `autoplay`。
- `HTMLMediaElement.buffered`：返回一个 `TimeRanges` 对象，表示浏览器缓冲的内容。该对象的`length`属性返回缓存里面有多少段内容，`start(rangeId)` 方法返回指定的某段内容（从 0 开始）开始的时间点，`end()` 返回指定的某段内容结束的时间点。该属性只读。
- `HTMLMediaElement.controls`：布尔值，表示是否显示媒体文件的控制栏，对应 HTML 属性 `controls`。
- `HTMLMediaElement.controlsList`：返回一个类似数组的对象，表示是否显示控制栏的某些控件。该对象包含三个可能的值：`nodownload`、`nofullscreen` 和 `noremoteplayback`。该属性只读。
- `HTMLMediaElement.crossOrigin`：字符串，表示跨域请求时是否附带用户信息（比如 Cookie），对应 HTML 属性 `crossorigin`。该属性只有两个可能的值：`anonymous` 和 `use-credentials`。
- `HTMLMediaElement.currentSrc`：字符串，表示当前正在播放的媒体文件的绝对路径。该属性只读。
- `HTMLMediaElement.currentTime`：浮点数，表示当前播放的时间点。
- `HTMLMediaElement.defaultMuted`：布尔值，表示默认是否关闭音量，对应 HTML 属性 `muted`。
- `HTMLMediaElement.defaultPlaybackRate`：浮点数，表示默认的播放速率，默认是 `1.0`。
- `HTMLMediaElement.disableRemotePlayback`：布尔值，是否允许远程回放，即远程回放的时候是否会有工具栏。
- `HTMLMediaElement.duration`：浮点数，表示媒体文件的时间长度（单位秒）。如果当前没有媒体文件，该属性返回 0。该属性只读。
- `HTMLMediaElement.ended`：布尔值，表示当前媒体文件是否已经播放结束。该属性只读。
- `HTMLMediaElement.error`：返回最近一次报错的错误对象，如果没有报错，返回 `null`。
- `HTMLMediaElement.loop`：布尔值，表示媒体文件是否会循环播放，对应 HTML 属性 `loop`。
- `HTMLMediaElement.muted`：布尔值，表示音量是否关闭。
- `HTMLMediaElement.networkState`：当前网络状态，共有四个可能的值。`0` 表示没有数据；`1` 表示媒体元素处在激活状态，但是还没开始下载；`2` 表示下载中；`3` 表示没有找到媒体文件。
- `HTMLMediaElement.paused`：布尔值，表示媒体文件是否处在暂停状态。该属性只读。
- `HTMLMediaElement.playbackRate`：浮点数，表示媒体文件的播放速度，`1.0` 是正常速度。如果是负数，表示向后播放。
- `HTMLMediaElement.played`：返回一个 `TimeRanges` 对象，表示播放的媒体内容。该属性只读。
- `HTMLMediaElement.preload`：字符串，表示应该预加载哪些内容，可能的值为 `none`、`metadata` 和 `auto`。
- `HTMLMediaElement.readyState`：整数，表示媒体文件的准备状态，可能的值为 `0`（没有任何数据）、`1`（已获取元数据）、`2`（可播放当前帧，但不足以播放多个帧）、`3`（可以播放多帧，至少为两帧）、`4`（可以流畅播放）。该属性只读。
- `HTMLMediaElement.seekable`：返回一个 `TimeRanges` 对象，表示一个用户可以搜索的媒体内容范围。该属性只读。
- `HTMLMediaElement.seeking`：布尔值，表示媒体文件是否正在寻找新位置。该属性只读。
- `HTMLMediaElement.src`：布尔值，表示媒体文件的 URL，对应 HTML 属性 `src`。
- `HTMLMediaElement.srcObject`：返回 `src` 属性对应的媒体文件资源，可能是 `MediaStream`、`MediaSource`、`Blob` 或 `File` 对象。直接指定这个属性，就可以播放媒体文件。
- `HTMLMediaElement.textTracks`：返回一个类似数组的对象，包含所有文本轨道。该属性只读。
- `HTMLMediaElement.videoTracks`：返回一个类似数组的对象，包含多有视频轨道。该属性只读。
- `HTMLMediaElement.volume`：浮点数，表示音量。`0.0` 表示静音，`1.0` 表示最大音量。

#### HTMLMediaElement 接口方法

- `HTMLMediaElement.addTextTrack()`：添加文本轨道（比如字幕）到媒体文件。
- `HTMLMediaElement.captureStream()`：返回一个 `MediaStream` 对象，用来捕获当前媒体文件的流内容。
- `HTMLMediaElement.canPlayType()`：该方法接受一个 MIME 字符串作为参数，用来判断这种类型的媒体文件是否可以播放。该方法返回一个字符串，有三种可能的值，`probably` 表示似乎可播放，`maybe` 表示无法在不播放的情况下判断是否可播放，空字符串表示无法播放。
- `HTMLMediaElement.fastSeek()`：该方法接受一个浮点数作为参数，表示指定的时间（单位秒）。该方法将媒体文件移动到指定时间。
- `HTMLMediaElement.load()`：重新加载媒体文件。
- `HTMLMediaElement.pause()`：暂停播放。该方法没有返回值。
- `HTMLMediaElement.play()`：开始播放。该方法返回一个 `Promise` 对象。

### HTMLVideoElement 接口

`HTMLVideoElement.height`：字符串，表示视频播放区域的高度（单位像素），对应 HTML 属性 `height`。
`HTMLVideoElement.width`：字符串，表示视频播放区域的宽度（单位像素），对应 HTML 属性 `width`。
`HTMLVideoElement.videoHeight`：该属性只读，返回一个整数，表示视频文件自身的高度（单位像素）。
`HTMLVideoElement.videoWidth`：该属性只读，返回一个整数，表示视频文件自身的宽度（单位像素）。
HTMLVideoElement.`poster`：字符串，表示一个图像文件的 URL，用来在无法获取视频文件时替代显示，对应 HTML 属性 poster。
HTMLVideoElement.`getVideoPlaybackQuality()`：返回一个对象，包含了当前视频回放的一些数据。

### HTMLAudioElement 接口

该接口继承了 HTMLMediaElement，但是没有定义自己的属性和方法。浏览器原生提供一个 `Audio()` 构造函数，返回的就是 `HTMLAudioElement` 实例。

```js
var song = new Audio([URLString]);
```

`Audio()` 构造函数接受一个字符串作为参数，表示媒体文件的 URL。如果省略这个参数，可以稍后通过 `src` 属性指定。

生成 `HTMLAudioElement` 实例以后，不用插入 `DOM`，可以直接用 `play()` 方法在背景播放。

```js
var a = new Audio();
if (a.canPlayType('audio/wav')) {
  a.src = 'soundeffect.wav';
  a.play();
}
```

### 事件

`<video>` 和 `<audio>` 元素有以下事件。

- `loadstart`：开始加载媒体文件时触发。
- `progress`：媒体文件加载过程中触发，大概是每秒触发 2 到 8 次。
- `loadedmetadata`：媒体文件元数据加载成功时触发。
- `loadeddata`：当前播放位置加载成功后触发。
- `canplay`：已经加载了足够的数据，可以开始播放时触发，后面可能还会请求数据。
- `canplaythrough`：已经加载了足够的数据，可以一直播放时触发，后面不需要继续请求数据。
- `suspend`：已经缓冲了足够的数据，暂时停止下载时触发。
- `stalled`：尝试加载数据，但是没有数据返回时触发。
- `play`：调用 `play()` 方法时或自动播放启动时触发。如果已经加载了足够的数据，这个事件后面会紧跟 `playing` 事件，否则会触发 `waiting` 事件。
- `waiting`：由于没有足够的缓存数据，无法播放或播放停止时触发。一旦缓冲数据足够开始播放，后面就会紧跟 `playing` 事件。
- `playing`：媒体开始播放时触发。
- `timeupdate`：`currentTime` 属性变化时触发，每秒可能触发 4 到 60 次。
- `pause`：调用 `pause()` 方法、播放暂停时触发。
- `seeking`：脚本或者用户要求播放某个没有缓冲的位置，播放停止开始加载数据时触发。此时，`seeking` 属性返回 `true`。
- `seeked`：`seeking` 属性变回 `false` 时触发。
- `ended`：媒体文件播放完毕时触发。
- `durationchange`：`duration` 属性变化时触发。
- `volumechange`：音量变化时触发。
- `ratechange`：播放速度或默认的播放速度变化时触发。
- `abort`：停止加载媒体文件时触发，通常是用户主动要求停止下载。
- `error`：网络或其他原因导致媒体文件无法加载时触发。
- `emptied`：由于 `error` 或 `abort` 事件导致 `networkState` 属性变成无法获取数据时触发。


