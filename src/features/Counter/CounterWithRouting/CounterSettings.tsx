import React, {ChangeEvent} from "react";
import styles from "./Counter.module.css";
import SuperInput from "../../../components/SuperInput/SuperInput";
import SuperButton from "../../../components/SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {PATH} from "./CounterContainerWithRouting";

type PropsType = {
    errorMinValue: string | null
    errorMaxValue: string | null
    minValue: number
    maxValue: number
    onClickSet: () => void
    onChangeMinValue: (event: ChangeEvent<HTMLInputElement>) => void
    onChangeMaxValue: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CounterSettings = (
    {
        errorMaxValue, errorMinValue, onChangeMaxValue, onChangeMinValue, maxValue,
        minValue, onClickSet
    }: PropsType) => {
    return (
        <div className={styles.counterSettings}>
            <SuperInput value={maxValue}
                        onChange={onChangeMaxValue}
                        textInsideInput={"Enter max value"}
                        error={errorMaxValue}
            />
            <SuperInput value={minValue}
                        onChange={onChangeMinValue}
                        textInsideInput={"Enter min value"}
                        error={errorMinValue}
            />
            <div className={styles.btnWrap}>
                <NavLink to={PATH.COUNTER_WITH_ROUTING}>
                    <SuperButton
                        onClick={onClickSet}
                        disabled={
                            (minValue < 0) ||
                            (maxValue < 0) ||
                            (minValue === maxValue) ||
                            (minValue > maxValue) ||
                            (maxValue < minValue)
                        }>Set
                    </SuperButton>
                </NavLink>
            </div>
        </div>
    )
}