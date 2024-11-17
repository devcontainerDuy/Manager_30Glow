import api from "../utils/api";

const loginAuth = ({email, password, rememberToken})=>{
    return api.post('/login-manager',{email, password, remember_token:rememberToken})
}

export {loginAuth}