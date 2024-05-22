import "./workpages.css";
import axios from "axios";
import { getEmployee } from "../../../slices/adminSlice";
import { getEmployeeData } from "../../../stateApis/stateapi";
import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Allemployee = () => {
  const isAdminLogin = useSelector((state) => state.admin.logindetails.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateEmpData = async (data) => {
    dispatch(getEmployee(data));
  };
  // useEffect(() => {
  //   getEmployeeData(updateEmpData);
  // }, []);

  const allEmployees = useSelector((state) => state.admin.employees);
  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/delete_employee/${id}`);
      if (response.data.success) {
        toast.success('Employee has been deleted', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getEmployeeData(updateEmpData);
      } else {
        toast.error('Something went wrong', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error('Something went wrong', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const submitAlert = (key) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm-alert">
            <h1>Are you sure you want to delete Employe?</h1>
            {/* <p>This action cannot be undone.</p> */}
            <div className="button-container">
              <button
                className="delete-button"
                onClick={() => {
                  deleteEmployee(key);
                  onClose();
                }}
              >
                Yes, Delete
              </button>
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        );
      },
    });
  };

  if (isAdminLogin) {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{
            fontSize: "1.8rem",
            width: "fit-content",
            padding: "0 2rem",
          }}
        />

        <div className="all-employee-container">
        <h1 style={{ fontSize: '30px' }}>All Employees</h1>
          <table border={2}>
            <tr style={{ fontSize: '18px' }}>
              <th>
                Sno.
              </th>
              <th>
                Employee Name
              </th>
              <th>
                Employee Email 
              </th>
              <th>
                 Phone no.
              </th>
              <th>
                Delete
              </th>
            </tr>

            {allEmployees.map((key, idx) => {
              return (
                <tr style={{ fontSize: '16px' }}>
                  <td>
                    {" "}
                    {idx + 1}
                  </td>
                  <td>
                    {" "}
                    {key.name}
                  </td>
                  <td>
                    {" "}
                    {key.employee_id}{" "}
                  </td>
                  <td>
                    {" "}
                    {key.mobile}{" "}
                  </td>
                  <td>
                    {" "}
                    <MdDeleteForever
                      style={{
                        color: "red",
                        fontSize: "2.8rem",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        submitAlert(key._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </>
    );
  } else {
    navigate("/");
  }
};

export default Allemployee;
