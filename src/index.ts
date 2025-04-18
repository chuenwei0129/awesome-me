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
export { default as useDebounce } from './hooks/use-debounce';
export { default as useDebounceFn } from './hooks/use-debounceFn';
export { default as useInterval } from './hooks/use-interval';
export { default as useLatest } from './hooks/use-latest';
export { default as useMap } from './hooks/use-map';
export { default as useMemoizedFn } from './hooks/use-memoizedFn';
export { default as usePrevious } from './hooks/use-previous';
export { default as useSafeState } from './hooks/use-safeState';
export { default as useSetState } from './hooks/use-setState';
export { default as useToggle } from './hooks/use-toggle';
export { default as useUnmountedRef } from './hooks/use-unmountedRef';
export { default as useUpdate } from './hooks/use-update';
export { default as useUpdateEffect } from './hooks/use-updateEffect';
