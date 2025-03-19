import { login, logout } from "./UserTypes.js";

const login_user = (userData) => async (dispatch) => {
    console.log("Login user action created....");
    dispatch ({
        type: login,
        payload: userData
    });
    return userData;
}

const logout_user = () => {
    console.log("Logout user action created....");
    return {
        type: logout,
        payload: null
    }
}

export { login_user, logout_user };