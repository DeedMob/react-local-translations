import React, { useMemo, useContext } from 'react';
import { Translations, TranslateProps } from './';
import { I18nContext } from './i18n';
import translate from './translate';

const hoc =
  <L extends string, T extends Translations<L>, TG extends Translations<L>>(
    Context: React.Context<I18nContext<L, TG>>,
    translations: T
  ) =>
  <Props extends object>(
    WrappedComponent: React.ComponentType<Props & TranslateProps<L, T, TG>>
  ) => {
    const LocalTranslations: React.FC<Props> = (props) => {
      const ctx = useContext(Context);
      const i18nProps = useMemo(() => {
        const t = translate<L, T, TG>({ ...ctx, translations });

        return {
          t: t,
          g: t.g,
          getLocale: () => ctx.locale,
        };
      }, [ctx]); // translations is always constant

      return <WrappedComponent {...props} {...i18nProps} />;
    };

    return LocalTranslations;
  };

export default hoc;
