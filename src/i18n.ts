import React from 'react';
import { Translations, ConvertMissingKey, Postprocess, Transforms, Preprocess } from './';

interface I18nContext {
  locale: string;
  globalTranslations?: Translations;
  convertMissingKey?: ConvertMissingKey;
  /**
   * Transforms are pure functions that map %{key} phrases to something else.
   * For example, %{vacancy | cap} would be the same as `cap(t('vacancy'))`, but inline in a translation.
   *
   * This feature is especially useful for languages such as German which expect certain words (e.g. nouns) to be capitalized.
   * Obviously, it is much more widely useful than that. Use your imagination, but try to keep things understandable.
   */
  transforms?: Transforms;
  /**
   * Pre-processing of the key passed to t() or g(). If this function is passed,
   * t/g() returns the result of preprocess(key) if it's truthy, with no further processing occurring.
   * Returning '' or false makes the flow continue as usual.
   *
   * You can determine whether the translation is global by
   * comparing `translations (second argument) === your globalTranslations`.
   */
  preprocess?: Preprocess;
  /**
   * Context-wide postprocessing of translation phrases.
   *
   * May return a React node too. t() and t.g() are typed to always
   * return a string because most of the time this isn't too useful, and it would seriously
   * inconvienence string-only code.
   *
   * Can be used to e.g. implement limited markdown (*text* becomes React <em>text</em>).
   *
   * Local postprocessing can be performed simply by doing stuff with the result of t/g.
   */
  postprocess?: Postprocess;
}

export const I18n = React.createContext<I18nContext>({ locale: 'en' });
