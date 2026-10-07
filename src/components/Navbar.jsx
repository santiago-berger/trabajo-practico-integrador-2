import { Link } from 'react-router'

export const Navbar = () => {
    return (
        <nav className="flex justify-between bg-blue-600 p-4 text-white">
            <Link to="/">Inicio</Link>
            <button className="cursor-pointer">Cerrar sesión</button>
        </nav>
    );
};