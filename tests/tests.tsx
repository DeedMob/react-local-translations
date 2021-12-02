import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { useLocale, useTranslations, I18n } from '../src/index';
import translations from './translations.json';

const testLocales = ['en', 'de'];
const expectedToBe: Record<typeof testLocales[number], string[]> = {
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
  const locale = useLocale();
  const t = useTranslations(translations);
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
        // @ts-expect-error missing key
        t('missing-key'),
        // @ts-expect-error preprocess is not typed
        t('preprocessme'),
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

for (const locale of testLocales) {
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
