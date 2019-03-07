"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var _1 = require("./");
var translate_1 = tslib_1.__importDefault(require("./translate"));
var hoc = function (translations) { return function (WrappedComponent) {
    var LocalTranslations = function (props) {
        var ctx = react_1.useContext(_1.I18n);
        var i18nProps = react_1.useMemo(function () {
            var t = translate_1.default(tslib_1.__assign({}, ctx, { translations: translations }));
            return {
                t: t,
                g: t.g,
                getLocale: function () { return ctx.locale; },
            };
        }, [ctx]);
        return react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props, i18nProps));
    };
    return LocalTranslations;
}; };
exports.default = hoc;
//# sourceMappingURL=hoc.js.map