import React from 'react';
import {translate} from '../lib';

const translations = {
  english: {
    "de": "Englisch",
    "en": "English"
  },
  german: {
    "de": "Deutch",
    "en": "German"
  },
  selectLanguage: {
    de: "Bitte Sprache Waehlen",
    en: "Select a language"
  }
}

class LanguageSelect extends React.Component {
  shouldComponentUpdate(){
    // demonstrates that translations transcend react component shouldComponentUpdates.
    return false;
  }
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

export default translate(translations, false, true, true)(LanguageSelect)
