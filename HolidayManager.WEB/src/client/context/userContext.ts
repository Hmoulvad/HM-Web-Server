import * as React from "react";

interface IUserContext  {
    userIsAuthenticated: boolean;
    setAuth: ( auth: boolean ) => void;
}

export const defaultContext: IUserContext = {
    userIsAuthenticated: false,
    setAuth: (auth: boolean) => {
        defaultContext.userIsAuthenticated = auth
    },
}

export const UserContext = React.createContext(defaultContext);