import fs from 'fs';

async function main() {
  // const stream = await client.chat.completions.create({
  //   model: 'gpt-4o',
  //   messages: [{ role: 'user', content: '生成一个 Table 的 React 组件' }],
  //   stream: true,
  // });

  const stream = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: fs.readFileSync('./system.md', 'utf-8') },
      { role: 'user', content: '生成一个 Table 的 React 组件' },
      { role: 'assistant', content: fs.readFileSync('./res1.md', 'utf-8') },
      { role: 'user', content: '在这个基础上加上 styled-component 写下样式，并且不要用 table' },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
