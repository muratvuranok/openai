import React from "react";
import "./index.css";
import { Form, Row, Col, Card, Input, Button, FormInstance } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import http from "../../common/utils/api";
import { RegisterModel } from "./types";
import rules from "./index.validations";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (model: RegisterModel) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    try {
      await http.post("auth/register", model).then((response) => { 

        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const formRef = React.createRef<FormInstance>();

  return (
    <div className="form">
      <Form className="register-form" onFinish={handleRegister} ref={formRef}>
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
                <h3>Story Book - Register</h3>
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
              <Form.Item name="email" rules={rules.email}>
                <Input
                  placeholder="Email"
                  prefix={
                    <MailOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
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
                  <Button
                    style={{ backgroundColor: "#4caf50", color: "white" }}
                    block
                    htmlType="submit"
                  >
                    Register
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
