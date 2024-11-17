import api from "../utils/api";

const getBooking = ()=>{
    return api.get("/bookings")
}

export {getBooking}