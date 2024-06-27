import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const withAuth = (Component: any) => {
  return (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = sessionStorage.getItem("token"); 
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);

    return <Component {...props} />;
  };
};
