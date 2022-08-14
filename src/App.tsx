import { Header } from "pages/Header";
import MiddlePage from "pages/MidPanel/middlePage";
import React, { Fragment, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// React dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// App scrollbar css
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./redux/store";
// mock
import { NotFound } from "components/404";
import Deploy from "pages/deploy";
import drawData from "./mock/drawData.json";
import { LeftPanel } from "./pages/LeftPanel";
import RightPanel from "./pages/RightPanel";
import "./scrollbar.css";
import { RIGHT_PANEL_TYPE } from "./types";

const App: React.FC = () => {
  const [drawPanelData, setDrawPanelData] = useState([...drawData.data]);
  const [rightPanelType, setRightPanelType] = useState(RIGHT_PANEL_TYPE.TEXT);
  const [rightRanelElementId, setRightRanelElementId] = useState("");

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
                      <RightPanel
                        type={rightPanelType}
                        data={drawPanelData}
                        elementId={rightRanelElementId}
                        setDrawPanelData={setDrawPanelData}
                      />
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
