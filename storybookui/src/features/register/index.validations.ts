import { Rule } from "antd/lib/form";

const rules: { [key: string]: Rule[] } = {
  username: [
    {
      required: true,
      message: "Please input your Username!",
    },
  ],
  email: [
    {
      required: true,
      type: "email",
      message: "Please input a valid Email!",
    },
  ],
  password: [
    {
      required: true,
      message: "Please input your Password!",
    },
  ],
};

export default rules;
