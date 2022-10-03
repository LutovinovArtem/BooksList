import { Button, Form, Input } from "antd";
import React from "react";
import "antd/dist/antd.css";
import style from "./register.module.css";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../API/register";

import { Alert } from "antd";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    registerUser(values).then((response) => {
      if (response.status === 201) {
        // navigate("/register-Alert");
        alert("Вы зарегистрированы");
      } else {
        return <Alert message="" description="" type="success" showIcon />; // разобраться с алертами (ant design)
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const linkBack = () => {
    navigate("/");
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      //   initialValues={{
      //     remember: true,
      //   }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={style.formWrapper}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <div className={style.buttonWraper}>
          <Button type="primary" htmlType="submit" className={style.register}>
            Регистрация
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className={style.register}
            onClick={linkBack}
          >
            Назад
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Register;
