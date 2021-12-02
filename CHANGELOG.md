# 6.0.0

Adds stricter type checking of translation strings. If using the preprocess option you may need to now use as any or pass the generic `useTranslations<Translations>();` in order to pass type checks

# 5.0.0

- TypeScript rewrite (includes full typings)
- Added hooks: useLocale, useTranslations
- Migrate to React Context
- Added: reference other translations: %{t:local_tr}, %{g:local_tr}. Especially useful with global translations.
- Added: transforms, e.g. to capitalize certain words (especially useful in a language like German). Uses %{translation_key | transform} syntax.
- Added: preprocess, useful for implementing Live Translation.
- Added: postprocess, e.g. to convert markdown in your translations, as to keep them free of HTML.
- Removed: LanguageHandler, Subscription, and other legacy React Context hacks.
- Replaced: node-polyglot with a trimmed, improved version
- Renamed: translateApi -> tr. Now supports the same options as I18n.Provider.
- Removed: debug option
- Removed: setLocale. This is rarely useful; we recommend setting the locale via (sub)domain instead of directory. If necessary this can be re-implemented using another context and setting I18n.Provider's `value={{locale:..}}`.
- Changed: onMissingKey -> convertMissingKey, now also takes the translations object as a second parameter.
- Removed: fallbackLocale. Use convertMissingKey's second parameter.

# 5.1.0

- Added: access nested properties by using dot notation. %{user.name} by passing in a user object { user: { name: 'David' }} as the second argument to a translate call
