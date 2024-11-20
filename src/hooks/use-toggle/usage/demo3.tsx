import React, { useState } from "react";
import { Button, Typography, Space } from "antd";

import { useToggle } from "naifu";

const ToggleChild = ({
  defaultValue,
  reverseValue,
}: {
  defaultValue: string;
  reverseValue: string;
}) => {
  const [state, { toggle }] = useToggle(defaultValue, reverseValue);

  return (
    <Space>
      <Button
        onClick={() => {
          toggle();
        }}
      >
        子组件切换
      </Button>
      <Typography.Text>{state}</Typography.Text>
    </Space>
  );
};
const ToggleComponent = () => {
  const [defaultValue, setDefaultValue] = useState("父组件的defaultValue");
  const [reverseValue, setReverseValue] = useState("父组件的reverseValue");

  return (
    <Space direction="vertical">
      <Button
        type="primary"
        onClick={() => {
          setDefaultValue("父组件的defaultValue改变了");
          setReverseValue("父组件的reverseValue改变了");
        }}
      >
        父组件切换
      </Button>
      <Space direction="vertical">
        <Typography.Text>
          <b>defaultValue当前值：</b>
          {defaultValue}
        </Typography.Text>
        <Typography.Text>
          <b>reverseValue当前值：</b>
          {reverseValue}
        </Typography.Text>
      </Space>
      <ToggleChild defaultValue={defaultValue} reverseValue={reverseValue} />
    </Space>
  );
};

export default ToggleComponent;
