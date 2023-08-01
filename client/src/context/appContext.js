import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
} from "./actions";
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");
const user = localStorage.getItem("user");

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || "",
    jobLocation: "",
    showSidebar: false,
    isEditing: false,
    editJobId: "",
    position: "",
    company: "",
    // jobLocation
    jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
    jobType: "full-time",
    statusOptions: ["pending", "interview", "declined"],
    status: "pending",
};
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //Axios instance
    const authFetch = axios.create({
        baseURL: "/api/v1",
    });

    // request interceptor
    authFetch.interceptors.request.use(
        (config) => {
            config.headers["Authorization"] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // response interceptor
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error);
        }
    );

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    };
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            });
        }, 2500);
    };

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        localStorage.setItem("location", location);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("location");
    };

    // const registerUser = async (currentUser) => {
    //     dispatch({ type: REGISTER_USER_BEGIN });
    //     try {
    //         const response = await axios.post(
    //             "/api/v1/auth/register",
    //             currentUser
    //         );
    //         // console.log(response);
    //         const { user, token, location } = response.data;
    //         dispatch({
    //             type: REGISTER_USER_SUCCESS,
    //             payload: {
    //                 user,
    //                 token,
    //                 location,
    //             },
    //         });

    //         addUserToLocalStorage({
    //             user,
    //             token,
    //             location,
    //         });
    //     } catch (error) {
    //         // console.log(error);
    //         // console.log(error.response);
    //         dispatch({
    //             type: REGISTER_USER_ERROR,
    //             payload: { msg: error.response.data.error },
    //         });
    //     }
    //     clearAlert();
    // };

    // const loginUser = async (currentUser) => {
    //     console.log(currentUser);
    //     dispatch({ type: LOGIN_USER_BEGIN });
    //     try {
    //         const response = await axios.post(
    //             "/api/v1/auth/login",
    //             currentUser
    //         );
    //         // console.log(response);
    //         const { user, token, location } = response.data;
    //         dispatch({
    //             type: LOGIN_USER_SUCCESS,
    //             payload: {
    //                 user,
    //                 token,
    //                 location,
    //             },
    //         });

    //         addUserToLocalStorage({
    //             user,
    //             token,
    //             location,
    //         });
    //     } catch (error) {
    //         // console.log(error);
    //         // console.log(error.response);
    //         dispatch({
    //             type: LOGIN_USER_ERROR,
    //             payload: { msg: error.response.data.error },
    //         });
    //     }
    //     clearAlert();
    // };

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        console.log(currentUser);
        dispatch({ type: SETUP_USER_BEGIN });
        try {
            const { data } = await axios.post(
                `/api/v1/auth/${endPoint}`,
                currentUser
            );
            console.log(data);
            const { user, token, location } = data;
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: {
                    user,
                    token,
                    location,
                    alertText,
                },
            });

            addUserToLocalStorage({
                user,
                token,
                location,
            });
        } catch (error) {
            // console.log(error);
            // console.log(error.response);
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.error },
            });
        }
        clearAlert();
    };

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    };

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
            const { data } = await authFetch.patch(
                "/auth/updateUser",
                currentUser
            );
            // console.log(data);
            // no token
            const { user, location, token } = data;
            // console.log(user, location);
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location, token },
            });

            addUserToLocalStorage({
                user,
                location,
                token,
            });
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg },
                });
            }
        }
        clearAlert();
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                clearAlert,
                setupUser,
                toggleSidebar,
                logoutUser,
                updateUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
