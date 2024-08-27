import axios, { AxiosError, AxiosResponse } from 'axios'
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

const API:any = []

axios.defaults.withCredentials = true;

const dev:boolean = true

var url = 'http://localhost:3000'

if (!dev){
    url = ''
}


API.GET = (query:string, callback:Function, callbackErr?:Function, setLoading?:Function) => {

    if(setLoading) setLoading(true)

    const token = localStorage.getItem("X-JWT-Token") || "none";
    const id = localStorage.getItem("adminID") || "none";
    
    axios.get(url + query, {
        headers: {
            "X-JWT-Token": token,
            "Content-Type": "application/json",
            "ID": id
        },
        withCredentials: true
    })
    .then((response:AxiosResponse) => {
        callback(response.data)
        if(setLoading) setLoading(false)
    })
    .catch((err: AxiosError) => {
        callbackErr? callbackErr(err) : console.log(err)
        if(setLoading) setLoading(false)
    })
}

API.POST = async (query: string, data: any, callback: Function, callbackErr?: Function, setLoading?: Function) => {
    if (setLoading) setLoading(true);

    const token = localStorage.getItem("X-JWT-Token") || "none";
    const id = localStorage.getItem("adminID") || "none";

    try {
        const response = await axios.post(url + query, JSON.stringify(data),
    {
        headers: {
            "X-JWT-Token": token,
            "Content-Type": "application/json",
            "ID": id
        },
        withCredentials: true
    });
        if (setLoading) setLoading(false);
        callback(response);
    } catch (err) {
        if (setLoading) setLoading(false);
        callbackErr ? callbackErr(err) : console.log(err);
    }
};





export default API