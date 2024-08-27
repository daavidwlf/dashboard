import { createResource } from 'solid-js'
import AdminListComp from '../components/AdminListComp'
import { Admin } from '../data/Types'
import fetchAdmins from '../utils/fetchAdmins'
import styles from './AdminsTab.module.css'
import EditAdminPopup from '../popups/EditAdminPopup'

type Props = {
    edit: Function
}

export default function AdminsTab({edit}:Props){

    const [admins, error] = createResource<Admin[]>(fetchAdmins)

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