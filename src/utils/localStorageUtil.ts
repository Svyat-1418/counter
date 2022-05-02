export const loadStateFromLocalStorage = (key: string) => {
    const serializeState = localStorage.getItem(key)
    if (serializeState) {
        return JSON.parse(serializeState)
    } else return undefined
}

export const saveToLocalStorage = (key: string, state: any) => {
    localStorage.setItem(key, JSON.stringify(state))
}