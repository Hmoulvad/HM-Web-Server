import * as React from "react";

export interface IAppContext  {
    isAuth: boolean;
    isApp: boolean;
    setIsApp: ( app: boolean ) => void;
    setAuth: ( auth: boolean ) => void;
}

export const defaultContext: IAppContext = {
    isAuth: false,
    isApp: false,
    setIsApp: (app: boolean) => {
        defaultContext.isApp = app;
    },
    setAuth: (auth: boolean) => {
        defaultContext.isAuth = auth;
    },
}

export const AppContext = React.createContext(defaultContext);