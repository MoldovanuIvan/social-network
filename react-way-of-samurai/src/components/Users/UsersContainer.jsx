import React from 'react';
import {connect} from "react-redux";
import {
    changePageThunkCreator,
     followUserThunkCreator, getUsersThunkCreator,
     unfollowUserThunkCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux"


class UsersC extends React.Component {

    componentDidMount() {
            this.props.getUsersThunkCreator(this.props.currentPage,this.props.pageSize)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users users={this.props.users}
                   pageSize={this.props.pageSize}
                   totalUsersCount={this.props.totalUsersCount}
                   currentPage={this.props.currentPage}
                   toggleIsFetching={this.props.toggleIsFetching}
                   followingInProgress={this.props.followingInProgress}
                   followUserThunkCreator={this.props.followUserThunkCreator}
                   unfollowUserThunkCreator={this.props.unfollowUserThunkCreator}
                   changePageThunkCreator={this.props.changePageThunkCreator}
            />
        </>

    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress:state.usersPage.followingInProgress
    }
}


export default compose(connect(mapStateToProps,  { changePageThunkCreator, getUsersThunkCreator, followUserThunkCreator, unfollowUserThunkCreator }),withAuthRedirect)(UsersC)