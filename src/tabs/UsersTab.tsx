import { createEffect, createSignal } from "solid-js"
import API from "../data/API"
import { User } from "../data/Types"
import styles from './UsersTab.module.css'
import UserListComp from "../components/UserListComp"
import TextInput from "../components/TextInput"
import { AxiosError, AxiosResponse } from "axios"
import LoadingComponent from "../components/LoadingComponent"

type Props = {
    setEditUser: Function
    setDeleteUser: Function
    rerender: Function
}

export default function UsersTab({rerender, setDeleteUser, setEditUser}:Props){

    const [users, setUsers] = createSignal<User[]>()

    const [search, setSearch] = createSignal<string>("")

    const [loading, setLoading] = createSignal<boolean>(false)

    const [err, setErr] = createSignal<string | null>(null)

    createEffect(()=>{
        rerender()
        API.GET("/users", setUsers, null, setLoading)
    })

    const enterSearch = (event?: SubmitEvent) =>{
        event?.preventDefault()

        setErr(null)

        if(search() !== ""){
            API.POST("/user/search", 
                {
                    "firstName": search(),
                    "lastName": search(),
                    "email": search(),
                    "userId": search()
                },
                (response: AxiosResponse) => { 
                    setErr(null)
                    setUsers(response.data)
                },
                (err: AxiosError) => {
                    // @ts-ignore
                    setErr(err.response?.data?.message ? err.response?.data?.message :err.message )
                },
                setLoading
            )
        } 
    }

    createEffect(()=>{
        if(search() === ""){
            setErr(null)
            API.GET("/users", setUsers, null, setLoading)
        }  
    })

    return(
        <form onsubmit={enterSearch}>
            <div class={styles.container}>
                <div class={styles.top}>
                    <h2>Users</h2>
                    <span class={styles.topRight}>
                       {    search() !== "" &&
                            <span class={styles.enterContainer}>
                                <button
                                    class={styles.enterArrow}
                                    type="submit"
                                >
                                    <i class="fa-light fa-turn-down-left"></i>
                                </button>
                                <span class={styles.enter}>enter</span>
                            </span>
                        }
                        <TextInput
                            icon={<i class="fa-light fa-magnifying-glass"></i>}
                            type="text"
                            placeholder="User Suchen"
                            value={search}
                            callback={setSearch}
                        />
                    </span>
                </div>
                {
                loading() ?
                    <LoadingComponent/>
                :
                    err() ? 
                        <span class={styles.err}>
                            <h4>{err()}</h4>
                        </span>
                    :
                        <div class={styles.list}>
                        { 
                                !users() ?
                                    <span class={styles.noResults}>
                                        <h4>Keine Ergebnisse...</h4>
                                    </span>
                                :
                                    users()?.map((item:User, index:number)=>{
                                        return(
                                            <UserListComp
                                                item={item}
                                                index={index}
                                                setEditUser={setEditUser}
                                                setDeleteUser={setDeleteUser}
                                            />
                                        )
                                    })
                            }
                        </div>
                    }
            </div>
        </form>
    )
}