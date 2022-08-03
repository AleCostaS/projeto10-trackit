import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from './Components/GlobalStyle';
import Reset from './Components/Reset';
import Login from "./Components/Login";
import Registration from "./Components/Registrate.js";
import Today from "./Components/Today";
import PrivatePage from "./Components/PrivatePage";
import { AuthProvider } from "./Components/Providers/authProvider";
import Menu from "./Components/Menu";

export default function App () {
    return (
        <>
            <Reset />
            <GlobalStyle/>
            <AuthProvider >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />}/>
                        <Route path="/cadastro" element={<Registration />}/>
                        <Route path="/hoje" element={
                            <PrivatePage>
                                <Menu />
                                <Today />
                            </PrivatePage>
                        }/>
                        <Route path="/habitos" element={
                            <PrivatePage>
                                <Menu />
                                <Today />
                            </PrivatePage>
                        }/>
                        <Route path="/historico" element={
                            <PrivatePage>
                                <Menu />
                                <Today />
                            </PrivatePage>
                        }/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}