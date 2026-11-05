const AUTH_KEY =
    "admin_punto_nutritivo";

export function iniciarSesionAdmin() {

    sessionStorage.setItem(
        AUTH_KEY,
        "autenticado"
    );

}

export function cerrarSesionAdmin() {

    sessionStorage.removeItem(
        AUTH_KEY
    );

}

export function adminEstaAutenticado() {

    return (
        sessionStorage.getItem(
            AUTH_KEY
        ) === "autenticado"
    );

}