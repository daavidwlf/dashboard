import { createEffect, createSignal } from 'solid-js'
import TextInput from '../components/TextInput'
import styles from './Login.module.css'
import API from '../api/API'
import { AxiosError, AxiosResponse } from 'axios'
import LottieAnimation from '../components/LottieAnimation'
import loadingAnimation from '../assets/animations/loadingWhite.json'
import { useNavigate } from '@solidjs/router'
import { customError } from '../api/Enums'

export default function Login(){

    const navigate = useNavigate();

    const [email, setEmail] = createSignal("")
    const [password, setPassword] = createSignal("")

    const [err, setErr] = createSignal(customError.NONE)

    const [loading, setLoading] = createSignal(false)

    //this code sucks
    const validateInput = () => {
        if((email() == "" || !email().includes("@")) && password() == ""){
            setErr(customError.BOTH)
            return
        }
        if(email() == "" || !email().includes("@")){
            setErr(customError.EMAIL)
            return
        }
        if(password() == ""){
            setErr(customError.PASSWORD)
            return
        }
        setErr(customError.NONE)

        API.POST(
            "/admin/login", {
                "email": email(),
                "password": password(),
            }, 
            (response: AxiosResponse) => {
                const token:string = response?.data["X-JWT-Token"]
                const adminID:string = response?.data["adminID"]
                localStorage.setItem("X-JWT-Token",  token)
                localStorage.setItem("adminID",  adminID)
                navigate('/dashboard')
            },
            (err: AxiosError) => {
                //@ts-ignore
                const message = err?.response?.data?.message;
                if (message === "email doesn't exist") {
                    setErr(customError.EMAIL);
                } else if (message === "wrong password") {
                    setErr(customError.PASSWORD);
                } else {
                    setErr(customError.UNKNOWN);
                    console.log(err)
                }
            },
            setLoading
        )
    }

    return(
        <div class={styles.container}>
            <div class={styles.loginBox}>
                <h1>Dashboard</h1>
                <span class={styles.icon}>
                    <i class="fa-light fa-chart-line"></i>
                </span>
                <span class={styles.err}>
                {
                    err() == customError.UNKNOWN
                    &&
                    <span>Ein Fehler ist aufgetreten</span>
                }
                </span>
                <span class={styles.inputsContainer}>
                    <TextInput
                        placeholder='E-Mail'
                        type='text'
                        icon={<i class="fa-solid fa-envelope"></i>}
                        value={email}
                        callback={setEmail}
                        onClick={()=>{
                            err() == customError.BOTH ? 
                            setErr(customError.PASSWORD): 
                            setErr(customError.NONE)
                        }}
                    />
                    <span class={styles.err}>
                       {
                        (err() == customError.BOTH || err() == customError.EMAIL) 
                        &&
                        <span>Bitte gültige E-Mail eingeben</span>
                       }
                    </span>
                    <TextInput
                        placeholder='Password'
                        type='password'
                        icon={<i class="fa-solid fa-lock"></i>}
                        value={password}
                        callback={setPassword}
                        onClick={()=>{
                            err() == customError.BOTH ? 
                            setErr(customError.EMAIL): 
                            setErr(customError.NONE)
                        }}
                    />
                    <span class={styles.err}>
                       {
                        (err() == customError.BOTH || err() == customError.PASSWORD) 
                        &&
                        <span>Bitte gültiges Passwort eingeben</span>
                       }
                    </span>
                    <div>
                        {
                        !loading() ?
                            <button
                                onClick={validateInput}
                                class={styles.button}
                            >
                                Login
                            </button>
                        :
                            <div class={styles.button}>
                                <LottieAnimation
                                    animationData={loadingAnimation}
                                    loop={true}
                                    autoplay={true}
                                    class={styles.loading}
                                />
                            </div>
                        }
                    </div>
                </span>
            </div>
        </div>
    )
}