import React from 'react';
import { render } from 'react-dom';
import { I18nProvider, LanguageHandler } from '../lib';
import Greeter from './greeter';

const locale = ['de', 'en'][Math.floor(Math.random()*2)];

const globals = {
  "some_global": {
    en: "Hello, %{name}.",
    de: "Hallo, %{name}"
  },
  "num_cars": {
    en: "%{smart_count} car |||| %{smart_count} cars",
    de: "%{smart_count} auto |||| %{smart_count} autos"
  }
}

const localeChangeCallback = (locale) => console.log(locale);

export const l = new LanguageHandler("en", ["en", "de"], localeChangeCallback);

render(
  <I18nProvider languageHandler={l} globals={globals}>
    <Greeter name="Batsy" />
  </I18nProvider>,
  document.getElementById('app')
);
