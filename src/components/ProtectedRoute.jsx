import {
    Navigate
} from "react-router-dom";

import {
    adminEstaAutenticado
} from "../services/authService";

function ProtectedRoute({
    children
}) {

    if (
        !adminEstaAutenticado()
    ) {

        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );

    }

    return children;

}

export default ProtectedRoute;