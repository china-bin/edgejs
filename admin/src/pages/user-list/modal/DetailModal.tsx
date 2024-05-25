import useLocale from "@/hooks/useLocale";
import {
  Button,
  Form,
  Input,
  Message,
  Modal,
  Select,
} from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import React, { useEffect, useState } from "react";
import locale from "../locale";
import { ModelDetailType } from "@/types";
import userApi from "@/api/user";
const FormItem = Form.Item;

export default function DetailModal({
  visible,
  detailType,
  setVisible,
}: {
  detailType: ModelDetailType;
  visible: boolean;
  setVisible: Function;
}) {
  const t = useLocale(locale);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTtile] = useState("");
  const [inputReadOnly, setInputReadOnly] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (detailType == "add") {
      setTtile("添加用户");
    } else if (detailType == "edit") {
      setTtile("编辑用户");
    } else if (detailType == "look") {
      setTtile("查看用户");
    }

    if (detailType == "look") {
      setInputReadOnly(true);
    } else {
      setInputReadOnly(false);
    }
  }, [detailType]);

  function onOk() {
    form
      .validate()
      .then((res) => {
        console.log("res", res);

        if (detailType == "add") {
          setConfirmLoading(true);
          userApi
            .add(res)
            .then((res) => {
              Message.info("添加成功");
              form.clearFields();
              setVisible(false);
            })
            .finally(() => {
              setConfirmLoading(false);
            });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={() => setVisible(false)}
      footer={detailType == "look" ? null : ""}
    >
      <Form
        {...formItemLayout}
        form={form}
        labelCol={{
          style: { flexBasis: 90 },
        }}
        wrapperCol={{
          style: { flexBasis: "calc(100% - 90px)" },
        }}
      >
        <FormItem
          label={t["searchTable.columns.username"]}
          field="username"
          rules={[{ required: true }]}
        >
          <Input readOnly={inputReadOnly} placeholder="" />
        </FormItem>
        {["edit"].includes(detailType) && (
          <FormItem
            label={t["searchTable.columns.uid"]}
            field="uid"
            disabled={true}
            rules={[{ required: true }]}
          >
            <Input readOnly={inputReadOnly} placeholder="" />
          </FormItem>
        )}

        {["look", "add"].includes(detailType) && (
          <FormItem
            label={t["searchTable.columns.email"]}
            field="email"
            rules={[{ required: true }]}
          >
            <Input readOnly={inputReadOnly} placeholder="" />
          </FormItem>
        )}
      </Form>
    </Modal>
  );
}
