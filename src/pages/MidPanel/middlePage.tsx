import component from "dataClass/componentClass";
import { connect } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import basicType from "../../mock/componentData/basic";
import "./style.css";
import { store } from "redux/store";
import { stateConstantas } from "redux/constantas";
import { MidItemsContainer, MidPanelWrapper } from "./style";
import basic from "../../mock/componentData/basic";
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
      console.log(monitor.getItemType());
      const dropObj = basic.find((value) => {
        return value.type === monitor.getItemType();
      });
      if (dropObj !== undefined) {
        store.dispatch({
          type: stateConstantas.ADDDOM,
          data: {
            place: state.key,
            method: stateConstantas.APPENDAFTER,
            newDOM: new component(
              monitor.getItemType(),
              {},
              {},
              dropObj.props.children || [],
              dropObj.blink || false
            ),
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
