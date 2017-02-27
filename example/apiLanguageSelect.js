import React from 'react';
import language from './language';

export default class ApiLanguageSelect extends React.Component {
  shouldComponentUpdate(){
    // demonstrates that translations transcend react component shouldComponentUpdates.
    return false;
  }
  render(){
    // This component doesn't rerender when the language changes
    // Use the languageHandler API in redux or outside react components
    // Setting the locale like this is fine, but the language.locale line here doesn't subscribe the component to updates like the @translate HOC does.
    return (
      <div>
        <h1>API</h1>
        <select value={language.locale} onChange={(e) => language.locale = e.target.value}>
          <option value="en">EN</option>
          <option value="de">DE</option>
        </select>
      </div>
    )
  }
}
