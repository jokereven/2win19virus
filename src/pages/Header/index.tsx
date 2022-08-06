import React, { Fragment } from "react";
import { HeaderEditWrapper, HeaderWrapper, OpBtn } from "./style";

export const Header: React.FC = () => {
  return (
    <Fragment>
      <HeaderWrapper className="header">
        <div>2win19virus</div>
        <HeaderEditWrapper>
          <OpBtn>撤销</OpBtn>
          <OpBtn>重做</OpBtn>
          <OpBtn>预览</OpBtn>
          <OpBtn>保存</OpBtn>
          <OpBtn>清空画板</OpBtn>
          <OpBtn>待定</OpBtn>
        </HeaderEditWrapper>
      </HeaderWrapper>
    </Fragment>
  );
};
