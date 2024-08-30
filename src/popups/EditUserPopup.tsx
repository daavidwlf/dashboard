import { createSignal } from 'solid-js'
import CloseButton from '../components/CloseButton'
import TextInput from '../components/TextInput'
import { User } from '../data/Types'
import styles from './EditAdminPopup.module.css'
import PrimaryButton from '../components/PrimaryButton'
import API from '../data/API'
import { AxiosError, AxiosResponse } from 'axios'
import LoadingComponent from '../components/LoadingComponent'

type Props = {
    item: User | null
    setEditUser: Function
    setLoading?:Function
    setResultMessage: Function
}

export default function EditUserPopup({item, setEditUser, setResultMessage}:Props){

    const [loading, setLoading] = createSignal(false)

    const [firstName, setFirstName]= createSignal<string>("");
    const [lastName, setLastName]= createSignal<string>("");
    const [mail, setMail] = createSignal<string>("")

    function save(){
  
        const changes = firstName() !== "" || lastName() !== "" || mail() !== ""

        const data  = {
            "firstName": firstName() === "" ?  item?.firstName: firstName(),
            "lastName": lastName() === "" ?  item?.lastName : lastName(),
            "email": mail() === "" ? item?.email : mail(),
        }
    
        if(item?.userId && changes){

            setLoading(true)

            API.POST("/user/edit/"+ item.userId,
                {
                    "firstName": data.firstName,
                    "lastName": data.lastName,
                    "email": data.email
                },
                (response: AxiosResponse) => {
                    setLoading(false)
                    setEditUser(null)
                    setResultMessage("succ")
                },
                (err: AxiosError) => {
                    setLoading(false)
                    setEditUser(null)
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
                            <p>{item?.userId}</p>
                        </span>
                        <span class={styles.close}>
                            <CloseButton
                                func={function(){setEditUser(null)}}
                            />
                        </span>
                    </div>
                    <div class={styles.editContainer}>
                        <span class={styles.editField}>
                            <h1>Vorname bearbeiten</h1>
                            <TextInput
                            placeholder={item?.firstName}
                            callback={setFirstName}
                            type="text"
                            value={firstName}
                            />
                        </span>
                        <span class={styles.editField}>
                            <h1>Nachname bearbeiten</h1>
                            <TextInput
                            placeholder={item?.lastName}
                            callback={setLastName}
                            type="text"
                            value={lastName}
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