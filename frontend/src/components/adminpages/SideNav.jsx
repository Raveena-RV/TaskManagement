import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { FaBars, FaHome } from "react-icons/fa"; // Import FaHome for the dashboard icon
import { adminroutes } from "../../Data";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { adminLogout } from "../../slices/adminSlice";
import { Outlet } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";

const SideNav = () => {
  const isAdminLogin = useSelector((state) => state.admin.logindetails.isLogin);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      width: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const sidebarAnimation = {
    hidden: { width: 45 },
    show: { width: isOpen ? 250 : 55 },
  };

  return (
    <>
      {isAdminLogin ? (
        <div className="main-container">
          <div className="heading-container">
            {/* Dashboard Icon */}

            {/* Logout Icon */}
            <div
              onClick={() => {
                dispatch(adminLogout());
                navigate("/");
              }}
            >
              <div className="icon2">
                <IoMdLogOut />
              </div>
            </div>
          </div>

          <motion.div
            className="sidebar"
            initial="hidden"
            animate="show"
            variants={sidebarAnimation}
            transition={{ duration: 0.5 }}
          >
            <div className="top_section">
              <div className="bars" onClick={toggle}>
                {isOpen ? <FaTimes /> : <FaBars />}
              </div>
            </div>

            <section className="routes">
              {adminroutes.map((route, index) => (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              ))}
            </section>
          </motion.div>

          <main>
            <Outlet />
          </main>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default SideNav;
