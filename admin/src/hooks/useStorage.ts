import { useEffect, useState } from "react";

type CacheKey =
  | "token"
  | "user"
  | "loginParams"
  | "userRole"
  | "arcoLang"
  | "arcoTheme";

const getDefaultStorage = (key: string) => {
  return localStorage.getItem(prefixKey + key);
};

const prefixKey = "admin_";

function useStorage(
  key: CacheKey,
  defaultValue?: string
): [string, (string) => void, () => void] {
  const [storedValue, setStoredValue] = useState(
    getDefaultStorage(key) || defaultValue
  );

  const setStorageValue = (value: string) => {
    storeSetItem(key, value);
    if (value !== storedValue) {
      setStoredValue(value);
    }
  };

  const removeStorage = () => {
    storeRemoveItem(key);
  };

  useEffect(() => {
    const storageValue = storeGetItem(key);
    if (storageValue) {
      setStoredValue(storageValue);
    }
  }, []);

  return [storedValue, setStorageValue, removeStorage];
}

export function storeSetItem(key: CacheKey, value: string) {
  localStorage.setItem(prefixKey + key, value);
}

export function storeGetItem(key: CacheKey) {
  return localStorage.getItem(prefixKey + key);
}

export function storeRemoveItem(key: CacheKey) {
  return localStorage.removeItem(prefixKey + key);
}

export default useStorage;
