import React, { createContext, useReducer } from "react"
import Reducer from './Reducer'
import socketio from "socket.io-client"

const socket = socketio.connect(window.location.hostname)

const initialState = {
    isLoggedIn: false,
    role: null,
    userId: null,
    isDemoUser: false,
    snackbarIsOpen: false,
    snackbarText: '',
    snackbarSeverity: '',
}

const Store = ({ children }) => {
    const [store, dispatch] = useReducer(Reducer, initialState)
    return (
        <SocketContext.Provider value={socket}>
            <Context.Provider value={[store, dispatch]}>
                {children}
            </Context.Provider>
        </SocketContext.Provider>
    )
}

export const Context = createContext()
export const SocketContext = createContext()
export default Store