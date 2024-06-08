import React, { useContext, useEffect } from "react";
import useLocale from "@/hooks/useLocale";
import locale from "./locale";
import { GlobalContext } from "@/context";
import {
  Input,
  Select,
  Cascader,
  Button,
  Form,
  Space,
  Message,
  Skeleton,
} from "@arco-design/web-react";
import baseApi from "@/api/baseApi";

function InfoForm({
  loading,
  userInfo = {},
}: {
  loading?: boolean;
  userInfo: any;
}) {
  const t = useLocale(locale);
  const [form] = Form.useForm();
  const { lang } = useContext(GlobalContext);

  useEffect(() => {
    console.log("userInfo", userInfo);
    form.setFieldsValue(userInfo);
  }, [userInfo]);

  const handleSave = async () => {
    try {
      await form.validate();
      const formValues = form.getFieldsValue();
      baseApi.editUser(formValues).then(() => {});
      console.log("formValues", formValues);
    } catch (_) {}
  };

  const handleReset = () => {
    form.resetFields();
  };

  const loadingNode = (rows = 1) => {
    return (
      <Skeleton
        text={{
          rows,
          width: new Array(rows).fill("100%"),
        }}
        animation
      />
    );
  };

  return (
    <Form
      style={{ width: "500px", marginTop: "6px" }}
      form={form}
      labelCol={{ span: lang === "en-US" ? 7 : 6 }}
      wrapperCol={{ span: lang === "en-US" ? 17 : 18 }}
    >
      <Form.Item
        label={t["userSetting.info.email"]}
        field="email"
        rules={[
          {
            type: "email",
            required: true,
            message: t["userSetting.info.email.placeholder"],
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Input placeholder={t["userSetting.info.email.placeholder"]} />
        )}
      </Form.Item>
      <Form.Item
        label={t["userSetting.info.nickname"]}
        field="nickname"
        rules={[
          {
            required: true,
            message: t["userSetting.info.nickname.placeholder"],
          },
        ]}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Input placeholder={t["userSetting.info.nickname.placeholder"]} />
        )}
      </Form.Item>
      <Form.Item label={t["userSetting.info.area"]} field="country">
        {loading ? (
          loadingNode()
        ) : (
          <Select
            options={["中国"]}
            placeholder={t["userSetting.info.area.placeholder"]}
          />
        )}
      </Form.Item>

      <Form.Item label=" ">
        <Space>
          <Button type="primary" onClick={handleSave}>
            {t["userSetting.save"]}
          </Button>
          <Button onClick={handleReset}>{t["userSetting.reset"]}</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default InfoForm;
