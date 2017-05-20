import React from 'react';

const d = __dirname;

const debuggableTranslate = (translations, t) => (...args) => {
  let str = t(...args);
  let color = green;
  if(!str || str === ""){
    str = `><${args[0]}><`;
    color = red;
  }
  if(str === args[0]){
    str = `><${args[0]}><`;
    color = red;
  }
  return (
    <span
      style={{background: color, border: "2px solid black"}}
      onContextMenu={(e) => {
        e.preventDefault();
        alert(`Path: ${d} \nKey: ${args[0]} \nTranslations: ${JSON.stringify(translations[args[0]], null, 2)}`)
      }}
    >
      {str}
    </span>
  );
};

export default debuggableTranslate;
