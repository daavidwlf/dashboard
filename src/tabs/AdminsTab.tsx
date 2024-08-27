import { createEffect, createSignal } from 'solid-js'
import AdminListComp from '../components/AdminListComp'
import { Admin } from '../data/Types'
import styles from './AdminsTab.module.css'
import API from '../data/API'

type Props = {
    edit: Function
}

export default function AdminsTab({edit}:Props){

    const [admins, setAdmins] = createSignal<Admin[]>()

    createEffect(()=>{
        API.GET("/admins?quantity=10", setAdmins, null, null)
    })

    return(
        <div class={styles.container}>
            <h2>Admins</h2>
            <div class={styles.list}>
                {
                    admins()?.map((item:Admin, index:number)=>{
                        return(
                            <AdminListComp
                                item={item}
                                index={index}
                                edit={edit}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}