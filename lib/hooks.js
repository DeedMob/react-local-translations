"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocale = exports.useTranslations = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const translate_1 = (0, tslib_1.__importDefault)(require("./translate"));
function useTranslations(Context, translations) {
    const ctx = (0, react_1.useContext)(Context);
    return (0, react_1.useMemo)(() => (0, translate_1.default)(Object.assign(Object.assign({}, ctx), { translations })), [ctx, translations]);
}
exports.useTranslations = useTranslations;
function useLocale(Context) {
    const { locale } = (0, react_1.useContext)(Context);
    return locale;
}
exports.useLocale = useLocale;
//# sourceMappingURL=hooks.js.map