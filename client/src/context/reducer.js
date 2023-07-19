import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_ERROR,
    SETUP_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
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

    if (action.type === SETUP_USER_BEGIN) {
        return {
            ...state,
            loading: true,
        };
    }

    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            loading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocaton: action.payload.userLocaton,
            jobLocation: action.payload.jobLocation,
            showAlert: true,
            alertType: "success",
            alertText: action.payload.alertText,
        };
    }
    if (action.type === SETUP_USER_ERROR) {
        // console.log(action);
        return {
            ...state,
            loading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar,
        };
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...state,
            user: null,
            token: null,
            userLocation: "",
            jobLocation: "",
        };
    }

    throw new Error(`no such action :${action.type}`);
};
export default reducer;
