import React from "react";

import { Layout, theme  } from "antd";
import Header from "../Header";

const { Content } = Layout;

const AppLayout = ({ content }: { content: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ background: colorBgContainer }}>
      <Header colorBgContainer={colorBgContainer} />
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          // background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {content} 
        
      </Content>
    </Layout>
  );
};

export default AppLayout;
