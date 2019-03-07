import { Translations, ConvertMissingKey, Transforms, TranslateLocal, Postprocess, Preprocess } from '.';
interface TranslateOptions {
    locale: string;
    translations: Translations;
    globalTranslations?: Translations;
    convertMissingKey?: ConvertMissingKey;
    transforms?: Transforms;
    preprocess?: Preprocess;
    postprocess?: Postprocess;
}
export default function translate({ locale, translations, globalTranslations, convertMissingKey, transforms, preprocess, postprocess, }: TranslateOptions): TranslateLocal;
export {};
