import { Tabs } from "antd";
import React from "react";
import "antd/dist/antd.css";
import { HomeTwoTone, AntDesignOutlined } from "@ant-design/icons";
import DragPanel from "../DragPanel";
import basic from "../../mock/componentData/basic.json";
const { TabPane } = Tabs;

const Sider: React.FC = () => {
  return (
    <>
      <Tabs tabPosition="left">
        <TabPane tab={<HomeTwoTone style={{ fontSize: "28px" }} />} key="1">
          <DragPanel data={[...basic.data]} />
        </TabPane>
        <TabPane
          tab={<AntDesignOutlined style={{ fontSize: "28px" }} />}
          key="2"
        >
          Content of Tab 2
        </TabPane>
      </Tabs>
    </>
  );
};

export default Sider;
