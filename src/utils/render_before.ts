export function render_before() {
  var RANDER_COMPONENT: any = localStorage.getItem("SAVE_COMPONENT");
  var rander_component = JSON.parse(RANDER_COMPONENT);
  // addDom
  if (rander_component == null) {
    return;
  }
  console.log(rander_component);
  // 0
  console.log(rander_component[0]);
  var val = rander_component[0];
  for (var key in val) {
    // get number key
    console.log(val[key]);
    if (typeof val[key] == "number") {
      // store.dispatch({
      //   type: stateConstantas.ADDDOM,
      //   data: {
      //     place: val[key],
      //     method: stateConstantas.APPENDAFTER,
      //   },
      // });
    }
  }
}
