import React from 'react';
import Profile from "./Profile"
import {connect} from "react-redux"
import {
    getProfileThunkCreator,
    getStatusThunkCreator,
    setUserProfile,
    updateStatusThunkCreator
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom"
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getIsAuth, getProfile, getStatus, getUserId} from "../../redux/profile-selectors";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
                userId = this.props.userId
        }
        this.props.getProfileThunkCreator(userId)
        this.props.getStatusThunkCreator(userId)
    }

    render() {

        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatusThunkCreator}/>

    }
}

let mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        userId: getUserId(state),
        isAuth: getIsAuth(state)
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setUserProfile: (profile) => {
            dispatch(setUserProfile(profile));
        },
        getProfileThunkCreator: (userId) => {
            dispatch(getProfileThunkCreator(userId))
        },
        getStatusThunkCreator: (userId) => {
            dispatch(getStatusThunkCreator(userId))
        },
        updateStatusThunkCreator:(status) =>{
            dispatch(updateStatusThunkCreator(status))
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter, withAuthRedirect)(ProfileContainer)