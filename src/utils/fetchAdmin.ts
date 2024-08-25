import { AxiosError } from "axios"
import API from "../api/API"
import Admin from "../api/Types"

export default function fetchAdmin(adminID: string){
    return new Promise<Admin>((resolve, reject) => {
        API.GET("/admin/"+adminID, 
        (data: Admin) => {
           resolve(data)
        },
        (err: AxiosError) => {
            reject(err)
        },
        null
        )
    })
}