import { Translations, ConvertMissingKey, Transforms, TranslateLocal, Postprocess } from '.';
interface TranslateOptions {
    locale: string;
    translations: Translations;
    globalTranslations?: Translations;
    convertMissingKey?: ConvertMissingKey;
    transforms?: Transforms;
    postprocess?: Postprocess;
}
export default function translate({ locale, translations, globalTranslations, convertMissingKey, transforms, postprocess, }: TranslateOptions): TranslateLocal;
export {};
