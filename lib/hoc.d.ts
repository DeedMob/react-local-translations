import React from 'react';
import { TranslateProps } from './';
declare const hoc: <T extends Record<string, {
    [language: string]: string;
}>>(translations: T) => <Props extends object>(WrappedComponent: React.ComponentType<Props & TranslateProps>) => React.FunctionComponent<Props>;
export default hoc;
