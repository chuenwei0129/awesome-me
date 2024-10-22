import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["className", "style", "children", "size", "direction", "align", "split", "wrap"];
import clsx from 'clsx';
import React, { Children, useContext, useMemo } from 'react';
import { ConfigContext } from "./ConfigProvider";
import "./index.scss";
var spaceSize = {
  small: 8,
  middle: 16,
  large: 24
};
function getNumberSize(size) {
  // 如果 size 是一个字符串，则返回 spaceSize 对应键的值；如果 size 不是字符串，则返回 size 本身，如果 size 为假值（如 null、undefined、0 等），则返回 0。
  return typeof size === 'string' ? spaceSize[size] : size || 0;
}
var Space = function Space(props) {
  var _useContext = useContext(ConfigContext),
    space = _useContext.space;
  var className = props.className,
    style = props.style,
    children = props.children,
    _props$size = props.size,
    size = _props$size === void 0 ? (space === null || space === void 0 ? void 0 : space.size) || 'small' : _props$size,
    _props$direction = props.direction,
    direction = _props$direction === void 0 ? 'horizontal' : _props$direction,
    align = props.align,
    split = props.split,
    _props$wrap = props.wrap,
    wrap = _props$wrap === void 0 ? false : _props$wrap,
    otherProps = _objectWithoutProperties(props, _excluded);
  var childNodes = Children.toArray(children);
  var mergedAlign = direction === 'horizontal' && align === undefined ? 'center' : align;
  var cn = clsx('space', "space-".concat(direction), _defineProperty({}, "space-align-".concat(mergedAlign), mergedAlign), className);
  var nodes = childNodes.map(function (child, i) {
    var key = child && child.key || "space-item-".concat(i);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "space-item",
      key: key
    }, child), i < childNodes.length && split && /*#__PURE__*/React.createElement("span", {
      className: "".concat(className, "-split"),
      style: style,
      key: "".concat(key, "-split")
    }, split));
  });
  var otherStyles = {};
  var _useMemo = useMemo(function () {
      return (Array.isArray(size) ? size : [size, size]).map(function (item) {
        return getNumberSize(item);
      });
    }, [size]),
    _useMemo2 = _slicedToArray(_useMemo, 2),
    horizontalSize = _useMemo2[0],
    verticalSize = _useMemo2[1];
  otherStyles.columnGap = horizontalSize;
  otherStyles.rowGap = verticalSize;
  if (wrap) {
    otherStyles.flexWrap = 'wrap';
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cn,
    style: _objectSpread(_objectSpread({}, otherStyles), style)
  }, otherProps), nodes);
};
export default Space;