import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home, Login } from "../index";

export function MyRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    
    )
}