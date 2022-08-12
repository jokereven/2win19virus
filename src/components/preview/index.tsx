import component from "dataClass/componentClass";
import { connect } from "react-redux";
import { MidItemsContainer, MidPanelWrapper } from "../../pages/MidPanel/style";
// import { ElementType } from "../../types/index";

function Preview(props: any) {
  var state: component = props.state.stateNode;
  // var target: component = props.state.targetDOM;

  return (
    <MidPanelWrapper className="noline">
      <MidItemsContainer>{state.r(true)}</MidItemsContainer>
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
export default connect(mapStateToProps)(Preview);
