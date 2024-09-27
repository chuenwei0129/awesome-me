import { ConfigProvider, Space } from 'naifu';
import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 100px;
  height: 100px;
  background: pink;
  border: 1px solid #000;
`;

const demo1 = () => {
  return (
    <>
      <ConfigProvider
        // 此外，你也可以不直接设置 size，而是通过 ConfigProvider 修改 context 中的默认值
        // 这样如果有多个 Space 组件就不用每个都设置了，统一加个 ConfigProvider 就行了
        space={{
          size: 100,
        }}
      >
        <Space split={<Box style={{ background: 'yellow' }} />}>
          <Box />
          <Box />
        </Space>
      </ConfigProvider>
    </>
  );
};

export default demo1;
