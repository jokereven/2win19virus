import React from "react";
import Sider from "../../components/Sider";

// import { LeftMaterialContiner, LeftPanelWrapper } from "./style";
import "./style.css";

const LeftPanel: React.FC = () => {
  return (
    <div className="LeftPanelWrapper">
      <Sider />
    </div>
  );
};

export default LeftPanel;