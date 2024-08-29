import { createEffect, createSelector, createSignal } from 'solid-js'
import { DockerContainerType } from '../data/Types'
import styles from './DockerContainer.module.css'

type Props = {
    item: DockerContainerType
    index: number
}

const dateFormat = new Intl.DateTimeFormat('de', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'Europe/Berlin',
});

export default function DockerContainer({item, index}:Props){

    const [uptime, setUptime] = createSignal(Date.now()- item.created*1000 - 3600000)

    setInterval(() => {
        setUptime(Date.now()- item.created*1000 - 3600000);
    }, 1000);

    return(
        <div class={styles.container}>
            <div class={styles.backcolor}/>
            <div class={styles.panel}>
                <div class={styles.top}>
                    <span class={styles.name}>{item.name}</span>
                    <span class={styles.state}>
                        {
                            item.state == "running" ?
                                <span style="color: var(--green)">{item.state}</span>
                            :       
                                <span style="color: var(--red)">{item.state}</span>
                        } 
                    </span>
                </div>
                <span class={styles.icon}>
                    <i class="fa-duotone fa-solid fa-truck-container"></i>
                </span>
                <div class={styles.infoContainer}>
                    <span class={styles.portContainer}>
                        <span class={styles.port}>
                            {item.privatePort !== 0 ? item.privatePort : "n/a"}
                        </span>
                        <i class="fa-light fa-right-to-bracket"></i>
                        <i class="fa-light fa-right-from-bracket"></i>
                        <span class={styles.port}>
                            {item.publicPort !== 0 ? item.publicPort : "n/a"}
                        </span>
                    </span>
                    <span class={styles.info}>
                        <i style="margin-right: 10px" class="fa-light fa-hard-drive"></i>
                        {item.image}
                    </span>
                    <span class={styles.info}>
                        <i style="margin-right: 10px" class="fa-light fa-database"></i>
                        {item.volume?.length > 0 ? item.volume : "none"}
                    </span>
                    <span class={styles.uptime}>
                        {
                        item.state === "running" ?
                            <>
                                <i style="margin-right: 10px" class="fa-light fa-timer"></i>
                                <span>{dateFormat.format(uptime())}</span>
                            </>
                        :
                            <span style="color: var(--midGray)">not running</span>
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}