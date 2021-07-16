import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return <div className={s.header}>
        <div><img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png'/></div>

        <div className={s.login}>
            { props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </div>
}


export default Header;