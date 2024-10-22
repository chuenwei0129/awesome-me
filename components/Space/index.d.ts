import type { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react';
import './index.scss';
export type SizeType = 'small' | 'middle' | 'large' | number | undefined;
export interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    style?: CSSProperties;
    size?: SizeType | [SizeType, SizeType];
    direction?: 'horizontal' | 'vertical';
    align?: 'start' | 'end' | 'center' | 'baseline';
    split?: ReactNode;
    wrap?: boolean;
}
declare const Space: FC<SpaceProps>;
export default Space;
