export default class LanguageHandler {
  constructor(initialLocale, supportedLanguages = [], onChange = () => null){
    this.supportedLanguages = supportedLanguages;
    this.onChange = onChange;
    this._locale = initialLocale;
    this._polyglotCallback = () => { console.error('Polyglot Callback not set for languageHandler')};
  }

  get locale(){
    return this._locale;
  }

  // do not call this function yourself, this is in I18nProvider
  set polyglotCallback(f){
    this._polyglotCallback = f;
  }

  get polyglotCallback() {
    return this._polyglotCallback;
  }

  set locale(locale){
    if(this.supportedLanguages.indexOf(locale) !== -1){
      this._locale = locale;
      this.onChange(locale);
      this._polyglotCallback(locale);
      return true
    }
    else
      return false
  }
}
