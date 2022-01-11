import {
  Translations,
  ConvertMissingKey,
  Transforms,
  TranslateLocal,
  Postprocess,
  Preprocess,
  Interpolation,
  TranslateType,
} from '.';

const TOKEN_START = '%{';
const COUNT_DELIMITER = '||||';
const TRANSFORM_DELIMITER = ' | ';
const TOKEN_REGEX = /\%\{(.*?)\}/g;

function frenchPluralization(n: number): 1 | 0 {
  return n > 1 ? 1 : 0;
}
function germanPluralization(n: number): 1 | 0 {
  return n !== 1 ? 1 : 0;
}

const localeToPluralization: Record<string, (n: number) => 1 | 0> = {
  en: germanPluralization,
  de: germanPluralization,
  nl: germanPluralization,
  es: germanPluralization,
  it: germanPluralization,
  fr: frenchPluralization,
};

export default function translate<
  L extends string = string,
  T extends Translations = Translations<L>,
  TG extends Translations = Translations<L>
>({
  locale,
  translations,
  globalTranslations,
  convertMissingKey,
  transforms = {},
  preprocess,
  postprocess,
}: {
  locale: L;
  translations: T;
  globalTranslations?: TG;
  convertMissingKey?: ConvertMissingKey;
  transforms?: Transforms;
  preprocess?: Preprocess;
  postprocess?: Postprocess;
}): TranslateLocal<L, T, TG> {
  function usePhrase(trs: Translations<L>, key: string): string {
    return trs.hasOwnProperty(key) && trs[key].hasOwnProperty(locale)
      ? trs[key][locale]
      : (convertMissingKey && convertMissingKey(key, trs)) || key;
  }

  function usingTranslations<TX extends Translations<L>>(trs: TX): TranslateType<L, TX> {
    function tr(key: string & keyof TX, interpolation?: Interpolation): string {
      if (preprocess) {
        const preprocessedKey = preprocess(key, trs);
        if (preprocessedKey) return '' + preprocessedKey;
      }

      const phrase = usePhrase(trs, key);

      if (!phrase) return postprocess ? postprocess('') : '';
      if (!interpolation && interpolation !== 0 && phrase.indexOf(TOKEN_START) === -1)
        return postprocess ? postprocess(phrase) : phrase;

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
            : (localeToPluralization.hasOwnProperty(locale)
                ? localeToPluralization[locale as keyof typeof localeToPluralization]
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
        const transformChain = expr.split(TRANSFORM_DELIMITER);
        if (
          (inlineTranslationType === 't' || inlineTranslationType === 'g') &&
          expr[1] === ':'
        ) {
          replacement = usePhrase(
            inlineTranslationType === 't' ? translations : globalTranslations ?? {},
            transformChain[0].substr(2)
          );
        }

        if (!replacement) {
          const nestedObjectPropertyPath = transformChain[0].split('.');
          // fetch nested properties %{user.name} => interop[user][name]
          replacement = nestedObjectPropertyPath.reduce((accum: any, next: string) => {
            if (accum && accum.hasOwnProperty(next)) return accum[next];
            return undefined;
          }, interp);
        }

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

  const tr: TranslateLocal<L, T, TG> = Object.assign(usingTranslations<T>(translations), {
    g: usingTranslations<TG>((globalTranslations ?? {}) as any),
  });

  return tr;
}
