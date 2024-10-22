import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";
var _excluded = ["style", "className", "spin", "size", "children"];
var _templateObject, _templateObject2;
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';

// import './Icon.scss'
// 使用 css in js 重写样式
var rotate = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var StyledSVG = styled.svg(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  &.my-icon {\n    display: inline-block;\n  }\n\n  &.my-icon-spin {\n    animation: ", " 2s linear infinite;\n  }\n"])), rotate);

// 类型冲突处理： 当你直接使用 React.ComponentProps<'svg'> 时，这些属性会直接合并到 MyIconProps 中。如果 BaseMyIconProps 中定义的属性和 React.ComponentProps<'svg'> 中的属性名称重合，会导致类型冲突。利用 Omit 类型工具可以排除冲突，确保 BaseMyIconProps 中定义的属性不会被覆盖。

// 类型守卫
// 实际上，将判断逻辑封装起来提取到函数外部进行复用非常常见。为了解决这一类型控制流分析的能力不足， TypeScript 引入了 is 关键字来显式地提供类型信息：
var isStringArraySize = function isStringArraySize(size) {
  return Array.isArray(size) && size.length === 2;
};

// size 可以传 [10px, 10px] 分别指定宽高，也可以传 10px 来同时指定宽高，所以要做下处理。
export var getSize = function getSize(size) {
  // 类型控制流分析就像一条河流一样流过，if 条件中的表达式要是现在被提取出来了怎么办
  // 只是把逻辑提取到了外面而已
  // 想象类型控制流分析这条河流，刚流进 if (isString(input)) 就戛然而止了。因为 isString 这个函数在另外一个地方，内部的判断逻辑并不在函数 foo 中。这里的类型控制流分析做不到跨函数上下文来进行类型的信息收集（但别的类型语言中可能是支持的）。
  if (isStringArraySize(size)) {
    return size;
  }
  return [size, size];
};

// SVGElement 是一个通用接口，可以代表任何 SVG 元素。
// SVGSVGElement 是一个更具体的接口，专门用于 <svg> 元素。
export var MyIcon = /*#__PURE__*/forwardRef(function (props, ref) {
  // size 默认为 1 em 也就是用 font-size 的大小
  var style = props.style,
    className = props.className,
    spin = props.spin,
    _props$size = props.size,
    size = _props$size === void 0 ? '1em' : _props$size,
    children = props.children,
    rest = _objectWithoutProperties(props, _excluded);
  var cn = clsx('my-icon', className, {
    'my-icon-spin': spin
  });
  var _getSize = getSize(size),
    _getSize2 = _slicedToArray(_getSize, 2),
    w = _getSize2[0],
    h = _getSize2[1];
  return /*#__PURE__*/React.createElement(StyledSVG, _extends({
    ref: ref,
    style: style,
    className: cn,
    width: w,
    height: h
    // 这里的 currentColor 是指继承父元素的 color 属性，如果父元素没有 color 属性，则继承浏览器的默认颜色。
    ,
    fill: "currentColor"
  }, rest), children);
});