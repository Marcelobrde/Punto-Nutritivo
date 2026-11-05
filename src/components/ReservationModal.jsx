import logoHome from "../assets/logo-home.png";

function ReservationModal({
    visible,
    reserva,
    onClose
}) {

    if (!visible || !reserva) {
        return null;
    }

    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-body text-center p-4">

                        <img
                            src={logoHome}
                            alt="Punto Nutritivo"
                            className="img-fluid mb-4"
                            style={{
                                maxWidth: "250px"
                            }}
                        />

                        <h3 className="text-success mb-3">
                            Reserva Confirmada
                        </h3>

                        <hr />

                        <p>
                            <strong>Código:</strong>
                            {" "}
                            {reserva.codigo}
                        </p>

                        <p>
                            <strong>Mesa asignada:</strong>
                            {" "}
                            {reserva.mesa}
                        </p>

                        <p>
                            <strong>Fecha:</strong>
                            {" "}
                            {reserva.fecha}
                        </p>

                        <p>
                            <strong>Hora:</strong>
                            {" "}
                            {reserva.hora}
                        </p>

                        <p>
                            <strong>Duración:</strong>
                            {" "}
                            2 horas
                        </p>

                        <div className="alert alert-reserva mt-3">

                            Se le han enviado los detalles de su reserva al correo ingresado.

                        </div>

                        <div className="alert alert-warning">

                            Tiene una tolerancia máxima de 30 minutos para presentarse.
                            Pasado ese tiempo la reserva podrá ser liberada.

                        </div>

                        <button
                            type="button"
                            className="btn btn-custom"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ReservationModal;