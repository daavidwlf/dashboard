import styles from './CloseButton.module.css'

type Props = {
    func: Function
}

export default function CloseButton({func}:Props){
    return(
        <button
            onclick={()=>func()}
            class={styles.container}
        >
            <i class="fa-regular fa-xmark"></i>
        </button>
    )
}