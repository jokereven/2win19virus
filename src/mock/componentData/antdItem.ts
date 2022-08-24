import { ElementType } from "types";
import { IEditField } from "./type";

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
    props: {
      other: {
        placeholder: "Basic usage",
      },
    },
    blink: true,
  },
  {
    type: "InputNumber",
    module: "antd",
    props: {
      other: {
        defaultValue: 3,
      },
    },
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

export const antdEditFields: Record<string, IEditField[]> = {
  Button: [
    {
      prop: "children",
      name: "文字",
      type: "Text",
    },
    {
      prop: "other.type",
      name: "类型",
      type: "Select",
      options: [
        {
          value: "primary",
          label: "主按钮",
        },
        {
          value: "ghost",
          label: "次按钮",
        },
        {
          value: "dashed",
          label: "虚线按钮",
        },
        {
          value: "text",
          label: "文本按钮",
        },
        {
          value: "link",
          label: "链接按钮",
        },
      ],
    },
    {
      prop: "other.size",
      name: "大小",
      type: "Select",
      defaultValue: "default",
      options: [
        {
          value: "small",
          label: "小",
        },
        {
          value: "default",
          label: "中",
        },
        {
          value: "large",
          label: "大",
        },
      ],
    },
  ],
  Input: [
    {
      prop: "other.placeholder",
      name: "提示",
      type: "Text",
    },
    {
      prop: "other.size",
      name: "大小",
      type: "Select",
      defaultValue: "default",
      options: [
        {
          value: "small",
          label: "小",
        },
        {
          value: "default",
          label: "中",
        },
        {
          value: "large",
          label: "大",
        },
      ],
    },
  ],
  InputNumber: [
    {
      prop: "other.placeholder",
      name: "提示",
      type: "Text",
    },
    {
      prop: "other.size",
      name: "大小",
      type: "Select",
      defaultValue: "default",
      options: [
        {
          value: "small",
          label: "小",
        },
        {
          value: "default",
          label: "中",
        },
        {
          value: "large",
          label: "大",
        },
      ],
    },
  ],
  "Radio.Group": [
    {
      prop: "other.options",
      name: "选项",
      type: "EditableTable",
      columns: [
        {
          title: "显示值",
          dataIndex: "label",
          editable: true,
          width: "40%",
        },
        {
          title: "选项值",
          dataIndex: "value",
          editable: true,
          width: "40%",
        },
      ],
    },
  ],

  Progress: [
    {
      prop: "other.status",
      name: "状态",
      type: "Select",
      defaultValue: "normal",
      options: [
        {
          value: "success",
          label: "成功",
        },
        {
          value: "exception",
          label: "异常",
        },
        {
          value: "normal",
          label: "正常",
        },
        {
          value: "active",
          label: "active动画(仅限线形)",
        },
      ],
    },
    {
      prop: "other.type",
      name: "类型",
      type: "Select",
      options: [
        {
          value: "circle",
          label: "圆形",
        },
        {
          value: "line",
          label: "线形",
        },
        {
          value: "dashboard",
          label: "指示板",
        },
      ],
    },
    {
      prop: "other.percent",
      name: "进度值",
      type: "Number",
      max: 100,
      min: 0,
    },
    {
      prop: "other.strokeWidth",
      name: "线条粗细",
      type: "Number",
    },
  ],
};

export const antdEventFields: Record<string, IEditField[]> = {
  Button: [
    {
      prop: "event.onClick",
      name: "点击事件onClick",
      type: "Textarea",
    },
  ],
  Input: [
    {
      prop: "event.onChange",
      name: "输入改变事件onChange",
      type: "Textarea",
    },
  ],
};

export default antdItems;
