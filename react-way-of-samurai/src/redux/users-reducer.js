import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT='SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING ='TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS ='TOGGLE_FOLLOWING_PROGRESS';


let initialState = {
    users: [ ],
    pageSize: 5,
    totalUsersCount:0,
    currentPage:1,
    isFetching:false,
    followingInProgress:[]
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u =>  {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE:{
            let stateCopy = {...state};
            stateCopy.currentPage = action.page
            return stateCopy
        }
        case SET_TOTAL_USERS_COUNT:{
            let stateCopy = {...state}
            stateCopy.totalUsersCount=action.count
            return stateCopy
        }
        case TOGGLE_IS_FETCHING:{
            let stateCopy={...state}
            stateCopy.isFetching=action.isFetching
            return stateCopy
        }
        case TOGGLE_FOLLOWING_PROGRESS:{
            return {...state,followingInProgress: action.isFetching
                    ? [...state.followingInProgress,action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)}
        }
        default:
            return state;
    }
}


export const follow = (userId) => ({type: FOLLOW, userId })
export const unfollow = (userId) => ({type: UNFOLLOW, userId })
export const setUsers = (users) => ({type: SET_USERS, users })
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page })
export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count })
export const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING,isFetching})
export const toggleFollowProgress = (isFetching,userId) => ({type:TOGGLE_FOLLOWING_PROGRESS,isFetching,userId})

export const getUsersThunkCreator = (currentPage,pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage,pageSize).then(response => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(response.data.items))
            dispatch(setTotalUsersCount(response.data.totalCount))
        })
    }
}

export const followUserThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowProgress(true, userId))
        usersAPI.unfollowUser(userId).then(response => {
            if (response.data.resultCode == 0) {
                dispatch(unfollow(userId))
            }
            dispatch(toggleFollowProgress(false, userId))
        })
    }
}

export const unfollowUserThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowProgress(true, userId))
        usersAPI.followUser(userId).then(response => {
            if (response.data.resultCode == 0) {
                dispatch(follow(userId))
            }
            dispatch(toggleFollowProgress(false, userId))
        })
    }
}

export const changePageThunkCreator = (p,pageSize) => {
    return (dispatch) => {
        dispatch(setCurrentPage(p))
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(p, pageSize).then(respons => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(respons.data.items))
        })
    }
}

export default usersReducer;