function MonthlySummary({
    pendientes,
    cumplidas,
    canceladas
}) {

    return (

        <div>

            <div className="card mb-3">

                <div className="card-body text-center">

                    <h6 className="text-success">
                        Pendientes
                    </h6>

                    <h3>
                        {pendientes}
                    </h3>

                </div>

            </div>

            <div className="card mb-3">

                <div className="card-body text-center">

                    <h6 className="text-primary">
                        Cumplidas
                    </h6>

                    <h3>
                        {cumplidas}
                    </h3>

                </div>

            </div>

            <div className="card">

                <div className="card-body text-center">

                    <h6 className="text-warning">
                        Canceladas
                    </h6>

                    <h3>
                        {canceladas}
                    </h3>

                </div>

            </div>

        </div>

    );

}

export default MonthlySummary;