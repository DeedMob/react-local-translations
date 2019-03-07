"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var i18n_1 = require("./i18n");
exports.I18n = i18n_1.I18n;
var hoc_1 = require("./hoc");
exports.translate = hoc_1.default;
tslib_1.__exportStar(require("./hooks"), exports);
var translate_1 = require("./translate");
exports.tr = translate_1.default;
//# sourceMappingURL=index.js.map