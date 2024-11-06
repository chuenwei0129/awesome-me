---
title: WebGL
toc: content
group:
  title: 深入探讨
---

## 图形系统是如何绘图的？

**一个典型的绘图过程：**

1. 首先，数据经过 CPU 处理，成为具有特定结构的几何信息。
2. 然后，这些信息会被送到 GPU 中进行处理。在 GPU 中要经过两个步骤生成光栅信息。
3. 这些光栅信息会输出到帧缓存中，最后渲染到屏幕上。

![20240626040617](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240626040617.png)

图形数据经过GPU处理最终输出到屏幕上这个绘图过程是现代计算机中任意一种图形系统处理图形的通用过程。它主要做了两件事：

1. 一是对给定的数据结合绘图的场景要素（例如相机、光源、遮挡物体等等）进行计算，最终将图形变为屏幕空间的 2D 坐标。
2. 二是为屏幕空间的每个像素点进行着色，把最终完成的图形输出到显示设备上。

这整个过程是一步一步进行的，前一步的输出就是后一步的输入，所以我们也把这个过程叫做**渲染管线（RenderPipelines）**。

**概念科普：**

- **光栅（Raster）**：几乎所有的现代图形系统都是基于光栅来绘制图形的，光栅就是指构成图像的像素阵列。
- **像素（Pixel）**：一个像素对应图像上的一个点，它通常保存图像上的某个具体位置的颜色等信息。
- **帧缓存（Frame Buffer）**：在绘图过程中，像素信息被存放于帧缓存中，帧缓存是一块内存地址。
- **CPU（Central Processing Unit）**：中央处理单元，负责逻辑计算。
- **GPU（Graphics Processing Unit）**：图形处理单元，负责图形计算。

## 如何用 WebGL 绘制三角形？

流览器提供的 WebGL API 是 OpenGL ES 的 JavaScript 绑定版本，它赋予了开发者操作 GPU 的能力。

我们可以总结为以下 5 个步骤：

1. 创建 WebGL 上下文
2. 创建 WebGL 程序
3. 将数据存入缓冲区
4. 将缓冲区数据读取到 GPU
5. GPU 执行 WebGL 程序，输出结果

下面是一个用 WebGL 绘制三角形的简单示例：

### 第一步：创建 WebGL 上下文

首先，我们需要获取 WebGL 上下文。这是与 WebGL 交互的基础。不过，有了 WebGL 上下文对象之后，我们并不能像使用 Canvas2D 的上下文那样，调用几个绘图指令就把图形画出来。

```html
<body>
    <canvas id="glCanvas" width="640" height="480"></canvas>
    <script>
        // 获取Canvas元素
        const canvas = document.getElementById("glCanvas");

        // 获取WebGL上下文
        const gl = canvas.getContext("webgl");

        // 检查WebGL是否可用
        if (!gl) {
            console.error("WebGL not supported, falling back on experimental-webgl");
            gl = canvas.getContext("experimental-webgl");
        }

        if (!gl) {
            alert("Your browser does not support WebGL");
        }
    </script>
</body>
```

### 第二步：创建 WebGL 程序

接下来，我们需要创建一个 WebGL 程序，并将顶点着色器和片段着色器附加到该程序。

**这里的 WebGL 程序是一个 WebGLProgram 对象，它是给 GPU 最终运行着色器的程序。着色器是用 GLSL 这种编程语言编写的代码片段。**

> 为什么要创建两个着色器呢？

在绘图的时候，**WebGL 是以顶点和图元来描述图形几何信息的**。

- 顶点就是几何图形的顶点，比如，三角形有三个顶点，四边形有四个顶点。
- 图元是 WebGL 可直接处理的图形单元，由 WebGL 的绘图模式决定，有点、线、三角形等等。

顶点和图元是绘图过程中必不可少的。因此，WebGL 绘制一个图形的过程，一般需要用到两段着色器，一段叫 **顶点着色器（Vertex Shader）** 负责处理图形的顶点信息，另一段叫 **片元着色器（Fragment Shader）** 负责处理图形的像素信息。

我们可以把顶点着色器理解为处理顶点的 GPU 程序代码。它可以改变顶点的信息（如顶点的坐标、法线方向、材质等等），从而改变我们绘制出来的图形的形状或者大小等等。

顶点处理完成之后，WebGL 就会根据顶点和绘图模式指定的图元，计算出需要着色的像素点，然后对它们执行片元着色器程序。

WebGL 从顶点着色器和图元提取像素点给片元着色器执行代码的过程，就是生成光栅信息的过程，我们也叫它光栅化过程。

> 举个例子。
>
> 我们可以将图元设为线段，那么片元着色器就会处理顶点之间的线段上的像素点信息，这样画出来的图形就是空心的。而如果我们把图元设为三角形，那么片元着色器就会处理三角形内部的所有像素点，这样画出来的图形就是实心的。
>
> ![20240626044218](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240626044218.png)

因为图元是 WebGL 可以直接处理的图形单元，所以**其他非图元的图形最终必须要转换为图元才可以被 WebGL 处理**。举个例子，如果我们要绘制实心的四边形，我们就需要将四边形拆分成两个三角形，再交给 WebGL 分别绘制出来。

> 还要注意，片元着色器对像素点着色的过程是并行的。也就是说，无论有多少个像素点，片元着色器都可以同时处理。

创建 WebGL 程序的步骤：

1. 在 JavaScript 中，顶点着色器和片元着色器只是一段代码片段，所以我们要将它们分别创建成 shader 对象。
2. 创建 WebGLProgram 对象，并将这两个 shader 关联到这个 WebGL 程序上。WebGLProgram 对象的创建过程主要是添加 vertexShader 和 fragmentShader，然后将这个 WebGLProgram 对象链接到 WebGL 上下文对象上。
3. 最后，我们要通过 useProgram 选择启用这个 WebGLPrgame 对象。这样，当我们绘制图形时，GPU 就会执行我们通过 WebGLProgram 设定的 两个 shader 程序了。

```html
<script>
    // 定义顶点着色器
    const vertexShaderSource = `
        attribute vec4 aVertexPosition;
        void main(void) {
            gl_Position = aVertexPosition;
        }
    `;

    // 定义片段着色器
    const fragmentShaderSource = `
        void main(void) {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // 白色
        }
    `;

    // 创建并编译着色器
    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // 创建WebGL程序
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    }

    gl.useProgram(shaderProgram);
</script>
```

### 第三步：将数据存入缓冲区

WebGL 的坐标系是一个三维空间坐标系，坐标原点是（0,0,0）。其中，x 轴朝右，y 轴朝上，z 轴朝外。这是一个右手坐标系。

![20240626050152](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240626050152.png)

WebGL 使用的数据需要用类型数组定义，默认格式是 Float32Array。Float32Array 是 JavaScript 的一种类型化数组（TypedArray），JavaScript 通常用类型化数组来处理二进制缓冲区。

我们需要定义三角形的顶点数据，并将其存储在缓冲区中。

这个过程可以简单总结为三步，分别是创建一个缓存对象，将它绑定为当前操作对象，再把当前的数据写入缓存对象。这三个步骤主要是利用 createBuffer、bindBuffer、bufferData 方法来实现的。

```html
<script>
    // 定义三角形的顶点数据
    const vertices = new Float32Array([
         0.0,  1.0, // 顶点1
        -1.0, -1.0, // 顶点2
         1.0, -1.0  // 顶点3
    ]);

    // 创建缓冲区
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
</script>
```

### 第四步：将缓冲区数据读取到 GPU

现在我们已经把数据写入缓存了，但是我们的 shader 现在还不能读取这个数据，还需要把数据绑定给顶点着色器中的 aVertexPosition 变量。

我们的顶点着色器是按如下的形式定义的：

```js
const vertexShaderSource = `
        attribute vec4 aVertexPosition;
        void main(void) {
            gl_Position = aVertexPosition;
        }
    `;
```

在 GLSL 中，attribute 表示声明变量，vec4 是变量的类型，aVertexPosition 是变量名。

接下来我们将 buffer 的数据绑定给顶点着色器的 aVertexPosition 变量。

```html
<script>
    // 获取顶点着色器中的 aVertexPosition 变量的地址
    const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
    gl.enableVertexAttribArray(vertexPosition);
    gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
</script>
```

经过这样的处理，在顶点着色器中，我们定义的 vertices 类型数组中对应的值，就能通过变量 aVertexPosition 读到了。

### 第五步：GPU 执行 WebGL 程序，输出结果

我们先调用 `gl.clear` 将当前画布的内容清除，然后调用 `gl.drawArrays` 传入绘制模式。这里我们选择 `gl.TRIANGLES` 表示以三角形为图元绘制，再传入绘制的顶点偏移量和顶点数量，WebGL 就会将对应的 buffer 数组传给顶点着色器，并且开始绘制。

```html
<script>
    // 设置清除颜色为黑色，不透明
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 清除颜色缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, 3);
</script>
```

```jsx
import React, { useRef, useEffect } from 'react';

const WebGLTriangle = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('Unable to initialize WebGL. Your browser may not support it.');
      return;
    }

    const vertexShaderSource = `
      attribute vec4 aVertexPosition;
      void main(void) {
        gl_Position = aVertexPosition;
      }
    `;

    const fragmentShaderSource = `
      void main(void) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
      }
    `;

    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (gl, vertexShaderSource, fragmentShaderSource) => {
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
      if (!vertexShader || !fragmentShader) return null;

      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const initBuffers = (gl) => {
      const vertices = new Float32Array([
        0.0,  1.0,
       -1.0, -1.0,
        1.0, -1.0,
      ]);

      const vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) return null;

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      return vertexBuffer;
    };

    const drawScene = (gl, program, buffer) => {
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

      const vertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
      gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vertexPosition);

      gl.useProgram(program);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const shaderProgram = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!shaderProgram) return;

    const buffers = initBuffers(gl);
    if (!buffers) return;

    drawScene(gl, shaderProgram, buffers);

  }, []);

  return <canvas ref={canvasRef} width={640} height={480} />;
};

export default WebGLTriangle;
```

## 顶点着色器的作用

顶点着色器在计算机图形学中发挥着重要作用。它主要有两个关键功能：

1. **设置顶点位置（gl_Position）**：
   - 顶点着色器的一个主要任务是计算并设置每个顶点的最终位置。这通常涉及从局部坐标系转换到世界坐标系，再到视图坐标系，最后到裁剪坐标系。最终结果存储在特殊的内置变量 `gl_Position` 中。

2. **传递数据到片元着色器（varying 变量）**：
   - 顶点着色器可以定义并计算一些中间变量，这些变量会被插值后传递给片元着色器。这些变量通常使用 `varying` 关键字（在现代 OpenGL 中使用 `out` 关键字）来声明。常见的例子包括颜色、纹理坐标、法线等。

为了更具体地理解这两个功能，我们可以通过一个简单的三角形渲染例子来说明。

### 示例：渲染一个三角形

假设我们有一个简单的三角形，我们想要渲染它并给它添加颜色。首先，我们需要定义顶点着色器和片元着色器。

#### 顶点着色器代码（GLSL）：

```glsl
#version 330 core

layout(location = 0) in vec3 aPos; // 输入的顶点位置
layout(location = 1) in vec3 aColor; // 输入的顶点颜色

out vec3 ourColor; // 向片元着色器传递的颜色

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    gl_Position = projection * view * model * vec4(aPos, 1.0); // 设置顶点位置
    ourColor = aColor; // 传递颜色数据
}
```

#### 片元着色器代码（GLSL）：

```glsl
#version 330 core

in vec3 ourColor; // 从顶点着色器传递过来的颜色

out vec4 FragColor; // 最终输出的颜色

void main()
{
    FragColor = vec4(ourColor, 1.0); // 设置片元颜色
}
```

### 解释

- **顶点着色器**：
  - `aPos` 和 `aColor` 是输入的顶点位置和颜色。
  - `gl_Position` 计算了顶点在最终屏幕上的位置。
  - `ourColor` 是一个 `varying` 变量，用于将顶点颜色传递给片元着色器。

- **片元着色器**：
  - `ourColor` 接收从顶点着色器传递过来的插值颜色。
  - `FragColor` 设置片元的最终颜色。

通过这个例子，我们可以清楚地看到顶点着色器的两个主要作用：计算顶点位置并通过 `varying` 变量传递数据给片元着色器。
