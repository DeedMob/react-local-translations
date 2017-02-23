# React Local Translations
Provides higher order component for using Polyglot with React, locally so that each component has its own translations file.

## Installation

```
npm install --save react-local-translations
```

```
yarn add react-local-translations
```

## Uses Polyglot.js

http://airbnb.io/polyglot.js/

## Usage

`react-local-translations` exports consists for one wrapper component called `I18nProvider` and one decorator called
`translate`. The decorator provides a prop `t` which is instance of `Polyglot`.

You are required to wrap your root component with `I18n` and pass on a `locale` like `en` or `fr`.
And `messages` object containing the strings.

```js
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

```

Then inside `App` or a child component of `App` you can do:

```js
import React from 'react';
import { translate } from '../lib';

const translations = {
  "hello_name": {
    en: "In English, Hello Name",
    de: "Auf Deutsch, Hallo Name"
  },
  "other": {
    en: "other",
    de: "anders"
  },
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

```

## translate HOC

translate(translations: Object, injectGlobals: Boolean)

See above for an example of the translations object

### For reliable results unique react component names in project (as local translations are stored by their namespace)
