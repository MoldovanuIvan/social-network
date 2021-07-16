import * as axios from "axios";

let instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "29f2495b-8a5e-49c6-83ec-91795010dcb0"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const usersAPI = {
    getUsers (currentPage,pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    unfollowUser (id) {
        return instance.delete(`follow/${id}`)
    },
    followUser (id) {
        return instance.post(`follow/${id}`)
    }
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get('profile/'+userId,)
    },
    getStatus (userId) {
        return instance.get(`profile/status/`+userId)
    },
    updateStatus (status) {
        return instance.put(`profile/status`,{status:status})
    }
}

export const headerAPI = {
    authorization () {
        return instance.get('auth/me')
    },
    login (email,password,rememberME){
        return instance.post('auth/login',{email,password,rememberME})
    },
    logout(){
        return instance.delete('auth/login')
    }
}