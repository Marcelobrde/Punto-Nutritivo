function ReservationList({
    reservas,
    reservaSeleccionada,
    setReservaSeleccionada
}) {

    if (reservas.length === 0) {

        return (

            <div className="alert alert-light border">

                No existen reservas para esta fecha.

            </div>

        );

    }

    const obtenerClaseEstado = (estado) => {

        if (estado === "pendiente") {
            return "bg-success";
        }

        if (estado === "cumplida") {
            return "bg-primary";
        }

        if (estado === "cancelada") {
            return "bg-warning text-dark";
        }

        return "bg-secondary";

    };

    return (

        <div className="list-group">

            {
                reservas.map(reserva => {

                    const estaSeleccionada =
                        reservaSeleccionada?.id ===
                        reserva.id;

                    return (

                        <button
                            key={reserva.id}
                            type="button"
                            className={
                                `list-group-item list-group-item-action ${
                                    estaSeleccionada
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={() =>
                                setReservaSeleccionada(
                                    reserva
                                )
                            }
                        >

                            <div className="d-flex justify-content-between align-items-start gap-3">

                                <div>

                                    <h6 className="mb-1">
                                        {reserva.codigo}
                                    </h6>

                                    <p className="mb-1">
                                        Cliente: {reserva.nombre}
                                    </p>

                                    <p className="mb-1">
                                        Mesa: {reserva.mesaId}
                                    </p>

                                    <p className="mb-1">
                                        Hora: {reserva.hora}
                                    </p>

                                    <p className="mb-0">
                                        Personas: {reserva.personas}
                                    </p>

                                </div>

                                <span
                                    className={
                                        `badge ${
                                            obtenerClaseEstado(
                                                reserva.estado
                                            )
                                        }`
                                    }
                                >
                                    {reserva.estado}
                                </span>

                            </div>

                        </button>

                    );

                })
            }

        </div>

    );

}

export default ReservationList;