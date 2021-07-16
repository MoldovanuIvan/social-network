import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators";
import {connect} from "react-redux"
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from "../common/FormControls/FormControls.module.css"


const Login = (props) => {

    if (props.isAuth){ return <Redirect to='/profile' />}

    const onSubmit = (formData)=>{
        props.login(formData.email,formData.password,formData.rememberME)

    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}
let maxLength100=maxLengthCreator(100)
const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={"email"} validate={[required,maxLength100]} type={"text"} component={Input}></Field>
        </div>
        <div>
            <Field name={"password"} validate={[required,maxLength100]} type={"password"} component={Input}></Field>
        </div>
        <div>
            <Field name={"rememberMe"} validate={[required,maxLength100]} type={"checkbox"} component={Input}></Field> Remember me
        </div>
        {props.error && <div className={s.errorAllForm}>
            {props.error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}
const LoginReduxForm = reduxForm({form:'login'})(LoginForm)

let mapStateToProps = (state) => {
    return {
        isAuth:state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        login: (email,password,rememberMe) =>{
            dispatch(login(email,password,rememberMe))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)