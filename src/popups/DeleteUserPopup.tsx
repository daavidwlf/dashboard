import { AxiosError, AxiosResponse } from 'axios';
import CloseButton from '../components/CloseButton';
import PrimaryButton from '../components/PrimaryButton';
import API from '../data/API';
import { User } from '../data/Types';
import styles from './DeleteUserPopup.module.css'
import {createSignal } from 'solid-js';
import LoadingComponent from '../components/LoadingComponent';

type Props = {
    item: User | null
    setDeleteUser: Function
    //setLoading?:Function
    setResultMessage: Function
}

export default function DeleteUserPopup({item, setDeleteUser, setResultMessage}:Props){
    const [loading ,setLoading] = createSignal<boolean>(false)
    
    function del(){
        setLoading(true)
        setTimeout(()=>{
        API.POST("/user/delete/" + item?.userId,
            null, 
            (response :AxiosResponse) => {
                setLoading(false)
                setDeleteUser(null)
                setResultMessage("succ")
            },
            (err :AxiosError) => {
                setLoading(false)
                setDeleteUser(null)
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
                            <p>{item?.userId}</p>
                        </span>
                        <span class={styles.close}>
                            <CloseButton
                                func={()=>setDeleteUser(null)}
                            />
                        </span>
                    </div>
                    <span class={styles.message}>
                        <h1>Möchtest du den User {item?.firstName} {item?.lastName} wirklich löschen?</h1>
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