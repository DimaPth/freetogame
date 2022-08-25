import React, { FC } from "react";
import { RightOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import cn from "classnames";
import style from "./SignUpForm.module.scss";

interface SignUpFormProps {
  type: "login" | "register";
}

const SignUpForm: FC<SignUpFormProps> = ({ type }) => {
  return (
    <div>
      <div className={style.wrap}>
        <Row className={style.shadow}>
          <Col span={type === "login" ? 12 : 10}>
            <div
              className={cn(style.image, { [style.alt]: type === "register" })}
            />
          </Col>
          <Col span={type === "login" ? 12 : 14}>
            <div className={style.form}>
              {type !== "register" && (
                <div className={style.img}>
                  <img
                    src="https://www.freetogame.com/assets/images/logo-footer.png"
                    alt="logo"
                    height={72}
                  />
                </div>
              )}
              <Typography.Title level={5} className={style.title}>
                {type === "login"
                  ? "Log in to FreeToGame"
                  : "Create My Account!"}
              </Typography.Title>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
              >
                {type === "register" && (
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Username!",
                      },
                    ]}
                  >
                    <Input placeholder="Username" className={style.input} />
                  </Form.Item>
                )}
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className={style.input}
                  />
                </Form.Item>

                {type === "register" ? (
                  <>
                    <Form.Item
                      name="password"
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Password"
                        className={style.input}
                      />
                    </Form.Item>
                    <Form.Item
                      name="confirm"
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginLeft: "16px",
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Confirm Password"
                        className={style.input}
                      />
                    </Form.Item>
                  </>
                ) : (
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      className={style.input}
                    />
                  </Form.Item>
                )}

                <Form.Item wrapperCol={{ span: 24 }}>
                  <button className={style.btn}>
                    {type === "login" ? "Login" : "Create Account"}
                  </button>
                </Form.Item>
              </Form>
              {type === "login" ? (
                <Typography.Text className={style.text}>
                  Not a member yet?{" "}
                  <Link to="/register" className={style.link}>
                    Create account <RightOutlined />
                  </Link>
                </Typography.Text>
              ) : (
                <Typography.Text className={style.text}>
                  Already a member?{" "}
                  <Link to="/login" className={style.link}>
                    Log In <RightOutlined />
                  </Link>
                </Typography.Text>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUpForm;
