import component from "dataClass/componentClass";
import { connect } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { leftType } from "types";
import { store } from "redux/store";
import { stateConstantas } from "redux/constantas";
import { MidItemsContainer, MidPanelWrapper } from "./style";
import basic from "../../mock/componentData/basic";
function MiddlePage(props: any) {
  const types = basic.map((value) => {
    return value.type;
  });

  var state: component = props.state.stateNode;
  const [, drop] = useDrop(() => ({
    // accept: Object.values(leftType), // drop接受的type
    accept: types,
    drop: (_, monitor) => {
      store.dispatch({
        type: stateConstantas.ADDDOM,
        data: {
          place: state.key,
          method: stateConstantas.APPENDAFTER,
          newDOM: new component(monitor.getItemType(), {}, {}, ["测试"]),
        },
      });
    },
  }));
  return (
    <MidPanelWrapper>
      <MidItemsContainer ref={drop}>{state.r()}</MidItemsContainer>
    </MidPanelWrapper>
  );
}
const mapStateToProps = (data: any) => {
  return {
    state: data.StateReducer,
  };
};
export default connect(mapStateToProps)(MiddlePage);
