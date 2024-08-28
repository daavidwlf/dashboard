import PrimaryButton from '../components/PrimaryButton'
import styles from './ResultPopup.module.css'

type Props = {
    resultMessage: string | null
    setResultMessage: Function
    setRerender: Function
}

export default function ResultPopup({resultMessage, setResultMessage, setRerender}:Props){

    function okay(){
        setResultMessage(null)
        setRerender(Date.now())
    }

    return(
    <div class={styles.container}>
        <div class={styles.panel}>
            <span class={styles.message}>
                { resultMessage !== "succ" ? 
                    <h1>{resultMessage}</h1>
                    :
                    <i style="font-size: 40px; color: var(--primaryBlue)" class="fa-regular fa-circle-check"></i>
                }
            </span>
            <div class={styles.delete}>
                <PrimaryButton
                    text='Okay'
                    func={okay}
                />
            </div>
        </div>
    </div>
    )
}
