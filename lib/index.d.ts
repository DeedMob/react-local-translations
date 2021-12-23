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
export interface TranslateProps<L extends string = string, T extends Translations<L> = Translations<L>> {
    t: TranslateLocal<L, T>;
    g: TranslateGlobal<L, T>;
    getLocale(): L;
}
export interface TranslateType<L extends string = string, T extends Translations<L> = Translations<L>> {
    (key: keyof T & string, interpolation?: Interpolation): string;
    locale: L;
    has(key: string): boolean;
}
export interface TranslateLocal<L extends string = string, T extends Translations<L> = Translations<L>> extends TranslateType<L, T> {
    g: TranslateType<L, T>;
}
export declare type TranslateGlobal<L extends string = string, T extends Translations<L> = Translations<L>> = TranslateType<L, T>;
export declare type Interpolation = ({
    smart_count?: number;
} & {
    [key: string]: string | object;
}) | number;
