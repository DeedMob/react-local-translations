# React Local Translations

Define both global, app-wide translations, and local, per-component translations for your React app.

Based on [polyglot.js](https://airbnb.io/polyglot.js), with a few additions we found sorely lacking while whitelabeling.

```sh
npm i react-local-translations
```

## Want the benefits of global translation files? Check out

https://github.com/DeedMob/transform-translations

## Usage

See the [tests](tests/tests.tsx)

You wrap your app in an I18n.Provider and then make use of `useTranslations` or `useLocale` (we found that plenty of components only use the current locale). For legacy class component use, the `translate` HOC is also available, with the same signature as `useTranslations`, except that it passes through different props: `t`, `g`, `getLocale`.

Translate using t (return type of useTranslations, or this.props.t from translate):

`t('key')`, `t.g('global_key')`, `t.locale`, `t.has(`\${thing}\_help`) ? t(`\${thing}\_help`) : ''`

We recommend putting translation files in `.json`, but anything goes. Dynamic stuff is recommended to be in global translations. `convertMissingKey` and `transforms` are able to supply additional dynamic stuff.

## Releasing updates

Once you've merged in your changes, **bump the version appropriately**.

Then build & release with:
```sh
npm run build
npm publish
```
