import React from "react";
import Heading from "./Heading";
import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <main>
            <Heading/>
            <Outlet/>
        </main>
    );
}

export default Layout;