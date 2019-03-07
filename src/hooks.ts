import { useContext, useMemo } from 'react';
import { I18n } from './i18n';
import translate from './translate';
import { Translations } from '.';

export function useTranslations(translations: Translations) {
  const ctx = useContext(I18n);
  return useMemo(() => translate({ ...ctx, translations }), [ctx, translations]);
}

export function useLocale() {
  const { locale } = useContext(I18n);
  return locale;
}
