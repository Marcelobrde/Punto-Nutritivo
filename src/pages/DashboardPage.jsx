import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import AdminCalendar from "../components/AdminCalendar";
import MonthlySummary from "../components/MonthlySummary";
import ReservationList from "../components/ReservationList";
import AdminReservationModal from "../components/AdminReservationModal";
import {cerrarSesionAdmin} from "../services/authService";
import EditReservationModal from "../components/EditReservationModal";

import {
    obtenerReservas,
    cambiarEstadoReserva,
    eliminarReserva
} from "../services/storageService";

function DashboardPage() {

    const navigate = useNavigate();

    const hoy = new Date();

    const crearFechaLocal = (
        anio,
        mes,
        dia
    ) => {

        const mesFormateado =
            String(mes + 1).padStart(
                2,
                "0"
            );

        const diaFormateado =
            String(dia).padStart(
                2,
                "0"
            );

        return `${anio}-${mesFormateado}-${diaFormateado}`;

    };

    const fechaInicial =
        crearFechaLocal(
            hoy.getFullYear(),
            hoy.getMonth(),
            hoy.getDate()
        );

    const [
        fechaSeleccionada,
        setFechaSeleccionada
    ] = useState(fechaInicial);

    const [
        mesActual,
        setMesActual
    ] = useState(
        new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            1
        )
    );

    const [
        reservas,
        setReservas
    ] = useState([]);

    const [
        reservaSeleccionada,
        setReservaSeleccionada
    ] = useState(null);

    const [
        mostrarFormulario,
        setMostrarFormulario
    ] = useState(false);

    const cargarReservas = () => {

        setReservas(
            obtenerReservas()
        );

    };

    useEffect(() => {

        cargarReservas();

    }, []);

    useEffect(() => {

        setReservaSeleccionada(null);

    }, [fechaSeleccionada]);

    const reservasDia =
        reservas.filter(
            reserva =>
                reserva.fecha ===
                fechaSeleccionada
        );

    const mesMostrado =
        mesActual.getMonth();

    const anioMostrado =
        mesActual.getFullYear();

    const reservasMes =
        reservas.filter(reserva => {

            const [
                anioReserva,
                mesReserva
            ] = reserva.fecha
                .split("-")
                .map(Number);

            return (
                anioReserva === anioMostrado &&
                mesReserva - 1 === mesMostrado
            );

        });

    const pendientes =
        reservasMes.filter(
            reserva =>
                reserva.estado ===
                "pendiente"
        ).length;

    const cumplidas =
        reservasMes.filter(
            reserva =>
                reserva.estado ===
                "cumplida"
        ).length;

    const canceladas =
        reservasMes.filter(
            reserva =>
                reserva.estado ===
                "cancelada"
        ).length;

    const cerrarSesion = () => {

        cerrarSesionAdmin();

        navigate(
            "/admin/login   "
        );

    };
    const abrirFormulario = () => {

        setMostrarFormulario(true);

    };

    const cerrarFormulario = () => {

        setMostrarFormulario(false);

        cargarReservas();

        setReservaSeleccionada(null);

    };

    const reservaCreada = () => {

        setMostrarFormulario(false);

        cargarReservas();

        setReservaSeleccionada(null);

    };

    const marcarCumplida = () => {

        if (!reservaSeleccionada) {
            return;
        }

        if (
            reservaSeleccionada.estado !==
            "pendiente"
        ) {
            return;
        }

        cambiarEstadoReserva(
            reservaSeleccionada.id,
            "cumplida"
        );

        cargarReservas();

        setReservaSeleccionada(null);

    };

    const abrirEdicion = () => {

        if (
            !reservaSeleccionada
        ) {
            return;
        }

        setMostrarEdicion(true);

    };

    const cerrarEdicion = () => {

        setMostrarEdicion(false);

        setReservaSeleccionada(
            null
        );

    };

    const reservaActualizada = (
        reserva
    ) => {

        setMostrarEdicion(false);

        cargarReservas();

        setFechaSeleccionada(
            reserva.fecha
        );

        const [
            anio,
            mes
        ] = reserva.fecha
            .split("-")
            .map(Number);

        setMesActual(
            new Date(
                anio,
                mes - 1,
                1
            )
        );

        setReservaSeleccionada(
            null
        );

    };

    const cancelarReserva = () => {

        if (!reservaSeleccionada) {
            return;
        }

        if (
            reservaSeleccionada.estado !==
            "pendiente"
        ) {
            return;
        }

        const confirmar =
            window.confirm(
                `¿Desea cancelar la reserva ${reservaSeleccionada.codigo}?`
            );

        if (!confirmar) {
            return;
        }

        cambiarEstadoReserva(
            reservaSeleccionada.id,
            "cancelada"
        );

        cargarReservas();

        setReservaSeleccionada(null);

    };

    const borrarReserva = () => {

        if (!reservaSeleccionada) {
            return;
        }

        const confirmar =
            window.confirm(
                `¿Desea eliminar definitivamente la reserva ${reservaSeleccionada.codigo}? Esta acción no se puede deshacer.`
            );

        if (!confirmar) {
            return;
        }

        eliminarReserva(
            reservaSeleccionada.id
        );

        cargarReservas();

        setReservaSeleccionada(
            null
        );

    };

    const puedeModificar =
        reservaSeleccionada &&
        reservaSeleccionada.estado ===
            "pendiente";

    const [
        mostrarEdicion,
        setMostrarEdicion
    ] = useState(false);

    return (

        <>

            <main className="main-content">

                <div className="container py-4">

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                        <h1 className="section-title m-0">
                            Dashboard Administrativo
                        </h1>

                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={cerrarSesion}
                        >
                            Cerrar sesión
                        </button>

                    </div>

                    <div className="row g-4">

                        <div className="col-12 col-lg-8">

                            <AdminCalendar
                                reservas={reservas}
                                fechaSeleccionada={
                                    fechaSeleccionada
                                }
                                setFechaSeleccionada={
                                    setFechaSeleccionada
                                }
                                mesActual={mesActual}
                                setMesActual={
                                    setMesActual
                                }
                            />

                        </div>

                        <div className="col-12 col-lg-4">

                            <MonthlySummary
                                pendientes={pendientes}
                                cumplidas={cumplidas}
                                canceladas={canceladas}
                            />

                        </div>

                    </div>

                    <div className="card card-custom mt-4">

                        <div className="card-body">

                            <h4 className="section-title mb-3">

                                Reservas del día

                                {" "}

                                {fechaSeleccionada}

                            </h4>

                            <p className="text-muted">

                                Seleccione una reserva para habilitar
                                las acciones administrativas.

                            </p>

                            <ReservationList
                                reservas={reservasDia}
                                reservaSeleccionada={
                                    reservaSeleccionada
                                }
                                setReservaSeleccionada={
                                    setReservaSeleccionada
                                }
                            />

                            {
                                reservaSeleccionada && (

                                    <div className="alert alert-reserva mt-3">

                                        Reserva seleccionada:

                                        {" "}

                                        <strong>
                                            {
                                                reservaSeleccionada.codigo
                                            }
                                        </strong>

                                        {" · "}

                                        Estado:

                                        {" "}

                                        <strong>
                                            {
                                                reservaSeleccionada.estado
                                            }
                                        </strong>

                                    </div>

                                )
                            }

                            <div className="d-flex flex-wrap gap-2 mt-4">

                                <button
                                    type="button"
                                    className="btn btn-custom"
                                    onClick={
                                        abrirFormulario
                                    }
                                >
                                    Crear Reserva
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled={
                                        !puedeModificar
                                    }
                                    onClick={abrirEdicion}
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-success"
                                    disabled={
                                        !puedeModificar
                                    }
                                    onClick={
                                        marcarCumplida
                                    }
                                >
                                    Marcar Cumplida
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    disabled={
                                        !puedeModificar
                                    }
                                    onClick={
                                        cancelarReserva
                                    }
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    disabled={
                                        !reservaSeleccionada
                                    }
                                    onClick={
                                        borrarReserva
                                    }
                                >
                                    Eliminar
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

            <AdminReservationModal
                visible={mostrarFormulario}
                fechaSeleccionada={fechaSeleccionada}
                onClose={cerrarFormulario}
                onReservaCreada={reservaCreada}
            />

            <EditReservationModal
                visible={mostrarEdicion}
                reserva={reservaSeleccionada}
                onClose={cerrarEdicion}
                onReservaActualizada={reservaActualizada}
            />

        </>

    );

}

export default DashboardPage;