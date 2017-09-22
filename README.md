# React Local Translations
This library allows you to define translations both globally for the entire app, as well as component local translations. It uses the lightweight Polyglot.js for internationalization and is really tiny (DIY)

## Installation

```
npm install --save react-local-translations
```

```
yarn add react-local-translations
```

## Want the benefits of global translation files? Check out

https://github.com/DeedMob/transform-translations

## Uses Polyglot.js internally

http://airbnb.io/polyglot.js/

Notable quirks:
- Will serve the template literal %{organizationName} if the variable has value undefined

## Usage

[DEMO](https://deedmob.github.io/react-local-translations/example/index.html)

`react-local-translations` exports consists for one wrapper component called `I18nProvider` and one decorator called `translate`. Depending on the arguments to translate you can expose a function `t` for fetching local translations, `g` for global translations (shared across app), `setLocale` for setting the locale, and `getLocale` for getting the locale.

You are required to wrap your root component with `I18n` and pass on a `locale` like `en` or `fr`.
And `messages` object containing the strings.

```js
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

const localeChangeCallback = (locale) => alert(locale)

export const l = new LanguageHandler("en", ["en", "de"], localeChangeCallback);

// l.locale("de")
// l.locale() i

render(
  <I18nProvider languageHandler={l} globals={globals}>
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
  name: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  g: PropTypes.func.isRequired
};

export default translate(translations, { g: true })(Greeter);

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

export default translate(translations, { setLocale: true, getLocale: true })(LanguageSelect)

```
## translate HOC

`import { translate } from 'react-local-translations'`

Example:
translate(translations: Object, {g = false, setLocale = false, getLocale = false})

The translations for this component are available via the `t` prop.
assigning true to g in the second argument (options) passes the `g` function into the React Component's props.
assigning true to setLocale in the second argument (options) passes the `setLocale` function into the React Component's props
assigning true to getLocale in the second argument (options) passes the `getLocale` function into the React Component's props

`getLocale :: () -> string`
`setLocale :: string -> void`
`g :: (string, options) -> string`
`t :: (string, options) -> string`

## translateApi

```js

import translations from './translations';
import { translateApi } from 'react-local-translations';
const locale = 'en';
const t = translateApi(translations, locale).t;
console.log(t('someKey'));

```

## I18nProvider props

(initialLocale: string, globals: Object, debug: boolean)

Debug defaults to false and when true highlights the text red and shows details on right click

## LanguageHandler class

constructor(initialLocale: string, supportedLanguages: Array<string>, onChange = () => null)

`locale :: string -> boolean`
Setter, returns true if successful (in supportedLanguages)

`locale :: string`
Getter, returns the current string.

`registerCallback :: f -> void`
Adds a callback for when the language changes. Used internally, but you can add any amount of your own callbacks.

## Using the LanguageHandler class as an API

Export the instance from wherever you create it and you can call the locale setter or getter to update the current language state.

See above for an example of the translations/globals object
