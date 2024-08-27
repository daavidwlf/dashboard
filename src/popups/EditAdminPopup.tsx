import { createSignal } from 'solid-js'
import CloseButton from '../components/CloseButton'
import TextInput from '../components/TextInput'
import { Admin, editAdminRequest } from '../data/Types'
import styles from './EditAdminPopup.module.css'
import PrimaryButton from '../components/PrimaryButton'
import editAdmin from '../utils/editAdmin'

type Props = {
    item: Admin | null
    setEditAdmin: Function
    forceReload?: Function
    setLoading?:Function
}

export default function EditAdminPopup({item, setEditAdmin, forceReload, setLoading}:Props){

    const [userName, setUserName]= createSignal<string>("");
    const [mail, setMail] = createSignal<string>("")

    async function save(){

  
        const changes = userName() !== "" || userName() !== ""

        console.log(userName())

        const data  = {
            "userName": userName() === "" ?  item?.userName : userName(),
            "email": mail() === "" ? item?.email : mail(),
        }

        console.log(data)
    
        if(item?.adminID && changes){

            setLoading && setLoading(true)
            try{
                await editAdmin(item?.adminID, data)
            }catch(err){
                setLoading && setLoading(false)
            }finally{
                setEditAdmin(null);
                setLoading && setLoading(false)
            }
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