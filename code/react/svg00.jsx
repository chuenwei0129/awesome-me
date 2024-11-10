/**
 * iframe: true
 */
import React from 'react';

export default function App() {
  {
    /* SVG 可以通过 JavaScript 动态创建并注入到 HTML DOM 中。 */
  }

  const svgContainerRef = React.useRef();

  React.useEffect(() => {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');

    // 创建 SVG 元素
    svg.setAttribute('width', '300');
    svg.setAttribute('height', '200');
    svg.setAttribute('xmlns', svgNS);

    // 创建矩形元素
    const rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', 'red');

    // 创建圆形元素
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '150');
    circle.setAttribute('cy', '100');
    circle.setAttribute('r', '80');
    circle.setAttribute('fill', 'green');

    // 创建文本元素
    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', '150');
    text.setAttribute('y', '120');
    text.setAttribute('font-size', '60'); // 使用 font-size 而不是 fontSize
    text.setAttribute('text-anchor', 'middle'); // 使用 text-anchor 而不是 textAnchor
    text.setAttribute('fill', 'white');
    text.textContent = 'SVG';

    // 将所有元素添加到 SVG 容器中
    svg.appendChild(rect);
    svg.appendChild(circle);
    svg.appendChild(text);

    // 将 SVG 容器添加到 HTML DOM 中
    svgContainerRef.current?.appendChild(svg);
  }, []);

  return (
    <div ref={svgContainerRef}>
      {/* SVG 可以直接被嵌入到 HTML 中。 */}
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" rx={30} ry={30} fill="red" />
        <circle cx="150" cy="100" r="80" fill="green" />
        <text x="150" y="120" fontSize="60" textAnchor="middle" fill="white">
          SVG
        </text>
      </svg>
      {/* 可以使用 img 元素。 */}
      <img
        width={200}
        height={200}
        src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/knife.svg"
        alt="logo"
      />
    </div>
  );
}
