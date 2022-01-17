export { I18nContext } from './i18n';
export { default as translate } from './hoc';
export * from './hooks';
export { default as tr } from './translate';
export declare type Translations<L extends string = string> = Record<string, {
    [language in L]: string;
}>;
export declare type ConvertMissingKey = (key: string, translations: Translations) => string;
export declare type Preprocess = (key: string, translations: Translations) => string | boolean | undefined | null | void;
export declare type Postprocess = (phrase: string) => string;
export interface Transforms {
    [name: string]: (value: any) => string;
}
export interface TranslateProps<L extends string = string, T extends Translations<L> = Translations<L>, TG extends Translations<L> = Translations<L>> {
    t: TranslateLocal<L, T, TG>;
    g: TranslateType<L, TG>;
    getLocale(): L;
}
export interface TranslateType<L extends string = string, T extends Translations<L> = Translations<L>> {
    (key: keyof T & string, interpolation?: Interpolation): string;
    locale: L;
    has(key: string | number | symbol): key is keyof T;
}
export interface TranslateLocal<L extends string = string, T extends Translations<L> = Translations<L>, TG extends Translations<L> = Translations<L>> extends TranslateType<L, T> {
    g: TranslateType<L, TG>;
}
export declare type Interpolation = {
    smart_count?: number;
    [key: string]: string | number | object | undefined;
} | number;
