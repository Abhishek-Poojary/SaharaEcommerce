import {
    REQUEST_FOR_USER_LOGIN,
    REQUEST_FOR_USER_LOGIN_FAIL,
    REQUEST_FOR_USER_LOGIN_SUCCESS,
    REQUEST_TO_REGISTER_USER, REQUEST_TO_REGISTER_USER_FAIL, REQUEST_TO_REGISTER_USER_SUCCESS,
    REQUEST_TO_LOAD_USER, REQUEST_TO_LOAD_USER_FAIL, REQUEST_TO_LOAD_USER_SUCCESS,
    REQUEST_TO_LOGOUT_USER_FAIL, REQUEST_TO_LOGOUT_USER_SUCCESS,
    REQUEST_TO_RESET_PROFILE,
    REQUEST_TO_UPDATE_USER_PROFILE, REQUEST_TO_UPDATE_USER_PROFILE_FAIL, REQUEST_TO_UPDATE_USER_PROFILE_SUCCESS,
    REQUEST_TO_UPDATE_USER_PASSWORD, REQUEST_TO_UPDATE_USER_PASSWORD_FAIL, REQUEST_TO_UPDATE_USER_PASSWORD_SUCCESS,
    REQUEST_ALL_USER_ADMIN, REQUEST_ALL_USER_ADMIN_FAIL, REQUEST_ALL_USER_ADMIN_SUCCESS,
    REQUEST_USER_ADMIN, REQUEST_USER_ADMIN_FAIL, REQUEST_USER_ADMIN_SUCCESS,
    REQUEST_USER_ROLE_UPDATE_ADMIN, REQUEST_USER_ROLE_UPDATE_ADMIN_FAIL, REQUEST_USER_ROLE_UPDATE_ADMIN_SUCCESS,
    REQUEST_USER_ROLE_UPDATE_ADMIN_RESET,
    REQUEST_REMOVE_USER_ADMIN,
    REQUEST_REMOVE_USER_ADMIN_FAIL,
    REQUEST_REMOVE_USER_ADMIN_SUCCESS,
    REQUEST_REMOVE_USER_ADMIN_RESET
}
    from "../constants/UserConstants"

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_TO_LOAD_USER:
        case REQUEST_TO_REGISTER_USER:
        case REQUEST_FOR_USER_LOGIN:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case REQUEST_TO_LOAD_USER_FAIL:
        case REQUEST_TO_REGISTER_USER_FAIL:
        case REQUEST_FOR_USER_LOGIN_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case REQUEST_TO_LOAD_USER_SUCCESS:
        case REQUEST_TO_REGISTER_USER_SUCCESS:
        case REQUEST_FOR_USER_LOGIN_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case REQUEST_TO_LOGOUT_USER_FAIL:
            return {
                loading: false,
                ...state,
                error: action.payload,
            }

        case REQUEST_TO_LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }
        default: return state;
    }
}


export const updateUserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_TO_UPDATE_USER_PASSWORD:
        case REQUEST_TO_UPDATE_USER_PROFILE:
            return {
                ...state,
                loading: true

            }
        case REQUEST_TO_UPDATE_USER_PASSWORD_FAIL:
        case REQUEST_TO_UPDATE_USER_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case REQUEST_TO_UPDATE_USER_PASSWORD_SUCCESS:
        case REQUEST_TO_UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                updateStatus: action.payload
            }
        case REQUEST_TO_RESET_PROFILE:
            return {
                ...state,
                updateStatus: false
            }
        default: return state;

    }
}


export const allUsersAdminReducer = (state = {}, action) => {
    switch (action.type) {

        case REQUEST_ALL_USER_ADMIN:
            return {
                loading: true

            }

        case REQUEST_ALL_USER_ADMIN_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case REQUEST_ALL_USER_ADMIN_SUCCESS:
            return {
                loading: false,
                users: action.payload.users
            }

        default: return state;

    }
}



export const userAdminReducer = (state = { selected: {}, roleUpdate: {} , deleteUser:{}}, action) => {
    switch (action.type) {
        case REQUEST_REMOVE_USER_ADMIN:
            return {
                ...state,
                deleteUser: {
                 
                    loading: true
                }
            }
        case REQUEST_REMOVE_USER_ADMIN_FAIL:
            return {
                ...state,
                deleteUser: {
                    loading: false,
                    error: action.payload,
                }
            }


        case REQUEST_REMOVE_USER_ADMIN_SUCCESS:
            return {
                ...state,
                deleteUser: {
                    loading: false,
                    status: action.payload.success
                }
            }

        case REQUEST_REMOVE_USER_ADMIN_RESET:
            return {
                ...state,
                deleteUser: {
                    status: false
                }
            }


        case REQUEST_USER_ROLE_UPDATE_ADMIN_FAIL:
            return {
                ...state,
                roleUpdate: {
                    loading: false,
                    error: action.payload,
                }
            }


        case REQUEST_USER_ROLE_UPDATE_ADMIN_SUCCESS:
            return {
                ...state,
                roleUpdate: {
                    loading: false,
                    status: action.payload.success
                }
            }

        case REQUEST_USER_ROLE_UPDATE_ADMIN_RESET:
            return {
                ...state,
                roleUpdate: {
                    status: false
                }
            }
        case REQUEST_USER_ROLE_UPDATE_ADMIN:
            return {
                ...state,
                roleUpdate: {
                 
                    loading: true
                }


            }
        case REQUEST_USER_ADMIN:
            return {
                ...state,
                selected: {
                 
                    loading: true
                }


            }
        case REQUEST_USER_ADMIN_FAIL:
            return {
                ...state,
                selected: {
                    loading: false,
                    error: action.payload,
                }

            }


        case REQUEST_USER_ADMIN_SUCCESS:
            return {
                ...state,
                selected: {
                    loading: false,
                    user: action.payload.user
                }
            }

        default: return state;

    }
}



