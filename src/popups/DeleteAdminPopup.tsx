import { AxiosError, AxiosResponse } from 'axios';
import CloseButton from '../components/CloseButton';
import PrimaryButton from '../components/PrimaryButton';
import API from '../data/API';
import { Admin } from '../data/Types';
import styles from './DeleteAdminPopup.module.css'
import { createEffect, createSelector, createSignal } from 'solid-js';
import LoadingPage from '../components/LoadingPage';
import LoadingComponent from '../components/LoadingComponent';

type Props = {
    item: Admin | null
    setDeleteAdmin: Function
    //setLoading?:Function
    setResultMessage: Function
}

export default function DeleteAdminPopup({item, setDeleteAdmin, setResultMessage}:Props){
    const [loading ,setLoading] = createSignal<boolean>(false)
    
    function del(){
        setLoading(true)
        setTimeout(()=>{
        API.POST("/admin/delete/" + item?.adminId,
            null, 
            (response :AxiosResponse) => {
                setLoading(false)
                setDeleteAdmin(null)
                setResultMessage("succ")
            },
            (err :AxiosError) => {
                setLoading(false)
                setDeleteAdmin(null)
                // @ts-ignore
                setResultMessage(err.response?.data?.message ? err.response?.data?.message : err.message)
            }, 
            null
        )
        }, 2000)
    }

    return(
        <div class={styles.container}>
                <div class={styles.panel}>
            {
                loading()? 
                <LoadingComponent/>
            :
            <>
                    <div class={styles.top}>
                        <span class={styles.id}>
                            <i class="fa-duotone fa-solid fa-user-tie-hair"></i>
                            <p>{item?.adminId}</p>
                        </span>
                        <span class={styles.close}>
                            <CloseButton
                                func={()=>setDeleteAdmin(null)}
                            />
                        </span>
                    </div>
                    <span class={styles.message}>
                        <h1>Möchtest du den Admin {item?.userName} wirklich löschen?</h1>
                    </span>
                    <div class={styles.okay}>
                        <PrimaryButton
                            text='Löschen'
                            func={()=>del()}
                            backgroundColor="var(--red)"
                        />
                    </div>
                </>
            }
           </div>
        </div>
    )
}