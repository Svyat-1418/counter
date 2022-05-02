import React from "react";
import styles from "./Counter.module.css";
import SuperButton from "../../../components/SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {PATH} from "./CounterContainerWithRedux";

type PropsType = {
    count: number
    minValue: number
    maxValue: number
    onClickIncrement: () => void
    onClickReset: () => void
    //onClickSet: () => void
}

export const CounterWindow = (
    {
        count, minValue, maxValue, onClickReset, onClickIncrement
    }: PropsType) => {
    return (
        <div className={styles.counterWindowWrap}>
            <h3 className={styles.counterWindowTitle}>Enter min & max values & press 'SET'</h3>
            <div className={styles.counterWindow}>
                        <span className={`${count === maxValue && styles.maxCount}`}>
                            {count || count === 0 ? count : null}
                        </span>
            </div>
            <div className={styles.btnWrap}>
                <SuperButton disabled={count === maxValue} onClick={onClickIncrement}>Increment</SuperButton>
                <SuperButton disabled={count === minValue} onClick={onClickReset}>Reset</SuperButton>
                <NavLink to={PATH.COUNTER_SETTINGS}>
                    <SuperButton>Set</SuperButton>
                </NavLink>
            </div>
        </div>
    )
}