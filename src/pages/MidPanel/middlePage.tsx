import component from "dataClass/componentClass";
import { connect } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import basicType from "../../mock/componentData/basic";
import { Button } from "antd";
import "./style.css";
import { store } from "redux/store";
import { stateConstantas } from "redux/constantas";
import { MidItemsContainer, MidPanelWrapper } from "./style";
import basic from "../../mock/componentData/basic";
import antdItem from "../../mock/componentData/antdItem";
import { ElementType } from "../../types/index";
// import addComponent from "utils/addComponent";
import { useEffect } from "react";

function MiddlePage(props: any) {
  useEffect(() => {
    // 将localstorage的数据render
    var RANDER_COMPONENT: any = localStorage.getItem("SAVE_COMPONENT");
    var rander_component = JSON.parse(RANDER_COMPONENT);
    // addDom
    if (rander_component == null) {
      return;
    }
    // 0
    var key = rander_component[0]["key"];
    var tag = rander_component[0]["tag"];
    var type = rander_component[0]["type"];
    const saveObj = {
      type: type,
      props: {
        children: [type],
      },
    };
    console.log(saveObj);
    // var saveDOM = addComponent(tag, saveObj);
    // store.dispatch({
    //   type: stateConstantas.ADDDOM,
    //   data: {
    //     place: key,
    //     method: stateConstantas.APPENDAFTER,
    //     newDOM: saveDOM,
    //   },
    // });
  });
  const basicTypes = basic.map((value) => {
    return value.type;
  });

  const antdTypes = antdItem.map((item) => {
    return item.type;
  });

  const types = [...antdTypes, ...basicTypes];
  const comps = [...basic, ...antdItem];

  var state: component = props.state.stateNode;
  var target: component = props.state.targetDOM;
  var optStyle =
    target === null
      ? {}
      : {
          height: "30px",
          top: props.state.optTop - (props.state.optTop <= 0 ? 0 : 30),
          left: props.state.optLeft,
        };
  const [, drop] = useDrop(() => ({
    // accept: Object.values(leftType), // drop接受的type
    accept: types,
    drop: (_, monitor) => {
      function addComponent(
        parent: component,
        compInfo: ElementType
      ): component {
        var newComp = new component(
          compInfo.type,
          compInfo.props.style || {},
          compInfo.props.event || {},
          [],
          compInfo.blink || false,
          compInfo.props.other || {}
        );
        newComp.parent = parent;

        var children = compInfo.props?.children || undefined;
        if (children && children instanceof Array) {
          children.forEach((item: ElementType | string) => {
            if (typeof item === "string") {
              newComp.children.push(item);
            } else {
              var newDOM = addComponent(newComp, item);
              newComp.children.push(newDOM);
            }
          });
        }
        return newComp;
      }
      const dropObj = comps.find((value) => {
        return value.type === monitor.getItemType();
      });

      var optDom = store.getState().StateReducer.mouseMove.optDOM;
      var method = store.getState().StateReducer.mouseMove.method;
      if (optDom) {
        var classes = ["hoverLeft", "hoverRight", "hoverTop", "hoverBottom"];
        optDom.classList = optDom.classList.filter((value: string) => {
          return !classes.includes(value);
        });
        store.dispatch({
          type: "update",
          data: {},
        });
      }
      if (dropObj !== undefined) {
        var newDOM = addComponent(target, dropObj);
        if (optDom) {
          store.dispatch({
            type: stateConstantas.INSERT,
            data: {
              method: method,
              newDOM: newDOM,
              optDOM: optDom,
            },
          });
        } else {
          store.dispatch({
            type: stateConstantas.ADDDOM,
            data: {
              place: (target || state).key,
              method: stateConstantas.APPENDAFTER,
              newDOM: newDOM,
            },
          });
        }
      }
    },
  }));
  function getOptList() {
    if (target && target !== state) {
      return (
        <div style={optStyle} id="optList">
          <div
            className="optItem"
            onClick={() => {
              store.dispatch({
                type: stateConstantas.UPDOM,
                data: {
                  key: target.key,
                },
              });
            }}
          >
            上移
          </div>
          <div
            className="optItem"
            onClick={() => {
              store.dispatch({
                type: stateConstantas.DOWNDOM,
                data: {
                  key: target.key,
                },
              });
            }}
          >
            下移
          </div>
          <div
            className="optItem"
            onClick={() => {
              store.dispatch({
                type: stateConstantas.DELETEDOM,
                data: {
                  key: target.key,
                },
              });
            }}
          >
            删除
          </div>
          <div className="optItem">...</div>
        </div>
      );
    }
  }

  return (
    <MidPanelWrapper>
      <MidItemsContainer
        onClick={() => {
          store.dispatch({
            type: stateConstantas.CHOOSEDOM,
            data: {
              key: -1,
            },
          });
        }}
        id="midContainer"
        ref={drop}
      >
        {getOptList()}
        {state.r()}
      </MidItemsContainer>
    </MidPanelWrapper>
  );
}
const mapStateToProps = (data: any) => {
  return {
    state: data.StateReducer,
    target: data.targetDOM,
    optLeft: data.optLeft,
  };
};
export default connect(mapStateToProps)(MiddlePage);
