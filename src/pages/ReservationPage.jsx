import Navbar from "../components/Navbar";
import ReservationForm from "../components/ReservationForm";

function ReservationPage() {

    return (
        <>
            <Navbar />

            <main className="main-content">

                <div className="container py-5">

                    <div className="text-center mb-5">

                        <h1 className="section-title">
                            Reservar Mesa
                        </h1>

                        <p className="lead">
                            Complete sus datos para registrar una reserva en Punto Nutritivo.
                        </p>

                    </div>

                    <ReservationForm />

                </div>

            </main>

            <footer
                className="text-center py-4 mt-auto"
                style={{
                    backgroundColor: "#2E7D32",
                    color: "white"
                }}
            >
                Punto Nutritivo © 2026
            </footer>

        </>
    );
}

export default ReservationPage;