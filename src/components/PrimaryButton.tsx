import styles from './PrimaryButton.module.css'

import loadingAnimation from '../assets/animations/loadingWhite.json'
import LottieAnimation from './LottieAnimation'

type PrimaryButtonProps = {
    text: string
    func: Function
}

export default function PrimaryButton({text, func}:PrimaryButtonProps){

    return(
        <button
            onClick={()=>func()}
            class={styles.button}
        >
            {text}
        </button>
    )
}