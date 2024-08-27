import { AxiosError, AxiosResponse } from "axios"
import API from "../data/API"
import { Admin, editAdminRequest } from "../data/Types"

type Props = {
    adminID: string | undefined
    data: editAdminRequest
    setLoading?: Function
}

export default function editAdmin(adminID: string | undefined, data: editAdminRequest, setLoading?: Function){

        if(setLoading) {console.log("Loading"); setLoading(true)}

            console.log(adminID)
        
        return new Promise<Admin>((resolve, reject) => {
            setTimeout(()=>{
                API.POST("/admins/edit/"+ adminID,
                    {
                        "userName": data.userName,
                        "email": data.email
                    }, 
                    (response: AxiosResponse) => {
                        resolve(response.data)
                        if(setLoading) {setLoading(false)
                            console.log("stop");
                        }
                    },
                    (err: AxiosError) => {
                        console.log(err)
                        reject(err)
                        if(setLoading) setLoading(false)
                    },
                    null
                    )
            }, 4000)
        })
}