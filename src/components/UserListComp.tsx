import { User } from '../data/Types';
import styles from './UserListComp.module.css'

type Props = {
    item: User,
    index: number,
    setEditUser: Function,
    setDeleteUser: Function
}

const dateFormat = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour12: false,
    timeZone: 'Europe/Berlin',
});

export default function UserListComp({item, index, setEditUser, setDeleteUser}:Props){
    return(
        <div class={styles.container}>
            <span class={styles.left}>
                <span style="flex: 3; display: flex; gap: 20px">
                    <i class="fa-duotone fa-solid fa-user"></i>
                    <p><strong>{item.firstName}</strong></p>
                    <p><strong>{item.lastName}</strong></p>
                </span>
                <span style="flex: 5">
                    <p>{item.email}</p>
                </span>
                <span style="flex: 12">
                    <p><span style="color: var(--accentBlue)">{item.userId}</span></p>
                </span>
            </span>
            <span class={styles.right}>
                <span class={styles.createdBox}>
                    <p>{dateFormat.format(item.created*1000)}</p>
                </span>
                <span class={styles.controls}>
                    <button 
                        class={styles.edit}
                        onclick={()=>setEditUser(item)}
                    >
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button 
                        class={styles.delete}
                        onclick={() => {
                            setDeleteUser(item);
                        }}
                    >
                        <i class="fa-regular fa-trash"></i>
                    </button>
                </span>
            </span>
        </div>
    )
}