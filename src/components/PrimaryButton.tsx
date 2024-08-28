import styles from './PrimaryButton.module.css'

import loadingAnimation from '../assets/animations/loadingWhite.json'
import LottieAnimation from './LottieAnimation'
import { JSX } from 'solid-js'

type PrimaryButtonProps = {
    text: string
    func: Function
    color?: string
    backgroundColor?:string
    iconLeft?: JSX.Element
    iconRight?: JSX.Element
    cursor?: string
}

export default function PrimaryButton({text, func, color, backgroundColor, iconLeft, iconRight, cursor}:PrimaryButtonProps){

    return(
        <button
            onClick={()=>func()}
            class={styles.button}
            style={"color: " + color + "; background-color: " + backgroundColor + "; cursor: " + cursor}
        >
            {iconLeft}
            {text}
            {iconRight}
        </button>
    )
}