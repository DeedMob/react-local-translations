import React, { Component } from 'react';
import Polyglot from 'node-polyglot';
import { addPrefixToKeys, Subscribe, compileLanguage } from './utils';

// Provider root component
export default class I18nProvider extends Component {
  constructor(props) {
    super(props);

    this._polyglot = new Polyglot({
      locale: props.initialLocale,
      phrases: compileLanguage(props.initialLocale, props.globals)
    });
    this._subscriptions = new Subscribe();
    this._allGlobals = props.globals;
  }

  getChildContext() {
    return {
      g: this._polyglot.t.bind(this._polyglot),
      locale: this._polyglot.locale.bind(this._polyglot),
      subscriptions: this._subscriptions,
      setLocale: this.setLocale.bind(this)
    };
  }

  setLocale(locale){
    if(locale !== this._polyglot.locale()){
      this._polyglot.locale(locale);
      this._polyglot.clear();
      this._polyglot.extend(compileLanguage(locale, this._allGlobals));
      this._subscriptions.messageSubscribers();
    }
  }

  render() {
    const children = this.props.children;
    return React.Children.only(children);
  }
}

I18nProvider.propTypes = {
  initialLocale: React.PropTypes.string.isRequired,
  globals: React.PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired,
};

I18nProvider.childContextTypes = {
  g: React.PropTypes.func.isRequired,
  locale: React.PropTypes.func.isRequired,
  subscriptions: React.PropTypes.object.isRequired,
  setLocale: React.PropTypes.func.isRequired
};
