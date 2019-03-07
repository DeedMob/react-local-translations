import React from 'react';
import { Translations, TranslateProps } from './';
declare const hoc: <T extends Translations>(translations: T) => <Props extends object>(WrappedComponent: React.ComponentType<Props & TranslateProps>) => React.FunctionComponent<Props>;
export default hoc;
