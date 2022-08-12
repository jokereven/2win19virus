import { store } from "redux/store";

export function update() {
  var gen_rea_mat = store.getState();
  console.log(gen_rea_mat);
  let grm = gen_rea_mat.StateReducer.generate_matlab;
  const code = `import React from "react";
  export default function App() {
    return (
      <div className="App">
      ${grm}
      </div>
    );
}`;
  return function () {
    return code;
  };
}
