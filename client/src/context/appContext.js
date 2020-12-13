import {createContext, useReducer} from 'react';

import dataUsers  from "../config/FakeData/users.json";

export const AppContext = createContext();


const initialState = {
    ...dataUsers,
    isLogin : false,
    user : {},
    role : "",
    carts : [],
    isLoading : true// cek ketersedian token
}

const reducer = (state, action) => {
    const {payload, type} = action;

    switch (type) {
        case "USER_LOADED":
        return {
            ...state,
            isLogin: true,
            isLoading: false,
            role : payload.role
        };
        case "LOGIN":
            // membuat token di localstorage
            localStorage.setItem("token", payload.token);

            return {
                ...state,
                isLogin : true,
                role : payload.role
            }
        case "AUTH_ERROR":
        case "LOGOUT":
            return {
                ...state,
                isLogin : false
            }    
        default:
            throw new Error();
    }
}


export const AppContextProvider = (props) => {

    // state = inital state
    // dispatch  = reducer

    const [state, dispatch] = useReducer(reducer, initialState);
    

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>

    )
}
