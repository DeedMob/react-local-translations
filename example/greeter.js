import React from 'react';
import { translate } from '../lib';
import LanguageSelect from './languageSelect';

console.log(<languageSelect/>);

const translations = {
  "hello_name": {
    en: "In English, Hello Name",
    de: "Auf Deutsch, Hallo Name"
  },
  "some_key": {
    en: "blah",
    de: "irgendwas"
  }
}

const Greeter = ({ name, t, g }) => {
  return (
    <div>
      <h3>{t('hello_name')}<b>{g('some_global', { name })}</b></h3>
      <LanguageSelect/>
    </div>
  )
};

Greeter.propTypes = {
  name: React.PropTypes.string.isRequired,
  t: React.PropTypes.func.isRequired,
  g: React.PropTypes.func.isRequired
};

export default translate(translations, true)(Greeter);
