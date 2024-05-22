import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmpDashboard=()=> {
    const [proData, setProData] = useState([]);
    const [TaskStatus, setTaskStatus] = useState([]);

    const pendingComplaints= TaskStatus.filter(task => task.status === 'Pending').length;
    const InProgressTask= TaskStatus.filter(task => task.status === 'InProgress').length;
    const CompletedTask= TaskStatus.filter(task => task.status === 'Completed').length;

    // console.log("pending task",pendingComplaints);

    // // const orders = 150; // Example static data
    // const inventory = 20; // Example static data
    // const customers = 15; // Example static data
    // const revenue = 5; // Example static data

    const recentOrders = [
        { title: "Product 1", quantity: 2, discountedPrice: 20 },
        { title: "Product 2", quantity: 1, discountedPrice: 15 },
        { title: "Product 3", quantity: 3, discountedPrice: 25 },
    ]; // Example static data

    const reveneuData = {
        labels: ["Total Employes","In-Progress", "Pending", "Completed"],
        datasets: [{
            label:  [
              "Tasks Performances"
            ],
            data: [proData.length, pendingComplaints, InProgressTask, CompletedTask],
            backgroundColor: [
                "#874CCC",   // Employes
                // "#51829B",  // Task
                "#FB6D48",   // In-Progress
                "#E72929", // Pending
                "#4CCD99"    // Completed
            ],
        }],
    };
    

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Company Statistics (Tasks)",
            },
        },
    };

    const EmpData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/getemployee');
          console.log(response);
          setProData(response.data);
          console.log("data is",proData);
        } catch (error) {
          console.log('Error while fetching data:', error);
        }
      };
    const TaskData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/gettask');
          console.log(response);
          setTaskStatus(response.data);
          console.log("data is",proData);
        } catch (error) {
          console.log('Error while fetching data:', error);
        }
      };
    
      useEffect(() => {
        EmpData();
        TaskData();
      }, []);

    return (
        <Space size={20} direction="vertical" style={{ marginLeft: "420px" }}>
            <Typography.Title level={10} color="white" style={{overflowY:"hidden"}}>My Dashboard</Typography.Title>
            <Space direction="horizontal">
           
                <DashboardCard
                    icon={<UserOutlined style={{ color: "white", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />}
                    title={"Total Employes"}
                    value={proData.length}
                />
                  <DashboardCard
                    icon={<UserOutlined style={{ color: "white", backgroundColor: "red", borderRadius: 20, fontSize: 24, padding: 8 }} />}
                    title={"Total  Pending Task"}
                    value={pendingComplaints}
                />
                
                <DashboardCard
                    icon={<UserOutlined style={{ color: "white", backgroundColor: "orange", borderRadius: 20, fontSize: 24, padding: 8 }} />}
                    title={"Total Task Inprogress "}
                    value={InProgressTask}
                />
              
                <DashboardCard
                    icon={<UserOutlined style={{ color: "white", backgroundColor: "green", borderRadius: 20, fontSize: 24, padding: 8 }} />}
                    title={"Total Task Completed"}
                    value={CompletedTask}
                />
            </Space>
            <Space>
                <RecentOrders recentOrders={recentOrders} />
                <DashboardChart reveneuData={reveneuData} options={options} />
            </Space>
        </Space>
    );
}

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

function RecentOrders({ recentOrders }) {
    return (
        <>
            {/* <Typography.Text>Recent Complains</Typography.Text> */}
            {/* <Table
                columns={[
                    { title: "Title", dataIndex: "title" },
                    { title: "Quantity", dataIndex: "quantity" },
                    { title: "Price", dataIndex: "discountedPrice" },
                ]}
                dataSource={recentOrders}
                pagination={false}
            /> */}
        </>
    );
}

function DashboardChart({ reveneuData, options }) {
    return (
        <Card style={{ width: 1000, height: 600 }}>
            <Bar options={options} data={reveneuData} />
        </Card>
    );
}

export default EmpDashboard;
