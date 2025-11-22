import { Outlet } from "react-router-dom";
import Cabecalho from "./components/Cabecalho/Cabecalho";
import Rodape from "./components/Rodape/Rodape";
import "./globals.css"

export default function App() {
    return (
        <div className="min-h-screen dark:bg-gray-900 bg-white transition-colors duration-300">
            <Cabecalho />
            <Outlet />
            <Rodape />
        </div>
    )
}