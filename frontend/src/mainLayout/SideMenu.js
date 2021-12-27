import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { Layout, Menu } from "antd";

import "./TopBar.css";

/* -------------------------------------------------------------------------- */
/*                                  Side Menu                                 */
/* -------------------------------------------------------------------------- */
function SideMenu() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const { Sider } = Layout;
  const { pathname } = useLocation();
  const [selected, setSelected] = useState(null);
  const routes = [
    {
      path: "/dashboard",
      name: "Dashboard",
    },
    {
      path: "/teatchers",
      name: "Teatchers",
    },
    {
      path: "/students",
      name: "Students",
    },
  ];

  useEffect(() => {
    const routeIndex = routes.findIndex((route) => route.path === pathname);
    if (routeIndex) {
      setSelected(routeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* -------------------------------- RENDERING ------------------------------- */
  return (
    <Sider>
      <Menu defaultSelectedKeys={["0"]} selectedKeys={selected} mode="vertical">
        {routes.map((item, index) => (
          <Menu.Item className="menu-side-item" key={index}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default SideMenu;