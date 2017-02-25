export default class LanguageHandler {
  constructor(initialLocale, supportedLanguages = [], onChange = () => null){
    this.supportedLanguages = supportedLanguages;
    this.onChange = onChange;
    this.__locale = initialLocale;
    this.__polyglotCallback = () => null;
  }

  get locale(){
    return this.__locale;
  }

  // do not call this function yourself, this is in I18nProvider
  set polyglotCallback(f){
    this.__polyglotCallback = f;
  }

  get polyglotCallback() {
    return this.__polyglotCallback;
  }

  set locale(locale){
    if(this.supportedLanguages.indexOf(locale) !== -1){
      this.__locale = locale;
      this.onChange(locale);
      this.__polyglotCallback(locale);
      return true
    }
    else
      return false
  }
}
