import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["type"];
import React from 'react';
import { MyIcon } from "./Icon";

// 用于跟踪已加载的脚本URL
var loadedSet = new Set();

// 通过 scriptUrl 动态加载图标字体
export function createFromIconFont(scriptUrl) {
  if (typeof scriptUrl === 'string' && scriptUrl.length && !loadedSet.has(scriptUrl)) {
    var script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    document.body.appendChild(script);
    loadedSet.add(scriptUrl);
  }
  var Iconfont = /*#__PURE__*/React.forwardRef(function (props, ref) {
    // 复用 svg 接口 type
    var type = props.type,
      rest = _objectWithoutProperties(props, _excluded);
    return /*#__PURE__*/React.createElement(MyIcon, _extends({}, rest, {
      ref: ref
    }), type ? /*#__PURE__*/React.createElement("use", {
      xlinkHref: "#".concat(type)
    }) : null);
  });
  return Iconfont;
}