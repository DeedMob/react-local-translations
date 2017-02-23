import React from 'react';
import { render } from 'react-dom';
import { I18nProvider } from '../lib';
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

render(
  <I18nProvider initialLocale={locale} globals={globals}>
    <Greeter name="Batsy" />
  </I18nProvider>,
  document.getElementById('app')
);
