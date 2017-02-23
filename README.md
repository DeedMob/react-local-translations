# React Local Translations
This library allows you to define translations both globally for the entire app, as well as component local translations. It uses the lightweight Polyglot.js for internationalization and is really tiny (DIY)

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

[DEMO](https://deedmob.github.io/react-local-translations/example/index.html)

`react-local-translations` exports consists for one wrapper component called `I18nProvider` and one decorator called `translate`. Depending on the arguments to translate you can expose a function `t` for fetching local translations, `g` for global translations (shared across app), `setLocale` for setting the locale, and `getLocale` for getting the locale.

You are required to wrap your root component with `I18n` and pass on a `locale` like `en` or `fr`.
And `messages` object containing the strings.

```js
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
```

Then inside `App` or a child component of `App` you can do:

```js
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

```

Change the language

```js

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

```
## translate HOC

*args*
(translations, exposeGlobal=false, exposeSetLocale=false, exposeGetLocale = false)

## I18nProvider props

(initialLocale: string, globals: Object)


See above for an example of the translations/globals object

### For reliable results unique react component names in project (as local translations are stored by their namespace)
