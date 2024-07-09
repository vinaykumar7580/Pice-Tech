import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Players from "../Pages/Players";
import Dashboard from "../Pages/Dashboard";

function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Players/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    )
}
export default AllRoutes