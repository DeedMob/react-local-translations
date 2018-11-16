import React from "react";
import PropTypes from "prop-types";
import { compileLanguage } from "./utils";
import debuggableTranslate from "./debug";
import Polyglot from "node-polyglot";

// higher order decorator for components that need `t`
const translate = translations => WrappedComponent => {
  class LocalTranslationProvider extends React.Component {
    constructor(props, context) {
      super(props);

      // Context should never change
      this.context = context;
      this._isMounted;
      this.translations = translations;
      this.namespace = WrappedComponent.constructor.displayName;
      this.state = {
        _polyglot: this.getTranslations()
      };

      // Don't subscribe to updates on the server.
      // This was causing a memory leak
      if (typeof window !== "undefined")
        this.context.subscriptions.subscribe(() => {
          if (this._isMounted) {
            this.setState({ _polyglot: this.getTranslations() });
          }
        });

      this.getTranslations = this.getTranslations.bind(this);
    }
    componentDidMount() {
      this._isMounted = true;
    }
    componentWillUnmount() {
      this._isMounted = false;
      // TODO: unsubscribe!
    }
    getTranslations() {
      return new Polyglot({
        locale: this.context.locale(),
        phrases: compileLanguage(this.context.locale(), this.translations),
        allowMissing: this.context.allowMissing,
        onMissingKey: this.context.onMissingKey
      });
    }
    render() {
      const exposed = {
        t: this.state._polyglot.t.bind(this.state._polyglot),
        setLocale: this.context.setLocale,
        g: this.context.g,
        getLocale: this.context.locale
      };

      if (this.context.debug) {
        // Augment t to return a complex component
        return (
          <WrappedComponent
            {...this.props}
            {...exposed}
            t={debuggableTranslate(this.translations, exposed.t)}
          />
        );
      } else {
        return <WrappedComponent {...this.props} {...exposed} />;
      }
    }
  }

  LocalTranslationProvider.contextTypes = {
    allowMissing: PropTypes.bool.isRequired,
    onMissingKey: PropTypes.func.isRequired,
    debug: PropTypes.bool.isRequired,
    locale: PropTypes.func.isRequired,
    subscriptions: PropTypes.object.isRequired,
    g: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired,
    getLocale: PropTypes.func.isRequired
  };

  return LocalTranslationProvider;
};
export default translate;
