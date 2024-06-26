import "./style/global.less";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ConfigProvider } from "@arco-design/web-react";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import enUS from "@arco-design/web-react/es/locale/en-US";
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import rootReducer from "./store";
import PageLayout from "./layout";
import { GlobalContext } from "./context";
import Login from "./pages/login";
import { checkLogin, changeTheme } from "./utils/cutil";
import useStorage from "./hooks/useStorage";
import "./mock";
import baseApi from "@/api/baseApi";
const store = createStore(rootReducer);

function Index() {
  const [lang, setLang] = useStorage("arcoLang", "en-US");
  const [theme, setTheme] = useStorage("arcoTheme", "light");

  function getArcoLocale() {
    switch (lang) {
      case "zh-CN":
        return zhCN;
      case "en-US":
        return enUS;
      default:
        return zhCN;
    }
  }

  function fetchUserInfo() {
    store.dispatch({
      type: "update-userInfo",
      payload: { userLoading: true },
    });

    baseApi.userInfo({}).then((res) => {
      store.dispatch({
        type: "update-userInfo",
        payload: { userInfo: res, userLoading: false },
      });
    });
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, "") !== "login") {
      window.location.pathname = "/login";
    }
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <HashRouter>
      <ConfigProvider
        locale={getArcoLocale()}
        componentConfig={{
          Card: {
            bordered: false,
          },
          List: {
            bordered: false,
          },
          Table: {
            border: false,
          },
        }}
      >
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={PageLayout} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </HashRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
