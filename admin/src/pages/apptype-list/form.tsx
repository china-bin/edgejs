import React, { useContext } from "react";
import dayjs from "dayjs";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Grid,
} from "@arco-design/web-react";
import { GlobalContext } from "@/context";
import locale from "./locale";
import useLocale from "@/hooks/useLocale";
import { IconRefresh, IconSearch } from "@arco-design/web-react/icon";
import { OauthType } from "./constants";
import styles from "./style/index.module.less";

const { Row, Col } = Grid;
const { useForm } = Form;

function SearchForm(props: {
  onSearch: (values: Record<string, any>) => void;
}) {
  const { lang } = useContext(GlobalContext);

  const t = useLocale(locale);
  const [form] = useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log("values", values);
    if (values.createAt && values.createAt.length >= 2) {
      values.startTime = values.createAt[0];
      values.endTime = values.createAt[1];
      delete values.createAt;
    }
    if (values.oauthType) {
      values.oauthType = values.oauthType.join(",");
    }

    props.onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    props.onSearch({});
  };

  const colSpan = lang === "zh-CN" ? 8 : 12;

  return (
    <div className={styles["search-form-wrapper"]}>
      <Form
        form={form}
        className={styles["search-form"]}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          <Col span={colSpan}>
            <Form.Item label={t["searchTable.columns.uid"]} field="uid">
              <Input placeholder={t["searchForm.uid.placeholder"]} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={t["searchTable.columns.username"]}
              field="username"
            >
              <Input
                allowClear
                placeholder={t["searchForm.username.placeholder"]}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={t["searchTable.columns.oauthType"]}
              field="oauthType"
            >
              <Select
                placeholder={t["searchForm.all.placeholder"]}
                options={OauthType.map((item, index) => ({
                  label: item,
                  value: index,
                }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={t["searchTable.columns.createAt"]}
              field="createAt"
            >
              <DatePicker.RangePicker
                allowClear
                style={{ width: "100%" }}
                disabledDate={(date) => dayjs(date).isAfter(dayjs())}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles["right-button"]}>
        <Button type="primary" icon={<IconSearch />} onClick={handleSubmit}>
          {t["searchTable.form.search"]}
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          {t["searchTable.form.reset"]}
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
