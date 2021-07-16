import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators";

const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);

    const addMessage = (formData) => {
            props.sendMessage(formData.message)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <DialogsReduxForm onSubmit={addMessage}/>
                </div>
            </div>
        </div>
    )
}

const maxLength100 = maxLengthCreator(100)

const DialogsForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={"message"} validate={[required,maxLength100]} component={Textarea} placeholder='Enter your message'/>
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>
}

let DialogsReduxForm = reduxForm({form:'dialogs'})(DialogsForm)

export default Dialogs;