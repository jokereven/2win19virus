import React, { Fragment } from "react";
import { connect } from "react-redux";
import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";
import { HeaderEditWrapper, HeaderWrapper, OpBtn } from "./style";
const CircularJSON = require("circular-json");

export const Header: React.FC = (props: any) => {
  // clear
  const ClearBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    // Get State
    const state = store.getState();
    // const Item = [...state.StateReducer.stateNode.children];
    var arr = state.StateReducer.stateNode.children;
    for (var i = 0; i < arr.length; i++) {
      var val: any = arr[i];
      for (var key in val) {
        if (typeof val[key] == "number") {
          console.log(val[key]);
          store.dispatch({
            type: stateConstantas.DELETEDOM,
            data: {
              key: val[key],
            },
          });
        }
      }
    }
  };
  // undo
  const UndoBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    // Get State
    const state = store.getState();
    const ClearArr = [...state.StateReducer.stateNode.children];
    ClearArr.length = 0;
    console.log(ClearArr);
  };
  //save
  const SaveBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    // 保存到localstorage
    // 页面
    const state = store.getState();
    const data = [...state.StateReducer.stateNode.children];
    console.log(data);
    localStorage.setItem("SAVE_COMPONENT", CircularJSON.stringify(data));
  };
  return (
    <Fragment>
      <HeaderWrapper className="header">
        <div>2win19virus</div>​{" "}
        <HeaderEditWrapper>
          ​ <OpBtn onClick={UndoBtnClick}>撤销</OpBtn>​ <OpBtn>预览</OpBtn>​{" "}
          <OpBtn onClick={SaveBtnClick}>保存到本地</OpBtn>​{" "}
          <OpBtn onClick={ClearBtnClick}>清空画板</OpBtn>​ <OpBtn>待定</OpBtn>​{" "}
        </HeaderEditWrapper>
      </HeaderWrapper>{" "}
    </Fragment>
  );
};
const mapStateToProps = (data: any) => {
  return {
    state: data.StateReducer,
    target: data.targetDOM,
  };
};
export default connect(mapStateToProps)(Header);
