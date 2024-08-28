import { useNavigate } from '@solidjs/router'
import PrimaryButton from '../components/PrimaryButton'
import styles from './Dashboard.module.css'
import { createEffect, createSignal} from 'solid-js';
import SideChip from '../components/SideChip';
import {Tabs} from '../data/Enums';
import AdminsTab from '../tabs/AdminsTab';
import UsersTab from '../tabs/UsersTab';
import EditAdminPopup from '../popups/EditAdminPopup';
import { Admin } from '../data/Types';
import API from '../data/API';
import DeleteAdminPopup from '../popups/DeleteAdminPopup';
import AddAdminPopup from '../popups/AddAdminPopup';
import ResultPopup from '../popups/ResultPopup';

const dateFormat = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour12: false,
    timeZone: 'Europe/Berlin',
});

export default function Dashboard(){

    const navigate = useNavigate()

    const [rerender, setRerender] = createSignal<number>(0)

    const [adminId, setAdminId] = createSignal<string>();
    const [adminData, setAdminData] = createSignal<Admin>()

    const [selected, setSelected] = createSignal<Tabs>(Tabs.ADMINS);

    const [editAdmin, setEditAdmin] = createSignal<Admin | null>(null)
    const [deleteAdmin, setDeleteAdmin] = createSignal<Admin | null>(null)
    const [addAdmin, setAddAdmin] = createSignal<boolean>(false)
    const [resultMessage, setResultMessage] = createSignal<string | null>(null)

    function logout(){
        localStorage.removeItem("adminId")
        localStorage.removeItem("xJwtToken")
        navigate("/")  
    }

    createEffect(()=>{
        rerender()

        const id = localStorage.getItem("adminId")
        if(id){
            setAdminId(id)
        }

        console.log(adminId())
        API.GET("/admin/"+adminId(), setAdminData)

    })

    return(
        <div class={styles.container}>
            <div class={styles.sidebar}>
                <div class={styles.banner}>
                    <i style="margin-top: 1px" class="fa-regular fa-chart-line"></i>
                    <h1>Dashboard</h1>
                </div>
                <div class={styles.chips}>
                    <SideChip
                        label='Admins'
                        tab={Tabs.ADMINS}
                        icon={<i class="fa-duotone fa-solid fa-user-tie-hair"></i>}
                        selected={()=>selected()}
                        setSelected={()=>setSelected(Tabs.ADMINS)}
                    />
                    <SideChip
                        label='Users'
                        tab={Tabs.USERS}
                        icon={<i class="fa-duotone fa-solid fa-user"></i>}
                        selected={()=>selected()}
                        setSelected={()=>setSelected(Tabs.USERS)}
                    />
                </div>
            </div>
            <div class={styles.canvas}>
                <div class={styles.topBar}>
                    <div class={styles.topRight}>
                        <h1>Hi, {adminData()?.userName}</h1>
                        <h3>{dateFormat.format(Date.now())}</h3>
                    </div>
                    <div class={styles.topLeft}>
                        <PrimaryButton
                            text='Logout'
                            func={()=>logout()}
                        />
                    </div>
                </div>
                <div class={styles.tabBox}>
                    {selected() === Tabs.ADMINS && <AdminsTab setEditAdmin={setEditAdmin} setDeleteAdmin={setDeleteAdmin} setAddAdmin={setAddAdmin} rerender={rerender}/>}
                    {selected() === Tabs.USERS && <UsersTab/>}
                </div>
            </div>
            {deleteAdmin() && <DeleteAdminPopup item={deleteAdmin()} setDeleteAdmin={setDeleteAdmin} setResultMessage={setResultMessage}/>}
            {editAdmin() && <EditAdminPopup item={editAdmin()} setEditAdmin={setEditAdmin} setResultMessage={setResultMessage}/>}
            {addAdmin() && <AddAdminPopup setAddAdmin={setAddAdmin} setResultMessage={setResultMessage}/>}
            {resultMessage() && <ResultPopup resultMessage={resultMessage()} setResultMessage={setResultMessage} setRerender={setRerender}/>}
        </div>
    )
}