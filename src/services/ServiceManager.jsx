import api from "../utils/api"

const getService = ()=>{
    return api.get('/services')
}

export {getService}