import React from 'react';
import {translate} from '../lib';

const translations = {
  english: {
    "de": "Englisch",
    "en": "English"
  },
  german: {
    "de": "Deutsch",
    "en": "German"
  },
  selectLanguage: {
    de: "Bitte Sprache wählen",
    en: "Select a language"
  }
}

class LanguageSelect extends React.Component {
  render(){
    const { t, setLocale, getLocale } = this.props;
    const locale = getLocale();
    return (
      <div>
        <h1>{t("selectLanguage")}</h1>
        <select value={locale} onChange={(e) => setLocale(e.target.value)}>
          <option value="en">{t("english")}</option>
          <option value="de">{t("german")}</option>
        </select>
      </div>
    )
  }
}

export default translate(translations, { setLocale: true, getLocale: true })(LanguageSelect)
