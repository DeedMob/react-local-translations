export { I18n } from './i18n';
export { default as translate } from './hoc';
export * from './hooks';
export { default as tr } from './translate';

export interface Translations {
  [key: string]: {
    [language: string]: string;
  };
}

export type ConvertMissingKey = (key: string, translations: Translations) => string;
export type Postprocess = (phrase: string) => string | React.ReactNode;
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

export type TranslateGlobal = TranslateType;

/** number sets smart_count behavior */
export type Interpolation =
  | {
      [key: string]: string | number;
    }
  | number;
