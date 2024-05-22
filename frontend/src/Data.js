import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";

import { BiTask } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";


const adminroutes = [
  {
    path: "/dashboard/admindashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/dashboard/setemployee",
    name: "Add Employee",
    icon: <FaUser />,
  },
  {
    path: "/dashboard/allemployee",
    name: "All Employees",
    icon: <FaUsers />,
  },

  {
    path: "/dashboard/settask",
    name: "Add task",
    icon: <BiTask />,
  },
  {
    path: "/dashboard/alltask",
    name: "All Tasks",
    icon: <BsListTask />,
  },
 
 
];

const employeeroutes = [
  {
    path: "/employee/dashboard/EmpDashboard",
    name: "My Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/employee/dashboard/mytask",
    name: "MyTasks",
    icon: <BsListTask />,
  },
];

export { adminroutes, employeeroutes };
