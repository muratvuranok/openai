import React from "react";
import Login from "../../features/login";
import Stories from "../../features/stories";
import AppLayout from "../Layout";
import NotFound from "../Notfound";
import { withAuth } from "./withAuth"; // withAuth fonksiyonunu yeni dosyadan import edin
import { UploadOutlined } from "@ant-design/icons";
import Register from "../../features/register";

const AuthAppLayout = withAuth(() => <AppLayout content={<Stories />} />);

const routeConfig: any[] = [
  {
    key: "1",
    path: "/register",
    element: <Register />,
    showInMenu: false,
    title: "Create New User",
    icon: null,
  },
  {
    key: "2",
    path: "/login",
    element: <Login />,
    showInMenu: false,
    title: "Giriş Sayfası",
    icon: null,
  },
  {
    key: "3",
    path: "/",
    element: <AuthAppLayout />,
    showInMenu: false,
    title: "Stories",
    icon: null,
  },
  {
    key: "4",
    path: "*",
    element: <NotFound />,
    showInMenu: false,
    icon: <UploadOutlined />,
    title: "Not Found",
  },
];

export default routeConfig;
