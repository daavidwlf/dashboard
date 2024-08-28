import { createResource } from "solid-js";
import { Admin } from "../data/Types"
import styles from './AdminListComp.module.css'

type Props = {
    item: Admin,
    index: number,
    setEditAdmin: Function,
    setDeleteAdmin: Function
}

const dateFormat = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false,
    timeZone: 'Europe/Berlin',
});

const selfID = localStorage.getItem("adminId")

export default function AdminListComp({item, index, setEditAdmin, setDeleteAdmin}:Props){

    return(
        <div class={styles.container}>
            <span class={styles.left}>
                <span style="flex: 3; display: flex; gap: 20px">
                    <i class="fa-duotone fa-solid fa-user-tie-hair"></i>
                    <p><strong>{item.userName}</strong></p>
                </span>
                <span style="flex: 5">
                    <p>{item.email}</p>
                </span>
                <span style="flex: 12">
                    <p><span style="color: var(--accentBlue)">{item.adminId}</span></p>
                </span>
            </span>
            <span class={styles.right}>
                <span class={styles.createdBox}>
                    <p>{dateFormat.format(item.created*1000)}</p>
                </span>
                <span class={styles.controls}>
                    <button 
                        class={styles.edit}
                        onclick={()=>setEditAdmin(item)}
                    >
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    {
                        selfID !== item.adminId ?
                        <button 
                            class={styles.delete}
                            onclick={() => {
                                console.log('Deleting admin:', item);
                                setDeleteAdmin(item);
                            }}
                        >
                            <i class="fa-regular fa-trash"></i>
                        </button>
                        :
                        <button 
                            class={styles.delete}
                            style="color: var(--backGray); cursor: default"
                        >
                            <i class="fa-regular fa-trash"></i>
                        </button>
                    }
                </span>
            </span>
        </div>
    )
}