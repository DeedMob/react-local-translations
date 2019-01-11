import React, { Component } from "react";
import PropTypes from "prop-types";
import Polyglot from "node-polyglot";
import { Subscribe, compileLanguage } from "./utils";

// Provider root component
export default class I18nProvider extends Component {
  static propTypes = {
    languageHandler: PropTypes.object.isRequired,
    globals: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    allowMissing: PropTypes.bool,
    fallbackLocale: PropTypes.string,
    onMissingKey: PropTypes.func
  };

  static defaultProps = {
    allowMissing: false,
    fallbackLocale: "",
    onMissingKey: () => null
  };

  static childContextTypes = {
    allowMissing: PropTypes.bool.isRequired,
    onMissingKey: PropTypes.func.isRequired,
    debug: PropTypes.bool.isRequired,
    g: PropTypes.func.isRequired,
    locale: PropTypes.func.isRequired,
    subscriptions: PropTypes.object.isRequired,
    setLocale: PropTypes.func.isRequired,
    fallbackLocale: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);

    this.debug = props.debug || false;
    this.languageHandler = props.languageHandler;
    this.fallbackLocale = props.fallbackLocale;
    this.allowMissing = props.allowMissing;
    this.onMissingKey = props.onMissingKey;
    this._polyglot = new Polyglot({
      locale: props.languageHandler.locale,
      phrases: compileLanguage(
        props.languageHandler.locale,
        props.globals,
        this.fallbackLocale
      ),
      allowMissing: this.allowMissing,
      onMissingKey: this.onMissingKey
    });
    this._subscriptions = new Subscribe();
    this._allGlobals = props.globals;
    this._setLocale = this._setLocale.bind(this);
  }

  componentDidMount() {
    this.languageHandler.registerCallback(this._setLocale);
  }

  componentWillUnmount() {
    props.languageHandler.unregisterCallback(this._setLocale);
  }

  getChildContext() {
    return {
      fallbackLocale: this.fallbackLocale,
      allowMissing: this.allowMissing,
      onMissingKey: this.onMissingKey,
      debug: this.debug,
      g: this._polyglot.t.bind(this._polyglot),
      locale: this._polyglot.locale.bind(this._polyglot),
      subscriptions: this._subscriptions,
      setLocale: this.setLocale.bind(this)
    };
  }

  _setLocale(locale) {
    if (locale !== this._polyglot.locale()) {
      this._polyglot.locale(locale);
      this._polyglot.clear();
      this._polyglot.extend(compileLanguage(locale, this._allGlobals));
      this._subscriptions.messageSubscribers();
    }
  }

  setLocale(locale) {
    this.languageHandler.locale = locale;
  }

  render() {
    const children = this.props.children;
    return React.Children.only(children);
  }
}
