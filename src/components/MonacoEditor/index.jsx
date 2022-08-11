import { Component } from "react";
import MonacoEditor from "react-monaco-editor";

const code = `import React from "react";

export default function App() {
  return (
    <div className="App">
      2win19virus
    </div>
  );
}`;
export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code,
    };
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
