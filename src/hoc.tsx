import React, { useMemo, useContext } from 'react';
import { I18n, Translations, TranslateProps } from './';
import translate from './translate';

const hoc = <T extends Translations>(translations: T) => <Props extends object>(
  WrappedComponent: React.ComponentType<Props & TranslateProps>
) => {
  const LocalTranslations: React.FC<Props> = props => {
    const ctx = useContext(I18n);
    const i18nProps = useMemo(() => {
      const t = translate({ ...ctx, translations });

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
