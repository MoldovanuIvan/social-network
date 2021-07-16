import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../common/FormControls/FormControls";

let maxLength30=maxLengthCreator(30)
const MyPosts = (props) => {
    let postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    const addPost = (formData) => {
        props.addPost(formData.postText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <MyPostsReduxForm onSubmit={addPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

const MyPostsForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field validate={[required,maxLength30]} name={"postText"} component={Textarea}/>
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

const MyPostsReduxForm = reduxForm({form: 'MyPosts'})(MyPostsForm)

export default MyPosts;