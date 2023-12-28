import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../../Slices/UserSlice";

const UsersStore=configureStore({
    reducer:{
        usersSlice
    }
})
export default UsersStore;