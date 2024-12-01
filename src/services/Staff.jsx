import api from "../utils/api";

const getStaff = ()=>{
    return api.get('/staff')
}

export {getStaff}