import { create } from 'zustand';
import Button from '../materials/Button';
import Container from '../materials/Container';
import Page from '../materials/Page';
import { ComponentConfig } from '../types/shared';

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: 'Container',
      defaultProps: {},
      component: Container,
    },
    Button: {
      name: 'Button',
      defaultProps: {
        type: 'primary',
        text: '按钮',
      },
      component: Button,
    },
    Page: {
      name: 'Page',
      defaultProps: {},
      component: Page,
    },
  },

  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
