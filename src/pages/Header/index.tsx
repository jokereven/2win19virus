import React, { Fragment } from "react";
import { connect } from "react-redux";
import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";
import { HeaderEditWrapper, HeaderWrapper, OpBtn } from "./style";

export const Header: React.FC = (props: any) => {
  const ClearBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    // Get State
    const state = store.getState();
    // const delItem = [...state.StateReducer.stateNode.children];
    // delItem.pop();
    // [...state.StateReducer.stateNode.children] = delItem;
    var arr = state.StateReducer.stateNode.children;
    for (var i = 1; i < arr.length; i++) {
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
  const UndoBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    // Get State
    const state = store.getState();
    const ClearArr = [...state.StateReducer.stateNode.children];
    ClearArr.length = 0;
    console.log(ClearArr);
  };
  return (
    <Fragment>
      <HeaderWrapper className="header">
        <div>2win19virus</div>​{" "}
        <HeaderEditWrapper>
          ​ <OpBtn onClick={UndoBtnClick}>撤销</OpBtn>​ <OpBtn>预览</OpBtn>​{" "}
          <OpBtn>保存</OpBtn>​ <OpBtn onClick={ClearBtnClick}>清空画板</OpBtn>​{" "}
          <OpBtn>待定</OpBtn>​{" "}
        </HeaderEditWrapper>
        ​{" "}
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
