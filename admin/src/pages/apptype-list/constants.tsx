import React from "react";
import { Button, Typography, Image } from "@arco-design/web-react";
import dayjs from "dayjs";
import styles from "./style/index.module.less";

const { Text } = Typography;

export const OauthType = ["无", "google登录"];

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: t["searchTable.columns.id"],
      dataIndex: "id",
    },
    {
      title: t["searchTable.columns.name"],
      dataIndex: "name",
    },
    {
      title: t["searchTable.columns.apptypeKey"],
      dataIndex: "apptypeKey",
      render: (value) => <Text copyable>{value}</Text>,
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
        <Button
          type="text"
          size="small"
          onClick={() => callback(record, "edit")}
        >
          {t["searchTable.columns.operations.edit"]}
        </Button>
      ),
    },
  ];
}
