import React from 'react';
import PropTypes from 'prop-types';
import { compileLanguage } from './utils';
import debuggableTranslate from './debug';
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
        this._isMounted;
        this.translations = translations;
        this.namespace = WrappedComponent.constructor.displayName;
        this.state = {
          _polyglot: this.getTranslations()
        }

        this.context.subscriptions.subscribe(() => {
          if(this._isMounted){
            this.setState({_polyglot: this.getTranslations()});
            this.forceUpdate();
            if(this.wrapped)
              this.wrapped.forceUpdate()
          }
        });

        this.getTranslations = this.getTranslations.bind(this);
      }
      componentDidMount(){
        this._isMounted = true;
      }
      componentWillUnmount(){
        this._isMounted = false;
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
        );

        if(this.context.debug){
          // Augment t to return a complex component
          return <WrappedComponent {...this.props} {...exposed} ref={(wrapped) => this.wrapped = wrapped} t={debuggableTranslate(this.translations, exposed.t)}/>
        }
        else {
          return <WrappedComponent {...this.props} {...exposed} ref={(wrapped) => this.wrapped = wrapped}/>
        }
      }
    }
    // todo dynamically change context based on expose options
    LocalTranslationProvider.contextTypes = {
      debug: PropTypes.bool.isRequired,
      g: PropTypes.func.isRequired,
      locale: PropTypes.func.isRequired,
      subscriptions: PropTypes.object.isRequired,
      setLocale: PropTypes.func.isRequired
    }

    return LocalTranslationProvider
  }
export default translate;
