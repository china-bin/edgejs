import React, { useContext, useEffect } from "react";
import {
  Tooltip,
  Input,
  Avatar,
  Select,
  Dropdown,
  Menu,
  Divider,
  Message,
  Button,
} from "@arco-design/web-react";
import {
  IconLanguage,
  IconNotification,
  IconSunFill,
  IconMoonFill,
  IconUser,
  IconSettings,
  IconPoweroff,
  IconExperiment,
  IconDashboard,
  IconInteraction,
  IconTag,
} from "@arco-design/web-react/icon";
import { useSelector, useDispatch } from "react-redux";
import { GlobalState } from "@/store";
import { GlobalContext } from "@/context";
import useLocale from "@/hooks/useLocale";
import Logo from "@/assets/logo.svg";
import IconButton from "./IconButton";
import Settings from "../Settings";
import styles from "./style/index.module.less";
import defaultLocale from "@/locale";
import useStorage from "@/hooks/useStorage";
import useRoute, { generatePermission } from "@/routes";
import { useHistory } from "react-router-dom";

function Navbar({ show }: { show: boolean }) {
  const t = useLocale();
  const userInfo = useSelector((state: GlobalState) => state.userInfo);
  const dispatch = useDispatch();

  const [role, setRole] = useStorage("userRole", "admin");
  const [token, setToken, removeToken] = useStorage("token");

  const { setLang, lang, theme, setTheme } = useContext(GlobalContext);
  const history = useHistory();

  function logout() {
    removeToken();
    window.location.href = "/login";
  }

  function onMenuItemClick(key) {
    if (key === "logout") {
      logout();
    } else if (key == "setting") {
      // 设置
      history.push({
        pathname: "/user/setting",
      });
    } else {
      Message.info(`You clicked ${key}`);
    }
  }

  useEffect(() => {
    dispatch({
      type: "update-userInfo",
      payload: {
        userInfo: {
          ...userInfo,
          permissions: generatePermission(role),
        },
      },
    });
  }, [role]);

  if (!show) {
    return (
      <div className={styles["fixed-settings"]}>
        <Settings
          trigger={
            <Button icon={<IconSettings />} type="primary" size="large" />
          }
        />
      </div>
    );
  }

  const handleChangeRole = () => {
    const newRole = role === "admin" ? "user" : "admin";
    setRole(newRole);
  };

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.SubMenu
        key="role"
        title={
          <>
            <IconUser className={styles["dropdown-icon"]} />
            <span className={styles["user-role"]}>
              {role === "admin"
                ? t["menu.user.role.admin"]
                : t["menu.user.role.user"]}
            </span>
          </>
        }
      >
        <Menu.Item onClick={handleChangeRole} key="switch role">
          <IconTag className={styles["dropdown-icon"]} />
          {t["menu.user.switchRoles"]}
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="setting">
        <IconSettings className={styles["dropdown-icon"]} />
        {t["menu.user.setting"]}
      </Menu.Item>
      <Menu.SubMenu
        key="more"
        title={
          <div style={{ width: 80 }}>
            <IconExperiment className={styles["dropdown-icon"]} />
            {t["message.seeMore"]}
          </div>
        }
      >
        <Menu.Item key="workplace">
          <IconDashboard className={styles["dropdown-icon"]} />
          {t["menu.dashboard.workplace"]}
        </Menu.Item>
      </Menu.SubMenu>

      <Divider style={{ margin: "4px 0" }} />
      <Menu.Item key="logout">
        <IconPoweroff className={styles["dropdown-icon"]} />
        {t["navbar.logout"]}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles["logo-name"]}>Arco Pro</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li>
          <Input.Search
            className={styles.round}
            placeholder={t["navbar.search.placeholder"]}
          />
        </li>
        <li>
          <Select
            triggerElement={<IconButton icon={<IconLanguage />} />}
            options={[
              { label: "中文", value: "zh-CN" },
              { label: "English", value: "en-US" },
            ]}
            value={lang}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: "br",
            }}
            trigger="hover"
            onChange={(value) => {
              setLang(value);
              const nextLang = defaultLocale[value];
              Message.info(`${nextLang["message.lang.tips"]}${value}`);
            }}
          />
        </li>
        <li>
          <Tooltip
            content={
              theme === "light"
                ? t["settings.navbar.theme.toDark"]
                : t["settings.navbar.theme.toLight"]
            }
          >
            <IconButton
              icon={theme !== "dark" ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            />
          </Tooltip>
        </li>
        <Settings />
        {userInfo && (
          <li>
            <Dropdown droplist={droplist} position="br">
              <Avatar size={32} style={{ cursor: "pointer" }}>
                <img alt="avatar" src={userInfo.avatar} />
              </Avatar>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
