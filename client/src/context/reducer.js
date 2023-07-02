import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
} from "./actions";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: "danger",
            alertText: "Please provide all values!",
        };
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: "",
            alertText: "",
        };
    }

    if (action.type === REGISTER_USER_BEGIN) {
        return {
            ...state,
            loading: true,
        };
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            loading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocaton: action.payload.userLocaton,
            jobLocation: action.payload.jobLocation,
            showAlert: true,
            alertType: "success",
            alertText: "Registration successful! Redirecting...",
        };
    }
    if (action.type === REGISTER_USER_ERROR) {
        console.log(action);
        return {
            ...state,
            loading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }

    throw new Error(`no such action :${action.type}`);
};
export default reducer;
