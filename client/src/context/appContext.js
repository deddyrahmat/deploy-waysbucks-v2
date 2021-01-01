import {createContext, useReducer} from 'react';
import Product from '../pages/Product';


export const AppContext = createContext();


const initialState = {
    isLogin : false,
    role : "",
    fullname : "",
    avatar : "",
    previewImage : null,
    email : "",
    isToping : [],//menyimpan data toping setelah memilih produk
    descTopings : [], //menyimpan seluruh data toping untuk produk tertentu
    carts : [],
    totalIncome : 0,
    subTotal : [],
    isLoading : true// cek ketersedian token
}

const reducer = (state, action) => {
    const {payload, type} = action;

    switch (type) {
        case "ADD_TOPING" :

            // jika belum ada toping ini di cart, tambahkan toping kedalam cart
            return {
                ...state,
                isToping : [
                    ...state.isToping,
                    {
                        // ...payload
                        id : payload.id,
                        name : payload.name,
                        price : payload.price
                    }
                ]
            }
        case "CANCEL_TOPING" :

            // jika belum ada toping ini di cart, tambahkan toping kedalam cart
            return {
                ...state,
                isToping : payload
            }
        case "REMOVE_TOPINGS" :
            return {
                ...state,
                isToping : []
            }
        case "ADD_CART" :
            return {
                ...state,
                carts : [
                    ...state.carts,
                    {
                        id : payload[0],
                        amount : 1,
                        topings : {...state.isToping}
                    }
                ]
            }
        case "REMOVE_CART":
            console.log("hasil remove"+payload);
            return {
                ...state,
                carts: state.carts.filter(
                (product) => product.id !== payload
                ),
            };
        case "RESET_CARTS" :
            return {
                ...state,
                carts : []
            }
        case "SUB_TOTAL" :
            return{
                ...state,
                subTotal : [
                    ...state.subTotal,
                    payload
                ]

            }
        case "INCOME" :
            return{
                ...state,
                totalIncome : payload

            }
        case "IMG_PREVIEW" :
            return {
                ...state,
                previewImage : payload
            }

        case "USER_LOADED":
        return {
            ...state,
            isToping : [],
            isLogin: true,
            isLoading: false,
            previewImage : null,
            role : payload.role,
            avatar : payload.avatar,
            fullname : payload.fullname,
            email : payload.email
        };
        case "LOGIN":
            // membuat token di localstorage
            localStorage.setItem("token", payload.token);

            return {
                ...state,
                isLogin : true,
                role : payload.role,
                fullname : payload.fullname,
                avatar : payload.avatar,
                email : payload.email
            }
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                isLogin : false,
                isLoading: false
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
