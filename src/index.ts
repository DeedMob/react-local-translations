export { I18n } from './i18n';
export { default as translate } from './hoc';
export * from './hooks';
export { default as tr } from './translate';

export type Translations = Record<
  string,
  {
    [language: string]: string;
  }
>;

export type ConvertMissingKey = (key: string, translations: Translations) => string;
export type Preprocess = (
  key: string,
  translations: Translations
) => string | boolean | undefined | null | void;
export type Postprocess = (phrase: string) => string | React.ReactNode;
export interface Transforms {
  [name: string]: (value: any) => string;
}

export interface TranslateProps {
  t: TranslateLocal;
  g: TranslateGlobal;
  getLocale(): string;
}

export interface TranslateType<T extends Translations = Translations> {
  (key: keyof T, interpolation?: Interpolation): string;
  locale: string;
  has(key: string): boolean;
}

export interface TranslateLocal<T extends Translations = Translations>
  extends TranslateType<T> {
  g: TranslateType<T>;
}

export type TranslateGlobal = TranslateType;

/** number sets smart_count behavior */
export type Interpolation =
  | {
      [key: string]: string | number | object;
    }
  | number;
