import { storeGetItem } from "./useStorage";

export default function checkLogin() {
  return storeGetItem("token") ? true : false;
}
