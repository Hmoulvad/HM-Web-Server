import { Route } from "react-router-dom";

export function isAuthenticated() {
    if (localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
}

