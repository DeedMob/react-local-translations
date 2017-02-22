import React from 'react';
import { render } from 'react-dom';
import { I18nProvider } from '../lib';
import Greeter from './greeter';

const locale = ['de', 'en'][Math.floor(Math.random()*2)];

const globals = {
  "some_global": "Hello, %{name}.",
  "num_cars": "%{smart_count} car |||| %{smart_count} cars",
}

render(
  <I18nProvider locale={locale} globals={globals}>
    <Greeter name="Batsy" />
  </I18nProvider>,
  document.getElementById('app')
);
