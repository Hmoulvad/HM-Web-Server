import * as React from "react";
import { Role } from "../models/models";

export interface IAppContext  {
    isAuth: boolean;
    isApp: boolean;
    userId: string | undefined;
    role: Role | undefined;
    setIsApp: ( app: boolean ) => void;
    setAuth: ( auth: boolean ) => void;
    logout: () => void;
}

export const defaultContext: IAppContext = {
    isAuth: false,
    isApp: false,
    userId: undefined,
    role: undefined,
    logout: () => {
        defaultContext.isApp = false;
        defaultContext.isAuth = false;
        defaultContext.userId = undefined;
        defaultContext.role = undefined
    },
    setIsApp: (app: boolean) => {
        defaultContext.isApp = app;
    },
    setAuth: (auth: boolean) => {
        defaultContext.isAuth = auth;
    },
}

export const AppContext = React.createContext(defaultContext);