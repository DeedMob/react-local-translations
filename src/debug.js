import React from 'react';

const d = __dirname;

const debuggableTranslate = (translations, t) => (...args) => (
  <span
    style={{background: "red"}}
    onContextMenu={(e) => {
      e.preventDefault();
      alert(`Path: ${d} \nKey: ${args[0]} \nTranslations: ${JSON.stringify(translations[args[0]], null, 2)}`)
    }}
  >
    {t(...args)}
  </span>
);

export default debuggableTranslate;
