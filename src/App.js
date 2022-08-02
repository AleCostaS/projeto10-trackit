import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from './Components/GlobalStyle';
import Reset from './Components/Reset';
import Login from "./Components/Login";
import Registration from "./Components/Registrate.js";
import Today from "./Components/Today";

export default function App () {
    return (
        <>
            <Reset />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />}/>
                        <Route path="/cadastro" element={<Registration />}/>
                        <Route path="/hoje" element={<Today />}/>
                    </Routes>
                </BrowserRouter>
        </>
    );
}