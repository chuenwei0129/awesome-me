import { create } from 'zustand';
import { type Component } from '../types/shared';
import { getComponentById } from '../utils/getComponentById';

interface State {
  components: Component[];
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: unknown) => void;
}

export const useComponentsStore = create<State & Action>((set, get) => ({
  components: [
    {
      id: 1,
      name: 'Page',
      props: {},
    },
  ],
  addComponent: (component, parentId) =>
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);

        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component);
          } else {
            parentComponent.children = [component];
          }
        }

        component.parentId = parentId;

        return { components: [...state.components] };
      }

      return { components: [...state.components, component] };
    }),

  deleteComponent: (componentId) => {
    if (!componentId) return;

    const component = getComponentById(componentId, get().components);

    if (component?.parentId) {
      const parentComponent = getComponentById(component.parentId, get().components);

      if (parentComponent) {
        parentComponent.children = parentComponent?.children?.filter((item) => item.id !== +componentId);

        set({ components: [...get().components] });
      }
    }
  },

  updateComponentProps: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = {
          ...(component.props as object),
          ...(props as object),
        };

        return { components: [...state.components] };
      }

      return { components: [...state.components] };
    }),
}));
