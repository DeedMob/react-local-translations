import React from 'react';
import PropTypes from 'prop-types';
import { translate, translateApi } from '../lib';
import LanguageSelect from './languageSelect';
import ApiLanguageSelect from './apiLanguageSelect';


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

const t2 = translateApi(translations, "de").t;

const Greeter = ({ name, t, g }) => {
  return (
    <div>
      <h3>{t('hello_name')}<b>{g('some_global', { name })}</b></h3>
      <LanguageSelect/>
      <ApiLanguageSelect />
      {/* translateApi demonstration */}
      {t2('some_key')}
    </div>
  )
};

Greeter.propTypes = {
  name: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  g: PropTypes.func.isRequired
};

export default translate(translations, { g: true })(Greeter);
