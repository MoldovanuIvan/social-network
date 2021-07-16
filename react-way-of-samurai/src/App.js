import React from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import {Route, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect} from "react-redux";
import {initialize} from "./redux/app-reducer"
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {

    componentDidMount() {
        this.props.initialized()
    }

    render() {

        if(!this.props.initialize){
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                           render={() => <DialogsContainer/>}/>

                    <Route path='/profile/:userId?'
                           render={() => <ProfileContainer/>}/>

                    <Route path='/users'
                           render={() => <UsersContainer/>}/>

                    <Route path='/login'
                           render={() => <Login/>}/>


                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        initialize:state.app.initialized
    }
}

let mapDispatchToProps=(dispatch)=>{
    return {
        initialized:()=>{
            dispatch(initialize())
        }
    }
}

export default compose(withRouter,connect(mapStateToProps,mapDispatchToProps))(App);