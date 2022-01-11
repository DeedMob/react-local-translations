import React from 'react';
import { Translations, TranslateProps } from './';
import { I18nContext } from './i18n';
declare const hoc: <L extends string, T extends Translations<L>>(Context: React.Context<I18nContext<L, Translations<L>>>, translations: T) => <Props extends object>(WrappedComponent: React.ComponentType<Props & TranslateProps<L, T, Translations<L>>>) => React.FC<Props>;
export default hoc;
