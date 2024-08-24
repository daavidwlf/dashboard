import { Component, JSX } from "solid-js"
import styles from './TextInput.module.css'

type textInputProps = {
    placeholder? :string
    icon? : JSX.Element
    callback: Function
    onClick?: JSX.EventHandlerUnion<HTMLInputElement, MouseEvent>
    type: string
    value: Function

}

export default function TextInput({placeholder, icon, callback, type , value, onClick}: textInputProps){
    return(
        <div class={styles.container}>
            {icon && 
                <span class={styles.icon}>
                    {icon}
                </span>
            }
            <input
                class={styles.input}
                type={type}
                placeholder={placeholder}
                value={value()}
                onInput={element => callback(element.currentTarget.value)}
                onClick={onClick}
            />
        </div>
    )
}