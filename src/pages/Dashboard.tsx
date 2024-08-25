import { useNavigate } from '@solidjs/router'
import PrimaryButton from '../components/PrimaryButton'
import styles from './Dashboard.module.css'
import { createEffect, createResource, createSignal } from 'solid-js';
import API from '../api/API';
import Admin from '../api/Types';
import { Axios, AxiosError } from 'axios';
import SideChip from '../components/SideChip';
import Tabs from '../api/Enums';
import AdminTab from '../tabs/AdminTab';
import UsersTab from '../tabs/UsersTab';

let dateFormat = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour12: false,
    timeZone: 'Europe/Berlin',
});

function fetchAdmin(adminID: string){
    return new Promise<Admin>((resolve, reject) => {
        API.GET("/admin/"+adminID, 
        (data: Admin) => {
           resolve(data)
        },
        (err: AxiosError) => {
            reject(err)
        },
        null
        )
    })
}

export default function Dashboard(){

    const [adminID, setAdminID] = createSignal<string | null>(null);
    const [adminData, adminErr ] = createResource(adminID, fetchAdmin)

    const [selected, setSeleted] = createSignal<Tabs>(Tabs.ADMINS)

    createEffect(()=>{
        const adminID = localStorage.getItem("adminID")
        if(adminID){
            setAdminID(adminID)
        }
    })

    const navigate = useNavigate()

    const logout = () =>{
        localStorage.removeItem("adminID")
        localStorage.removeItem("X-JWT-Token")
        navigate("/")   
    }

    createEffect(()=>{
        console.log(selected())
    })

    console.log(selected())

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
                        <h1>{adminData()?.userName}</h1>
                        <h3>{dateFormat.format(Date.now())}</h3>
                    </div>
                    <div class={styles.topLeft}>
                        <PrimaryButton
                            text='Logout'
                            func={logout}
                        />
                    </div>
                </div>
                <div class={styles.tabBox}>
                    {selected() === Tabs.ADMINS && <AdminTab/>}
                    {selected() === Tabs.USERS && <UsersTab/>}
                </div>
            </div>
        </div>
    )
}