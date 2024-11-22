import { Component } from '../types/shared';

/**
 * 根据ID获取组件
 * @param {number | null} id - 要查找的组件ID
 * @param {Component[]} components - 组件列表
 * @returns {Component | null} - 找到的组件或null
 */
export function getComponentById(id: number | null, components: Component[]): Component | null {
  // 如果id不存在，返回null
  if (!id) return null;

  // 遍历组件列表，寻找与id匹配的组件
  for (const component of components) {
    if (component.id === id) return component;

    // 如果当前组件有子组件，递归查找子组件
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);

      // 如果在递归中找到了组件，返回该组件
      if (result !== null) return result;
    }
  }

  // 如果未找到匹配的组件，返回null
  return null;
}
