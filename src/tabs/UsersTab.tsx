import { createEffect, createSignal } from "solid-js"
import API from "../data/API"
import { User } from "../data/Types"
import styles from './UsersTab.module.css'
import UserListComp from "../components/UserListComp"

type Props = {
    setEditUser: Function
    setDeleteUser: Function
    rerender: Function
}

export default function UsersTab({rerender, setDeleteUser, setEditUser}:Props){

    const [users, setUsers] = createSignal<User[]>()

    createEffect(()=>{
        rerender()
        API.GET("/users", setUsers, null, null)
    })

    return(
        <div class={styles.container}>
            <div class={styles.top}>
                <h2>Users</h2>
                <span class={styles.topRight}>
                </span>
            </div>
            <div class={styles.list}>
                {
                    users()?.map((item:User, index:number)=>{
                        return(
                            <UserListComp
                                item={item}
                                index={index}
                                setEditUser={setEditUser}
                                setDeleteUser={setDeleteUser}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}