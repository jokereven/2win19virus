import component from "dataClass/componentClass";
import { connect } from "react-redux";

function MiddlePage(props: any) {
  var state: component = props.state.stateNode;
  return <div>{state.r()}</div>;
}
const mapStateToProps = (data: any) => {
  return {
    state: data.StateReducer,
  };
};
export default connect(mapStateToProps)(MiddlePage);
