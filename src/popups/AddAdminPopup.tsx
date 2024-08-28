import { createEffect, createSignal } from 'solid-js'
import CloseButton from '../components/CloseButton'
import PrimaryButton from '../components/PrimaryButton'
import TextInput from '../components/TextInput'
import styles from './AddAdminPopup.module.css'
import API from '../data/API'
import LoadingComponent from '../components/LoadingComponent'
import { AxiosError, AxiosResponse } from 'axios'

type Props = {
    setAddAdmin: Function
    setResultMessage: Function
}

export default function AddAdminPopup({setAddAdmin, setResultMessage}:Props){

    const [loading ,setLoading] = createSignal<boolean>(false)

    const [userName, setUserName] = createSignal<string>("");
    const [mail, setMail] = createSignal<string>("");
    const [password, setPassword] = createSignal<string>("");
    const [passwordRepeat, setPasswordRepeat] = createSignal<string>("");

    const [valid, setValid] = createSignal<boolean>(false)

    function addAdmin(){
        console.log("add")
            API.POST("/admins/add", {
                "userName" : userName(),
                "email": mail(),
                "password": password() 
            }, 
            (response :AxiosResponse) => {
                setLoading(false)
                setAddAdmin(null)
                setResultMessage("succ")
            },
            (err :AxiosError) => {
                setLoading(false)
                setAddAdmin(null)
                // @ts-ignore
                setResultMessage(err.response?.data?.message)
            }, 
            null
        )
    }

    createEffect(() => {
        setValid(userName() !== "" && mail().includes("@") && mail().includes(".") && password() != "" && password() === passwordRepeat())
    })

    return(
        <div class={styles.container}>
            <div class={styles.panel}>
                {loading() ? 
                    <LoadingComponent/>
                :
                <>
                    <div class={styles.top}>
                        <span class={styles.id}>
                            <i class="fa-duotone fa-solid fa-user-tie-hair"></i>
                            <p>Admin hinzufügen</p>
                        </span>
                        <span class={styles.close}>
                            <CloseButton
                                func={function(){setAddAdmin(null)}}
                            />
                        </span>
                    </div>
                    <div class={styles.editContainer}>
                        <span class={styles.editField}>
                            <h1>Username</h1>
                            <TextInput
                            placeholder="Username"
                            callback={setUserName}
                            type="text"
                            value={userName}
                            />
                        </span>
                        <span class={styles.editField}>
                            <h1>Email</h1>
                            <TextInput
                            placeholder="Email"
                            callback={setMail}
                            type="text"
                            value={mail}
                            />
                        </span>
                        <span class={styles.editField}>
                            <h1>Password</h1>
                            <TextInput
                            placeholder="Password"
                            callback={setPassword}
                            type="text"
                            value={password}
                            />
                        </span>
                        <span class={styles.editField}>
                            <h1>Password wiederholen</h1>
                            <TextInput
                            placeholder="Password wiederholen"
                            callback={setPasswordRepeat}
                            type="text"
                            value={passwordRepeat}
                            />
                        </span>
                    </div>
                    <div class={styles.add}>
                        { valid() ? 
                            <PrimaryButton
                                text='Hinzufügen'
                                func={addAdmin}
                            />
                            :
                            <PrimaryButton
                                text='Hinzufügen'
                                backgroundColor='var(--backGray)'
                                func={function(){}}
                                cursor='default'
                            />
                        }
                    </div>
                </>
                }
            </div>
        </div>
    )
}