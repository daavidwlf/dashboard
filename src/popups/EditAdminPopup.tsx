import { createSignal } from 'solid-js'
import CloseButton from '../components/CloseButton'
import TextInput from '../components/TextInput'
import { Admin } from '../data/Types'
import styles from './EditAdminPopup.module.css'
import PrimaryButton from '../components/PrimaryButton'
import API from '../data/API'
import { AxiosError, AxiosResponse } from 'axios'

type Props = {
    item: Admin | null
    setEditAdmin: Function
    forceReload?: Function
    setLoading?:Function
}

export default function EditAdminPopup({item, setEditAdmin, forceReload, setLoading}:Props){

    const [userName, setUserName]= createSignal<string>("");
    const [mail, setMail] = createSignal<string>("")

    function save(){
  
        const changes = userName() !== "" || userName() !== ""

        const data  = {
            "userName": userName() === "" ?  item?.userName : userName(),
            "email": mail() === "" ? item?.email : mail(),
        }
    
        if(item?.adminID && changes){

            setLoading && setLoading(true)
            API.POST("/admins/edit/"+ item.adminID,
                {
                    "userName": data.userName,
                    "email": data.email
                },
                (response: AxiosResponse) => {
                    if(setLoading) setLoading(false)
                },
                (err: AxiosError) => {
                    console.log(err)
                    if(setLoading) setLoading(false)
                },
                null
                )
        }
    }

    return(
        <div class={styles.container}>
            <div class={styles.panel}>
                <div class={styles.top}>
                    <span class={styles.id}>
                        <i class="fa-duotone fa-solid fa-user-tie-hair"></i>
                        <p>{item?.adminID}</p>
                    </span>
                    <span class={styles.close}>
                        <CloseButton
                            func={function(){setEditAdmin(null); forceReload ? forceReload(): "";}}
                        />
                    </span>
                </div>
                <div class={styles.editContainer}>
                    <span class={styles.editField}>
                        <h1>Username bearbeiten</h1>
                        <TextInput
                           placeholder={item?.userName}
                           callback={setUserName}
                           type="text"
                           value={userName}
                        />
                    </span>
                    <span class={styles.editField}>
                        <h1>Email bearbeiten</h1>
                        <TextInput
                           placeholder={item?.email}
                           callback={setMail}
                           type="text"
                           value={mail}
                        />
                    </span>
                </div>
                <div class={styles.save}>
                    <PrimaryButton
                        text='Speichern'
                        func={()=>save()}
                    />
                </div>
            </div>
        </div>
    )
}