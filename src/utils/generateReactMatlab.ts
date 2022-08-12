// 通过localstorage生成dom结点
import antdItem from "mock/componentData/antdItem";
import basic from "mock/componentData/basic";
import { store } from "redux/store";

export function generate_react_matlab(GenObj: any) {
  var Gen = [...GenObj];
  const comps = [...basic, ...antdItem];
  var generate_matlab = "";
  for (var i = 0; i < Gen.length; i++) {
    var type = Gen[i]["type"];
    // eslint-disable-next-line no-loop-func
    const dropObj = comps.find((value) => {
      return value.type === type;
    });
    console.log(dropObj);
    var gen_type = dropObj?.type;
    if (dropObj?.blink === true) {
      var other = [dropObj?.props["other"]][0];
      var other_arr = Object.keys(other);
      var str = "";
      for (var j = 0; j < other_arr.length; j++) {
        var key = Object.keys(other)[j];
        var value = other[Object.keys(other)[j]];
        // eslint-disable-next-line no-useless-concat
        str += " " + key + "=" + '"' + value + '"' + " ";
      }
      const gen_blink_dom = `<${gen_type}${str}></${gen_type}>`;
      console.log(gen_blink_dom, typeof gen_blink_dom);
      generate_matlab += gen_blink_dom + "\n";
    } else {
      var matlab_value = dropObj?.props["children"][0];
      const gen_dom = `<${gen_type}>${matlab_value}</${gen_type}>`;
      console.log(gen_dom);
      generate_matlab += gen_dom + "\n";
      const state = store.getState();
      state.StateReducer.generate_matlab = generate_matlab;
    }
    // 绘制对象
    // 生成代码
  }
}
