import React from "react";
import { TextComponent } from "../../components/TextCompoent";
import { LeftMaterialContiner, LeftPanelWrapper } from "./style";

export const LeftPanel: React.FC = () => {
  return (
    <LeftPanelWrapper>
      <div>
        <LeftMaterialContiner>
          <TextComponent />
          <TextComponent />
        </LeftMaterialContiner>
      </div>
    </LeftPanelWrapper>
  );
};
