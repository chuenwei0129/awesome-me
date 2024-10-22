import React from 'react';
import { MyIconProps } from './Icon';
interface CreateIconOptions {
    content: React.ReactNode;
    iconProps?: MyIconProps;
    viewBox?: string;
}
export declare function createIcon(options: CreateIconOptions): React.ForwardRefExoticComponent<import("./Icon").BaseMyIconProps & Omit<React.SVGAttributes<SVGElement>, keyof import("./Icon").BaseMyIconProps> & React.RefAttributes<SVGSVGElement>>;
export {};
