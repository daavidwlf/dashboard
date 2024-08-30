import { createEffect, createSignal } from "solid-js"
import API from "../data/API"
import { User } from "../data/Types"
import styles from './UsersTab.module.css'
import UserListComp from "../components/UserListComp"
import TextInput from "../components/TextInput"
import { AxiosError, AxiosResponse } from "axios"

type Props = {
    setEditUser: Function
    setDeleteUser: Function
    rerender: Function
}

export default function UsersTab({rerender, setDeleteUser, setEditUser}:Props){

    const [users, setUsers] = createSignal<User[]>()

    const [search, setSearch] = createSignal<string>("")

    createEffect(()=>{
        rerender()
        API.GET("/users", setUsers, null, null)
    })

    const enterSearch = (event?: SubmitEvent) =>{
        event?.preventDefault()

        if(search() !== ""){
            API.POST("/user/search", 
                {
                    "firstName": search(),
                    "lastName": search(),
                    "email": search(),
                    "userId": search()
                },
                (response: AxiosResponse) => {
                    setUsers(response.data)
                },
                (err: AxiosError) => {
                    console.log(err.response?.data.message)
                },
                null
            )
        } 
    }

    createEffect(()=>{
        if(search() === ""){
            console.log("fetch")
            API.GET("/users", setUsers, null, null)
        }  
    })

    return(
        <form onsubmit={enterSearch}>
            <div class={styles.container}>
                <div class={styles.top}>
                    <h2>Users</h2>
                    <span class={styles.topRight}>
                        <TextInput
                            icon={<i class="fa-light fa-magnifying-glass"></i>}
                            type="text"
                            placeholder="User Suchen"
                            value={search}
                            callback={setSearch}
                        />
                        <button
                            class={styles.enterSearch}
                            type="submit"
                        >
                            <i class="fa-light fa-turn-down-left"></i>
                        </button>
                    </span>
                </div>
                <div class={styles.list}>
                    {
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
            </div>
        </form>
    )
}