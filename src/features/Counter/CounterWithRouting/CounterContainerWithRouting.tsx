import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./Counter.module.css";
import {CounterSettings} from "./CounterSettings";
import {CounterWindow} from "./CounterWindow";
import { Route, Routes} from "react-router-dom";

export const PATH = {
    COUNTER_SETTINGS: 'counter-settings',
    COUNTER_WINDOW: 'counter-window',

    FIRST_COUNTER: '/first-counter',
    COUNTER_WITH_ROUTING: '/counter-with-routing',
    COUNTER_WITH_REDUX: '/counter-with-redux',
}

export const CounterContainerWithRouting = () => {
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(1)
    const [count, setCount] = useState(minValue)
    const [errorMinValue, setErrorMinValue] = useState<string | null>(null)
    const [errorMaxValue, setErrorMaxValue] = useState<string | null>(null)

    useEffect(() => {
        const minValue = localStorage.getItem('minValue')
        const maxValue = localStorage.getItem('maxValue')
        const count = localStorage.getItem('count')
        if (minValue && maxValue && count) {
            setMinValue(+minValue)
            setMaxValue(+maxValue)
            setCount(+count)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('count', JSON.stringify(count))
    }, [count])

    const onClickIncrement = () => setCount(count + 1)
    const onClickReset = () => setCount(minValue)

    const onChangeMinValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (+event.currentTarget.value < 0 || +event.currentTarget.value >= maxValue) {
            setErrorMinValue("Min value must be greater than 0 & less than or not equal max value")
        } else if (errorMinValue !== null) {
            setErrorMinValue(null)
        }
        setMinValue(+event.currentTarget.value)
    }
    const onChangeMaxValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (+event.currentTarget.value === 0 || +event.currentTarget.value <= minValue) {
            setErrorMaxValue("Min value must be greater than 0 & greater than or not equal min value")
        } else if (errorMaxValue !== null) {
            setErrorMaxValue(null)
        }
        setMaxValue(+event.currentTarget.value)
    }
    const onClickSet = () => {
        if ((maxValue && minValue) || (minValue === 0)) {
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