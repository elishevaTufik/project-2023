import { combineReducers } from "redux";
import TodosStore from "./TodosReducer";
import PostsStore from "./PostsReducer";
import usersStore from "./UsersReducer"

const reducers= combineReducers({
    todo:TodosStore,
    post:PostsStore,
    user:usersStore
})

export default reducers