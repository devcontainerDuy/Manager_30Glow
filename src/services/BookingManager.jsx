import api from "../utils/api";

const getBooking = (currentPage) => {
  return api.get(`/bookings?page=${currentPage}`);
};

export { getBooking };
