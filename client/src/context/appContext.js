import {createContext, useReducer} from 'react';
import Product from '../pages/Product';


export const AppContext = createContext();


const initialState = {
    isLogin : false,
    role : "",
    fullname : "",
    email : "",
    isToping : [],
    carts : [],
    isLoading : true// cek ketersedian token
}

const reducer = (state, action) => {
    const {payload, type} = action;

    switch (type) {
        case "ADD_TOPING" :

            // cek apakah toping ini sudah dibeli
            // const filterToping = state.carts.filter(toping => toping.id === action.payload.id);

            // jika sudah ada di cart, maka tambaha qty nya saja
            // if (filterToping.length > 0) {
            //     return {
            //     ...state,
            //     carts: state.carts.map((toping) =>
            //         toping.id === action.payload.id
            //         ? {
            //             ...toping,
            //             qty: toping.qty + 1,
            //             }
            //         : toping
            //     ),
            //     };
            // }

            // jika belum ada toping ini di cart, tambahkan toping kedalam cart
            return {
                ...state,
                isToping : [
                    ...state.isToping,
                    {
                        // ...payload
                        id : payload.id
                    }
                ]
            }
        case "REMOVE_TOPINGS" :
            return {
                ...state,
                isToping : []
            }
        case "ADD_CART" :

            // cek apakah toping ini sudah dibeli
            // const filterProduct = state.carts.filter(product => product.id === action.payload.id);

            // jika sudah ada di cart, maka tambaha qty nya saja
            // if (filterProduct.length > 0) {
            //     return {
            //     ...state,
            //     carts: state.carts.map((product) =>
            //         product.id === action.payload.id
            //         ? {
            //             ...product,
            //             qty: product.qty + 1,
            //             }
            //         : product
            //     ),
            //     };
            // }

            // jika belum ada product ini di cart, tambahkan product kedalam cart
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
        case "USER_LOADED":
        return {
            ...state,
            isLogin: true,
            isLoading: false,
            role : payload.role,
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
