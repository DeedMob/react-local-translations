import {
  Translations,
  ConvertMissingKey,
  Transforms,
  TranslateLocal,
  Postprocess,
  Preprocess,
} from '.';

const TOKEN_START = '%{';
const COUNT_DELIMITER = '||||';
const TRANSFORM_DELIMITER = ' | ';
const TOKEN_REGEX = /\%\{(.*?)\}/g;

function frenchPluralization(n: number) {
  return n > 1 ? 1 : 0;
}
function germanPluralization(n: number) {
  return n !== 1 ? 1 : 0;
}

const localeToPluralization = {
  en: germanPluralization,
  de: germanPluralization,
  nl: germanPluralization,
  es: germanPluralization,
  it: germanPluralization,

  fr: frenchPluralization,
};

interface TranslateOptions {
  locale: string;
  translations: Translations;
  globalTranslations?: Translations;
  convertMissingKey?: ConvertMissingKey;
  transforms?: Transforms;
  preprocess?: Preprocess;
  postprocess?: Postprocess;
}

export default function translate({
  locale,
  translations,
  globalTranslations = {},
  convertMissingKey,
  transforms = {},
  preprocess,
  postprocess,
}: TranslateOptions): TranslateLocal {
  function usePhrase(trs: Translations, key: string) {
    return trs.hasOwnProperty(key) && trs[key].hasOwnProperty(locale)
      ? trs[key][locale]
      : (convertMissingKey && convertMissingKey(key, trs)) || key;
  }
  function usingTranslations(trs: Translations) {
    function tr(key: string, interpolation?: any) {
      if (preprocess) {
        const preprocessedKey = preprocess(key, trs);
        if (preprocessedKey) return '' + preprocessedKey;
      }

      const phrase = usePhrase(trs, key);

      // as any as string: to remove React.ReactNode from types
      if (!phrase) return postprocess ? ((postprocess('') as any) as string) : '';
      if (!interpolation && interpolation !== 0 && phrase.indexOf(TOKEN_START) === -1)
        return postprocess ? ((postprocess(phrase) as any) as string) : phrase;

      let result = phrase;
      const interp =
        typeof interpolation === 'number'
          ? { smart_count: interpolation }
          : interpolation || {};

      if (interp.smart_count || interp.smart_count === 0) {
        const parts = result.split(COUNT_DELIMITER);
        const part =
          parts.length === 1
            ? 0
            : (locale in localeToPluralization
                ? (localeToPluralization as any)[locale]
                : localeToPluralization.en)(interp.smart_count);
        result = parts[part > parts.length ? 0 : part].trim();
      }
      // %{var} -> interp["var"]
      // %{t:tr_key} -> translations["tr_key"]
      // %{g:tr_key} -> globalTranslations["tr_key"]
      // %{var | transform} -> transforms["transform"](interp["var"])
      result = result.replace(TOKEN_REGEX, (_, expr) => {
        // Remove %{ and } by using arguments[1]
        let replacement = '';

        const inlineTranslationType = expr[0];
        if (
          (inlineTranslationType === 't' || inlineTranslationType === 'g') &&
          expr[1] === ':'
        ) {
          expr = expr.substr(2);
          replacement = usePhrase(
            inlineTranslationType === 't' ? translations : globalTranslations,
            expr
          );
        }

        const transformChain = expr.split(TRANSFORM_DELIMITER);
        if (!replacement) replacement = interp[transformChain[0]];

        for (let i = 1; i < transformChain.length; i += 1) {
          const transform = transforms[transformChain[i]];
          if (!transform) {
            throw new TypeError(`Transform ${transformChain[i]} does not exist`);
          }
          replacement = String(transform(replacement));
        }
        return replacement;
      });

      if (postprocess) result = postprocess(result) as string;
      return result;
    }

    tr.locale = locale;
    tr.has = (key: string) => trs.hasOwnProperty(key);
    return tr;
  }

  // as any: needed because `tr.g` is defined after
  const tr: TranslateLocal = usingTranslations(translations) as any;
  tr.g = usingTranslations(globalTranslations);
  return tr;
}
