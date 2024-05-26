import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Card,
  PaginationProps,
  Button,
  Space,
  Typography,
} from "@arco-design/web-react";
import PermissionWrapper from "@/components/PermissionWrapper";
import { IconDownload, IconPlus } from "@arco-design/web-react/icon";
import axios from "axios";
import useLocale from "@/hooks/useLocale";
import SearchForm from "./form";
import locale from "./locale";
import styles from "./style/index.module.less";
import "./mock";
import { getColumns } from "./constants";
import DetailModal from "./modal/DetailModal";
import { ModelDetailType } from "@/types";
import userApi from "@/api/user";

const { Title } = Typography;

function SearchTable() {
  const t = useLocale(locale);

  const tableCallback = async (record, type) => {
    console.log(record, type);
    if (type == "view") {
      showDetialModal("look");
    }
  };

  const columns = useMemo(() => getColumns(t, tableCallback), [t]);

  const [data, setData] = useState([]);
  const [pagination, setPatination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState({});

  const [dtailVisiable, setDetailVisiable] = useState(false);
  const [detailType, setDetailType] = useState<ModelDetailType>("add");
  function showDetialModal(type: ModelDetailType) {
    setDetailType(type);
    setDetailVisiable(true);
  }

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, JSON.stringify(formParams)]);

  function fetchData() {
    const { current, pageSize } = pagination;
    setLoading(true);

    userApi
      .list({
        page: current,
        pageSize,
        ...formParams,
      })
      .then((res) => {
        setData(res.list);
        setPatination({
          ...pagination,
          current,
          pageSize,
          total: res.total,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onChangeTable({ current, pageSize }) {
    setPatination({
      ...pagination,
      current,
      pageSize,
    });
  }

  function handleSearch(params) {
    setPatination({ ...pagination, current: 1 });
    setFormParams(params);
  }


  return (
    <Card>
      <Title heading={6}>{t["menu.list.searchTable"]}</Title>
      <SearchForm onSearch={handleSearch} />
      <PermissionWrapper
        requiredPermissions={
          [
            // { resource: 'menu.list.searchTable', actions: ['write'] },
          ]
        }
      >
        <div className={styles["button-group"]}>
          <Space>
            <Button
              type="primary"
              onClick={() => showDetialModal("add")}
              icon={<IconPlus />}
            >
              {t["searchTable.operations.add"]}
            </Button>
            {/* <Button>{t["searchTable.operations.upload"]}</Button> */}
          </Space>
          {/* <Space>
            <Button icon={<IconDownload />}>
              {t["searchTable.operation.download"]}
            </Button>
          </Space> */}
        </div>
      </PermissionWrapper>
      <Table
        rowKey="id"
        loading={loading}
        onChange={onChangeTable}
        pagination={pagination}
        columns={columns}
        data={data}
      />

      <DetailModal
        fetchData={fetchData}
        visible={dtailVisiable}
        detailType={detailType}
        setVisible={setDetailVisiable}
      />
    </Card>
  );
}

export default SearchTable;
