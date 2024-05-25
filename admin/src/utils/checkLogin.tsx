import cache from "./cache";

export default function checkLogin() {

  return cache.get("token") ? true :false;
}
