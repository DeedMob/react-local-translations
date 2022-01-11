/// <reference types="react" />
import { I18nContext, TranslateLocal, Translations } from '.';
export declare function useTranslations<L extends string = string, TG extends Translations<L> = Translations<L>, T extends Translations<L> = Translations<L>>(Context: React.Context<I18nContext<L, TG>>, translations: T): TranslateLocal<L, T, TG>;
export declare function useLocale<L extends string = string, TG extends Translations<L> = Translations<L>>(Context: React.Context<I18nContext<L, TG>>): L;
