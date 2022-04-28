import React, {ChangeEvent, useEffect, useState} from "react";
import {Counter} from "./Counter";

export const CounterConteiner = () => {
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(1)
    const [count, setCount] = useState(minValue)
    const [error, setError] = useState<string | null>(null)

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
    const onClickReset = () => setCount(0)

    const onChangeMinValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (+event.currentTarget.value < 0 || +event.currentTarget.value >= maxValue) {
            setError("Min value must be greater then 0 & less then or not equal max value")
        } else if (error !== null) {
            setError(null)
        }
        setMinValue(+event.currentTarget.value)
    }
    const onChangeMaxValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (+event.currentTarget.value === 0 || +event.currentTarget.value <= minValue) {
            setError("Min value must be greater then 0 & greater then or not equal min value")
        } else if (error !== null) {
            setError(null)
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
            error={error}
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