---
nav:
  title: 我
  order: -1
title: 我的标题
order: -1
---

总是处于漫长 TodoList的开端，何其倦怠

## 你好 👋，我是奀歪

## 名字由来

## 我的编程之旅

## 我会什么

## 联系方式

- 📮 Email: [1024962666@qq.com](mailto:1024962666@qq.com)
- 📱 微信: [1024962666](https://wx.qq.com/)
- 🐦 Twitter: [@your-twitter](https://twitter.com/your-twitter
- 📷 Instagram: [@your-instagram](https://www.instagram.com/your-instagram/)
- 📸 抖音: [@your-douyin](https://www.douyin.com/user/your-douyin
- 📹 Bilibili: [@your-bilibili](https://space.bilibili.com/your-bilibili/
- 🎥 YouTube: [@your-youtube](https://www.youtube.com/channel/your-youtube
- 🐙 GitHub: [@your-github](https://github.com/your-github
- 💼 LinkedIn: [@your-linkedin](https://www.linkedin.com/in/your-linkedin/
- 🌐 个人网站: [https://your-website.com](https://your-website.com)
- 

愧怍，有愧疚/惭愧之意😔。也是本人使用此名所想表达的意思。

我曾因某些错误的做法而感到自责苦恼，希望这个名字不断激励自我、反省过往，不再辜负我自己所经历的那么多事情。

我与计算机结识较晚，高考结束我才拥有第一台笔记本电脑。我的第一门编程语言是易语言，我学习到了外挂、逆向破解、注册机(批量)、网络协议(偏加密分析和爬虫向)、自动化脚本等技术。后来编写过一个对大学生友好的软件被厦门某工作室看到，于是选择休学一同合作创业。复学重返校园，我的技术栈发生了大转换，从逆向工程转为 Web 全栈开发。

对易语言失去了新鲜感的我，需要一门更为强大的技术来支撑我编写体验友好的应用供客户使用，在逆向学习中积累了一定的 JS 知识，这也是我为什么会选择前端的原因。依靠跨平台解决方案，Web 网站、桌面端/移动端应用、小程序等应用都不在话下。

或许是因为学习易语言的因素，我走的全是野路子，学的偏门的技术，我并未系统性的学习过 CS 知识。我对编程知识的理解来源于自我实践、不断折腾的过程当中。

如今我也算有了 5 年的编程经验(2 年逆向 + 3 年 Web)。对 Web 开发也有些乏味，想要重新找回曾经的那股折腾劲。或许会考虑换个赛道，AI 大模型？IOS 开发与逆向？Rust？硬件开发？总之别让自己闲下来，只有忙碌才能让每天过得充实而有意义。

兴趣爱好
手指极限 入坑长达 8 年(现已退坑)，如转笔、魔方、花切等有关手指旋转的都能够杂耍一番, 现在偶尔还会转转卡片/手机。我不擅长录制，因此没留下多少素材。

电音迷 歌单只有电音，也只听电音。戴上耳机，沉浸在无限律动之中。有生之年定要制作首电子音乐。

编程开发 将想法付诸实践, 享受创造的乐趣。

<code src="../playground/react/interview-00"></code>

<code src="../playground/react/QuineClock"></code>

```jsx
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
```

## 1.2

## 2

## 这是什么？

这里存放了我的笔记，是我的知识仓库，第二大脑。

## 为什么？

笔记记了不看，或者记了以后不和其他笔记产生关联，或者不进行二次三次修改优化是无法对大脑神经连接的结构产生影响的。

笔记的形式根本不重要，最重要的是笔记能否影响大脑的思考。

就像一本书再怎么精装、精致，如果读者不反复阅读，也没什么区别。

```jsx
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
```
