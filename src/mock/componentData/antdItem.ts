import { ElementType } from "types";
const antdItems: ElementType[] = [
  {
    type: "Button",
    module: "antd",
    props: {
      children: ["Button"],
      other: {
        type: "ghost",
      },
    },
  },
  {
    type: "Input",
    module: "antd",
    props: {},
    blink: true,
  },
  {
    type: "InputNumber",
    module: "antd",
    props: {},
    blink: true,
  },
  {
    type: "Radio.Group",
    module: "antd",
    props: {
      other: {
        options: [
          { value: "man", label: "man" },
          { value: "woman", label: "woman" },
        ],
      },
    },
  },
  {
    type: "Table",
    module: "antd",
    props: {
      other: {
        columns: [
          {
            title: "姓名",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "年龄",
            dataIndex: "age",
            key: "age",
          },
          {
            title: "住址",
            dataIndex: "address",
            key: "address",
          },
        ],
        dataSource: [
          {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
          },
          {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
          },
        ],
      },
    },
  },
  {
    type: "Form.Item",
    props: {
      other: {
        label: "Username",
        name: "username",
      },
    },
  },
  {
    type: "Progress",
    module: "antd",
    props: {
      other: {
        theme: "success",
        type: "circle",
        size: 200,
        percent: 30,
        strokeWidth: 10,
      },
    },
  },
];

export default antdItems;
