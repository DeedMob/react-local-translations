import React from 'react';
import { compileLanguage, addPrefixToKeys } from './utils';

// higher order decorator for components that need `t`
export default function translate(translations, useGlobals=false) {
  return (WrappedComponent) => {
    const _translate = (props, context) => {
      // Extend translations
      const namespace = WrappedComponent.constructor.displayName;

      context.extend(addPrefixToKeys(namespace, compileLanguage(context.locale(), translations)));

      // augment t
      const t = (key, ...args) => context.t(namespace+"##"+key, ...args)

      if(!useGlobals)
        return (
          <WrappedComponent {...props} t={t}/>
        );

      const g = (key, ...args) => context.t("globals##"+key, ...args)

      return (
        <WrappedComponent {...props} t={t} g={g} />
      );
    }

    _translate.contextTypes = {
      t: React.PropTypes.func.isRequired,
      locale: React.PropTypes.func.isRequired,
      extend: React.PropTypes.func.isRequired
    };

    return _translate;
  };
}
