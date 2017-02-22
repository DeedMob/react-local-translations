export const addPrefixToKeys = (prefix, keys = {}) => {
  let transformedMap = {};
  const delimiter = '##';

  Object.keys(keys).forEach((key, i) => {
    transformedMap[prefix+delimiter+key] = keys[key]
  });

  return transformedMap;
}


export const compileLanguage = (locale, translations) => {
  const localeTranslation = {};
  for (const key in translations){
    if(translations.hasOwnProperty(key))
      localeTranslation[key] = translations[key][locale];
  }
  return localeTranslation;
}
