import { useEffect, useState } from "react";

type CacheKey =
  | "token"
  | "user"
  | "loginParams"
  | "userRole"
  | "arcoLang"
  | "arcoTheme";

const getDefaultStorage = (key) => {
  return localStorage.getItem(key);
};

const prefixKey = "admin_";

function useStorage(
  key: CacheKey,
  defaultValue?: string
): [string, (string) => void, () => void] {
  const realKey = prefixKey + key;

  const [storedValue, setStoredValue] = useState(
    getDefaultStorage(realKey) || defaultValue
  );

  const setStorageValue = (value: string) => {
    localStorage.setItem(realKey, value);
    if (value !== storedValue) {
      setStoredValue(value);
    }
  };

  const removeStorage = () => {
    localStorage.removeItem(realKey);
  };

  useEffect(() => {
    const storageValue = localStorage.getItem(realKey);
    if (storageValue) {
      setStoredValue(storageValue);
    }
  }, []);

  return [storedValue, setStorageValue, removeStorage];
}

export default useStorage;
