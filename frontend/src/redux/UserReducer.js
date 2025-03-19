import { login, logout } from "./UserTypes";

const initialState = {
    user: {
        "id": null,
        "name": null,
        "email": null,
        "password": null,
        "balance": null,
        "transactions": null
    }
}

const UserReducer = (state = initialState, action) => {
    console.log("Action : " + action.type);

    switch (action.type) {
        case login: {
            console.log("Login User : " + action.payload);
            return {
                ...state,
                user: action.payload
            }
        }
        case logout: return {
            ...state,
            user: initialState.user
        }
        default: return state
    }
}

export { UserReducer };
