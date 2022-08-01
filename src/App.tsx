import { LayoutWrapper } from "layout";
import React from "react";
import "antd/dist/antd.min.css";
import "./App.css";
import "./scrollbar.css";

/* 全局样式 */
import { GlobalStyle } from "./style";

function App() {
  return (
    <div className="App">
      {/* 全局样式 */}
      <GlobalStyle />
      <LayoutWrapper></LayoutWrapper>
    </div>
  );
}

export default App;
