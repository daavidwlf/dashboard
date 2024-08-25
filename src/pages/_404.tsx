import styles from './_404.module.css'

export default function _404(){
    return(
        <div class={styles.container}>
            <span class={styles._404}>404</span>
            <h1>Seite nicht gefunden!</h1>
        </div>
    )
}