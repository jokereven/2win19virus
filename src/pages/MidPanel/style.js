import styled from "styled-components";

export const MidPanelWrapper = styled.div`
  height: 100vh;
  width: 50vw;
  border-left: 1px solid #efefef;
  border-right: 1px solid #efefef;
  &.noline {
    width: 90%;
    margin: 0 auto;
    border: none;
    pointer-events: none;
  }
`;

export const MidItemsContainer = styled.div`
  position: relative;
  height: calc(100% - 75px);
  width: 100%;
  overflow: auto;
`;
