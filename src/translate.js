import React from "react";
import PropTypes from "prop-types";
import { compileLanguage } from "./utils";
import debuggableTranslate from "./debug";
import Polyglot from "node-polyglot";

// higher order decorator for components that need `t`
const translate = translations => WrappedComponent => {
  class LocalTranslationProvider extends React.Component {
    constructor(props, context) {
      super(props, context);

      this._isMounted = false;
      this.translations = translations;
      this.namespace = WrappedComponent.constructor.displayName;

      const polyglot = this.getTranslations();
      this.state = {
        _polyglot: polyglot,
        t: polyglot.t.bind(polyglot)
      };

      this.getTranslations = this.getTranslations.bind(this);
      this.subscribeToChanges = this.subscribeToChanges.bind(this);
    }
    subscribeToChanges() {
      if (this._isMounted) {
        const polyglot = this.getTranslations();
        this.setState({ _polyglot: polyglot, t: polyglot.t.bind(polyglot) });
      }
    }
    componentDidMount() {
      this._isMounted = true;
      this.context.subscriptions.subscribe(this.subscribeToChanges);
    }
    componentWillUnmount() {
      this._isMounted = false;
      this.context.subscriptions.unsubscribe(this.subscribeToChanges);
    }
    getTranslations() {
      return new Polyglot({
        locale: this.context.locale(),
        phrases: compileLanguage(
          this.context.locale(),
          this.translations,
          this.context.fallbackLocale
        ),
        allowMissing: this.context.allowMissing,
        onMissingKey: this.context.onMissingKey
      });
    }
    render() {
      const exposed = {
        t: this.state.t,
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
    fallbackLocale: PropTypes.string.isRequired
  };

  return LocalTranslationProvider;
};
export default translate;
