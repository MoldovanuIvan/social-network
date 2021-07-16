import {headerAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    email:null,
    login:null,
    id:null,
    isAuth:false
};

const authReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_USER_DATA:{
            return {
                ...state,
                ...action.data,
            }
        }
        default:
            return state;
    }
}

export const setUserData = (id,login,email,isAuth) => ({type:SET_USER_DATA,data:{id,login,email,isAuth}})

export const getAuthUserData = () => (dispatch) => {
        return headerAPI.authorization().then(response => {
            if(response.data.resultCode === 0){
                dispatch(setUserData(response.data.data.id,response.data.data.login,response.data.data.email,true))
            }
        })
    }


export const login = (email,password,rememberMe=false) => (dispatch) => {
    headerAPI.login(email,password,rememberMe)
        .then(response => {
            if(response.data.resultCode===0){
                dispatch(getAuthUserData())
            }else{
                dispatch(stopSubmit("login",{_error:response.data.messages[0]}))
            }
        })
}

export const logout = () => (dispatch) => {
    headerAPI.logout()
        .then(response => {
            if(response.data.resultCode===0){
                dispatch(setUserData(null,null,null,false))
            }
        })
}

export default authReducer;