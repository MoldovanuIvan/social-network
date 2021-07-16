export const getProfile = (state) => {
    return state.profilePage.profile;
}

export const getStatus = (state) => {
    return state.profilePage.status
}

export const getUserId = (state) => {
    return state.auth.id
}

export const getIsAuth = (state) => {
    return state.auth.isAuth
}