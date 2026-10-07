import { Link } from 'react-router'

export const Navbar = () => {
    return (
        <nav>
            <Link to="/">Inicio</Link>
            <button>Cerrar sesión</button>
        </nav>
    );
};