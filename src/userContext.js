import React, { useMemo, useReducer } from "react";
const userReducer =(state,action) => {
    switch(action.type){
        case 'SET_USER':
            return {...state,user:action.payload}
        default:
            return state;

    }
}

const initialState = {
    user:{ }
}

export const UserContext = React.createContext({state:initialState});

export const UserProvider  = ({children}) => {
    const [ state, dispatch] = useReducer(userReducer,initialState);

    const contextValue = useMemo(()=>({state,dispatch}),[state])
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )

}