import axios from 'axios'

const API:any = []

axios.defaults.withCredentials = true;

const dev:boolean = true

var url = 'http://localhost:3000'

if (!dev){
    url = ''
}


API.GET = (query:string, callback:Function, callbackErr?:Function) => {
    const token = localStorage.getItem("X-JWT-Token") || "none";

    axios.get(url + query, {
        headers: {
            "X-JWT-Token": token,
            "Content-Type": "application/json",
        },
        withCredentials: true
    })
    .then(response => callback(response.data))
    .catch(err => callbackErr? callbackErr(err) : console.log(err))
}

API.POST = async (query: string, data: any, callback: Function, callbackErr?: Function, setLoading?: Function) => {
    if (setLoading) setLoading(true);

    try {
        const response = await axios.post(url + query, JSON.stringify(data));
        if (setLoading) setLoading(false);
        callback(response);
    } catch (err) {
        if (setLoading) setLoading(false);
        callbackErr ? callbackErr(err) : console.log(err);
    }
};





export default API