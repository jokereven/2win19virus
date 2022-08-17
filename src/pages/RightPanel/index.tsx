import { ElementType, RIGHT_PANEL_TYPE } from "../../types";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";
import component from "dataClass/componentClass";
import basic from "../../mock/componentData/basic";
import { IEditField, basicEditFields } from "../../mock/componentData/basic";
import { findPropsByType, isValidKey } from "utils/findPropsByType";

import "./style.css";

import { Tabs } from "antd";
const { TabPane } = Tabs;

export function RightPanel(props: any) {
  //创建引用，方便右面板修改
  let targetComponent = store.getState().StateReducer.targetDOM;

  //onChange处理
  const handleChange = (key: keyof component, value: any) => {
    //对于children要特殊处理，应处理第0个元素
    console.log(value);
    // if (key === "style") {
    //   targetComponent!['style'] = "height: '90px'";
    // }
    if (key === "children") {
      targetComponent![key][0] = value;
    } else {
      //根据配置项找到对应引用，并赋值
      const keyArr = key.split(".");
      let ref: any = targetComponent;
      for (let i = 0; i < keyArr.length - 1; i++) {
        ref = ref[keyArr[i]];
      }
      ref[keyArr[keyArr.length - 1]] = value;
    }
    //修改引用后通知更新，触发重新渲染
    store.dispatch({
      type: stateConstantas.UPDATETARGETDOM,
      data: {},
    });
  };

  //从component中根据参数配置形如"other.src"获取值
  const getValueFromComponentByProps: any = (
    comp: component,
    props: string
  ) => {
    const propArr = props.split(".");
    let value: any = comp;
    propArr.forEach((item) => {
      value = value[item];
    });
    return value;
  };

  const renderField = (item: IEditField) => {
    const { prop, name, type, ...other } = item;
    if (targetComponent instanceof component) {
      console.info("item:", item, "c", targetComponent);

      // 划分type
      switch (type) {
        case "Text":
          //children特殊处理，取[0]
          if (prop === "children") {
            //还要判断children[0]是字符串还是component
            if (typeof targetComponent[prop][0] == "string") {
              return (
                <input
                  key={targetComponent.key}
                  value={targetComponent[prop][0] as string}
                  onChange={(e) => handleChange(prop, e.target.value)}
                />
              );
            } else {
              // 如果是component，则表示targetComponent[prop]不需要编辑
              return <div>如需编辑该项，请删除所有子组件</div>;
            }
          } else {
            return (
              <input
                key={targetComponent.key}
                value={getValueFromComponentByProps(targetComponent, prop)}
                onChange={(e) =>
                  handleChange(prop as keyof component, e.target.value)
                }
              />
            );
          }
        case "EditableTable":
          return <></>;
      }
    }
    return <></>;
  };

  const generateRightPanel = () => {
    //顺便收缩类型
    if (targetComponent instanceof component) {
      // 根据basicEditFields中的配置动态创建可编辑项，每个编辑项的具体组件（比如input还是select）由type决定
      return (
        <div>
          <div>编辑 {targetComponent.type}</div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="属性" key="1">
              <div>
                {basicEditFields[targetComponent.type]?.map(
                  (item: IEditField) => {
                    const { name } = item;
                    return (
                      <div className="" key={name}>
                        <div>{name}:</div>
                        <div className="">{renderField(item)}</div>
                      </div>
                    );
                  }
                )}
              </div>
            </TabPane>
            <TabPane tab="样式" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="事件" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      );
    } else {
      return <div>请选择组件，注意，点击空白区域后默认选中根组件</div>;
    }
  };

  return (
    <div className="rightPanel">
      <div className="rightFormContainer">{generateRightPanel()}</div>
    </div>
  );
}

const mapStateToProps = (data: any) => {
  return {
    state: data.StateReducer,
    target: data.targetDOM,
  };
};

export default connect(mapStateToProps)(RightPanel);
