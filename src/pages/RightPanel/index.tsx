import component from "dataClass/componentClass";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { stateConstantas } from "redux/constantas";
import { store } from "redux/store";
import {
  allEditFields,
  allEventFields,
} from "mock/componentData";
import { IEditField } from "../../mock/componentData/type";

import "./style.css";

import EditableTable from "components/EditableTable";

import { Tabs, Input, InputNumber, Select, Button, Space, Breadcrumb } from "antd";
import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { Typography } from 'antd';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Paragraph } = Typography;

//渲染面包屑元素，去掉link
const itemRender = (route: Route, params: any, routes: Route[], paths: string[]): React.ReactNode => {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <span>{route.breadcrumbName}</span>
  );
}

//向上搜索父组件，并将路径返回成Route数组
const searchParentPath = (comp: component): Route[] => {
  let routes: Route[] = [{
    path: comp.type,
    breadcrumbName: comp.type,
  }];
  let compPointer = comp;
  //父组件为空时停止搜索
  while (compPointer.parent != null) {
    //父组件type插入最后
    routes.push({
      path: compPointer.parent.type,
      breadcrumbName: compPointer.parent.type,
    });
    compPointer = compPointer.parent;
  }
  //弹出第一个父组件，这样是为了让一开始的div父组件能和它下面的子组件并列显示
  // if (routes.length > 1) {
  //   routes.pop();
  // }
  //注意，antd的面包屑组件可能有问题，在层级过深+来回点击不同层组件后（甚至不一定触发）
  //会出现多显示一个div的情况
  //但是该函数返回数组正常

  //倒序后返回
  return routes.reverse();
}


//右面板
const RightPanel: React.FC = (props: any) => {
  //创建引用，方便右面板修改
  let targetComponent = store.getState().StateReducer.targetDOM;

  useEffect(() => {
    console.log(store.getState());
    // SetGetSearchVal(JSON.stringify(targetComponent?.style));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // change style
  const [GetSearchVal, SetGetSearchVal] = useState(targetComponent?.style);
  const inputRef = React.useRef(null);

  //onChange处理
  const handleChange = (key: keyof component, value: any) => {
    //对于children要特殊处理，应处理第0个元素
    if (key === "children") {
      // console.log(targetComponent![key][0]);
      targetComponent![key][0] = value;
    } else {
      //根据配置项找到对应引用，并赋值
      const keyArr = key.split(".");
      let ref: any = targetComponent;
      for (let i = 0; i < keyArr.length - 1; i++) {
        ref = ref[keyArr[i]];
      }
      //如果是event，则转成Function再赋值
      if (key.indexOf("event") !== -1) {
        value = eval(value);
        ref[keyArr[keyArr.length - 1]] = value;
      }
      //普通值直接赋值，注意如果value为null会出错，应该在输入时就处理，例如parseInt
      else {
        ref[keyArr[keyArr.length - 1]] = value;
      }
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

  //从component中根据参数配置（如"other.src"）获取值
  const getValueFromComponentByProps: any = (
    comp: component,
    props: string
  ) => {
    const propArr = props.split(".");
    let value: any = comp;
    //遍历分割出的属性数组，一层层提取出来
    propArr.forEach((item) => {
      value = value[item];
    });
    return value;
  };

  //从 select 常规html组件获取值
  const getValueFromSelectComponent: any = (
    comp: component,
    props: string
  ) => {
    let value: any = getValueFromComponentByProps(comp, props);
    //如果最终结果是数组并且要求返回的是children，遍历之，并判断元素是否为component（应对select的情形）
    //若为component，则继续提取一次children，并返回DataType（目前只是固定{value,label}）类型的字面量
    if (value instanceof Array) {
      value = value.map((item) => {
        if (item instanceof component) {
          return {
            value: getValueFromComponentByProps(item, 'children'),
            label: getValueFromComponentByProps(item, 'children')
          };
        }
        return item;
      });
    }
    return value;
  }

  const renderEdit = (item: IEditField) => {
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
            //普通文本属性
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
          return (
            <EditableTable
              columns={other.columns}
              value={getValueFromSelectComponent(targetComponent, prop)}
              onChange={function (v): void {
                console.log("sorry");
              }}
            />);
        case "Number":
          return (
            <InputNumber
              key={targetComponent.key}
              min={other.min}
              max={other.max}
              style={{ width: '100%' }}
              value={getValueFromComponentByProps(targetComponent, prop)}
              onChange={(value) =>
                handleChange(prop as keyof component, parseInt(value))
              }
            />
          );
        case "Select":
          return (<Select
            style={{ width: '100%' }}
            options={other.options}
            value={(() => {
              const value = getValueFromComponentByProps(targetComponent, prop)
              if (!value) { return other.defaultValue } return value;
            })()}
            onChange={(value) =>
              handleChange(prop as keyof component, value)
            }
          />);
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
                <div>
                  <TextArea
                    placeholder='{"color":"red"}'
                    value={GetSearchVal}
                    ref={inputRef}
                    onChange={(e) => {
                      getIptValue(prop, e.target.value);
                    }}
                  />
                  <div style={{
                    marginTop: '12px',
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}>
                    <Button onClick={submit}>提交</Button>
                  </div>
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
          return (
            <div>
              <TextArea
                value={targetComponent.event.onClick}
                onChange={(e) => {
                  handleChange(prop as keyof component, e.target.value);
                }}
              />
            </div>
          );
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
      // 根据allEditFields中的配置动态创建可编辑项，每个编辑项的具体组件（比如input还是select）由type决定
      return (
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ flexShrink: '0' }}>当前组件路径：</div>
            <Breadcrumb itemRender={itemRender} routes={searchParentPath(targetComponent)} separator=">" />
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="属性" key="1">
              <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                {allEditFields[targetComponent.type]?.map(
                  (item: IEditField) => {
                    const { name } = item;
                    return (
                      <div className="" key={name}>
                        <div style={{ marginBottom: '2px' }}>{name}:</div>
                        {renderEdit(item)}
                      </div>
                    );
                  }
                )}
              </Space>
            </TabPane>
            <TabPane tab="样式" key="2">
              {allEditFields[targetComponent.type]?.map(
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
              {allEventFields[targetComponent.type] ?
                (<div>
                  <div>示例：</div>
                  <Paragraph>
                    <blockquote>
                      {`() => {
                    alert("hello");
                    }`}
                    </blockquote>
                  </Paragraph>
                </div>) : (<div>
                  该组件不支持添加事件
                </div>)}
              <div>
                {allEventFields[targetComponent.type]?.map(
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
