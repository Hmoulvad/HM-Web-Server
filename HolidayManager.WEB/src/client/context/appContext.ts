import * as React from "react";

export interface IAppContext  {
    userIsAuthenticated: boolean;
    isApp: boolean;
    setIsApp: ( app: boolean ) => void;
    setAuth: ( auth: boolean ) => void;
}

export const defaultContext: IAppContext = {
    userIsAuthenticated: false,
    isApp: false,
    setIsApp: (app: boolean) => {
        defaultContext.isApp = app;
    },
    setAuth: (auth: boolean) => {
        defaultContext.userIsAuthenticated = auth;
    },
}

export const UserContext = React.createContext(defaultContext);