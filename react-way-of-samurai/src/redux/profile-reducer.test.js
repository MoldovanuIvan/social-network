import profileReducer, {addPostActionCreator, deletePostActionCreator} from "./profile-reducer";
import expect from "expect";

it('posts length must be 5',()=>{
    let state = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Blabla', likesCount: 11},
            {id: 4, message: 'Dada', likesCount: 11}
        ]}

    let action=addPostActionCreator('hello')

    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(5)
})

it('posts must be deleted',()=>{
    let state = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Blabla', likesCount: 11},
            {id: 4, message: 'Dada', likesCount: 11}
        ]}

    let action=deletePostActionCreator(2)

    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(3)
})