import component from "dataClass/componentClass";
import React, { useState } from "react";
import { connect } from "react-redux";
import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";
import { basicEditFields, IEditField, basicEventFields } from "../../mock/componentData/basic";

import "./style.css";

import { Tabs,Input } from "antd";
import { useEffect } from "react";
const { TabPane } = Tabs;
const { TextArea } = Input;

export function RightPanel(props: any) {
  //创建引用，方便右面板修改
  let targetComponent = store.getState().StateReducer.targetDOM;

  useEffect(() => {
    console.log(store.getState());
    // SetGetSearchVal(JSON.stringify(targetComponent?.style));
    console.log(JSON.stringify(targetComponent?.style));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // change style
  const [GetSearchVal, SetGetSearchVal] = useState(targetComponent?.style);
  const inputRef = React.useRef(null);

  //onChange处理
  const handleChange = (key: keyof component, value: any) => {
    //对于children要特殊处理，应处理第0个元素
    if (key === "children") {
      console.log(targetComponent![key][0]);
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

  function IsJsonString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  const getIptValue = (key: keyof component, value: any) => {
    // 判断是否为正确的json
    var ok = IsJsonString(value);
    if (ok) {
      if (key === "children") {
        // console.log(value);
        // console.log(targetComponent?.style);
        targetComponent!.style = JSON.parse(value);
      }
    }
    SetGetSearchVal(value);
  };

  const submit = () => {
    // const style = JSON.parse(GetSearchVal);
    // console.log(typeof style, style);
    console.log(targetComponent?.style);
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
      // 划分type
      switch (type) {
        case "Text":
          //children特殊处理，取[0]
          if (prop === "children") {
            //还要判断children[0]是字符串还是component
            if (typeof targetComponent[prop][0] == "string") {
              return (
                <Input
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
              <Input
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

  const renderStyle = (item: IEditField) => {
    const { prop, name, type, ...other } = item;
    if (targetComponent instanceof component) {
      console.info("item:", item, "style", targetComponent.style);
      // 划分type
      switch (type) {
        case "Text":
          //children特殊处理，取[0]
          if (prop === "children") {
            //还要判断children[0]是字符串还是component
            if (typeof targetComponent[prop][0] == "string") {
              return (
                <div style={{ display: "flex" }}>
                  <TextArea
                    value={GetSearchVal}
                    ref={inputRef}
                    onChange={(e) => {
                      getIptValue(prop, e.target.value);
                    }}
                  />
                  <button onClick={submit}>提交</button>
                </div>
              );
            } else {
              // 如果是component，则表示targetComponent[prop]不需要编辑
              return <div>如需编辑该项，请删除所有子组件</div>;
            }
          } else {
            return <div></div>;
          }
        case "EditableTable":
          return <>Can't Edit</>;
      }
    }
    return <></>;
  };

  const renderEvent = (item: IEditField) => {
    const { prop, name, type, ...other } = item;
    if (targetComponent instanceof component) {
      // 划分type
      switch (type) {
        case "Textarea":
          return <div>
            <TextArea
              value={targetComponent.event.onClick}
              onChange={(e) => {
                handleChange(prop as keyof component, e.target.value);
              }}
            />
          </div>
        case "EditableTable":
          return <></>;
      }
    }
    return <></>;
  };


  // 右侧看板
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
              {basicEditFields[targetComponent.type]?.map(
                (item: IEditField) => {
                  const { name } = item;
                  return (
                    <div className="" key={name}>
                      <div className="">{renderStyle(item)}</div>
                    </div>
                  );
                }
              )}
            </TabPane>
            <TabPane tab="事件" key="3">
              {basicEventFields[targetComponent.type] ?
                <div>
                  <div>
                    示例：
                  </div>
                  <div>
                    {`() => {
                    alert("hello");
                    }`}
                  </div>
                </div> :
                <div>
                  该组件不支持添加事件
                </div>}
              <div>
                {basicEventFields[targetComponent.type]?.map(
                  (item: IEditField) => {
                    const { name } = item;
                    return (
                      <div className="" key={name}>
                        <div>{name}:</div>
                        <div className="">{renderEvent(item)}</div>
                      </div>
                    );
                  }
                )}
              </div>
            </TabPane>
          </Tabs>
        </div >
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
