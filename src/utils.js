export const compileLanguage = (locale, translations, fallbackLocale) => {
  const localeTranslation = {};
  for (const key in translations) {
    if (translations.hasOwnProperty(key))
      localeTranslation[key] =
        translations[key].hasOwnProperty(locale) ? translations[key][locale] : translations[key][fallbackLocale];
  }
  return localeTranslation;
};

export class Subscribe {
  constructor() {
    this.subscriptions = [];
  }

  messageSubscribers() {
    this.subscriptions.forEach(f => f());
  }

  subscribe(f) {
    this.subscriptions.push(f);
  }

  unsubscribe(f) {
    const sub = this.subscriptions.indexOf(f);
    if (sub !== -1) {
      this.subscriptions.splice(sub, 1);
    }
  }
}
