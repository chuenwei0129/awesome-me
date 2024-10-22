import React from 'react';
export var ConfigContext = /*#__PURE__*/React.createContext({});
export function ConfigProvider(props) {
  var space = props.space,
    children = props.children;
  return /*#__PURE__*/React.createElement(ConfigContext.Provider, {
    value: {
      space: space
    }
  }, children);
}