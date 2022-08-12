// 通过localstorage生成dom结点
import antdItem from "mock/componentData/antdItem";
import basic from "mock/componentData/basic";
import { store } from "redux/store";

export function generate_react_matlab(GenObj: any) {
  var Gen = [...GenObj];
  const comps = [...basic, ...antdItem];
  var generate_matlab = "";
  var gen_chi_dom = "";
  for (var i = 0; i < Gen.length; i++) {
    var type = Gen[i]["type"];
    // eslint-disable-next-line no-loop-func
    const dropObj = comps.find((value) => {
      return value.type === type;
    });
    var gen_type = dropObj?.type;
    if (dropObj?.blink === true) {
      var other = [dropObj?.props["other"]][0];
      var other_arr = Object.keys(other);
      var str = "";
      for (var j = 0; j < other_arr.length; j++) {
        var key = Object.keys(other)[j];
        var value = other[Object.keys(other)[j]];
        // eslint-disable-next-line no-useless-concat
        str += " " + key + "=" + '"' + value + '"';
      }
      const gen_blink_dom = `<${gen_type}${str}></${gen_type}>`;
      generate_matlab += gen_blink_dom + "\n\t\t\t";
    } else if (dropObj?.type === "select") {
      console.log(dropObj);
      const chi = dropObj.props.children;
      for (i = 0; i < chi.length; i++) {
        console.log(chi[i]);
        // type
        const chit = chi[i].type;
        // value
        const chiv = chi[i].props.children[0];
        const gen_chi = `\n\t\t\t<${chit}>${chiv}</${chit}>\n\t\t\t`;
        gen_chi_dom += gen_chi;
      }
      const type = dropObj?.type;
      const gen_sel_dom = `<${type}>${gen_chi_dom}</${type}>`;
      generate_matlab += gen_sel_dom + "\n\t\t\t";
    } else {
      var matlab_value = dropObj?.props["children"][0];
      const gen_dom = `<${gen_type}>${matlab_value}</${gen_type}>`;
      generate_matlab += gen_dom + "\n\t\t\t";
    }
    const state = store.getState();
    state.StateReducer.generate_matlab = generate_matlab;
    // 绘制对象
    // 生成代码
  }
}
