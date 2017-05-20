import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Polyglot from 'node-polyglot';
import { addPrefixToKeys, Subscribe, compileLanguage } from './utils';

// Provider root component
export default class I18nProvider extends Component {
  constructor(props) {
    super(props);

    this.debug = props.debug || false;
    this.languageHandler = props.languageHandler;
    props.languageHandler.registerCallback(this._setLocale.bind(this));

    this._polyglot = new Polyglot({
      locale: props.languageHandler.locale,
      phrases: compileLanguage(props.languageHandler.locale, props.globals)
    });
    this._subscriptions = new Subscribe();
    this._allGlobals = props.globals;
  }

  getChildContext() {
    return {
      debug: this.debug,
      g: this._polyglot.t.bind(this._polyglot),
      locale: this._polyglot.locale.bind(this._polyglot),
      subscriptions: this._subscriptions,
      setLocale: this.setLocale.bind(this)
    };
  }

  _setLocale(locale){
    if(locale !== this._polyglot.locale()){
      this._polyglot.locale(locale);
      this._polyglot.clear();
      this._polyglot.extend(compileLanguage(locale, this._allGlobals));
      this._subscriptions.messageSubscribers();
    }
  }

  setLocale(locale){
    this.languageHandler.locale = locale;
  }

  render() {
    const children = this.props.children;
    return React.Children.only(children);
  }
}

I18nProvider.propTypes = {
  languageHandler: PropTypes.object.isRequired,
  globals: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

I18nProvider.childContextTypes = {
  debug: PropTypes.bool.isRequired,
  g: PropTypes.func.isRequired,
  locale: PropTypes.func.isRequired,
  subscriptions: PropTypes.object.isRequired,
  setLocale: PropTypes.func.isRequired
};
