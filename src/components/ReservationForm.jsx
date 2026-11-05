import { useEffect, useState } from "react";

import {
    obtenerHorariosDisponibles,
    buscarMesaDisponible,
    generarCodigoReserva,
    registrarReserva,
} from "../services/reservationService";

import {actualizarReserva} from "../services/storageService";
import ReservationModal from "./ReservationModal";

function ReservationForm({
    modoAdmin = false,
    fechaInicial = "",
    onReservaCreada,
    modoEdicion = false,
    reservaInicial = null,
    onReservaActualizada
}) {

    const manana = new Date();

    manana.setDate(
        manana.getDate() + 1
    );

    const fechaMinima =
        manana.toISOString().split("T")[0];

    const [formData, setFormData] =
        useState({

            fecha:reservaInicial?.fecha ||fechaInicial,
            personas:reservaInicial?.personas? String(reservaInicial.personas): "",
            hora:reservaInicial?.hora ||"",
            nombre:reservaInicial?.nombre ||"",
            dni:reservaInicial?.dni ||"",
            correo:reservaInicial?.correo ||"",
            telefono:reservaInicial?.telefono ||""

        });

    const [
        horariosDisponibles,
        setHorariosDisponibles
    ] = useState([]);

    const [
        mostrarModal,
        setMostrarModal
    ] = useState(false);

    const [
        reservaConfirmada,
        setReservaConfirmada
    ] = useState(null);

    useEffect(() => {

        if (
            !formData.fecha ||
            !formData.personas
        ) {

            setHorariosDisponibles([]);

            return;

        }

        const horarios =
            obtenerHorariosDisponibles(
                formData.fecha,
                parseInt(
                    formData.personas,
                    10
                ),
                modoEdicion? reservaInicial?.id:null
            );

        setHorariosDisponibles(
            horarios
        );

        setFormData(prev => ({
            ...prev,
            hora:horarios.includes(prev.hora)?prev.hora:""

        }));

    }, [
        formData.fecha,
        formData.personas
    ]);

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const mesaAsignada =
            buscarMesaDisponible(
                parseInt(
                    formData.personas,
                    10
                ),
                formData.fecha,
                formData.hora,
                modoEdicion?reservaInicial?.id:null
            );

        if (!mesaAsignada) {

            window.alert(
                "No existe disponibilidad para la fecha y horario seleccionados."
            );

            return;

        }

        if (
            modoEdicion &&
            reservaInicial
        ) {

            const reservaActualizada = {

                ...reservaInicial,

                mesaId:
                    mesaAsignada.id,

                fecha:
                    formData.fecha,

                hora:
                    formData.hora,

                personas:
                    parseInt(
                        formData.personas,
                        10
                    ),

                nombre:
                    formData.nombre,

                dni:
                    formData.dni,

                correo:
                    formData.correo,

                telefono:
                    formData.telefono,

                fechaActualizacion:
                    new Date()
                        .toISOString()

            };

            actualizarReserva(
                reservaActualizada
            );

            if (
                onReservaActualizada
            ) {

                onReservaActualizada(
                    reservaActualizada
                );

            }

            return;

        }

        const codigo =
            generarCodigoReserva();

        const nuevaReserva = {

            id: Date.now(),

            codigo,

            estado: "pendiente",

            fechaCreacion:
                new Date().toISOString(),

            mesaId: mesaAsignada.id,

            fecha: formData.fecha,

            hora: formData.hora,

            personas: parseInt(
                formData.personas,
                10
            ),

            nombre: formData.nombre,

            dni: formData.dni,

            correo: formData.correo,

            telefono: formData.telefono

        };

        registrarReserva(
            nuevaReserva
        );

        if (modoAdmin) {

            if (onReservaCreada) {

                onReservaCreada(
                    nuevaReserva
                );

            }

            return;

        }

        setReservaConfirmada({

            codigo,

            mesa: mesaAsignada.numero,

            fecha: formData.fecha,

            hora: formData.hora

        });

        setMostrarModal(true);

    };

    const cerrarConfirmacion = () => {

        setMostrarModal(false);

        setFormData({
            fecha: "",
            personas: "",
            hora: "",
            nombre: "",
            dni: "",
            correo: "",
            telefono: ""
        });

        setHorariosDisponibles([]);

        setReservaConfirmada(null);

    };

    return (

        <>

            <div className="row justify-content-center">

                <div className="col-12 col-lg-8">

                    <div className="card card-custom">

                        <div className="card-body p-4">

                            <div className="alert alert-success">

                                <h5>
                                    Disponibilidad
                                </h5>

                                <p className="mb-2">
                                    Horario de atención:
                                    13:00 - 21:00
                                </p>

                                <p className="mb-2">
                                    Duración por reserva:
                                    2 horas
                                </p>

                                <p className="mb-3">
                                    Última reserva posible:
                                    19:00
                                </p>

                                {
                                    horariosDisponibles.length > 0 && (

                                        <>

                                            <hr />

                                            <strong>

                                                Horarios disponibles para

                                                {" "}

                                                {formData.personas}

                                                {" "}

                                                {
                                                    formData.personas === "1"
                                                        ? "persona"
                                                        : "personas"
                                        }:

                                            </strong>

                                            <div className="mt-2">

                                                {
                                                    horariosDisponibles.map(
                                                        horario => (

                                                            <span
                                                                key={horario}
                                                                className="badge bg-success me-2 mb-2"
                                                            >
                                                                {horario}
                                                            </span>

                                                        )
                                                    )
                                                }

                                            </div>

                                        </>

                                    )
                                }

                                {
                                    formData.fecha &&
                                    formData.personas &&
                                    horariosDisponibles.length === 0 && (

                                        <div className="alert alert-warning mt-3 mb-0">

                                            No existen horarios disponibles para
                                            la fecha y cantidad de personas
                                            seleccionadas.

                                        </div>

                                    )
                                }

                            </div>

                            <form onSubmit={handleSubmit}>

                                <h5 className="mb-3">
                                    Datos de la Reserva
                                </h5>

                                {
                                    modoAdmin && !modoEdicion ? (

                                        <div className="alert alert-reserva mb-3">

                                            Fecha seleccionada:

                                            {" "}

                                            <strong>
                                                {formData.fecha}
                                            </strong>

                                        </div>

                                    ) : (

                                        <div className="mb-3">

                                            <label className="form-label">
                                                Fecha
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                name="fecha"
                                                value={formData.fecha}
                                                onChange={handleChange}
                                                min={fechaMinima}
                                                required
                                            />

                                        </div>

                                    )
                                }

                                <div className="mb-3">

                                    <label className="form-label">
                                        Cantidad de Personas
                                    </label>

                                    <select
                                        className="form-select"
                                        name="personas"
                                        value={formData.personas}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Seleccione cantidad
                                        </option>

                                        <option value="1">
                                            1 persona
                                        </option>

                                        <option value="2">
                                            2 personas
                                        </option>

                                        <option value="3">
                                            3 personas
                                        </option>

                                        <option value="4">
                                            4 personas
                                        </option>

                                        <option value="5">
                                            5 personas
                                        </option>

                                        <option value="6">
                                            6 personas
                                        </option>

                                        <option value="7">
                                            7 personas
                                        </option>

                                        <option value="8">
                                            8 personas
                                        </option>

                                    </select>

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Hora
                                    </label>

                                    <select
                                        className="form-select"
                                        name="hora"
                                        value={formData.hora}
                                        onChange={handleChange}
                                        disabled={
                                            !formData.fecha ||
                                            !formData.personas ||
                                            horariosDisponibles.length === 0
                                        }
                                        required
                                    >

                                        <option value="">
                                            Seleccione horario
                                        </option>

                                        {
                                            horariosDisponibles.map(
                                                horario => (

                                                    <option
                                                        key={horario}
                                                        value={horario}
                                                    >
                                                        {horario}
                                                    </option>

                                                )
                                            )
                                        }

                                    </select>

                                </div>

                                <h5 className="mb-3">
                                    Datos Personales
                                </h5>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Nombre Completo
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        DNI
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="dni"
                                        value={formData.dni}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Correo Electrónico
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label className="form-label">
                                        Teléfono
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="d-grid">

                                    <button
                                        type="submit"
                                        className="btn btn-custom btn-lg"
                                        disabled={
                                            horariosDisponibles.length === 0
                                        }
                                    >
                                        {
                                            modoEdicion? "Guardar cambios":
                                            modoAdmin? "Registrar Reserva": "Reservar Mesa"
                                        }
                                    </button>

                                </div>

                                {
                                    !modoAdmin && (

                                        <small className="d-block text-muted mt-3">

                                            Las reservas tienen una duración de
                                            2 horas. Existe una tolerancia máxima
                                            de 30 minutos para presentarse.
                                            Transcurrido ese periodo la reserva
                                            podrá cancelarse.

                                        </small>

                                    )
                                }

                            </form>

                        </div>

                    </div>

                </div>

            </div>

            {
                !modoAdmin && (

                    <ReservationModal
                        visible={mostrarModal}
                        reserva={reservaConfirmada}
                        onClose={cerrarConfirmacion}
                    />

                )
            }

        </>

    );

}

export default ReservationForm;