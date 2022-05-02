import React from 'react'
import {NavLink} from "react-router-dom";
import s from "./Header.module.css"
import {PATH} from "../../features/Counter/CounterWithRouting/CounterContainerWithRouting";


function Header() {
    return (
        <header>
            <div className={s.wrapper}>
                <input type="checkbox" id={"checkMenu"} className={s.checkMenu}/>
                <label htmlFor={"checkMenu"} className={s.checkMenuLabel}>counter</label>
                <div className={`${s.burgerLine} ${s.first}`}></div>
                <div className={`${s.burgerLine} ${s.second}`}></div>
                <div className={`${s.burgerLine} ${s.third}`}></div>
                <div className={`${s.burgerLine} ${s.forth}`}></div>
                <nav className={s.mainMenu}>
                    <NavLink to={PATH.FIRST_COUNTER}
                             style={({isActive}) => ({color: isActive ? "gold" : "whitesmoke"})}>
                        First Counter
                    </NavLink>
                    <NavLink to={PATH.COUNTER_WITH_ROUTING}
                             style={({isActive}) => ({color: isActive ? "gold" : "whitesmoke"})}>
                        Counter With Routing
                    </NavLink>
                    <NavLink to={PATH.COUNTER_WITH_REDUX}
                             style={({isActive}) => ({color: isActive ? "gold" : "whitesmoke"})}>
                        Counter With Redux
                    </NavLink>
                </nav>
            </div>

        </header>
    )
}

export default Header
