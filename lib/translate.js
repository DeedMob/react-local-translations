"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TOKEN_START = '%{';
const COUNT_DELIMITER = '||||';
const TRANSFORM_DELIMITER = ' | ';
const TOKEN_REGEX = /\%\{(.*?)\}/g;
function frenchPluralization(n) {
    return n > 1 ? 1 : 0;
}
function germanPluralization(n) {
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
function translate({ locale, translations, globalTranslations, convertMissingKey, transforms = {}, preprocess, postprocess, }) {
    function usePhrase(trs, key) {
        return trs.hasOwnProperty(key) && trs[key].hasOwnProperty(locale)
            ? trs[key][locale]
            : (convertMissingKey && convertMissingKey(key, trs)) || key;
    }
    function usingTranslations(trs) {
        function tr(key, interpolation) {
            if (preprocess) {
                const preprocessedKey = preprocess(key, trs);
                if (preprocessedKey)
                    return '' + preprocessedKey;
            }
            const phrase = usePhrase(trs, key);
            if (!phrase)
                return postprocess ? postprocess('') : '';
            if (!interpolation && interpolation !== 0 && phrase.indexOf(TOKEN_START) === -1)
                return postprocess ? postprocess(phrase) : phrase;
            let result = phrase;
            const interp = typeof interpolation === 'number'
                ? { smart_count: interpolation }
                : interpolation || {};
            if (interp.smart_count || interp.smart_count === 0) {
                const parts = result.split(COUNT_DELIMITER);
                const part = parts.length === 1
                    ? 0
                    : (localeToPluralization.hasOwnProperty(locale)
                        ? localeToPluralization[locale]
                        : localeToPluralization.en)(interp.smart_count);
                result = parts[part > parts.length ? 0 : part].trim();
            }
            result = result.replace(TOKEN_REGEX, (_, expr) => {
                let replacement = '';
                const inlineTranslationType = expr[0];
                const transformChain = expr.split(TRANSFORM_DELIMITER);
                if ((inlineTranslationType === 't' || inlineTranslationType === 'g') &&
                    expr[1] === ':') {
                    replacement = usePhrase(inlineTranslationType === 't' ? translations : globalTranslations !== null && globalTranslations !== void 0 ? globalTranslations : {}, transformChain[0].substr(2));
                }
                if (!replacement) {
                    const nestedObjectPropertyPath = transformChain[0].split('.');
                    replacement = nestedObjectPropertyPath.reduce((accum, next) => {
                        if (accum && accum.hasOwnProperty(next))
                            return accum[next];
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
            if (postprocess)
                result = postprocess(result);
            return result;
        }
        tr.locale = locale;
        tr.has = (key) => trs.hasOwnProperty(key);
        return tr;
    }
    const tr = Object.assign(usingTranslations(translations), {
        g: usingTranslations((globalTranslations !== null && globalTranslations !== void 0 ? globalTranslations : {})),
    });
    return tr;
}
exports.default = translate;
//# sourceMappingURL=translate.js.map