# React Local Translations
Provides higher order component for using Polyglot with React, locally so that each component has its own translations file.

# Requires unique component names

## Installation

```
npm install --save react-local-translations
```

## Usage

`react-local-translations` exports consists for one wrapper component called `I18nProvider` and one decorator called
`translate`. The decorator provides a prop `t` which is instance of `Polyglot`.

You are required to wrap your root component with `I18n` and pass on a `locale` like `en` or `fr`.
And `messages` object containing the strings.

```js
import React from 'react';
import { render } from 'react-dom';
import { I18nProvider } from 'react-local-translations';
import App from './components/app';

const locale = window.locale || 'en';
// Globals
const globals = {
  "hello_name": "Hello, %{name}.",
  "num_cars": "%{smart_count} car |||| %{smart_count} cars",
}

render(
  <I18nProvider locale={locale} globals={globals}>
    <App />
  </I18nProvider>,
  document.getElementById('app')
);
```

Then inside `App` or a child component of `App` you can do:

```js
import React from 'react';
import { translate } from 'react-polyglot';

const Greeter = ({ name, t }) => (
  <h3>{t('hello_name', { name })}</h3>
);

Greeter.propTypes = {
  name: React.PropTypes.string.isRequired,
  t: React.PropTypes.func.isRequired,
};

export default translate()(Greeter);
```

## Work in progress

Tests and Contributing guides are in progress.


## Release History

* 0.1.0 Initial Release
* 0.2.0 Update the I18n component when the locale changes
