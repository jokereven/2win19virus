import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Pages
import { Header } from "pages/Header";
import LeftPanel from "./pages/LeftPanel";
import MiddlePage from "pages/MidPanel/middlePage";
import RightPanel from "./pages/RightPanel";
import Deploy from "pages/deploy";
// React dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Provider } from "react-redux";
import { store } from "./redux/store";
// mock
import { NotFound } from "components/404";
// import drawData from "./mock/drawData.json";
import "./App.css";
// App scrollbar css
import "./scrollbar.css";

const App: React.FC = () => {

  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Fragment>
                    <Header></Header>
                    <div className="content">
                      <LeftPanel />
                      <MiddlePage></MiddlePage>
                      <RightPanel></RightPanel>
                    </div>
                  </Fragment>
                }
              ></Route>
              <Route path="/deploy" element={<Deploy />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    </DndProvider>
  );
};

export default App;
