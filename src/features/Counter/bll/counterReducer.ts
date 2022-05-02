const initialState = {
    minValue: 0,
    maxValue: 0,
    count: 0,
    errorMinValue: null as string | null,
    errorMaxValue: null as string | null
}

export const counterReducer =
    (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_MIN_VALUE":
            return {...state, minValue: action.minValue}
        case "SET_MAX_VALUE":
            return {...state, maxValue: action.maxValue}
        case "SET_COUNT":
            return {...state, count: action.count}
        case "SET_ERROR_MIN_VALUE":
            return {...state, errorMinValue: action.errorMinValue}
        case "SET_ERROR_MAX_VALUE":
            return {...state, errorMaxValue: action.errorMaxValue}
        default:
            return state
    }
}

export const setMinValue = (minValue: number) => ({type: "SET_MIN_VALUE", minValue} as const)
export const setMaxValue = (maxValue: number) => ({type: "SET_MAX_VALUE", maxValue} as const)
export const setCount = (count: number) => ({type: "SET_COUNT", count} as const)
export const setErrorMinValue = (errorMinValue: string | null) =>
    ({type: "SET_ERROR_MIN_VALUE", errorMinValue} as const)
export const setErrorMaxValue = (errorMaxValue: string | null) =>
    ({type: "SET_ERROR_MAX_VALUE", errorMaxValue} as const)

type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setMinValue>
    | ReturnType<typeof setMaxValue>
    | ReturnType<typeof setCount>
    | ReturnType<typeof setErrorMinValue>
    | ReturnType<typeof setErrorMaxValue>