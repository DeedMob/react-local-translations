"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var i18n_1 = require("./i18n");
var translate_1 = tslib_1.__importDefault(require("./translate"));
function useTranslations(translations) {
    var ctx = react_1.useContext(i18n_1.I18n);
    return react_1.useMemo(function () { return translate_1.default(tslib_1.__assign({}, ctx, { translations: translations })); }, [ctx, translations]);
}
exports.useTranslations = useTranslations;
function useLocale() {
    var locale = react_1.useContext(i18n_1.I18n).locale;
    return locale;
}
exports.useLocale = useLocale;
//# sourceMappingURL=hooks.js.map