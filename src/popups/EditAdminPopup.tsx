import { createSignal } from 'solid-js'
import CloseButton from '../components/CloseButton'
import TextInput from '../components/TextInput'
import { Admin } from '../data/Types'
import styles from './EditAdminPopup.module.css'
import PrimaryButton from '../components/PrimaryButton'
import API from '../data/API'
import { AxiosError, AxiosResponse } from 'axios'
import LoadingComponent from '../components/LoadingComponent'

type Props = {
    item: Admin | null
    setEditAdmin: Function
    setLoading?:Function
    setResultMessage: Function
}

export default function EditAdminPopup({item, setEditAdmin, setResultMessage}:Props){

    const [loading, setLoading] = createSignal(false)

    const [userName, setUserName]= createSignal<string>("");
    const [mail, setMail] = createSignal<string>("")

    function save(){
  
        const changes = userName() !== "" || mail() !== ""

        const data  = {
            "userName": userName() === "" ?  item?.userName : userName(),
            "email": mail() === "" ? item?.email : mail(),
        }
    
        if(item?.adminId && changes){

            setLoading(true)

            API.POST("/admin/edit/"+ item.adminId,
                {
                    "userName": data.userName,
                    "email": data.email
                },
                (response: AxiosResponse) => {
                    setLoading(false)
                    setEditAdmin(null)
                    setResultMessage("succ")
                },
                (err: AxiosError) => {
                    setLoading(false)
                    setEditAdmin(null)
                    //@ts-ignore
                    setResultMessage(err.response?.data?.message ? err.response?.data?.message : err.message)
                },
                null
                )
        }
    }

    return(
        <div class={styles.container}>
            <div class={styles.panel}>
                {
                loading() ?
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
                                func={function(){setEditAdmin(null)}}
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
                </>
                }
            </div>
        </div>
    )
}