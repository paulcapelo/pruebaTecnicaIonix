import { Suspense, useEffect, useMemo } from "react";
import "./App.css";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "./services";
import Rutas from "./Rutas";
import { Spin } from "antd";
import { BrowserRouter, matchPath } from "react-router-dom";
import { AuthProvider } from "./context/useContext";
import { UserInfo, UserType } from "./models";
import { useState } from "react";

function localStorageProvider() {
  const map = new Map(JSON.parse(localStorage.getItem("data-cache") || "[]"));

  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("data-cache", appCache);
  });

  return map;
}

const App = () => {
  const [user, setUser] = useState<UserType>(UserInfo);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("data-user") || JSON.stringify(UserInfo));
    setUser(data);    
  }, []);

  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        provider: localStorageProvider,
        suspense: true,
        fetcher: fetcher,
      }}
    >

      <AuthProvider usuario={user}>
        <BrowserRouter>
          <Rutas />
        </BrowserRouter>
      </AuthProvider>

    </SWRConfig>
  );
};

export default App;
