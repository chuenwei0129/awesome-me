export const renderGif = function (data, options) {
  let objReturn = {
    element: null,
    paused: false,
    play: function () {},
    pause: function () {},
    restart: function () {},
    frameIndex: -1,
  };
  // 如果浏览器不支持
  if (typeof ImageDecoder == 'undefined') {
    console.error('当前浏览器不支持 ImageDecoder API，无法暂停 GIF');
    return objReturn;
  }
  if (typeof data == 'undefined') {
    data = 'img[src$=".gif"]';
  }
  if (typeof data == 'string') {
    data = document.querySelectorAll(data);
  }

  if (!data) {
    return objReturn;
  }

  // 支持 NodeList 对象
  if (data.forEach) {
    data.forEach(function (ele, index) {
      const obj = renderGif(ele);

      if (index === 0) {
        objReturn = obj;
      }
    });

    return objReturn;
  }

  var defaults = {
    bindEvent: true,
    restart: true,
  };

  const params = Object.assign(defaults, options || {});

  // gif 图片的 url 地址
  const src = data.src;

  if (!src) {
    return;
  }

  const dom = data;

  // 创建的用来播放gif的canvas元素
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // 一些与GIF播放有关的变量
  let imageDecoder = null;
  let imageIndex = 0;
  let paused = false;

  // 绘制方法
  const renderImage = function (result) {
    context.drawImage(result.image, 0, 0);

    const track = imageDecoder.tracks.selectedTrack;

    // 如果播放结束，从头开始循环
    if (imageDecoder.complete) {
      if (track.frameCount === 1) {
        return;
      }

      if (imageIndex + 1 >= track.frameCount) {
        imageIndex = 0;
      }
    }

    // 绘制下一帧内容
    imageDecoder
      .decode({ frameIndex: ++imageIndex })
      .then((nextResult) => {
        if (paused === false) {
          setTimeout(() => {
            renderImage(nextResult);
          }, result.image.duration / 1000.0);
        } else {
          canvas.nextResult = nextResult;
        }
      })
      .catch((e) => {
        // imageIndex可能超出的容错处理
        if (e instanceof RangeError) {
          imageIndex = 0;
          imageDecoder.decode({ frameIndex: imageIndex }).then(renderImage);
        } else {
          throw e;
        }
      });
  };

  // 判断地址能够请求
  fetch(src).then((response) => {
    // 可以请求，进行样式处理
    // 设置canvas尺寸
    canvas.width = dom.naturalWidth;
    canvas.height = dom.naturalHeight;
    // 实际显示尺寸
    canvas.style.width = dom.clientWidth + 'px';
    canvas.style.height = dom.clientHeight + 'px';

    // 将GIF绘制在canvas上
    imageDecoder = new ImageDecoder({
      data: response.body,
      type: 'image/gif',
    });

    // 解析第一帧并绘制
    imageDecoder
      .decode({
        frameIndex: imageIndex,
      })
      .then(renderImage);
  });

  // 播放和暂停方法
  const play = function () {
    paused = false;
    renderImage(canvas.nextResult);
  };

  const pause = function () {
    paused = true;
  };

  const restart = function () {
    paused = false;
    imageIndex = 0;
    imageDecoder.decode({ frameIndex: imageIndex }).then(renderImage);
  };

  if (params.bindEvent) {
    // 事件绑定处理
    dom.addEventListener('click', function () {
      if (paused) {
        play();
      } else {
        pause();
      }
    });

    canvas.addEventListener('click', function () {
      if (paused) {
        play();
      } else {
        pause();
      }
    });
  }

  // 返回数据和方法
  objReturn = {
    element: data,
    paused,
    play,
    pause,
    restart,
    frameIndex: imageIndex,
  };

  // 几个布尔值和数值属性实时获取
  Object.defineProperties(objReturn, {
    paused: {
      get: function () {
        return paused;
      },
    },
    frameIndex: {
      get: function () {
        return imageIndex;
      },
    },
  });

  return objReturn;
};
