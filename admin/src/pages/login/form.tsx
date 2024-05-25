import {
  Form,
  Input,
  Checkbox,
  Link,
  Button,
  Space,
} from "@arco-design/web-react";
import { FormInstance } from "@arco-design/web-react/es/Form";
import { IconLock, IconUser } from "@arco-design/web-react/icon";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import useStorage from "@/hooks/useStorage";
import useLocale from "@/hooks/useLocale";
import locale from "./locale";
import styles from "./style/index.module.less";
import baseApi from "@/api/base";

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage("loginParams");

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);
  const [token, setToken, removeToken] = useStorage("token");

  function afterLoginSuccess(params) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }

    // 跳转首页
    window.location.href = "/";
  }

  function login(params) {
    setErrorMessage("");
    setLoading(true);

    baseApi
      .login(params)
      .then((res) => {
        // 设置登录态
        setToken(res.token)
        afterLoginSuccess(params);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      console.log("validate", values);
      login(values);
    });
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    console.log("loginParams", loginParams);
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <div className={styles["login-form-wrapper"]}>
      <div className={styles["login-form-title"]}>{t["login.form.title"]}</div>
      <div className={styles["login-form-sub-title"]}>
        {t["login.form.title"]}
      </div>
      <div className={styles["login-form-error-msg"]}>{errorMessage}</div>
      <Form
        className={styles["login-form"]}
        layout="vertical"
        ref={formRef}
        initialValues={{ username: "admin", password: "123456" }}
      >
        <Form.Item
          field="username"
          rules={[{ required: true, message: t["login.form.username.errMsg"] }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t["login.form.username.placeholder"]}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t["login.form.password.errMsg"] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t["login.form.password.placeholder"]}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles["login-form-password-actions"]}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t["login.form.rememberPassword"]}
            </Checkbox>
            <Link>{t["login.form.forgetPassword"]}</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t["login.form.login"]}
          </Button>
          <Button
            type="text"
            long
            className={styles["login-form-register-btn"]}
          >
            {t["login.form.register"]}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
