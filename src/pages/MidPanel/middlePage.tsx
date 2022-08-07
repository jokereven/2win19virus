import component from "dataClass/componentClass";
import { connect } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { COMPONENT_TYPE } from "types";
import { store } from "redux/store";
import { stateConstantas } from "redux/constantas";
import { MidItemsContainer, MidPanelWrapper } from "./style";
import basic from "../../mock/componentData/basic.json";
function MiddlePage(props: any) {
  const types = basic.data.map((value) => {
    return value.type;
  });

  var state: component = props.state.stateNode;
  const [, drop] = useDrop(() => ({
    accept: types, // drop接受的type
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
