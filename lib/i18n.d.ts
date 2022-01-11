import { Translations, ConvertMissingKey, Postprocess, Transforms, Preprocess } from './';
export interface I18nContext<L extends string = string, TG extends Translations<L> = Translations<L>> {
    locale: L;
    globalTranslations: TG;
    convertMissingKey?: ConvertMissingKey;
    transforms?: Transforms;
    preprocess?: Preprocess;
    postprocess?: Postprocess;
}
