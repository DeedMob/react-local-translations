export { I18nContext } from './i18n';
export { default as translate } from './hoc';
export * from './hooks';
export { default as tr } from './translate';

export type Translations<L extends string = string> = Record<
  string,
  {
    [language in L]: string;
  }
>;

export type ConvertMissingKey = (key: string, translations: Translations) => string;
export type Preprocess = (
  key: string,
  translations: Translations
) => string | boolean | undefined | null | void;
export type Postprocess = (phrase: string) => string;
export interface Transforms {
  [name: string]: (value: any) => string;
}

export interface TranslateProps<
  L extends string = string,
  T extends Translations<L> = Translations<L>,
  TG extends Translations<L> = Translations<L>
> {
  t: TranslateLocal<L, T>;
  g: TranslateGlobal<L, TG>;
  getLocale(): L;
}

export interface TranslateType<
  L extends string = string,
  T extends Translations<L> = Translations<L>
> {
  (key: keyof T & string, interpolation?: Interpolation): string;
  locale: L;
  has(key: string): boolean;
}

export interface TranslateLocal<
  L extends string = string,
  T extends Translations<L> = Translations<L>,
  TG extends Translations<L> = Translations<L>
> extends TranslateType<L, T> {
  g: TranslateGlobal<L, TG>;
}

export type TranslateGlobal<
  L extends string = string,
  TG extends Translations<L> = Translations<L>
> = TranslateType<L, TG>;

export type Interpolation =
  | {
      // 'smart_count' property must be a number if defined, but this is currently very hard to achieve in typescript due to index property restrictions
      [key: string]: object | string | number;
    }
  | number;
