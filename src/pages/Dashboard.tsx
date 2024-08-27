import { useNavigate } from '@solidjs/router'
import PrimaryButton from '../components/PrimaryButton'
import styles from './Dashboard.module.css'
import { createEffect, createSignal } from 'solid-js';
import SideChip from '../components/SideChip';
import {Tabs} from '../data/Enums';
import AdminsTab from '../tabs/AdminsTab';
import UsersTab from '../tabs/UsersTab';
import EditAdminPopup from '../popups/EditAdminPopup';
import { Admin } from '../data/Types';
import API from '../data/API';

const dateFormat = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour12: false,
    timeZone: 'Europe/Berlin',
});

export default function Dashboard({setLoading}: {setLoading:Function}){

    const navigate = useNavigate()

    const [adminID, setAdminID] = createSignal<string>();
    const [adminData, setAdminData] = createSignal<Admin>()

    const [selected, setSeleted] = createSignal<Tabs>(Tabs.ADMINS);

    const [editAdmin, setEditAdmin] = createSignal(null)

    function logout(){
        localStorage.removeItem("adminID")
        localStorage.removeItem("X-JWT-Token")
        navigate("/")  
    }

    //set adminID of logged in admin
    createEffect(()=>{
        const adminID = localStorage.getItem("adminID")
        if(adminID){
            setAdminID(adminID)
        }
    })

    //fetch data of logged in admin
    createEffect(()=>{
        console.log(adminID())
        API.GET("/admin/"+adminID(), setAdminData)
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
                        setSelected={()=>setSeleted(Tabs.ADMINS)}
                    />
                    <SideChip
                        label='Users'
                        tab={Tabs.USERS}
                        icon={<i class="fa-duotone fa-solid fa-user"></i>}
                        selected={()=>selected()}
                        setSelected={()=>setSeleted(Tabs.USERS)}
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
                    {selected() === Tabs.ADMINS && <AdminsTab edit={setEditAdmin}/>}
                    {selected() === Tabs.USERS && <UsersTab/>}
                </div>
            </div>
            {editAdmin() && <EditAdminPopup item={editAdmin()} setEditAdmin={setEditAdmin} setLoading={setLoading}/>}
        </div>
    )
}