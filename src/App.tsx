import { Outlet } from "react-router-dom";
import Cabecalho from "./components/Cabecalho/Cabecalho";
import Rodape from "./components/Rodape/Rodape";
import "./globals.css"

export default function App() {
    return (
        <div>
            <Cabecalho />
                <Outlet />
            <Rodape />
        </div>
    )
}