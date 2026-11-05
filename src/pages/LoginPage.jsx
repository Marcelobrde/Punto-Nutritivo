import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import logoHome from "../assets/logo-home.png";

import {
    adminData
} from "../data/adminData";

import {
    iniciarSesionAdmin
} from "../services/authService";

function LoginPage() {

    const navigate =
        useNavigate();

    const [
        usuario,
        setUsuario
    ] = useState("");

    const [
        contrasena,
        setContrasena
    ] = useState("");

    const [
        error,
        setError
    ] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            usuario ===
                adminData.usuario &&
            contrasena ===
                adminData.contrasena
        ) {

            setError("");

            iniciarSesionAdmin();

            navigate(
                "/dashboard"
            );

            return;

        }

        setError(
            "Usuario o contraseña incorrectos."
        );

    };

    return (

        <main className="main-content">

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-12 col-md-8 col-lg-5">

                        <div className="card card-custom">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-end">

                                    <Link
                                        to="/"
                                        className="btn-close"
                                        aria-label="Cerrar"
                                    />

                                </div>

                                <div className="text-center">

                                    <img
                                        src={logoHome}
                                        alt="Punto Nutritivo"
                                        className="img-fluid mb-3"
                                        style={{
                                            maxWidth:
                                                "180px"
                                        }}
                                    />

                                    <h2 className="section-title">
                                        Panel Administrativo
                                    </h2>

                                </div>

                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Usuario
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                usuario
                                            }
                                            onChange={
                                                (e) =>
                                                    setUsuario(
                                                        e.target.value
                                                    )
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Contraseña
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            value={
                                                contrasena
                                            }
                                            onChange={
                                                (e) =>
                                                    setContrasena(
                                                        e.target.value
                                                    )
                                            }
                                            required
                                        />

                                    </div>

                                    {
                                        error && (

                                            <div className="alert alert-danger">

                                                {error}

                                            </div>

                                        )
                                    }

                                    <div className="d-grid">

                                        <button
                                            type="submit"
                                            className="btn btn-custom"
                                        >
                                            Iniciar Sesión
                                        </button>

                                    </div>

                                </form>

                                <hr />

                                <div className="text-center">

                                    <small className="text-muted">
                                        ¿Olvidó su contraseña?
                                    </small>

                                    <br />

                                    <small className="text-muted">
                                        Comuníquese con el departamento de IT
                                    </small>

                                    <br />

                                    <strong>
                                        987654321
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </main>

    );

}

export default LoginPage;