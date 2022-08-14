import { Drawer, Modal } from "antd";
import Preview from "components/preview";
import React, { Fragment, useState } from "react";
import MonacoEditor, { monaco } from "react-monaco-editor";
import { connect } from "react-redux";
import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";
import { randomString } from "./../../utils/randomString";
import { update } from "./../../utils/update";
import { HeaderEditWrapper, HeaderWrapper, OpBtn } from "./style";

export const Header: React.FC = (props: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  // save
  function save(save: string) {
    const state = store.getState();
    const data = [...state.StateReducer.stateNode.children];
    console.log(data);
    if (data.length === 0) {
      localStorage.removeItem(save);
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
    localStorage.setItem(save, JSON.stringify(res));
  }

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
          store.dispatch({
            type: stateConstantas.DELETEDOM,
            data: {
              key: val[key],
            },
          });
        }
      }
    }
    store.dispatch({
      type: stateConstantas.CHOOSEDOM,
      data: {
        key: -1,
      },
    });
  };

  // undo
  const UndoBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    // Get State
    const state = store.getState();
    const ClearArr = [...state.StateReducer.stateNode.children];
    ClearArr.length = 0;
  };

  // preview
  const PreviewBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    store.dispatch({
      type: stateConstantas.CHOOSEDOM,
      data: {
        key: -1,
      },
    });
    // 展示
    // console.log(store.getState().StateReducer.stateNode.d());

    setIsModalVisible(true);
  };

  // generate react
  const GenerateClick = (event: React.MouseEvent<HTMLElement>, gc: any) => {
    // const state = store.getState();
    // generate_react_matlab(state.StateReducer.stateNode.children);
    // 换一种新形势生成源码
    update()();
    // console.log(store.getState().StateReducer.stateNode.d());
    showDrawer();
  };

  //save
  const SaveBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    save("SAVE_COMPONENT");
  };

  // build
  const BuildBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    // 随机字符串
    var rstr = randomString(16);
    save(rstr);
    const w = window.open("about:blank");
    w!.location.href = `/deploy?id=${rstr}`;
  };

  const options = {
    selectOnLineNumbers: true,
    renderSideBySide: false,
  };
  //自定义配置主题
  monaco.editor.defineTheme("myTheme", {
    base: "vs",
    inherit: true,
    rules: [{ background: "EDF9FA", token: "" }],
    colors: {
      "editor.foreground": "#88abda",
    },
  });
  monaco.editor.setTheme("myTheme");

  return (
    <Fragment>
      <HeaderWrapper className="header">
        <div>2win19virus</div>
        <HeaderEditWrapper>
          <OpBtn onClick={UndoBtnClick}>撤销</OpBtn>
          <OpBtn type="primary" onClick={PreviewBtnClick}>
            预览
          </OpBtn>
          <OpBtn onClick={SaveBtnClick}>保存到本地</OpBtn>
          <OpBtn onClick={ClearBtnClick}>清空画板</OpBtn>
          <OpBtn onClick={BuildBtnClick}>部署</OpBtn>
          <OpBtn onClick={GenerateClick}>生成react源码</OpBtn>
          <Drawer
            title="2win19virus"
            placement="left"
            width={800}
            onClose={onClose}
            visible={visible}
          >
            <MonacoEditor
              width="600"
              height="800"
              options={options}
              language="javascript"
              theme="vs"
              defaultValue=""
              value={update()()}
            />
          </Drawer>
          <Modal
            width={750}
            mask
            title="2win19virus"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Preview />
          </Modal>
        </HeaderEditWrapper>
      </HeaderWrapper>
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
