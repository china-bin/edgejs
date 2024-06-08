import React, { useEffect, useState } from "react";
import {
  Button,
  Avatar,
  Upload,
  Descriptions,
  Tag,
  Skeleton,
  Link,
} from "@arco-design/web-react";
import { IconCamera, IconPlus } from "@arco-design/web-react/icon";
import useLocale from "@/hooks/useLocale";
import locale from "./locale";
import styles from "./style/header.module.less";
import baseApi from "@/api/baseApi";

export default function Info({
  userInfo = {},
  loading,
}: {
  userInfo: any;
  loading: boolean;
}) {
  const t = useLocale(locale);

  const [avatar, setAvatar] = useState("");

  function onAvatarChange(_, file) {
    console.log("file", file);
    const originFile = file.originFile;
    console.log("originFile", originFile);
    const formData = new FormData();
    formData.append("file", originFile);

    baseApi.uploadImage(formData).then((res) => {
      console.log("res", res);
    });

    // const blobUrl = originFile ? URL.createObjectURL(originFile) : "";
    // setAvatar(blobUrl);
  }

  useEffect(() => {
    setAvatar(userInfo.avatar);
  }, [userInfo]);

  const loadingImg = (
    <Skeleton
      text={{ rows: 0 }}
      style={{ width: "100px", height: "100px" }}
      animation
    />
  );

  const loadingNode = <Skeleton text={{ rows: 1 }} animation />;
  return (
    <div className={styles["info-wrapper"]}>
      <Upload showUploadList={false} onChange={onAvatarChange}>
        {loading ? (
          loadingImg
        ) : (
          <Avatar
            size={100}
            triggerIcon={<IconCamera />}
            className={styles["info-avatar"]}
          >
            {avatar ? <img src={avatar} /> : <IconPlus />}
          </Avatar>
        )}
      </Upload>
      <Descriptions
        className={styles["info-content"]}
        column={1}
        colon="："
        data={[
          {
            label: t["userSetting.label.name"],
            value: loading ? loadingNode : userInfo.name,
          },
          {
            label: t["userSetting.label.accountId"],
            value: loading ? loadingNode : userInfo.accountId,
          },
          {
            label: t["userSetting.label.phoneNumber"],
            value: loading ? (
              loadingNode
            ) : (
              <span>
                {userInfo.phoneNumber}
                <Link role="button" className={styles["edit-btn"]}>
                  {t["userSetting.btn.edit"]}
                </Link>
              </span>
            ),
          },
          {
            label: t["userSetting.label.registrationTime"],
            value: loading ? loadingNode : userInfo.registrationTime,
          },
        ]}
      ></Descriptions>
    </div>
  );
}
