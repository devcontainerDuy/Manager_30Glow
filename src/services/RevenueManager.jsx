import api from "../utils/api";

const getRevenueService = () => {
  return api.get("/revenue/service");
};
const getRevenueProduct = () => {
  return api.get("/revenue/products");
};

export { getRevenueService, getRevenueProduct };
