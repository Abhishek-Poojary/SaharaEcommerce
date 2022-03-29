import axios from "axios"
import {
    REQUEST_FOR_USER_LOGIN,
    REQUEST_FOR_USER_LOGIN_FAIL,
    REQUEST_FOR_USER_LOGIN_SUCCESS,
    REQUEST_TO_REGISTER_USER, REQUEST_TO_REGISTER_USER_FAIL, REQUEST_TO_REGISTER_USER_SUCCESS
}
    from "../constants/UserConstants"


export const userLogin = (email, password) => async (dispatch) => {
    try {
        console.log(email, password)
        dispatch({ type: REQUEST_FOR_USER_LOGIN })

        const { data } = await axios.post(`/api/v1/login`,
            {
                emailId: email,
                password: password
            })



        dispatch({ type: REQUEST_FOR_USER_LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: REQUEST_FOR_USER_LOGIN_FAIL, payload: error.response.data.message })
    }

}


export const userRegister = (userData) => async (dispatch) => {
    try {
        console.log(userData)
        dispatch({ type: REQUEST_TO_REGISTER_USER })

        const { data } = await axios.post(`/api/v1/register`,userData)



        dispatch({ type: REQUEST_TO_REGISTER_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: REQUEST_TO_REGISTER_USER_FAIL, payload: error.response.data.message })
    }

}

