import { useContext, useMemo } from 'react';
import translate from './translate';
import { I18nContext, Translations } from '.';

export function useTranslations<
  L extends string = string,
  T extends Translations<L> = Translations<L>
>(Context: React.Context<I18nContext<L>>, translations: T) {
  const ctx = useContext(Context);
  return useMemo(() => translate<L, T>({ ...ctx, translations }), [ctx, translations]);
}

export function useLocale<L extends string = string>(
  Context: React.Context<I18nContext<L>>
) {
  const { locale } = useContext(Context);
  return locale;
}
