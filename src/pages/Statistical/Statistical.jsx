import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import "./Statistical.css";
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
          name: "Revenue Service",
          value: serviceRevenue,
        },
        productRevenue !== null && {
          name: "Revenue Product",
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
    title: "My Daily Activities",
    pieHole: 0.4,
  };

  const barDataService = [
    ["Month", "Dataset 1"],
    ...revenueService.map((item) => [item.month, item.revenue]),
  ];
  const barDataProduct = [
    ["Month", "Dataset 1"],
    ...revenueProduct.map((item) => [item.month, item.revenue]),
  ];

  const barOptions = {
    title: "Monthly Data",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total",
      minValue: 0,
    },
    vAxis: {
      title: "Month",
    },
  };

  const lineOptions = {
    title: "Line Chart Example",
    curveType: "function",
    legend: { position: "bottom" },
  };

  const lineData = [
    ["Month", "Dataset 1"],
    ["January", 65],
    ["February", 59],
    ["March", 80],
    ["April", 81],
    ["May", 56],
    ["June", 55],
    ["July", 40],
  ];

  const totalBarService = barDataService
    .slice(1)
    .reduce((sum, row) => sum + row[1], 0);
  const totalBarProduct = barDataProduct
    .slice(1)
    .reduce((sum, row) => sum + row[1], 0);
  const totalPieChart = pieData.slice(1).reduce((sum, row) => sum + row[1], 0);
  const totalLineChartViews = lineData
    .slice(1)
    .reduce((sum, row) => sum + row[1], 0);

  return (
    <React.Fragment>
      <div className="baocao-container">
        <div className="grid-container">
          <div className="barchart-container col-8">
            <h3>Doanh thu hàng ngày sản phẩm</h3>
            <Chart
              chartType="Bar"
              data={barDataService}
              options={barOptions}
              width="100%"
              height="400px"
            />
          </div>
          <div className="summary-container col-4">
            <div className="box">
              Doanh thu dịch vụ: {formatter.format(totalBarService)}
            </div>
            <div className="box">
              Doanh thu sản phẩm: {formatter.format(totalBarProduct)}
            </div>
            <div className="box">
              Tổng doanh thu: {formatter.format(totalPieChart)}
            </div>
            <div className="box">
              Lượt truy cập website: {totalLineChartViews}
            </div>
          </div>
        </div>
        <div className="row-container">
          <div className="border-box col-4">
            <h3>Tổng doanh thu</h3>
            <Chart
              chartType="PieChart"
              data={pieData}
              options={pieOptions}
              width="100%"
              height="400px"
            />
          </div>
          <div className="border-box col-4">
            <h3>Doanh thu dịch vụ </h3>
            <Chart
              chartType="Bar"
              data={barDataProduct}
              options={barOptions}
              width="100%"
              height="400px"
            />
          </div>
          <div className="border-box col-4">
            <h3>Lượng truy cập</h3>
            <Chart
              chartType="Line"
              data={lineData}
              options={lineOptions}
              width="100%"
              height="400px"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Statistical;
