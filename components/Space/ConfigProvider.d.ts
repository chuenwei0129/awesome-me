import React, { PropsWithChildren } from 'react';
import { SizeType } from './index';
export interface ConfigContextType {
    space?: {
        size?: SizeType;
    };
}
export declare const ConfigContext: React.Context<ConfigContextType>;
type ConfigProviderProps = PropsWithChildren<ConfigContextType>;
export declare function ConfigProvider(props: ConfigProviderProps): React.JSX.Element;
export {};
