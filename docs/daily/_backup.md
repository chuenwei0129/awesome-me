
<!-- <code id="react-examples-1" src="../playground/react-examples/demo1.tsx"></code>
<code id="react-examples-2" src="../playground/react-examples/demo2.tsx"></code>

<code id="react-compiler-1" src="../playground/react-compiler/demo1.tsx"></code>
<code id="react-compiler-2" src="../playground/react-compiler/demo2.tsx"></code> -->

<!-- <code id="audio" src="../projects/audio-player/App.tsx"></code> -->

<!-- <code id="sp-1" src="../playground/dom/1.tsx"></code> -->

<!-- <code id="spring-1" src="../playground/react-spring-examples/demo1.tsx"></code>
<code id="spring-2" src="../playground/react-spring-examples/demo2.tsx"></code>
<code id="spring-3" src="../playground/react-spring-examples/demo3.tsx"></code>
<code id="spring-4" src="../playground/react-spring-examples/demo4.tsx"></code>
<code id="spring-5" src="../playground/react-spring-examples/demo5.tsx"></code>
<code id="spring-6" src="../playground/react-spring-examples/demo6.tsx"></code> -->

<!-- <code id="dnd-2" src="../playground/react-dnd-examples/demo2.tsx"></code> -->

<!-- <code src="../playground/react-dnd-examples/demo1.tsx"></code> -->

<!-- ```tsx
import React, { useRef, useEffect, useState } from 'react';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [circleHovered, setCircleHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const circle = { x: 150, y: 150, radius: 50 };

    const drawCircle = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = circleHovered ? 'red' : 'blue';
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas?.getBoundingClientRect();
      const x = event.clientX - (rect?.left ?? 0);
      const y = event.clientY - (rect?.top ?? 0);

      const distance = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
      setCircleHovered(distance < circle.radius);
    };

    drawCircle();
    canvas?.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [circleHovered]);

  return <canvas ref={canvasRef} width={300} height={300} />;
};

export default CanvasComponent;
``` -->

<!-- <code src="../playground/pages/Guide"></code> -->

<!-- <code src="../playground/react/interview-00"></code> -->

<!-- <code src="../playground/react/QuineClock"></code> -->

<!-- ```jsx
/**
 * inline: true
 *
 */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 20px;
    padding: 20px;
    border: 1px dashed #cccccc;
    font-family: 'SimSun, serif';
    background-color: #FAFAFA;
    max-width: 600px;
    line-height: 2em;
    position: relative;
`;

const Header = styled.div`
    text-align: center;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    margin-bottom: 10px;
`;

const Title = styled.h2`
    margin: 0;
`;

const Author = styled.p`
    margin: 0;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    writing-mode: vertical-rl;
    text-align: left;
    height: 420px;
    margin: 0 auto;
    line-height: 2em;
    white-space: nowrap;
`;

const Paragraph = styled.p`
    margin: 0;
    padding: 0 10px;
`;

const Footer = styled.div`
    text-align: left;
    writing-mode: vertical-rl;
    position: absolute;
    bottom: 20px;
    left: 20px;
    line-height: 2em;
`;

const FooterText = styled.p`
    margin: 0;
`;

const TengWangGeXu = ({ title, author, content, footer }) => {
    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                <Author>{author}</Author>
            </Header>
            <Content>
                <Paragraph>
                    {content.map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </Paragraph>
            </Content>
            <Footer>
                {footer.map((line, index) => (
                    <FooterText key={index}>{line}</FooterText>
                ))}
            </Footer>
        </Container>
    );
}

const text = [
"扫庭中、纷飞狼藉，暮光斑驳。",
"求佛从来忘名字，忽听轻音唤着。",
"欲怪此、心魔交错。",
"蓦见阶前红惜影，被晚霜、勾勒身羸弱。",
"隔岁月，恍如昨。",
"贫僧法号为痴觉。",
"问施主、驾临山寺，有何言托。",
"幽目凝云曾未答，但见泪光清濯。",
"有万语、唇边休却。",
"不恨三年无消息，只恨他、影瘦人单薄。",
"梵乐里，秋风作。"
];

const footer = [
    "2024.09.01",
    "诗词节选"
];


export default () => <TengWangGeXu title="《金缕曲》" author="佚名" content={text} footer={footer} />
``` -->

<!-- ```jsx
/**
 * inline: true
 */
import React from 'react';

const ShuShiBiao = () => {
    return (
        <div style={{
            margin: '20px',
            padding: '20px',
            border: '1px dashed #cccccc',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            lineHeight: '1.8em',
            backgroundColor: '#FAFAFA'
        }}>
            <div style={{
                textAlign: 'center',
                borderBottom: '1px solid #cccccc',
                paddingBottom: '10px',
                marginBottom: '10px'
            }}>
                <h2 style={{ margin: '0' }}>文言文</h2>
            </div>
            <div>
                <h3 style={{ textAlign: 'center', margin: '0' }}>出师表</h3>
                <p style={{ textIndent: '2em', margin: '10px 0' }}>
                    先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
                </p>
                <h3 style={{ textAlign: 'center', margin: '0' }}>后出师表</h3>
                <p style={{ textIndent: '2em', margin: '10px 0' }}>
                    先帝深虑汉、贼不两立，王业不偏安，故托臣以讨贼也。以先帝之明，量臣之才，固知臣伐贼，才弱敌强也。然不伐贼，王业亦亡。惟坐而待亡，孰与伐之？是故托臣而弗疑也。
                </p>
                <p style={{ textAlign: 'right', marginTop: '20px', marginBottom: '0' }}>
                    诸葛亮 三国
                </p>
                <p style={{ textAlign: 'right', marginTop: '5px' }}>
                    节选
                </p>
            </div>
        </div>
    );
}

export default ShuShiBiao;
```

```jsx
import React from 'react';

const TengWangGeXu = () => {
    return (
        <div style={{
            margin: '20px',
            padding: '20px',
            border: '1px dashed #cccccc',
            fontFamily: 'SimSun, serif',
            backgroundColor: '#FAFAFA',
            maxWidth: '400px',
            lineHeight: '2em',
            position: 'relative'
        }}>
            <div style={{
                textAlign: 'center',
                borderBottom: '1px solid #cccccc',
                paddingBottom: '10px',
                marginBottom: '10px'
            }}>
                <h2 style={{ margin: '0' }}>滕王阁序</h2>
                <p style={{ margin: '0' }}>王勃</p>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                writingMode: 'vertical-rl',
                textAlign: 'left',
                height: '420px',
                margin: '0 auto',
                lineHeight: '2em',
                whiteSpace: 'nowrap'
            }}>
                <p style={{ margin: '0', padding: '0 10px' }}>
                    时维九月，序属三秋。<br />
                    潦水尽而寒潭清，烟光凝而暮山紫。<br />
                    俨骖𬴂于上路，访风景于崇阿。<br />
                    临帝子之长洲，得天人之旧馆。<br />
                    层峦耸翠，上出重霄；<br />
                    飞阁流丹，下临无地。<br />
                    鹰隼之濯清，穷岛屿之萦回；<br />
                    桂殿兰宫，即冈峦之体势。
                </p>
            </div>
            <div style={{
                textAlign: 'left',
                writingMode: 'vertical-rl',
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                lineHeight: '2em'
            }}>
                <p style={{ margin: '0' }}>重九日</p>
                <p style={{ margin: '0' }}>节选</p>
            </div>
        </div>
    );
}

export default TengWangGeXu;
```

```jsx
import React from 'react';

const TengWangGeXu = ({ title, author, content, footer }) => {
    return (
        <div className="m-5 p-5 border border-dashed border-gray-300 font-sans bg-gray-100 max-w-xs leading-8 relative">
            <div className="text-center border-b border-gray-300 pb-2 mb-2">
                <h2 className="m-0">{title}</h2>
                <p className="m-0">{author}</p>
            </div>
            <div className="flex justify-center writing-mode-vertical-rl text-left h-96 mx-auto leading-8 whitespace-nowrap">
                <p className="m-0 px-2">
                    {content.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
            </div>
            <div className="text-left writing-mode-vertical-rl absolute bottom-5 left-5 leading-8">
                {footer.split('\n').map((line, index) => (
                    <p className="m-0" key={index}>{line}</p>
                ))}
            </div>
        </div>
    );
}

const App = () => {
    const title = "滕王阁序";
    const author = "王勃";
    const content = `时维九月，序属三秋。
潦水尽而寒潭清，烟光凝而暮山紫。
俨骖𬴂于上路，访风景于崇阿。
临帝子之长洲，得天人之旧馆。
层峦耸翠，上出重霄；
飞阁流丹，下临无地。
鹰隼之濯清，穷岛屿之萦回；
桂殿兰宫，即冈峦之体势。`;
    const footer = `重九日
节选`;

    return (
        <TengWangGeXu title={title} author={author} content={content} footer={footer} />
    );
}

export default App;
``` -->

<!-- <img src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/F2Gacz4WkAAQZuh.jpeg" width="40%" alt="javascript"/> -->
