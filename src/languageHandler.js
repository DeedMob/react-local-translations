export default class LanguageHandler {
  constructor(initialLocale, supportedLanguages = [], onChange = () => null) {
    this.supportedLanguages = supportedLanguages;
    this.onChange = onChange;
    this._locale = initialLocale;
    this._providerCallbacks = [];
  }

  registerCallback(f) {
    this._providerCallbacks.push(f);
  }
  unregisterCallback(f) {
    this._providerCallbacks.splice(this._providerCallbacks.indexOf(f), 1);
  }

  get locale() {
    return this._locale;
  }

  set locale(locale) {
    if (
      this.supportedLanguages.indexOf(locale) !== -1 &&
      this._locale !== locale
    ) {
      this._locale = locale;
      this.onChange(locale);
      this._providerCallbacks.map(f => f(locale));
      return true;
    } else return false;
  }
}
