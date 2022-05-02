import {combineReducers, compose, createStore} from "redux";
import {counterReducer} from "./counterReducer";
import {loadStateFromLocalStorage, saveToLocalStorage} from "../../../utils/localStorageUtil";

const rootReducer = combineReducers({
    counter: counterReducer
})

export const store = createStore(rootReducer, loadStateFromLocalStorage("appState"))

store.subscribe(() => {
    saveToLocalStorage("appState", store.getState())
})
export type AppStateType = ReturnType<typeof rootReducer>





// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


//* DEVTOOLS///
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
