import axios from "axios"
import {
    REQUEST_FOR_USER_LOGIN,
    REQUEST_FOR_USER_LOGIN_FAIL,
    REQUEST_FOR_USER_LOGIN_SUCCESS,
    REQUEST_TO_REGISTER_USER, REQUEST_TO_REGISTER_USER_FAIL, REQUEST_TO_REGISTER_USER_SUCCESS,
    REQUEST_TO_LOAD_USER, REQUEST_TO_LOAD_USER_FAIL, REQUEST_TO_LOAD_USER_SUCCESS,
    REQUEST_TO_LOGOUT_USER_FAIL,REQUEST_TO_LOGOUT_USER_SUCCESS,
    REQUEST_TO_UPDATE_USER_PROFILE, REQUEST_TO_UPDATE_USER_PROFILE_FAIL, REQUEST_TO_UPDATE_USER_PROFILE_SUCCESS,
    REQUEST_TO_UPDATE_USER_PASSWORD, REQUEST_TO_UPDATE_USER_PASSWORD_FAIL, REQUEST_TO_UPDATE_USER_PASSWORD_SUCCESS,
    REQUEST_ALL_USER_ADMIN,REQUEST_ALL_USER_ADMIN_FAIL,REQUEST_ALL_USER_ADMIN_SUCCESS,
    REQUEST_USER_ADMIN,REQUEST_USER_ADMIN_FAIL,REQUEST_USER_ADMIN_SUCCESS,
    REQUEST_USER_ROLE_UPDATE_ADMIN,REQUEST_USER_ROLE_UPDATE_ADMIN_FAIL,REQUEST_USER_ROLE_UPDATE_ADMIN_SUCCESS,
    REQUEST_REMOVE_USER_ADMIN,REQUEST_REMOVE_USER_ADMIN_FAIL,REQUEST_REMOVE_USER_ADMIN_SUCCESS
}
    from "../constants/UserConstants"


export const userLogin = (email, password) => async (dispatch) => {
    try {

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

        dispatch({ type: REQUEST_TO_REGISTER_USER })

        const { data } = await axios.post(`/api/v1/register`, userData)



        dispatch({ type: REQUEST_TO_REGISTER_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: REQUEST_TO_REGISTER_USER_FAIL, payload: error.response.data.message })
    }

}

export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: REQUEST_TO_LOAD_USER })

        const { data } = await axios.get("/api/v1/profile/view")



        dispatch({ type: REQUEST_TO_LOAD_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: REQUEST_TO_LOAD_USER_FAIL, payload: error.response.data.message })
    }
}

export const logoutUser=()=>async(dispatch)=>{
    try{

       await axios.get("/api/v1/logout")

       dispatch({type:REQUEST_TO_LOGOUT_USER_SUCCESS})

       localStorage.removeItem("shippingInfo");
    }catch(error){
        dispatch({type:REQUEST_TO_LOGOUT_USER_FAIL,payload:error.response.data.message})
    }
}


export const userProfileUpdate = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REQUEST_TO_UPDATE_USER_PROFILE })

        const { data } = await axios.put(`/api/v1/profile/update`, userData)



        dispatch({ type: REQUEST_TO_UPDATE_USER_PROFILE_SUCCESS, payload: data.success})
    } catch (error) {
        dispatch({ type: REQUEST_TO_UPDATE_USER_PROFILE_FAIL, payload: error.response.data.message })
    }

}


export const userPasswordUpdate =(userData)=>async(dispatch)=>{
    try{
        dispatch({ type: REQUEST_TO_UPDATE_USER_PASSWORD })

        const { data } = await axios.put(`/api/v1/password/update`, userData)



        dispatch({ type: REQUEST_TO_UPDATE_USER_PASSWORD_SUCCESS, payload: data.success})
    }catch(error){
        dispatch({ type: REQUEST_TO_UPDATE_USER_PASSWORD_FAIL, payload: error.response.data.message })
    }
}


export const getAllUsersAdmin =()=>async (dispatch)=>{
    try{
        dispatch({type:REQUEST_ALL_USER_ADMIN})

        const {data} =await axios.get("/api/v1/admin/users/all")

        dispatch({type:REQUEST_ALL_USER_ADMIN_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:REQUEST_ALL_USER_ADMIN_FAIL,payload:error.response.data.message})
    }
}

export const getUserDetailsAdmin =(id)=>async (dispatch)=>{
    try{
        dispatch({type:REQUEST_USER_ADMIN})

        const {data} =await axios.get(`/api/v1/admin/users/${id}`)

        dispatch({type:REQUEST_USER_ADMIN_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:REQUEST_USER_ADMIN_FAIL,payload:error.response.data.message})
    }
}


export const updateUserRoleAdmin =(id,udata) =>async(dispatch)=>{
    try{
        dispatch({type:REQUEST_USER_ROLE_UPDATE_ADMIN})

        const {data} =await axios.put(`/api/v1/admin/users/${id}`,udata)

        dispatch({type:REQUEST_USER_ROLE_UPDATE_ADMIN_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:REQUEST_USER_ROLE_UPDATE_ADMIN_FAIL,payload:error.response.data.message})
    }
}

export const deleteUserAdmin =(id) =>async(dispatch)=>{
    try{
        dispatch({type:REQUEST_REMOVE_USER_ADMIN})

        const {data} =await axios.delete(`/api/v1/admin/users/${id}`)

        dispatch({type:REQUEST_REMOVE_USER_ADMIN_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:REQUEST_REMOVE_USER_ADMIN_FAIL,payload:error.response.data.message})
    }
}






