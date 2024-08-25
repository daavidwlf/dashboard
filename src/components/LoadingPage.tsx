import LottieAnimation from "./LottieAnimation";
import loading from '../assets/animations/loadingGrey.json'

import styles from './LoadingPage.module.css'

export default function LoadingPage(){
    return(
        <div class={styles.container}>
            <LottieAnimation
                animationData={loading}
                loop={true}
                autoplay={true}
                class={styles.loading}
            />
        </div>
    )
}