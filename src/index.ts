// 组件设计模式
export { default as AntdCounter } from './patterns/AntdCounter';
export { default as CompoundCounter } from './patterns/CompoundCounter';
export { ControlledCounter } from './patterns/ControlledCounter';
export { CustomHookCounter, useCounter as useCounterCustomHook } from './patterns/CustomHookCounter';
export { PropsGetterCounter, useCounter as useCounterPropsGetter } from './patterns/PropsGetterCounter';
export {
  DECREMENT,
  INCREMENT,
  StateReducerCounter,
  useCounter as useCounterStateReducer,
  type CounterActionType,
  type CounterStateType,
} from './patterns/StateReducerCounter';

/** 组件 */
// Icon
export { default as AddIcon } from './components/Icons/AddIcon';
export { default as EmailIcon } from './components/Icons/EmailIcon';
export { createFromIconFont } from './components/Icons/createFromIconFont';

// ui
export { default as AnimatedTestimonials } from './ui/animated-testimonials';
export { default as CycleText } from './ui/cycle-text';
export { default as ParallaxScroll } from './ui/parallax-scroll';
export { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from './ui/text-reveal-card';

/** hooks */
export { default as useLatest } from './hooks/useLatest';
export { default as useMemoizedFn } from './hooks/useMemoizedFn';
export { default as useSetState } from './hooks/useSetState';
