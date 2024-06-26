import React from "react";
import { Button, Typography, Image } from "@arco-design/web-react";
import dayjs from "dayjs";
import styles from "./style/index.module.less";
import { ModelDetailType } from "@/types";

const { Text } = Typography;

export const OauthType = ["无", "google登录"];

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: ModelDetailType) => Promise<void>
) {
  return [
    {
      title: t["searchTable.columns.id"],
      dataIndex: "id",
    },
    {
      title: t["searchTable.columns.uid"],
      dataIndex: "uid",
      render: (value) => <Text copyable>{value}</Text>,
    },
    {
      title: t["searchTable.columns.username"],
      dataIndex: "username",
    },
    {
      title: t["searchTable.columns.avatar"],
      dataIndex: "avatar",
      render: (value) => (
        <div>
          <Image width={50} src={value} />
        </div>
      ),
    },
    {
      title: t["searchTable.columns.oauthType"],
      dataIndex: "oauthType",
      render: (value) => {
        return OauthType[value];
      },
    },
    {
      title: t["searchTable.columns.country"],
      dataIndex: "country",
    },
    {
      title: t["searchTable.columns.city"],
      dataIndex: "city",
    },
    {
      title: t["searchTable.columns.createAt"],
      dataIndex: "createAt",
      sorter: (a, b) => b.createAt - a.createAt,
    },
    {
      title: t["searchTable.columns.operations"],
      dataIndex: "operations",
      headerCellStyle: { paddingLeft: "15px" },
      render: (_, record) => (
        <div>
          <Button
            type="text"
            size="small"
            onClick={() => callback(record, "look")}
          >
            {t["searchTable.columns.operations.look"]}
          </Button>

          <Button
            type="text"
            size="small"
            onClick={() => callback(record, "edit")}
          >
            {t["searchTable.columns.operations.edit"]}
          </Button>
        </div>
      ),
    },
  ];
}
