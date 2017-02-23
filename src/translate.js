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
          // todo force child to update
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
        const exposed = Object.assign({}, {
          t: this.state._polyglot.t.bind(this.state._polyglot),
          g: exposeGlobal ? this.context.g : undefined,
          setLocale: exposeSetLocale ? this.context.setLocale : undefined,
          getLocale: exposeGetLocale ? this.context.locale : undefined
        })

        return (<WrappedComponent {...this.props} {...exposed} ref={(wrapped) => this.wrapped = wrapped}/>)
      }
    }

    LocalTranslationProvider.contextTypes = {
      g: React.PropTypes.func.isRequired, // todo dynamically include this context based exposeGlobal
      locale: React.PropTypes.func.isRequired,
      subscriptions: React.PropTypes.object.isRequired,
      setLocale: React.PropTypes.func.isRequired
    }

    return LocalTranslationProvider
  }
export default translate;
