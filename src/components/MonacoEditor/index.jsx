import { Component } from "react";
import MonacoEditor from "react-monaco-editor";
import { store } from "../../redux/store";

var gen_rea_mat = store.getState();
function update() {
  console.log(gen_rea_mat)
  var grm = gen_rea_mat.StateReducer.generate_matlab;
  return function () {
    return grm;
  };
}

const code = `import React from "react";
export default function App() {
  return (
    <div className="App">${update()()}</div>
  );
}`;

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code,
    };
  }

  componentDidUpdate() {
    update()
    console.log(update()())
  }

  onChange(newValue, e) {
    // console.log('onChange', newValue, e);
  }

  render() {
    return (
      <MonacoEditor
        width="600"
        height="800"
        language="javascript"
        theme="vs"
        highlight
        defaultValue=""
        value={this.state.code}
        onChange={this.onChange}
      />
    );
  }
}
