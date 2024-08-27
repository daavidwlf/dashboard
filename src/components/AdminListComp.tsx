import { createResource } from "solid-js";
import { Admin } from "../data/Types"
import styles from './AdminListComp.module.css'
import editAdmins from "../utils/editAdmin";

type Props = {
    item: Admin,
    index: number,
    edit: Function
}

const dateFormat = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false,
    timeZone: 'Europe/Berlin',
});

export default function AdminListComp({item, index, edit}:Props){

    return(
        <div class={styles.container}>
            <span class={styles.left}>
                <span style="flex: 2; display: flex; gap: 20px">
                    <i class="fa-duotone fa-solid fa-user-tie-hair"></i>
                    <p><strong>{item.userName}</strong></p>
                </span>
                <span style="flex: 3">
                    <p>{item.email}</p>
                </span>
                <span style="flex: 12">
                    <p><span style="color: var(--accentBlue)">{item.adminID}</span></p>
                </span>
            </span>
            <span class={styles.right}>
                <span class={styles.createdBox}>
                    <p>{dateFormat.format(item.created*1000)}</p>
                </span>
                <span class={styles.controls}>
                    <button 
                        class={styles.edit}
                        onclick={()=>edit(item)}
                    >
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button 
                        class={styles.delete}
                    >
                        <i class="fa-regular fa-trash"></i>
                    </button>
                </span>
            </span>
        </div>
    )
}