const STORAGE_KEY = "reservas_punto_nutritivo";

export function obtenerReservas() {

    const datos =
        localStorage.getItem(
            STORAGE_KEY
        );

    if (!datos) {
        return [];
    }

    try {

        return JSON.parse(datos);

    } catch {

        return [];

    }

}

export function guardarReservas(
    reservas
) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reservas)
    );

}

export function agregarReserva(
    reserva
) {

    const reservas =
        obtenerReservas();

    reservas.push(reserva);

    guardarReservas(reservas);

}

export function obtenerReservaPorId(
    id
) {

    return obtenerReservas().find(
        reserva =>
            reserva.id === id
    );

}

export function actualizarReserva(
    reservaActualizada
) {

    const reservas =
        obtenerReservas();

    const nuevasReservas =
        reservas.map(reserva =>

            reserva.id ===
            reservaActualizada.id
                ? reservaActualizada
                : reserva

        );

    guardarReservas(
        nuevasReservas
    );

}

export function cambiarEstadoReserva(
    id,
    nuevoEstado
) {

    const reservas =
        obtenerReservas();

    const nuevasReservas =
        reservas.map(reserva => {

            if (reserva.id !== id) {
                return reserva;
            }

            return {
                ...reserva,
                estado: nuevoEstado,
                fechaActualizacion:
                    new Date().toISOString()
            };

        });

    guardarReservas(
        nuevasReservas
    );

}

export function eliminarReserva(
    id
) {

    const reservas =
        obtenerReservas();

    const nuevasReservas =
        reservas.filter(
            reserva =>
                reserva.id !== id
        );

    guardarReservas(
        nuevasReservas
    );

}