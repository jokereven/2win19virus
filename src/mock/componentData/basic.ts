import { ElementType } from "types";

const basic: ElementType[] = [
  {
    type: "div",
    props: {},
  },
  {
    type: "h1",
    props: {
      children: ["H1"],
    },
  },

  {
    type: "p",
    props: {
      children: ["段落"],
    },
  },
  {
    type: "button",
    props: {
      children: ["按钮"],
    },
  },
  {
    type: "input",
    blink: true,
    props: {
      type: "text",
      placeholder: "pleaceholder",
    },
  },
  {
    type: "select",
    props: {
      children: [
        { value: "man", label: "man" },
        { value: "woman", label: "woman" },
      ],
      placeholder: "pleaceholder",
    },
  },
  {
    type: "img",
    blink: true,
    props: {
      width: "100",
      height: "100",
      src: "https://www.baidu.com/img/PCpad_012830ebaa7e4379ce9a9ed1b71f7507.png",
    },
  },
  {
    type: "span",
    props: {
      children: ["文本"],
    },
  },
  {
    type: "Link",
    module: "react-router-dom",
    props: {
      to: "https://ant.design/components/overview-cn/",
      children: ["链接"],
    },
  },
];

export default basic;
