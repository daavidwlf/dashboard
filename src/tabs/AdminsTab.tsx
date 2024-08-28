import { createEffect, createResource, createSignal } from 'solid-js'
import AdminListComp from '../components/AdminListComp'
import { Admin } from '../data/Types'
import styles from './AdminsTab.module.css'
import API from '../data/API'
import PrimaryButton from '../components/PrimaryButton'

type Props = {
    setEditAdmin: Function
    setDeleteAdmin: Function
    setAddAdmin: Function
    rerender: Function
}

export default function AdminsTab({setEditAdmin, setDeleteAdmin, setAddAdmin, rerender}:Props){

    const [admins, setAdmins] = createSignal<Admin[]>()

    createEffect(()=>{
        rerender()
        console.log("do")
        API.GET("/admins?quantity=10", setAdmins, null, null)
    })

    return(
        <div class={styles.container}>
            <div class={styles.top}>
                <h2>Admins</h2>
                <span class={styles.topRight}>
                    <button
                        class={styles.add}
                        onclick={()=>setAddAdmin(true)}
                    >
                        <i class="fa-regular fa-square-plus"></i>
                    </button>
                </span>
            </div>
            <div class={styles.list}>
                {
                    admins()?.map((item:Admin, index:number)=>{
                        return(
                            <AdminListComp
                                item={item}
                                index={index}
                                setEditAdmin={setEditAdmin}
                                setDeleteAdmin={setDeleteAdmin}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}