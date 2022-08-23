import { Tabs } from "antd";
import React from "react";
import { Html5Outlined, AntDesignOutlined } from "@ant-design/icons";
import DragPanel from "../DragPanel";
import basic from "../../mock/componentData/basic";
import antdItems from "mock/componentData/antdItem";
const { TabPane } = Tabs;

const Sider: React.FC = () => {
  return (
    <>
      <Tabs tabPosition="left" style={{ height: "100%" }}>
        <TabPane tab={<Html5Outlined style={{ fontSize: "28px" }} />} key="1">
          <DragPanel data={[...basic]} />
        </TabPane>
        <TabPane
          tab={<AntDesignOutlined style={{ fontSize: "28px" }} />}
          key="2"
        >
          <DragPanel data={antdItems} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Sider;
