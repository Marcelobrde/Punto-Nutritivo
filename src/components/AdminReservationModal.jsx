import ReservationForm from "./ReservationForm";

function AdminReservationModal({
    visible,
    fechaSeleccionada,
    onClose,
    onReservaCreada
}) {

    if (!visible) {
        return null;
    }

    return (

        <div
            className="modal d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.55)"
            }}
        >

            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">

                <div className="modal-content">

                    <div className="modal-header">

                        <div>

                            <h4 className="modal-title section-title mb-1">
                                Crear reserva
                            </h4>

                            <small className="text-muted">

                                Fecha seleccionada:

                                {" "}

                                {fechaSeleccionada}

                            </small>

                        </div>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Cerrar"
                        />

                    </div>

                    <div className="modal-body">

                        <ReservationForm
                            modoAdmin={true}
                            fechaInicial={
                                fechaSeleccionada
                            }
                            onReservaCreada={
                                onReservaCreada
                            }
                        />

                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onClose}
                        >
                            Volver al Dashboard
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminReservationModal;