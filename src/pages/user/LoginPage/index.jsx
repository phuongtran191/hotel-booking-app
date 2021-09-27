import { Button, Checkbox, Form, Input, Tabs } from "antd";
import { IMAGES } from "constants/images.constants";
import { ROUTER_URL } from "constants/index";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginAction, registerAction } from "redux/actions";
import history from "utils/history";
import "./LoginPage.scss";


const { TabPane } = Tabs;

LoginPage.propTypes = {};

function LoginPage(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userReducer?.userInfo);
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("1");
  useEffect(() => {
    if (history.location.pathname === ROUTER_URL.REGISTER) setActiveTab("2");
    else setActiveTab("1");
  }, []);

  function handleChangeTab(activeKey) {
    setActiveTab(activeKey);
    if (activeKey === "1") {
      //tab 1 login
      history.replace(ROUTER_URL.LOGIN);
    } else {
      //tab 2 register
      history.replace(ROUTER_URL.REGISTER);
    }
  }
  const handleOnRegister = (values) => {
    const { username, password, email } = values;
    dispatch(registerAction({ data: { username, password, email, role: "user" } }));
  };
  const handleOnLogin = (value) => {
    dispatch(loginAction({ data: value }));
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__side"></div>

        <div className="login__content">
          <div className="login__content__logo">
            <Link to={ROUTER_URL.HOME}>
              <img src={IMAGES.LOGO} alt="Logo is not imported!" />
            </Link>
          </div>

          <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={handleChangeTab}>
            <TabPane className="login-tab" tab={t("Login")} key="1">
              <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={(value) => handleOnLogin(value)}
              >
                <Form.Item
                  name="email"
                  hasFeedback
                  rules={[
                    { type: "email", message: `${t("Email is not valid!")}` },
                    { required: true, message: `${t("Please enter a valid email!")}` },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  hasFeedback
                  rules={[{ required: true, message: `${t("Please enter a valid password!")}` }]}
                >
                  <Input.Password placeholder={t("Password")} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>{t("Remember me")}</Checkbox>
                </Form.Item>

                <div
                  style={{
                    display: "inline-block",
                    marginBottom: 24,
                  }}
                >
                  {t("You don't have an account?")}&nbsp;
                  <Link className="login-link" to="/login" onClick={() => handleChangeTab("2")}>
                    {t("Register now")}
                  </Link>
                </div>

                <Form.Item>
                  <Button className="login-btn" type="primary" htmlType="submit" block>
                    {t("Login")}
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane className="login-tab" tab={t("Register")} key="2">
              <Form
                name="basic"
                layout="vertical"
                initialValues={{ agree: true }}
                onChange={() => {}}
                onFinish={(values) => handleOnRegister(values)}
              >
                <Form.Item
                  name="username"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: `${t("Please enter a valid full name!")}`,
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>

                <Form.Item
                  name="email"
                  hasFeedback
                  rules={[
                    { required: true, message: `${t("Please enter a valid email!")}` },
                    { type: "email", message: `${t("Email is not valid!")}` },
                    // {
                    //   validator: (rule,value, cb) => {
                    //   userInfo.error!==null? cb(userInfo.error) : cb();
                    //   },
                    // },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: `${t("Please enter a valid password!")}`,
                    },
                    { min: 6, message: `${t("Must be a minimum of 8 characters")}` },
                  ]}
                >
                  <Input.Password placeholder={t("Password")} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: `${t("Please confirm your password!")}`,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(`${t("The two passwords do not match!")}`));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder={t("Confirm")} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item name="agree" valuePropName="checked">
                  <Checkbox>
                    {t("I have read and agreed to")}
                    <Link className="login-link" to="/term">
                      {t(" the terms")}
                    </Link>
                  </Checkbox>
                </Form.Item>

                <div
                  style={{
                    display: "inline-block",
                    marginBottom: 24,
                  }}
                >
                  {t("You have an account?")}&nbsp;
                  <Link className="login-link" to="/login" onClick={() => handleChangeTab("1")}>
                    {t("Login")}
                  </Link>
                </div>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={userInfo?.loading} block>
                    {t("Register")}
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
