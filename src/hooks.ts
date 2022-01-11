import { useContext, useMemo } from 'react';
import translate from './translate';
import { I18nContext, TranslateLocal, Translations } from '.';

export function useTranslations<
  L extends string = string,
  TG extends Translations<L> = Translations<L>,
  T extends Translations<L> = Translations<L>
>(Context: React.Context<I18nContext<L, TG>>, translations: T): TranslateLocal<L, T, TG> {
  const ctx = useContext(Context);
  return useMemo(
    () =>
      translate<L, T, TG>({
        ...ctx,
        translations,
      }),
    [ctx, translations]
  );
}

export function useLocale<
  L extends string = string,
  TG extends Translations<L> = Translations<L>
>(Context: React.Context<I18nContext<L, TG>>): L {
  const { locale } = useContext(Context);
  return locale;
}
