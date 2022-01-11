import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { useLocale, useTranslations, I18nContext } from '../src/index';
import translations from './translations.json';
import missingLanguage from './missing-language.json';
import globalTranslations from './global-translations.json';

enum Locale {
  'en' = 'en',
  'de' = 'de',
}
const I18n = React.createContext<I18nContext<Locale, typeof globalTranslations>>({
  locale: Locale.en,
  globalTranslations,
});

const expectedToBe: Record<Locale, string[]> = {
  de: [
    'de',
    '{Hallo, Test}',
    '{Hallo, Lowercase}',
    '{10 autos}',
    '{Englisch}',
    '{Deutsch}',
    '{Bitte Sprache wählen}',
    '{Englisch, Deutsch}',
    '{MissingKey: missing-key}',
    '{.preprocess.}',
    '{David}',
    '{undefined}',
    '{MissingKey: missing-key}',
    '{Global}',
    '{MissingKey: english_lower}',
  ],
  en: [
    'en',
    '{Hello, Test.}',
    '{Hello, Lowercase.}',
    '{10 cars}',
    '{English}',
    '{German}',
    '{Select a language}',
    '{English, German}',
    '{MissingKey: missing-key}',
    '{.preprocess.}',
    '{David}',
    '{undefined}',
    '{MissingKey: missing-key}',
    '{Global}',
    '{MissingKey: english_lower}',
  ],
};

function HooksComponent() {
  const locale = useLocale(I18n);
  const t = useTranslations(I18n, translations);
  useTranslations(
    I18n,
    // This is a test for missing language; If this 'ts-expect-error' is not needed then types aren't working correctly
    // @ts-expect-error
    missingLanguage
  );
  return (
    <>
      {[
        locale,
        t('greeting', { name: 'Test' }),
        t('greeting_capitalized', { name: 'lowercase' }),
        t('num_cars', { smart_count: 10 }),
        t('num_cars', 10),
        t('english_capitalized'),
        t('german'),
        t('selectLanguage'),
        t('languages'),
        // This is a test for missing key; If this 'ts-expect-error' is not needed then types aren't working correctly
        // @ts-expect-error
        t('missing-key'),
        // This is a test for preprocess function arguments not being typed; If this 'ts-expect-error' is not needed then types aren't working correctly
        // @ts-expect-error
        t('preprocessme'),
        t('nested', { user: { name: { first: 'David' } } }),
        t('nested', { user: 'Test' }),
        // This is a test for missing key in global; If this 'ts-expect-error' is not needed then types aren't working correctly
        // @ts-expect-error
        t.g('missing-key'),
        // This is a test for global types
        t.g('global'),
        // This is a test for global type not falsely accepting keys from the local translation file
        // @ts-expect-error
        t.g('english_lower'),
      ].map((val, i) => (
        <span key={`${val}-${i}`}>{val}</span>
      ))}
    </>
  );
}

const transforms = {
  cap(str: string) {
    return str[0].toUpperCase() + str.substr(1);
  },
};

function preprocess(k: string) {
  if (k === 'preprocessme') return '{.preprocess.}';
}

function postprocess(s: string) {
  return `{${s}}`;
}

function convertMissingKey(k: string) {
  return 'MissingKey: ' + k;
}

for (const [key, locale] of Object.entries(Locale)) {
  const expectedToBeForLocale: string[] = expectedToBe[locale];
  const output: string[] = (
    ReactTestRenderer.create(
      <I18n.Provider
        value={{
          globalTranslations,
          locale,
          transforms,
          preprocess,
          postprocess,
          convertMissingKey,
        }}>
        <HooksComponent />
      </I18n.Provider>
    ).toJSON() as any
  ).map((node: any) => node.children[0]);

  let failingTestsCount = 0;
  console.log(' ');
  console.log('======================================');
  console.log(`Running tests for locale ${locale}`);
  console.log('======================================');
  output.map((line: string, i: number) => {
    const passedTest = line === expectedToBeForLocale[i];
    if (passedTest) console.log(`✅ Passed test ${i + 1}, ${line}`);
    else {
      failingTestsCount += 1;
      console.log(
        `❌ Failed test ${i + 1}, expected "${
          expectedToBeForLocale[i]
        }" but got "${line}"`
      );
    }
  });
  console.log('======================================');
  if (failingTestsCount === 0) {
    console.log('✅ All tests passed!');
  } else {
    console.log(
      `❌ ${failingTestsCount} test failed, ${
        expectedToBeForLocale.length - failingTestsCount
      } passed`
    );
  }
}
