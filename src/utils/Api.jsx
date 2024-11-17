import axios from "axios";

const api = axios.create({  
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
//header (request, token)
api.interceptors.response.use(
    (response)=>{
        return response.data;
    }
)
// ['status:true, message:"true", data:["name": true,
//     "role": "manager",
//     "uid": "USMq8UL1731740487",
//     "token": "1|uh7IeyiPKFSqWgkQzmG2aP1QZM2bGvodVvUdNyjKe76eccbc",
//     "expiry": 1731783026]]

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;