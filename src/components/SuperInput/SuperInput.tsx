import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './SuperInput.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string | null
    spanClassName?: string
    textInsideInput?: string
    value: number
}

const SuperInput: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        textInsideInput,
        value,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''} ${s.text}`
    const finalInputClassName = `${error ? s.errorInput : s.superInput} ${className}` // need to fix with (?:) and s.superInput

    return (
        <div className={s.container}>


            <div className={s.inputBox}>
                <input
                    required
                    type={'number'}
                    value={value}
                    onChange={onChangeCallback}
                    className={finalInputClassName}

                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
                {error ? <span className={finalSpanClassName}>{error}</span> :
                    <span className={s.text}>{textInsideInput}</span>}
                <span className={s.line}> </span>
            </div>
        </div>


    )
}

export default SuperInput
