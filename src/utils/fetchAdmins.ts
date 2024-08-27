import { AxiosError } from "axios"
import API from "../data/API"
import { Admin } from "../data/Types"

export default function fetchAdmins(){
    return new Promise<Admin[]>((resolve, reject) => {
        API.GET("/admins?quantity=5", 
        (data: Admin[]) => {
            resolve(data)
        },
        (err: AxiosError) => {
            reject(err)
        },
        null
        )
    })
}