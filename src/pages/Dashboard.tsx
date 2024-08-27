import { useNavigate, useSearchParams } from '@solidjs/router'
import PrimaryButton from '../components/PrimaryButton'
import styles from './Dashboard.module.css'
import { createEffect, createResource, createSignal } from 'solid-js';
import SideChip from '../components/SideChip';
import {Tabs} from '../data/Enums';
import AdminsTab from '../tabs/AdminsTab';
import UsersTab from '../tabs/UsersTab';
import fetchAdmin from '../utils/fetchAdmin';
import EditAdminPopup from '../popups/EditAdminPopup';
import { usePopup } from '../utils/PopupContext';
import { Admin } from '../data/Types';
import LoadingPage from '../components/LoadingPage';

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

    const [adminID, setAdminID] = createSignal<string | null>(null);
    const [reloadCounter, setReloadCounter] = createSignal(0);

    const [loading, seLoading] = createSignal(false)

    //this shit sucks ass but it forces an auto update
    const [adminData, adminErr] = createResource(
        () => [adminID(), reloadCounter()],
        async ([id]) => {
            if (!id) return null;
            // @ts-ignore
            return fetchAdmin(id);
        }
    );
    
    const [selected, setSeleted] = createSignal<Tabs>(Tabs.ADMINS);

    const [editAdmin, setEditAdmin] = createSignal(null)

    function logout(){
        localStorage.removeItem("adminID")
        localStorage.removeItem("X-JWT-Token")
        navigate("/")  
    }

    createEffect(()=>{
        const adminID = localStorage.getItem("adminID")
        if(adminID){
            setAdminID(adminID)
        }
    })

    function forceReload(){
        setReloadCounter(count => count + 1);
    }

    if(loading())
        return <LoadingPage/>

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
            {editAdmin() && <EditAdminPopup item={editAdmin()} setEditAdmin={setEditAdmin} forceReload={forceReload} setLoading={seLoading}/>}
        </div>
    )
}