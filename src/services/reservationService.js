import { mesas } from "../data/mockData";

import {
    obtenerReservas,
    agregarReserva
} from "./storageService";

const HORARIOS = [
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00"
];

function convertirHoraANumero(hora) {

    const [h] = hora.split(":");

    return parseInt(h);

}

function obtenerCapacidadObjetivo(personas) {

    if (personas <= 2) return 2;

    if (personas <= 4) return 4;

    if (personas <= 6) return 6;

    return 8;

}

function mesaEstaOcupada(
    mesaId,
    fecha,
    horaSolicitada,
    reservaIdIgnorada = null
) {

    const horaNueva =
        convertirHoraANumero(horaSolicitada);

    const reservas =
        obtenerReservas();

    return reservas.some(reserva => {

        if (
            reserva.id ===
            reservaIdIgnorada
        ) {
            return false;
        }

        if (
            reserva.estado !== "pendiente"
        ) {
            return false;
        }

        if (
            reserva.mesaId !== mesaId ||
            reserva.fecha !== fecha
        ) {
            return false;
        }

        const horaReserva =
            convertirHoraANumero(
                reserva.hora
            );

        const finReserva =
            horaReserva + 2;

        return (
            horaNueva >= horaReserva &&
            horaNueva < finReserva
        );

    });

}

export function obtenerHorariosDisponibles(
    fecha,
    personas,
    reservaIdIgnorada = null
) {

    if (!fecha || !personas) {
        return [];
    }

    const capacidadObjetivo =
        obtenerCapacidadObjetivo(
            personas
        );

    const mesasCompatibles =
        mesas.filter(
            mesa =>
                mesa.capacidad ===
                capacidadObjetivo
        );

    return HORARIOS.filter(
        horario => {

            const existeMesaLibre =
                mesasCompatibles.some(
                    mesa =>
                        !mesaEstaOcupada(
                            mesa.id,
                            fecha,
                            horario,
                            reservaIdIgnorada
                        )
                );

            return existeMesaLibre;

        }
    );

}

export function buscarMesaDisponible(
    personas,
    fecha,
    hora,
    reservaIdIgnorada = null
) {

    const capacidadObjetivo =
        obtenerCapacidadObjetivo(
            personas
        );

    const mesasCompatibles =
        mesas.filter(
            mesa =>
                mesa.capacidad ===
                capacidadObjetivo
        );

    return mesasCompatibles.find(
        mesa =>
            !mesaEstaOcupada(
                mesa.id,
                fecha,
                hora,
                reservaIdIgnorada
            )
    );

}

export function generarCodigoReserva() {

    const numero =
        obtenerReservas().length + 1;

    return `RES-${numero
        .toString()
        .padStart(4, "0")}`;

}

export function registrarReserva(
    datosReserva
) {

    agregarReserva(
        datosReserva
    );

}