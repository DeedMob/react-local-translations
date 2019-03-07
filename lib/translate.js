"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TOKEN_START = '%{';
var COUNT_DELIMITER = '||||';
var TRANSFORM_DELIMITER = ' | ';
var TOKEN_REGEX = /\%\{(.*?)\}/g;
function frenchPluralization(n) {
    return n > 1 ? 1 : 0;
}
function germanPluralization(n) {
    return n !== 1 ? 1 : 0;
}
var localeToPluralization = {
    en: germanPluralization,
    de: germanPluralization,
    nl: germanPluralization,
    es: germanPluralization,
    it: germanPluralization,
    fr: frenchPluralization,
};
function translate(_a) {
    var locale = _a.locale, translations = _a.translations, _b = _a.globalTranslations, globalTranslations = _b === void 0 ? {} : _b, convertMissingKey = _a.convertMissingKey, _c = _a.transforms, transforms = _c === void 0 ? {} : _c, postprocess = _a.postprocess;
    function usePhrase(trs, key) {
        return trs.hasOwnProperty(key) && trs[key].hasOwnProperty(locale)
            ? trs[key][locale]
            : (convertMissingKey && convertMissingKey(key, trs)) || key;
    }
    function usingTranslations(trs) {
        function tr(key, interpolation) {
            var phrase = usePhrase(trs, key);
            if (!phrase)
                return postprocess ? postprocess('') : '';
            if (!interpolation && interpolation !== 0 && phrase.indexOf(TOKEN_START) === -1)
                return postprocess ? postprocess(phrase) : phrase;
            var result = phrase;
            var interp = typeof interpolation === 'number'
                ? { smart_count: interpolation }
                : interpolation || {};
            if (interp.smart_count || interp.smart_count === 0) {
                var parts = result.split(COUNT_DELIMITER);
                var part = parts.length === 1
                    ? 0
                    : (locale in localeToPluralization
                        ? localeToPluralization[locale]
                        : localeToPluralization.en)(interp.smart_count);
                result = parts[part > parts.length ? 0 : part].trim();
            }
            result = result.replace(TOKEN_REGEX, function (_, expr) {
                var replacement = '';
                var inlineTranslationType = expr[0];
                if ((inlineTranslationType === 't' || inlineTranslationType === 'g') &&
                    expr[1] === ':') {
                    expr = expr.substr(2);
                    replacement = usePhrase(inlineTranslationType === 't' ? translations : globalTranslations, expr);
                }
                var transformChain = expr.split(TRANSFORM_DELIMITER);
                if (!replacement)
                    replacement = interp[transformChain[0]];
                for (var i = 1; i < transformChain.length; i += 1) {
                    var transform = transforms[transformChain[i]];
                    if (!transform) {
                        throw new TypeError("Transform " + transformChain[i] + " does not exist");
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
        tr.has = function (key) { return trs.hasOwnProperty(key); };
        return tr;
    }
    var tr = usingTranslations(translations);
    tr.g = usingTranslations(globalTranslations);
    return tr;
}
exports.default = translate;
//# sourceMappingURL=translate.js.map