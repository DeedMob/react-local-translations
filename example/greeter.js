import React from 'react';
import { translate } from '../lib';

const translations = {
  "hello_name": {
    en: "In English, Hello Name",
    de: "Auf Deutsch, Hallo Name"
  }
}

const Greeter = ({ name, t, g }) => {
  return (
    <h3>{t('hello_name')}<b>{g('some_global', { name })}</b></h3>
  )
};

Greeter.propTypes = {
  name: React.PropTypes.string.isRequired,
  t: React.PropTypes.func.isRequired,
  g: React.PropTypes.func.isRequired
};

export default translate(translations, true)(Greeter);
