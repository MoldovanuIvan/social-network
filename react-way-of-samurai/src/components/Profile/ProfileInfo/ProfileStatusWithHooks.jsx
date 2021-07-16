import React, {useState,useEffect} from 'react';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    return (
        <div>
            {editMode ?

                <input onChange={(e) => {
                    setStatus( e.currentTarget.value)
                }}
                       autoFocus={true} onBlur={deactivateEditMode} type="text" value={status}/>

                : <span onDoubleClick={activateEditMode}>{status}</span>}
        </div>
    )
}


export default ProfileStatusWithHooks;