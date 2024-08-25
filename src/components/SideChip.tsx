import { createSignal, JSX } from 'solid-js'
import styles from './SideChip.module.css'
import Tabs from '../api/Enums'

type ChipProps = {
    label: string
    tab: Tabs
    icon? : JSX.Element
    setSelected: Function
    selected: Function
}

export default function SideChip({label, tab, icon, selected, setSelected}:ChipProps){

    return(
        <span>
        {    
            selected() === tab ? 
                <button 
                    class={styles.containerSelected}
                >  
                    <span class={styles.iconSelected}> 
                        {icon}
                    </span>
                    <span class={styles.labelSelected}>
                        {label}
                    </span>
                </button>
            :
            <button 
                class={styles.container}
                onclick={()=>setSelected()}
            >  
                <span class={styles.icon}> 
                    {icon}
                </span>
                <span class={styles.label}>
                    {label}
                </span>
            </button>
        }
        </span>
    )
}