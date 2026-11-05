import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import logoHome from "../assets/logo-home.png";
import heroImage from "../assets/hero-restaurante.jpg";
import reservaRapida from "../assets/reserva-rapida.jpg";
import gestionReservas from "../assets/gestion-reservas.jpg";

function Home() {
    return (
        <>
            <Navbar />

            <main className="main-content">

                <section className="container py-5 text-center">

                    <img
                        src={logoHome}
                        alt="Punto Nutritivo"
                        className="logo-home mb-4"
                    />

                    <p className="lead">
                        Reserva tu mesa de forma rápida, sencilla y segura.
                    </p>

                    <Link
                        to="/reservar"
                        className="btn btn-custom btn-lg mt-3"
                    >
                        Reservar Mesa
                    </Link>

                </section>

                <section className="container mb-5">

                    <img
                        src={heroImage}
                        alt="Restaurante Punto Nutritivo"
                        className="hero-image"
                    />

                </section>

                <section className="container py-4">

                    <div className="row g-4">

                        <div className="col-12 col-md-4">
                            <div className="card card-custom h-100">

                                <img
                                    src={reservaRapida}
                                    alt="Reserva rápida"
                                    className="card-img-top"
                                />

                                <div className="card-body text-center">

                                    <h5 className="card-title">
                                        Reserva Rápida
                                    </h5>

                                    <p className="card-text">
                                        Realiza una reserva en pocos pasos desde cualquier dispositivo.
                                    </p>

                                </div>

                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="card card-custom h-100">

                                <div className="card-body text-center">

                                    <div className="icon-container">
                                        ✓
                                    </div>

                                    <h5 className="card-title">
                                        Confirmación Inmediata
                                    </h5>

                                    <p className="card-text">
                                        Recibe una confirmación inmediata una vez registrada tu reserva.
                                    </p>

                                </div>

                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="card card-custom h-100">

                                <img
                                    src={gestionReservas}
                                    alt="Gestión eficiente"
                                    className="card-img-top"
                                />

                                <div className="card-body text-center">

                                    <h5 className="card-title">
                                        Gestión Eficiente
                                    </h5>

                                    <p className="card-text">
                                        Evita conflictos y duplicaciones mediante la asignación automática de mesas.
                                    </p>

                                </div>

                            </div>
                        </div>

                    </div>

                </section>

            </main>

            <footer
                className="text-center py-4 mt-auto"
                style={{ backgroundColor: "#2E7D32", color: "white" }}
            >
                Punto Nutritivo © 2026
            </footer>

        </>
    );
}

export default Home;