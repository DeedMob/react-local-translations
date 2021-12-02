import { Translations, ConvertMissingKey, Transforms, TranslateLocal, Postprocess, Preprocess } from '.';
export default function translate<T extends Translations>({ locale, translations, globalTranslations, convertMissingKey, transforms, preprocess, postprocess, }: {
    locale: string;
    translations: T;
    globalTranslations?: Translations;
    convertMissingKey?: ConvertMissingKey;
    transforms?: Transforms;
    preprocess?: Preprocess;
    postprocess?: Postprocess;
}): TranslateLocal<T>;
