import * as React from "react";
import { IAppState } from "../App";

const defaultValue: IAppState = {
    user: {
        isAuthenticated: false
    },
    setAuth: (auth: boolean) => {},
}

export const UserContext = React.createContext(defaultValue);
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;