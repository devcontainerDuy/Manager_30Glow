import React from 'react';
import Header from "../../layouts/Header";
import { Chart } from 'react-google-charts';
import './Baocao.css';

function Baocao() {
    // Sample data for the pie chart
    const pieData = [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7],
    ];

    // Options for the pie chart
    const pieOptions = {
        title: 'My Daily Activities',
        pieHole: 0.4,
    };

    // Sample data for the bar charts
    const barData = [
        ['Month', 'Dataset 1', 'Dataset 2'],
        ['January', 65, 28],
        ['February', 59, 48],
        ['March', 80, 40],
        ['April', 81, 19],
        ['May', 56, 86],
        ['June', 55, 27],
        ['July', 40, 90],
    ];

    // Options for the bar charts
    const barOptions = {
        title: 'Monthly Data',
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Total',
            minValue: 0,
        },
        vAxis: {
            title: 'Month',
        },
    };

    // Options for the line chart
    const lineOptions = {
        title: 'Line Chart Example',
        curveType: 'function',
        legend: { position: 'bottom' },
    };

    // Sample data for the line chart with only one dataset
    const lineData = [
        ['Month', 'Dataset 1'],
        ['January', 65],
        ['February', 59],
        ['March', 80],
        ['April', 81],
        ['May', 56],
        ['June', 55],
        ['July', 40],
    ];

    // Calculate totals
    const totalBarChart1 = barData.slice(1).reduce((sum, row) => sum + row[1], 0);
    const totalBarChart2 = barData.slice(1).reduce((sum, row) => sum + row[2], 0);
    const totalPieChart = pieData.slice(1).reduce((sum, row) => sum + row[1], 0);
    const totalLineChartViews = lineData.slice(1).reduce((sum, row) => sum + row[1], 0);

    return (
        <>
            <Header />
            <div className="baocao-container">
                <div className="grid-container">
                    <div className="barchart-container col-8">
                        <h3>Doanh thu hàng ngày sản phẩm</h3>
                        <Chart
                            chartType="Bar"
                            data={barData}
                            options={barOptions}
                            width="100%"
                            height="400px"
                        />
                    </div>
                    <div className="summary-container col-4">
                        <div className="box">Doanh thu hằng ngày: {totalBarChart1}</div>
                        <div className="box">Doanh thu dịch vụ: {totalBarChart2}</div>
                        <div className="box">Doanh thu theo giờ: {totalPieChart}</div>
                        <div className="box">Lượt truy cập website: {totalLineChartViews}</div>
                    </div>
                </div>
                <div className="row-container">
                    
                    <div className="border-box col-4">
                        <h3>Doanh thu theo giờ</h3>
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
                            data={barData}
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
        </>
    );
}

export default Baocao;