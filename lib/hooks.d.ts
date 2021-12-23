/// <reference types="react" />
import { I18nContext, Translations } from '.';
export declare function useTranslations<L extends string = string, T extends Translations<L> = Translations<L>>(Context: React.Context<I18nContext<L>>, translations: T): import(".").TranslateLocal<L, T>;
export declare function useLocale<L extends string = string>(Context: React.Context<I18nContext<L>>): L;
