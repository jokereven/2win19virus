import styled from "styled-components";

export const HeaderWrapper = styled.div`
  &.header {
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
    justify-content: space-around;
    background-color: #fff;
    height: 6.3rem;
    box-shadow: 0 0 5px hsla(0, 0%, 60%, 0.2);
    box-sizing: border-box;
    padding: 0 2.4rem;
  }
`;

// Header Edit
export const HeaderEditWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .ml1 {
    margin-left: 2rem;
  }
`;

export const OpBtn = styled.button`
  padding: 0 2rem;
  margin-left: 1rem;
  height: 3.2rem;
  font-size: 1.2rem;
  cursor: pointer;
  border: 1px solid #dfe0d9;
  border-radius: 0.3rem;
  background-color: #fff;
  :hover {
    background-color: #c6e2ff;
    color: #409eff;
  }
`;
