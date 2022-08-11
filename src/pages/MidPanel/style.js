import styled from "styled-components";

export const MidPanelWrapper = styled.div`
  height: 100vh;
  width: 50vw;
  border-left: 2px solid #38a1db;
  border-right: 2px solid #38a1db;
  &.noline {
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
