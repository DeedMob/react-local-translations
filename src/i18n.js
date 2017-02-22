import React, { Component } from 'react';
import Polyglot from 'node-polyglot';
import { addPrefixToKeys } from './utils';

// Provider root component
export default class I18nProvider extends Component {
  constructor(props) {
    super(props);

    this._polyglot = new Polyglot({
      locale: props.locale,
      phrases: addPrefixToKeys("globals", props.globals)
    });
  }

  getChildContext() {
    return {
      t: this._polyglot.t.bind(this._polyglot),
      locale: this._polyglot.locale.bind(this._polyglot),
      extend: this._polyglot.extend.bind(this._polyglot)
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.locale !== this.props.locale) {
      this._polyglot = new Polyglot({
        locale: newProps.locale,
        phrases: newProps.globals,
        polyglot: this._polyglot
      })
    }
  }

  render() {
    const children = this.props.children;
    return React.Children.only(children);
  }
}

I18nProvider.propTypes = {
  locale: React.PropTypes.string.isRequired,
  globals: React.PropTypes.object.isRequired,
  children: React.PropTypes.element.isRequired,
};

I18nProvider.childContextTypes = {
  t: React.PropTypes.func.isRequired,
  locale: React.PropTypes.func.isRequired,
  extend: React.PropTypes.func.isRequired
};
