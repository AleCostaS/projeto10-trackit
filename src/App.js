import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from './Components/GlobalStyle';
import Reset from './Components/Reset';
import Login from "./Components/Login";
import Registration from "./Components/Registrate.js";
import Today from "./Components/Today";
import PrivatePage from "./Components/PrivatePage";

export default function App () {
    return (
        <>
            <Reset />
            <GlobalStyle/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />}/>
                        <Route path="/cadastro" element={<Registration />}/>
                        <Route path="/hoje" element={
                            <PrivatePage>
                                <Today />
                            </PrivatePage>
                        }/>
                    </Routes>
                </BrowserRouter>
        </>
    );
}