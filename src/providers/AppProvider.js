import React, { useCallback, useState } from "react";
export let AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  let setUserInfoCallback = useCallback((value) => {
    setUserInfo(value);
  }, []);

  return (
    <AppContext.Provider
      value={{
        data: { userInfo: userInfo },
        action: { setUserInfo: setUserInfoCallback },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
