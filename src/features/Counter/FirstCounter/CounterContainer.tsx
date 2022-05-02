import React, {ChangeEvent, useEffect, useState} from "react";
import {Counter} from "./Counter";

export const CounterContainer = () => {
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(1)
    const [count, setCount] = useState(minValue)
    //const [error, setError] = useState<string | null>(null)
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
        <Counter
            count={count}
            errorMinValue={errorMinValue}
            errorMaxValue={errorMaxValue}
            minValue={minValue}
            maxValue={maxValue}
            onClickIncrement={onClickIncrement}
            onClickReset={onClickReset}
            onClickSet={onClickSet}
            onChangeMaxValue={onChangeMaxValue}
            onChangeMinValue={onChangeMinValue}
        />
    )
}