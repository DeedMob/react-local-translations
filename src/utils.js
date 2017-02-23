export const compileLanguage = (locale, translations) => {
  const localeTranslation = {};
  for (const key in translations){
    if(translations.hasOwnProperty(key))
      localeTranslation[key] = translations[key][locale];
  }
  return localeTranslation;
}

export class Subscribe {
  constructor(){
    this.subscriptions = [];
  }

  messageSubscribers(){
    this.subscriptions.forEach(f => f())
  }

  subscribe(f){
    this.subscriptions.push(f)
  }
}
