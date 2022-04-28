import React, {ChangeEvent, useState} from "react";
import styles from "./Counter.module.css"
import SuperInput from "../../components/SuperInput/SuperInput";
import SuperButton from "../../components/SuperButton/SuperButton";

type PropsType = {
    count: number
    error: string | null
    minValue: number
    maxValue: number
    onClickIncrement: () => void
    onClickReset: () => void
    onClickSet: () => void
    onChangeMinValue: (event: ChangeEvent<HTMLInputElement>) => void
    onChangeMaxValue: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Counter = (
    {
        count, minValue, maxValue, error,
        onClickIncrement, onClickSet, onClickReset,
        onChangeMinValue, onChangeMaxValue
    }: PropsType) => {
    return (
        <div className={styles.counterWrap}>
            <div className={styles.container}>

                <div className={styles.counterSettings}>
                    <SuperInput value={maxValue}
                                onChange={onChangeMaxValue}
                                textInsideInput={"Enter max value"}
                                error={error}
                    />
                    <SuperInput value={minValue}
                                onChange={onChangeMinValue}
                                textInsideInput={"Enter min value"}
                                error={error}
                    />
                    <div className={styles.btnWrap}>
                        <SuperButton
                            onClick={onClickSet}
                            disabled={
                                (minValue < 0) ||
                                (maxValue < 0) ||
                                (minValue === maxValue) ||
                                (minValue > maxValue) ||
                                (maxValue < minValue)
                            }
                        >
                            Set
                        </SuperButton>
                    </div>
                </div>


                <div className={styles.counterWindowWrap}>
                    <h3 className={styles.counterWindowTitle}>Enter min & max values & press 'SET'</h3>
                    <div className={styles.counterWindow}>
                        <span className={`${count === maxValue && styles.maxCount}`}>
                            {count || count === 0 ? count : null}
                        </span>
                    </div>
                    <div className={styles.btnWrap}>
                        <SuperButton disabled={count === maxValue} onClick={onClickIncrement}>Increment</SuperButton>
                        <SuperButton disabled={count === 0} onClick={onClickReset}>Reset</SuperButton>
                    </div>
                </div>
            </div>
        </div>
    )
}