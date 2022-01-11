import { Translations, ConvertMissingKey, Transforms, TranslateLocal, Postprocess, Preprocess } from '.';
export default function translate<L extends string = string, T extends Translations = Translations<L>, TG extends Translations = Translations<L>>({ locale, translations, globalTranslations, convertMissingKey, transforms, preprocess, postprocess, }: {
    locale: L;
    translations: T;
    globalTranslations: TG;
    convertMissingKey?: ConvertMissingKey;
    transforms?: Transforms;
    preprocess?: Preprocess;
    postprocess?: Postprocess;
}): TranslateLocal<L, T, TG>;
