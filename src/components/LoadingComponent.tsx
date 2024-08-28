import LottieAnimation from "./LottieAnimation";
import loading from '../assets/animations/loadingGrey.json'

import styles from './LoadingComponent.module.css'

export default function LoadingComponent(){
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