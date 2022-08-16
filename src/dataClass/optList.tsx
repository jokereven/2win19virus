import component from "./componentClass";

export const optList = (new component(
  "div",
  {
    display: "flex",
    position: "absolute",
    visibility: "hidden",
  },
  {},
  [new component("div", {}, {}, ["删除"])]
).editEvent = {});
