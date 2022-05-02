import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./Counter.module.css";
import {CounterSettings} from "./CounterSettings";
import {CounterWindow} from "./CounterWindow";
import { Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../bll/store";
import {setCount, setErrorMaxValue, setErrorMinValue, setMaxValue, setMinValue} from "../bll/counterReducer";
import {saveToLocalStorage} from "../../../utils/localStorageUtil";

export const PATH = {
    COUNTER_SETTINGS: 'counter-settings',
    COUNTER_WINDOW: 'counter-window',

    FIRST_COUNTER: '/first-counter',
    COUNTER_WITH_ROUTING: '/counter-with-routing',
    COUNTER_WITH_REDUX: '/counter-with-redux',
}

export const CounterContainerWithRedux = () => {
    const dispatch = useDispatch()
    const minValue = useSelector<AppStateType, number>(state => state.counter.minValue)
    const maxValue = useSelector<AppStateType, number>(state => state.counter.maxValue)
    const count = useSelector<AppStateType, number>(state => state.counter.count)
    const errorMinValue = useSelector<AppStateType, string | null>(state => state.counter.errorMinValue)
    const errorMaxValue = useSelector<AppStateType, string | null>(state => state.counter.errorMaxValue)

    const onClickIncrement = () => dispatch(setCount(count + 1))
    const onClickReset = () => dispatch(setCount(minValue))

    const onChangeMinValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (+event.currentTarget.value < 0 || +event.currentTarget.value >= maxValue) {
            dispatch(setErrorMinValue("Min value must be greater than 0 & less than or not equal max value"))
        } else if (errorMinValue !== null) {
            dispatch(setErrorMinValue(null))
        }else dispatch(setMinValue(+event.currentTarget.value))
    }
    const onChangeMaxValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (+event.currentTarget.value === 0 || +event.currentTarget.value <= minValue) {
            dispatch(setErrorMaxValue("Max value must be greater than 0 & greater than or not equal min value"))
        } else if (errorMaxValue !== null) {
            dispatch(setErrorMaxValue(null))
        }else dispatch(setMaxValue(+event.currentTarget.value))
    }
    const onClickSet = () => {
        if ((maxValue && minValue) || (minValue === 0)) {
            saveToLocalStorage("minValue", minValue)
            saveToLocalStorage("maxValue", maxValue)
            dispatch(setCount(count))

            localStorage.setItem('minValue', JSON.stringify(minValue))
            localStorage.setItem('maxValue', JSON.stringify(maxValue))
            setCount(minValue)
        }
    }

    return (
        <div className={styles.counterWrap}>
            <div className={styles.container}>
                <Routes>
                    <Route index element={<CounterWindow
                        count={count}
                        minValue={minValue}
                        maxValue={maxValue}
                        onClickIncrement={onClickIncrement}
                        onClickReset={onClickReset}
                    />}/>
                    <Route path={PATH.COUNTER_SETTINGS}
                           element={<CounterSettings
                               errorMinValue={errorMinValue}
                               errorMaxValue={errorMaxValue}
                               minValue={minValue}
                               maxValue={maxValue}
                               onChangeMinValue={onChangeMinValue}
                               onChangeMaxValue={onChangeMaxValue}
                               onClickSet={onClickSet}
                           />}/>
                    <Route path="*" element={<h1>Not found</h1>}/>
                </Routes>
            </div>
        </div>
    )
}