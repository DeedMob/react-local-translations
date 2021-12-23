import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { useLocale, useTranslations, I18nContext } from '../src/index';
import translations from './translations.json';
import missingLanguage from './missing-language.json';

enum Locale {
  'en' = 'en',
  'de' = 'de',
}
const I18n = React.createContext<I18nContext<Locale>>({ locale: Locale.en });

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
  ],
};

function HooksComponent() {
  const locale = useLocale(I18n);
  const t = useTranslations(I18n, translations);
  // This is a test for missing language; If this 'any' is not needed then types aren't working correctly
  useTranslations<Locale>(I18n, missingLanguage as any);
  return (
    <>
      {[
        locale,
        t('greeting', { name: 'Test' }),
        t('greeting_capitalized', { name: 'lowercase' }),
        t('num_cars', 10),
        t('english_capitalized'),
        t('german'),
        t('selectLanguage'),
        t('languages'),
        // This is a test for missing key; If this 'any' is not needed then types aren't working correctly
        t('missing-key' as any),
        // Preprocess is not typed
        t('preprocessme' as any),
        t('nested', { user: { name: { first: 'David' } } }),
        t('nested', { user: 'Test' }),
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
        value={{ locale, transforms, preprocess, postprocess, convertMissingKey }}>
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
