import { store } from "redux/store";
import { GenerateImport } from "./generateReactImportMatlab";
import { GenerateImportTableAndRadio } from "./generateReactImportTable";

export function update() {
  var generate_import_antd = GenerateImportTableAndRadio();
  var gia = GenerateImportTableAndRadio() ? `${generate_import_antd}` : "";
  var generate_import = GenerateImport();
  if (generate_import === undefined) {
    generate_import = [];
  }
  var gen_rea_mat = store.getState().StateReducer.stateNode.d();
  //用正则替换所有":"
  gen_rea_mat = gen_rea_mat.replace(/:/g, "=");
  const code = `import React from "react";
import {${generate_import}} from 'antd'
${gia}
  export default function App() {
    return (
      <div className="App">
      ${gen_rea_mat}
      </div>
    );
}`;
  return function () {
    return code;
  };
}
