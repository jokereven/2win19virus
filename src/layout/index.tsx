import React from "react";
import { Layout } from "antd";
import { LayoutD } from "./style";
const { Header, Sider, Content } = Layout;

export const LayoutWrapper = () => {
  return (
    <LayoutD>
      <Layout>
        <Header
          className="header"
          style={{
            background: "#fff",
            height: "50px",
            boxShadow: "0 0 5px hsl(0deg 0% 60% / 20%)",
            borderBottom: "1px solid #E8F3FF",
            padding: "0 24px",
          }}
        >
          2winvirus
        </Header>
        <Layout
          className="content"
          style={{ background: "#fff", height: "100vh" }}
        >
          <Sider
            style={{ background: "#fff", borderRight: "1px solid #E8F3FF" }}
          >
            Left
          </Sider>
          <Content>Center</Content>
        </Layout>
      </Layout>
    </LayoutD>
  );
};
