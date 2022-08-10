import React, { Fragment } from "react";
import { connect } from "react-redux";
import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";
import { HeaderEditWrapper, HeaderWrapper, OpBtn } from "./style";
// const CircularJSON = require("circular-json");

export const Header: React.FC = (props: any) => {
  // getCirculatReplacer
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key: any, value: any) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
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
    const state = store.getState();
    const data = [...state.StateReducer.stateNode.children];
    if (data.length === 0) {
      return;
    }
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      // save to localstorage
      arr.push(data[i]);
    }
    var res = [];
    for (var j = 0; j < arr.length; j++) {
      var val = JSON.stringify(arr[j], getCircularReplacer());
      res.push(val);
    }
    // 存储
    localStorage.setItem("SAVE_COMPONENT", JSON.stringify(res));
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
