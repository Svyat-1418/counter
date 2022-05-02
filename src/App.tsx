import React from 'react';
import './App.css';
import {CounterContainerWithRouting} from "./features/Counter/CounterWithRouting/CounterContainerWithRouting";
import Header from "./components/Header/Header";
import {Outlet, Route, Routes} from "react-router-dom";
import {PATH} from "./features/Counter/CounterWithRouting/CounterContainerWithRouting";
import {CounterContainer} from "./features/Counter/FirstCounter/CounterContainer";
import {CounterContainerWithRedux} from "./features/Counter/CounterWithRedux/CounterContainerWithRedux";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<><Header/><Outlet/></>}>
                    <Route index element={<CounterContainer/>}/>
                    <Route path={PATH.FIRST_COUNTER}
                           element={<CounterContainer/>}
                    />
                    <Route path={`${PATH.COUNTER_WITH_ROUTING}/*`}
                           element={<CounterContainerWithRouting/>}
                    />
                    <Route path={`${PATH.COUNTER_WITH_REDUX}/*`}
                           element={<CounterContainerWithRedux/>}
                    />
                    <Route path="*" element={<h1>Not found</h1>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
