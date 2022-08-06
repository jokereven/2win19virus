import styled from "styled-components";

export const HeaderWrapper = styled.div`
  &.header {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
    border-bottom: 2px solid #c8161d;
    height: 5rem;
    box-sizing: border-box;
    padding: 0 2.4rem;
  }
`;

// Header Edit
export const HeaderEditWrapper = styled.div`
  display: flex;
  margin-left: 20rem;
  width: 50rem;
  align-items: center;
  justify-content: space-evenly;
`;

export const OpBtn = styled.button`
  padding: 0 2rem;
  height: 3rem;
  cursor: pointer;
  border: 1px solid #dfe0d9;
  border-radius: 2px;
  background-color: #fff;
  :hover {
    background-color: #c6e2ff;
    color: #409eff;
  }
`;
