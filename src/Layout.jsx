import React from "react";
import { Navbar, Sidebar } from "../src/component/index.js";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <Navbar />
            <div className="sm:flex">
                <div className="sm:w-1/6 ">
                    <Sidebar />
                </div>
                <div className="sm:w-5/6">
                        <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;