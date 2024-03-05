import { NavLink, useLocation } from "react-router-dom";
import { GiPenguin } from "react-icons/gi";
import { Drawer } from "antd";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { decodeToken } from "../../util/decode-token";

const Navigation: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const [open, setOpen] = useState(false);
  const [accessCookie, setAccessCookie, removeAccessCookie] = useCookies([
    "access",
  ]);
  const [refreshCookie, setRefreshCookie, removeRefreshCookie] = useCookies([
    "refresh",
  ]);
  const handleLogout = () => {
    removeAccessCookie("access");
    removeRefreshCookie("refresh");
  };
  const token = decodeToken(accessCookie?.access);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="navigation-bar">
      {isDashboard ? (
        <div className="navigation-dashboard">
          <GiPenguin style={{ width: "4rem", height: "4rem" }} />
        </div>
      ) : (
        <div className="navigation-dashboard">
          <div onClick={showDrawer}>
            <GiPenguin
              className="penguin-button"
              style={{ width: "4rem", height: "4rem" }}
            />
          </div>
          <Drawer
            title="Explore!"
            placement="left"
            onClose={onClose}
            open={open}
          >
            <div className="navigation-drawer-div">
              <NavLink
                onClick={() => {
                  setOpen(false);
                }}
                to={"/dashboard"}
                className={"drawer-navlink"}
              >
                Dashboard
              </NavLink>
              <NavLink
                onClick={() => {
                  setOpen(false);
                }}
                to={"/profile"}
                className={"drawer-navlink"}
              >
                My profile
              </NavLink>
              <NavLink
                onClick={() => {
                  setOpen(false);
                }}
                to={"/projects"}
                className={"drawer-navlink"}
              >
                Project overview
              </NavLink>
              <NavLink
                onClick={() => {
                  setOpen(false);
                }}
                to={"/employees"}
                className={"drawer-navlink"}
              >
                Employee overview
              </NavLink>
              {token.Roles.includes("Admin") && (
                <NavLink
                  onClick={() => {
                    setOpen(false);
                  }}
                  to={"/administration"}
                  className={"drawer-navlink"}
                >
                  Administration
                </NavLink>
              )}
              {token.Roles.includes("Manager") && (
                <NavLink
                  onClick={() => {
                    setOpen(false);
                  }}
                  to={"/management"}
                  className={"drawer-navlink"}
                >
                  Management
                </NavLink>
              )}

              <NavLink
                onClick={handleLogout}
                to={"#"}
                className={"drawer-navlink"}
              >
                Logout
              </NavLink>
            </div>
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default Navigation;
