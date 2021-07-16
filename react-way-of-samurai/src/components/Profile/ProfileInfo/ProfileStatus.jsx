import React from 'react';

class ProfileStatus extends React.Component {

    state = {
        editMode:false,
        status:this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode:true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode:false
        })
        this.props.updateStatus(this.state.status)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status!==this.props.status)
        {
            this.setState({status:this.props.status})
        }
    }

    render() {
        return (
            <div>
                {this.state.editMode?

                    <input onChange={(e)=>{this.setState({status:e.currentTarget.value})}}
                           autoFocus={true} onBlur={this.deactivateEditMode} type="text" value={this.state.status}/>

                    :<span onDoubleClick={this.activateEditMode}>{this.props.status}</span>}
            </div>
        )
    }
}

export default ProfileStatus;