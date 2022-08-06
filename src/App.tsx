import { Header } from "pages/Header";
import React, { useState } from "react";
// React dnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// App scrollbar css
import "./App.css";
// mock
import drawData from "./mock/drawData.json";
import { LeftPanel } from "./pages/LeftPanel";
import MidPanel from "./pages/MidPanel";
import RightPanel from "./pages/RightPanel";
import "./scrollbar.css";
import { RIGHT_PANEL_TYPE } from "./types";

const App: React.FC = () => {
  const [drawPanelData, setDrawPanelData] = useState([...drawData.data]);
  const [rightPanelType, setRightPanelType] = useState(RIGHT_PANEL_TYPE.TEXT);
  const [rightRanelElementId, setRightRanelElementId] = useState("");

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Header></Header>
        <div className="content">
          <LeftPanel />
          <MidPanel
            key={`${drawPanelData.length}-${Math.random()}`}
            data={drawPanelData}
            setRightPanelType={setRightPanelType}
            setRightRanelElementId={setRightRanelElementId}
            setData={setDrawPanelData}
          />
          <RightPanel
            type={rightPanelType}
            data={drawPanelData}
            elementId={rightRanelElementId}
            setDrawPanelData={setDrawPanelData}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
