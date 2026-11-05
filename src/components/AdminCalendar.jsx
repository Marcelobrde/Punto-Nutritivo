const NOMBRES_MESES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

const DIAS_SEMANA = [
    "L",
    "M",
    "X",
    "J",
    "V",
    "S",
    "D"
];

function AdminCalendar({
    reservas,
    fechaSeleccionada,
    setFechaSeleccionada,
    mesActual,
    setMesActual
}) {

    const anio = mesActual.getFullYear();
    const mes = mesActual.getMonth();

    const primerDiaMes = new Date(
        anio,
        mes,
        1
    );

    const ultimoDiaMes = new Date(
        anio,
        mes + 1,
        0
    );

    const cantidadDias =
        ultimoDiaMes.getDate();

    const desplazamientoInicial =
        primerDiaMes.getDay() === 0
            ? 6
            : primerDiaMes.getDay() - 1;

    const construirFecha = (dia) => {

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

    const obtenerReservasDia = (dia) => {

        const fecha =
            construirFecha(dia);

        return reservas.filter(
            reserva =>
                reserva.fecha === fecha
        );

    };

    const obtenerClaseEstado = (dia) => {

        const reservasDia =
            obtenerReservasDia(dia);

        if (reservasDia.length === 0) {
            return "calendar-day-empty";
        }

        const tienePendientes =
            reservasDia.some(
                reserva =>
                    reserva.estado ===
                    "pendiente"
            );

        if (tienePendientes) {
            return "calendar-day-pending";
        }

        const tieneCanceladas =
            reservasDia.some(
                reserva =>
                    reserva.estado ===
                    "cancelada"
            );

        if (tieneCanceladas) {
            return "calendar-day-cancelled";
        }

        const todasCumplidas =
            reservasDia.every(
                reserva =>
                    reserva.estado ===
                    "cumplida"
            );

        if (todasCumplidas) {
            return "calendar-day-completed";
        }

        return "calendar-day-empty";

    };

    const seleccionarDia = (dia) => {

        setFechaSeleccionada(
            construirFecha(dia)
        );

    };

    const cambiarMes = (cantidad) => {

        const nuevoMes = new Date(
            anio,
            mes + cantidad,
            1
        );

        setMesActual(nuevoMes);

        const nuevoAnio =
            nuevoMes.getFullYear();

        const nuevoNumeroMes =
            String(
                nuevoMes.getMonth() + 1
            ).padStart(2, "0");

        setFechaSeleccionada(
            `${nuevoAnio}-${nuevoNumeroMes}-01`
        );

    };

    const celdasVacias =
        Array.from(
            {
                length:
                    desplazamientoInicial
            },
            (_, indice) => indice
        );

    const diasDelMes =
        Array.from(
            {
                length: cantidadDias
            },
            (_, indice) => indice + 1
        );

    return (

        <div className="card card-custom calendar-watermark">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() =>
                            cambiarMes(-1)
                        }
                        aria-label="Mes anterior"
                    >
                        ‹
                    </button>

                    <h3 className="section-title m-0 text-center">

                        {
                            NOMBRES_MESES[
                                mes
                            ]
                        }

                        {" "}

                        {anio}

                    </h3>

                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() =>
                            cambiarMes(1)
                        }
                        aria-label="Mes siguiente"
                    >
                        ›
                    </button>

                </div>

                <div className="calendar-grid calendar-weekdays">

                    {
                        DIAS_SEMANA.map(
                            diaSemana => (

                                <div
                                    key={diaSemana}
                                    className="calendar-weekday"
                                >
                                    {diaSemana}
                                </div>

                            )
                        )
                    }

                </div>

                <div className="calendar-grid">

                    {
                        celdasVacias.map(
                            indice => (

                                <div
                                    key={`vacio-${indice}`}
                                    className="calendar-day calendar-day-placeholder"
                                    aria-hidden="true"
                                />

                            )
                        )
                    }

                    {
                        diasDelMes.map(
                            dia => {

                                const fecha =
                                    construirFecha(
                                        dia
                                    );

                                const reservasDia =
                                    obtenerReservasDia(
                                        dia
                                    );

                                const estaSeleccionado =
                                    fecha ===
                                    fechaSeleccionada;

                                const claseEstado =
                                    obtenerClaseEstado(
                                        dia
                                    );

                                return (

                                    <button
                                        key={fecha}
                                        type="button"
                                        className={
                                            `calendar-day ${claseEstado} ${
                                                estaSeleccionado
                                                    ? "calendar-day-selected"
                                                    : ""
                                            }`
                                        }
                                        onClick={() =>
                                            seleccionarDia(
                                                dia
                                            )
                                        }
                                        aria-label={
                                            `${dia} de ${
                                                NOMBRES_MESES[
                                                    mes
                                                ]
                                            }, ${
                                                reservasDia.length
                                            } reservas`
                                        }
                                    >

                                        <span className="calendar-day-number">
                                            {dia}
                                        </span>

                                        {
                                            reservasDia.length > 0 && (

                                                <span className="calendar-reservation-count">

                                                    {
                                                        reservasDia.length
                                                    }

                                                </span>

                                            )
                                        }

                                    </button>

                                );

                            }
                        )
                    }

                </div>

                <div className="calendar-legend mt-4">

                    <span>
                        <i className="legend-color legend-pending" />
                        Pendientes
                    </span>

                    <span>
                        <i className="legend-color legend-completed" />
                        Cumplidas
                    </span>

                    <span>
                        <i className="legend-color legend-cancelled" />
                        Canceladas
                    </span>

                    <span>
                        <i className="legend-color legend-empty" />
                        Sin reservas
                    </span>

                </div>

            </div>

        </div>

    );

}

export default AdminCalendar;