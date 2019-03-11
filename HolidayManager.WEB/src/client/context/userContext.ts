import * as React from "react";

const defaultValue = {
    user: {
        isAuthenticated: false
    }
}

const UserContext = React.createContext(defaultValue);
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;