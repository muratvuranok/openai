import React from "react";
import { Layout, Menu, Row, Col, Space, Avatar, Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import profilePicture from "../../images/avatar.png";

interface IHeaderProps {
  firstName?: string;
  lastName?: string;
  colorBgContainer: any;
}

const { Header } = Layout;

const Index = (props: IHeaderProps) => {
  const { colorBgContainer } = props;

  const handleLogout = async () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <>
      <Header
        className={"header-container"}
        style={{
          minHeight: 52,
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <Row>
          <Col
            style={{
              padding: "0px 15px 0px 15px",
              textAlign: "right",
            }}
            span={24}
          >
            <Space>
              <Title level={5} style={{ marginRight: 15 }}>
                {sessionStorage.getItem("user")}
              </Title>
            </Space>
            <Space>
              <Dropdown
                className={"header-drop"}
                dropdownRender={(menu) => (
                  <Menu>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                      <Link to={"/profile"}>Profile</Link>
                    </Menu.Item>
                    <Menu.Item
                      key="2"
                      icon={<LogoutOutlined />}
                      onClick={handleLogout}
                    >
                      Logout
                    </Menu.Item>
                  </Menu>
                )}
                trigger={["click"]}
              >
                <Avatar
                  size={"small"}
                  shape="circle"
                  alt={"profile"}
                  src={profilePicture}
                />
              </Dropdown>
            </Space>
          </Col>
        </Row>
      </Header>
    </>
  );
};

export default Index;
