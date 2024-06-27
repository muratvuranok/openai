import React, { useEffect } from "react";
import "./index.css";
import { Form, Row, Col, Card, Input, Button, FormInstance, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import rules from "./index.validations";
import { LoginModel } from "./types";
import http from "../../common/utils/api";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const handleLogin = async (model: LoginModel) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    try {
      await http.post("auth/login", model).then((response) => {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", response.data.user);

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formRef = React.createRef<FormInstance>();

  return (
    <div className="form">
      <Form className="login-form" onFinish={handleLogin} ref={formRef}>
        <Row style={{ marginTop: 10 }}>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 22, offset: 1 }}
            md={{ span: 16, offset: 4 }}
            lg={{ span: 16, offset: 4 }}
            xl={{ span: 16, offset: 4 }}
            xxl={{ span: 16, offset: 4 }}
          >
            <Card>
              <div style={{ textAlign: "center" }}>
                <h3>Story Book</h3>
              </div>
              <Form.Item name="username" rules={rules.username}>
                <Input
                  placeholder="Username"
                  prefix={
                    <UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  size="large"
                />
              </Form.Item>
              <Form.Item name="password" rules={rules.password}>
                <Input.Password
                  placeholder="Password"
                  prefix={
                    <LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
                  }
                  size="large"
                />
              </Form.Item>
              <Row>
                <Col span={24}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button
                      style={{
                        backgroundColor: "#ff4d4f",
                        color: "white",
                      }}
                      block
                      htmlType="submit"
                      danger
                    >
                      Login
                    </Button>
                    <Button onClick={() => navigate("/register")} type="link">
                      Create New User
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
