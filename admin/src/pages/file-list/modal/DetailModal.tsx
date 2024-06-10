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
import fileApi from "@/api/fileApi";
const FormItem = Form.Item;

export default function DetailModal({
  visible,
  detailType,
  detailData,
  setVisible,
  fetchData,
}: {
  detailType: ModelDetailType;
  detailData: any;
  visible: boolean;
  setVisible: Function;
  fetchData: Function;
}) {
  const t = useLocale(locale);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTtile] = useState("");
  const [inputReadOnly, setInputReadOnly] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (detailType == "add") {
      setTtile("添加产品");
    } else if (detailType == "edit") {
      setTtile("编辑产品");
    } else if (detailType == "look") {
      setTtile("查看产品");
    }

    if (detailType == "look") {
      setInputReadOnly(true);
    } else {
      setInputReadOnly(false);
    }
  }, [detailType]);

  useEffect(() => {
    form.setFieldsValue(detailData);
  }, [detailData]);

  function onOk() {
    form
      .validate()
      .then((res) => {
        console.log("res", res);

        if (detailType == "add") {
          setConfirmLoading(true);
          fileApi
            .add(res)
            .then((res) => {
              Message.info("添加成功");
              form.clearFields();
              fetchData();
              setVisible(false);
            })
            .finally(() => {
              setConfirmLoading(false);
            });
        } else if (detailType == "edit") {
          const params = {
            ...res,
            id: detailData.id,
          };
          fileApi.edit(params).then(() => {
            Message.info("编辑成功");
            fetchData();
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
          label={t["searchTable.columns.name"]}
          field="name"
          rules={[{ required: true }]}
        >
          <Input readOnly={inputReadOnly} placeholder="" />
        </FormItem>
        <FormItem
          label={t["searchTable.columns.fileKey"]}
          field="fileKey"
          rules={[{ required: true }]}
        >
          <Input readOnly={inputReadOnly} placeholder="" />
        </FormItem>
      </Form>
    </Modal>
  );
}
