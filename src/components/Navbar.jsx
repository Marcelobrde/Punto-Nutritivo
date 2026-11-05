import { Link } from "react-router-dom";

import logoNavbar from "../assets/logo-navbar.png";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#2E7D32" }}
    >
      <div className="container">

        <Link className="navbar-brand" to="/">
            <img
                src={logoNavbar}
                alt="Punto Nutritivo"
                style={{
                    height: "50px",
                    width: "auto"
                }}
            />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContenido"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContenido">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/reservar">
                Reservar Mesa
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/login">
                Admin
              </Link>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;