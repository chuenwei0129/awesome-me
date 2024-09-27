import React from 'react';
import { MyIcon, MyIconProps } from './Icon';

// 用于跟踪已加载的脚本URL
const loadedSet = new Set<string>();

// 通过 scriptUrl 动态加载图标字体
export function createFromIconFont(scriptUrl: string) {
  if (
    typeof scriptUrl === 'string' &&
    scriptUrl.length &&
    !loadedSet.has(scriptUrl)
  ) {
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    document.body.appendChild(script);

    loadedSet.add(scriptUrl);
  }

  const Iconfont = React.forwardRef<SVGSVGElement, MyIconProps>(
    (props, ref) => {
      // 复用 svg 接口 type
      const { type, ...rest } = props;

      return (
        <MyIcon {...rest} ref={ref}>
          {type ? <use xlinkHref={`#${type}`} /> : null}
        </MyIcon>
      );
    },
  );

  return Iconfont;
}
