import React from 'react';
export interface BaseMyIconProps {
    style?: React.CSSProperties;
    className?: string;
    size?: string | string[];
    spin?: boolean;
}
export type MyIconProps = BaseMyIconProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseMyIconProps>;
export declare const getSize: (size: string | string[]) => string[];
export declare const MyIcon: React.ForwardRefExoticComponent<BaseMyIconProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseMyIconProps> & {
    children?: React.ReactNode;
} & React.RefAttributes<SVGSVGElement>>;
