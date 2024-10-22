import _extends from "@babel/runtime/helpers/esm/extends";
import React, { forwardRef } from 'react';
import { MyIcon } from "./Icon";
// 高阶函数
export function createIcon(options) {
  var content = options.content,
    _options$iconProps = options.iconProps,
    iconProps = _options$iconProps === void 0 ? {} : _options$iconProps,
    _options$viewBox = options.viewBox,
    viewBox = _options$viewBox === void 0 ? '0 0 1024 1024' : _options$viewBox;
  return /*#__PURE__*/forwardRef(function (props, ref) {
    return /*#__PURE__*/React.createElement(MyIcon, _extends({
      ref: ref,
      viewBox: viewBox
    }, iconProps, props), content);
  });
}