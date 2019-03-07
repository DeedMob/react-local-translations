/// <reference types="react" />
export { I18n } from './i18n';
export { default as translate } from './hoc';
export * from './hooks';
export { default as tr } from './translate';
export interface Translations {
    [key: string]: {
        [language: string]: string;
    };
}
export declare type ConvertMissingKey = (key: string, translations: Translations) => string;
export declare type Postprocess = (phrase: string) => string | React.ReactNode;
export interface Transforms {
    [name: string]: (value: any) => string | number;
}
export interface TranslateProps {
    t: TranslateLocal;
    g: TranslateGlobal;
    getLocale(): string;
}
export interface TranslateType {
    (key: string, interpolation?: Interpolation): string;
    locale: string;
    has(key: string): boolean;
}
export interface TranslateLocal extends TranslateType {
    g: TranslateType;
}
export declare type TranslateGlobal = TranslateType;
export declare type Interpolation = {
    [key: string]: string | number;
} | number;
