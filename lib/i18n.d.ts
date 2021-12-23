import { Translations, ConvertMissingKey, Postprocess, Transforms, Preprocess } from './';
export interface I18nContext<L extends string = string> {
    locale: L;
    globalTranslations?: Translations<L>;
    convertMissingKey?: ConvertMissingKey;
    transforms?: Transforms;
    preprocess?: Preprocess;
    postprocess?: Postprocess;
}
