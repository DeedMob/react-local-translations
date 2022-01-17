"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = (0, tslib_1.__importStar)(require("react"));
const translate_1 = (0, tslib_1.__importDefault)(require("./translate"));
const hoc = (Context, translations) => (WrappedComponent) => {
    const LocalTranslations = (props) => {
        var _a;
        const ctx = (0, react_1.useContext)(Context);
        const i18nProps = (0, react_1.useMemo)(() => {
            const t = (0, translate_1.default)(Object.assign(Object.assign({}, ctx), { translations }));
            return {
                t: t,
                g: t.g,
                getLocale: () => ctx.locale,
            };
        }, [ctx]);
        i18nProps.g.has;
        (_a = WrappedComponent.propTypes) === null || _a === void 0 ? void 0 : _a.g;
        return react_1.default.createElement(WrappedComponent, Object.assign({}, props, i18nProps));
    };
    return LocalTranslations;
};
exports.default = hoc;
//# sourceMappingURL=hoc.js.map