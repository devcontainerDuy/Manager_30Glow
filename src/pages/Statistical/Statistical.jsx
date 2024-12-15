import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import useAuthenContext from "@/contexts/AuthenContext";
import axios from "axios";

function Statistical() {
  const { token } = useAuthenContext();
  const [revenueService, setRevenueService] = useState([]);
  const [revenueProduct, setRevenueProduct] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);

  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    const fetchRevenueService = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/revenue/service",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setRevenueService(response.data.data.monthly_revenue);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    };

    const fetchRevenueProduct = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + "/revenue/products",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setRevenueProduct(response.data.data.monthly_revenue);
        return response.data.data;
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    };

    fetchRevenueProduct();
    fetchRevenueService();

    const fetchTotalRevenue = async () => {
      const [serviceRevenue, productRevenue] = await Promise.all([
        fetchRevenueService(),
        fetchRevenueProduct(),
      ]);

      const revenueArray = [
        serviceRevenue !== null && {
          name: "Dịch vụ",
          value: serviceRevenue,
        },
        productRevenue !== null && {
          name: "Sản phẩm",
          value: productRevenue,
        },
      ].filter((item) => item);

      setTotalRevenue(revenueArray);
    };
    fetchTotalRevenue();
  }, [token]);

  const pieData = [
    ["Task", "Hours per Day"],
    ...totalRevenue.map((item) => [item.name, item.value.revenue_year]),
  ];

  const pieOptions = {
    pieHole: 0.4,
  };

  const barDataService = [
    ["Tháng", "Doanh thu"],
    ...revenueService.map((item) => [item.month, item.revenue]),
  ];

  const barDataProduct = [
    ["Tháng", "Doanh thu"],
    ...revenueProduct.map((item) => [item.month, item.revenue]),
  ];

  const barOptions = {
    title: "Doanh thu hàng tháng",
    chartArea: { width: "70%" },
    hAxis: {
      title: "Doanh thu",
      minValue: 0,
    },
    vAxis: {
      title: "Tháng",
    },
  };

  const totalBarService = barDataService
    .slice(1)
    .reduce((sum, row) => sum + row[1], 0);
  const totalBarProduct = barDataProduct
    .slice(1)
    .reduce((sum, row) => sum + row[1], 0);
  const totalPieChart = pieData.slice(1).reduce((sum, row) => sum + row[1], 0);

  return (
    <React.Fragment>
      <div className="container mt-4">
        <div className="row text-center g-4">
          <div className="col-lg-4 col-md-6">
            <div className="summary-box p-4 bg-light rounded shadow">
              <h5>Doanh thu dịch vụ</h5>
              <p className="text-primary fs-5 fw-bold">
                {formatter.format(totalBarService)}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="summary-box p-4 bg-light rounded shadow">
              <h5>Doanh thu sản phẩm</h5>
              <p className="text-success fs-5 fw-bold">
                {formatter.format(totalBarProduct)}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="summary-box p-4 bg-light rounded shadow">
              <h5>Tổng doanh thu</h5>
              <p className="text-danger fs-5 fw-bold">
                {formatter.format(totalPieChart)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="chart-box bg-white p-4 rounded shadow">
              <h5>Doanh thu dịch vụ hằng tháng</h5>
              <Chart
                chartType="Bar"
                data={barDataService}
                options={barOptions}
                width="100%"
                height="300px"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="chart-box bg-white p-4 rounded shadow">
              <h5>So sánh doanh thu</h5>
              <Chart
                chartType="PieChart"
                data={pieData}
                options={pieOptions}
                width="100%"
                height="300px"
              />
            </div>
          </div>
        </div>

        <div className="row g-4 mt-4">
          <div className="col-lg-6 mx-auto">
            <div className="chart-box bg-white p-4 rounded shadow">
              <h5>Doanh thu sản phẩm hằng tháng</h5>
              <Chart
                chartType="Bar"
                data={barDataProduct}
                options={barOptions}
                width="100%"
                height="300px"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Statistical;
