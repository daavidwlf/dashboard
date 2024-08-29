import { createEffect, createSignal } from 'solid-js'
import DockerContainer from '../components/DockerContainer'
import styles from './ServerTab.module.css'
import API from '../data/API'
import { DockerContainerType } from '../data/Types'

export default function ServerTap(){

    const [containers, setContainers] = createSignal<DockerContainerType[]>()
    const [refresh, setRefresh] = createSignal(0)
    const [reloadAnimation, setReloadAnimation] = createSignal(false)

    const container: DockerContainerType[] = []

    createEffect(()=>{
        refresh()
        API.GET("/docker/containers", setContainers, null, null)
    })

    const animateReload = () =>{
        setReloadAnimation(true)
        setTimeout(() => setReloadAnimation(false), 500);
    }


    return(
        <div class={styles.container}>
            <div class={styles.top}>
                <h2>Server</h2>
                <span class={styles.topRight}>
                    <button
                        class={styles.reload}
                        onClick={() => {
                            setRefresh(Date.now());
                            animateReload();
                        }}
                    >
                        <span class={reloadAnimation() ? styles.spinning : ""}>
                            <i class="fa-regular fa-rotate-right"></i>
                        </span>
                    </button>
                </span>
            </div>
            <div class={styles.docker}>
                <div class={styles.dockerTop}>
                    <span class={styles.dockerIcon}>
                        <i class="fa-brands fa-docker"></i>
                    </span>
                    <h3>Docker</h3>
                </div>
                <span class={styles.dockerContainer}>
                    {
                        containers()?.map((item:DockerContainerType, index:number)=>{
                            return <DockerContainer item={item} index={index}/>
                        })
                    }
                </span>
            </div>
        </div>
    )
}