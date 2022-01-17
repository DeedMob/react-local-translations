import React from 'react';
import { Translations, TranslateProps } from './';
import { I18nContext } from './i18n';
declare const hoc: <L extends string, T extends Translations<L>, TG extends Translations<L>>(Context: React.Context<I18nContext<L, TG>>, translations: T) => <Props extends object>(WrappedComponent: React.ComponentType<Props & TranslateProps<L, T, TG>>) => React.FC<Props>;
export default hoc;
