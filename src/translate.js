import React from 'react';
import { compileLanguage } from './utils';
import Polyglot from 'node-polyglot';

// higher order decorator for components that need `t`
const translate =
  (translations, exposeGlobal=false, exposeSetLocale=false, exposeGetLocale = false) =>
  (WrappedComponent) => {
    class LocalTranslationProvider extends React.Component {
      constructor(props, context){
        super(props);

        // context should never change
        this.context = context;

        this.translations = translations;
        this.namespace = WrappedComponent.constructor.displayName;
        this.state = {
          _polyglot: this.getTranslations()
        }

        this.context.subscriptions.subscribe(() => {
          this.setState({_polyglot: this.getTranslations()});
          this.forceUpdate();
          if(this.wrapped)
            this.wrapped.forceUpdate()
        });

        this.getTranslations = this.getTranslations.bind(this);
      }
      getTranslations(){
        return new Polyglot({
          locale: this.context.locale(),
          phrases: compileLanguage(this.context.locale(), this.translations)
        })
      }
      render(){
        const exposed = Object.assign(
          { t: this.state._polyglot.t.bind(this.state._polyglot) },
          (exposeSetLocale ? { setLocale: this.context.setLocale } : {}),
          (exposeGlobal ? { g: this.context.g } : {}),
          (exposeGetLocale ? { getLocale: this.context.locale } : {})
        )

        return (<WrappedComponent {...this.props} {...exposed} ref={(wrapped) => this.wrapped = wrapped}/>)
      }
    }
    // todo dynamically change context based on expose options
    LocalTranslationProvider.contextTypes = {
      g: React.PropTypes.func.isRequired,
      locale: React.PropTypes.func.isRequired,
      subscriptions: React.PropTypes.object.isRequired,
      setLocale: React.PropTypes.func.isRequired
    }

    return LocalTranslationProvider
  }
export default translate;
