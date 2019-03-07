import React from 'react';
import { Translations, ConvertMissingKey, Postprocess, Transforms, Preprocess } from './';
interface I18nContext {
    locale: string;
    globalTranslations?: Translations;
    convertMissingKey?: ConvertMissingKey;
    transforms?: Transforms;
    preprocess?: Preprocess;
    postprocess?: Postprocess;
}
export declare const I18n: React.Context<I18nContext>;
export {};
