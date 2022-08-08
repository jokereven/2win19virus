import component from "dataClass/componentClass";
import { connect } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import basicType from "../../mock/componentData/basic";
import "./style.css";
import { store } from "redux/store";
import { stateConstantas } from "redux/constantas";
import { MidItemsContainer, MidPanelWrapper } from "./style";
import basic from "../../mock/componentData/basic";
import { ElementType } from "../../types/index";
function MiddlePage(props: any) {
  const types = basic.map((value) => {
    return value.type;
  });

  var state: component = props.state.stateNode;
  var target: component = props.state.targetDOM;
  var optStyle =
    target === null
      ? {}
      : {
          height: "30px",
          top: props.state.optTop - 30,
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
          compInfo.props?.style || {},
          compInfo.props?.event || {},
          [],
          compInfo.blink || false,
          compInfo.props?.other || {}
        );
        newComp.parent = parent;
        var children = compInfo.props?.children || undefined;
        if (children && children instanceof Array) {
          children.forEach((item: ElementType | string) => {
            console.log(item);
            if (typeof item === "string") {
              newComp.children.push(item);
            } else {
              var newDOM = addComponent(newComp, item);
              newComp.children.push(newDOM);
            }
          });
        }
        console.log(newComp);
        return newComp;
      }
      const dropObj = basic.find((value) => {
        return value.type === monitor.getItemType();
      });
      if (dropObj !== undefined) {
        var newDOM = addComponent(state, dropObj);
        store.dispatch({
          type: stateConstantas.ADDDOM,
          data: {
            place: state.key,
            method: stateConstantas.APPENDAFTER,
            newDOM: newDOM,
          },
        });
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
