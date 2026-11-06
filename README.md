# Punto Nutritivo

Aplicación web para la reserva y gestión administrativa de mesas del restaurante Punto Nutritivo.

El sistema permite a los clientes consultar horarios disponibles, registrar una reserva y recibir una confirmación. También incluye un panel administrativo para gestionar las reservas mediante un calendario interactivo.

---

## Índice

- [Descripción](#descripción)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Funcionalidades principales](#funcionalidades-principales)
- [Panel administrativo](#panel-administrativo)
- [Persistencia de datos](#persistencia-de-datos)
- [Credenciales administrativas](#credenciales-administrativas)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Compilación para producción](#compilación-para-producción)
- [Rutas principales](#rutas-principales)
- [Estructura principal del proyecto](#estructura-principal-del-proyecto)
- [Servicios principales](#servicios-principales)
- [Cómo probar el flujo del cliente](#cómo-probar-el-flujo-del-cliente)
- [Cómo probar el flujo administrativo](#cómo-probar-el-flujo-administrativo)
- [Pruebas funcionales realizadas](#pruebas-funcionales-realizadas)
- [Pruebas de usabilidad](#pruebas-de-usabilidad)

## Descripción

Punto Nutritivo busca simplificar el proceso de reserva de mesas y evitar conflictos de disponibilidad.

La aplicación está dividida en dos flujos principales:

### Flujo del cliente

El cliente puede:

- Acceder desde la página principal.
- Seleccionar una fecha disponible.
- Indicar la cantidad de personas.
- Consultar los horarios disponibles.
- Registrar sus datos personales.
- Recibir un código de reserva.
- Visualizar la mesa asignada.
- Consultar la fecha, hora y duración de la reserva.

### Flujo administrativo

El administrador puede:

- Iniciar sesión.
- Visualizar las reservas en un calendario mensual.
- Consultar el resumen de reservas del mes mostrado.
- Revisar las reservas de un día determinado.
- Crear nuevas reservas.
- Editar reservas pendientes.
- Marcar reservas como cumplidas.
- Cancelar reservas.
- Eliminar registros creados por error.
- Cerrar sesión.

---

## Tecnologías utilizadas

- React
- React Router
- Vite
- JavaScript
- Bootstrap
- HTML
- CSS
- localStorage
- sessionStorage
- Figma

---

## Funcionalidades principales

### Disponibilidad de mesas

El sistema calcula los horarios disponibles teniendo en cuenta:

- La fecha seleccionada.
- La cantidad de personas.
- La capacidad de las mesas.
- Las reservas pendientes existentes.
- La duración de cada reserva.

### Asignación automática de mesas

Las mesas se asignan según la cantidad de personas:

- De 1 a 2 personas: mesa con capacidad para 2.
- De 3 a 4 personas: mesa con capacidad para 4.
- De 5 a 6 personas: mesa con capacidad para 6.
- De 7 a 8 personas: mesa con capacidad para 8.

### Horarios de reserva

El restaurante atiende de 13:00 a 21:00.

Los horarios disponibles para iniciar una reserva son:

- 13:00
- 14:00
- 15:00
- 16:00
- 17:00
- 18:00
- 19:00

Cada reserva tiene una duración de 2 horas.

La última reserva puede comenzar a las 19:00 para finalizar a las 21:00.

### Restricción de fechas

El cliente solo puede registrar reservas a partir del día siguiente.

No se permiten reservas para el mismo día ni para fechas anteriores.

### Confirmación de reserva

Cuando una reserva se registra correctamente, el sistema muestra:

- Código de reserva.
- Mesa asignada.
- Fecha.
- Hora.
- Duración.
- Aviso de tolerancia.

La reserva tiene una tolerancia máxima de 30 minutos para que el cliente se presente.

### Estados de las reservas

Las reservas pueden tener los siguientes estados:

- `pendiente`: reserva activa que bloquea una mesa y un horario.
- `cumplida`: reserva atendida que permanece en el historial.
- `cancelada`: reserva anulada que permanece en el historial.

Las reservas cumplidas y canceladas dejan de bloquear la disponibilidad.

La opción `Eliminar` borra definitivamente un registro creado por error.

---

## Panel administrativo

El panel administrativo permite visualizar y gestionar las reservas registradas.

### Calendario interactivo

El calendario muestra visualmente los días según el estado de sus reservas:

- Verde: existen reservas pendientes.
- Azul: todas las reservas del día están cumplidas.
- Naranja: existen reservas canceladas y no hay pendientes.
- Blanco: no existen reservas.

Cuando un día contiene varios estados, se utiliza la siguiente prioridad visual:

1. Pendiente.
2. Cancelada.
3. Cumplida.
4. Sin reservas.

### Resumen mensual

El Dashboard muestra un resumen correspondiente únicamente al mes visible en el calendario:

- Total de reservas pendientes.
- Total de reservas cumplidas.
- Total de reservas canceladas.

### Acciones administrativas

El administrador puede:

- Crear una reserva.
- Editar una reserva pendiente.
- Marcar una reserva como cumplida.
- Cancelar una reserva.
- Eliminar definitivamente un registro.

Las reservas cumplidas y canceladas se conservan como parte del historial administrativo.

---

## Persistencia de datos

Las reservas se almacenan en `localStorage`.

Esto permite que los datos permanezcan disponibles después de:

- Recargar la página.
- Cerrar y volver a abrir la aplicación.
- Navegar entre las diferentes pantallas.

La sesión administrativa utiliza `sessionStorage`.

La sesión se elimina cuando el administrador pulsa `Cerrar sesión` o cuando finaliza la sesión del navegador.

---

## Credenciales administrativas

Las credenciales de demostración son:

```text
Usuario: admin
Contraseña: 12345
```

Estas credenciales se encuentran en:

```text
src/data/adminData.js
```

> Advertencia: este sistema de autenticación es exclusivamente académico y no debe utilizarse en una aplicación real de producción.

---

## Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js.
- npm.
- Un navegador web moderno.
- Git, si se desea clonar el repositorio.

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Marcelobrde/Punto-Nutritivo.git
```

### 2. Entrar en la carpeta del proyecto

```bash
cd punto-nutritivo
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Después, abrir en el navegador la dirección indicada por Vite en la terminal.

Normalmente será similar a:

```text
http://localhost:5173
```

---

## Compilación para producción

Para generar la versión de producción:

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist`.

Para comprobar localmente la compilación:

```bash
npm run preview
```

---

## Rutas principales

```text
/             Página principal
/reservar     Formulario público de reservas
/admin        Inicio de sesión administrativo
/dashboard    Panel administrativo protegido
```

Si se intenta acceder directamente a `/dashboard` sin iniciar sesión, la aplicación redirige al login administrativo.

> Verifica que las rutas anteriores coincidan exactamente con las configuradas en `AppRouter.jsx`.

---

## Estructura principal del proyecto

```text
src/
├── assets/
│   └── Imágenes y logotipos
│
├── components/
│   ├── AdminCalendar.jsx
│   ├── AdminReservationModal.jsx
│   ├── EditReservationModal.jsx
│   ├── MonthlySummary.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── ReservationForm.jsx
│   ├── ReservationList.jsx
│   └── ReservationModal.jsx
│
├── data/
│   ├── adminData.js
│   └── mockData.js
│
├── pages/
│   ├── DashboardPage.jsx
│   ├── Home.jsx
│   ├── LoginPage.jsx
│   └── ReservationPage.jsx
│
├── router/
│   └── AppRouter.jsx
│
├── services/
│   ├── authService.js
│   ├── reservationService.js
│   └── storageService.js
│
└── styles/
    └── Archivos CSS
```

---

## Servicios principales

### reservationService.js

Contiene la lógica relacionada con:

- Obtención de horarios disponibles.
- Cálculo de la capacidad necesaria.
- Comprobación de mesas ocupadas.
- Búsqueda de una mesa disponible.
- Generación del código de reserva.
- Registro de nuevas reservas.

### storageService.js

Gestiona las reservas almacenadas en `localStorage`.

Incluye funciones para:

- Obtener todas las reservas.
- Guardar reservas.
- Agregar una reserva.
- Obtener una reserva por su identificador.
- Actualizar una reserva.
- Cambiar el estado de una reserva.
- Eliminar una reserva.

### authService.js

Gestiona la sesión administrativa mediante `sessionStorage`.

Incluye funciones para:

- Iniciar sesión.
- Comprobar si el administrador está autenticado.
- Cerrar sesión.

---

## Cómo probar el flujo del cliente

1. Abrir la página principal.
2. Pulsar `Reservar Mesa`.
3. Seleccionar una fecha futura.
4. Seleccionar la cantidad de personas.
5. Comprobar que aparecen los horarios disponibles.
6. Elegir uno de los horarios.
7. Completar los datos personales.
8. Pulsar `Reservar Mesa`.
9. Comprobar el código y la mesa asignada.
10. Cerrar el popup de confirmación.
11. Recargar la página.
12. Verificar que la reserva permanece guardada.

---

## Cómo probar el flujo administrativo

1. Acceder a `/admin`.
2. Iniciar sesión con las credenciales de demostración.
3. Seleccionar un día del calendario.
4. Consultar las reservas registradas.
5. Crear una reserva administrativa.
6. Seleccionar una reserva pendiente.
7. Editar la reserva y guardar los cambios.
8. Marcar una reserva como cumplida.
9. Cancelar otra reserva.
10. Comprobar la actualización del resumen mensual.
11. Eliminar un registro de prueba.
12. Pulsar `Cerrar sesión`.
13. Intentar acceder directamente a `/dashboard`.
14. Comprobar que la aplicación redirige al login.

---

## Pruebas funcionales realizadas

Se comprobaron los siguientes casos:

- Registro satisfactorio de una reserva pública.
- Persistencia de reservas después de recargar la página.
- Ocultación de horarios sin mesas compatibles disponibles.
- Asignación de mesa según la cantidad de personas.
- Acceso administrativo con credenciales correctas.
- Protección de la ruta del Dashboard.
- Creación de reservas desde el panel administrativo.
- Edición de reservas pendientes.
- Cambio de estado a cumplida.
- Cancelación con conservación del historial.
- Eliminación definitiva de un registro.
- Cierre de sesión administrativo.

---

## Pruebas de usabilidad

Se creó un prototipo interactivo en Figma para representar los recorridos exitosos del cliente y del administrador.

Las pruebas de usabilidad incluidas en la documentación son simuladas con fines académicos.

Las métricas evaluadas incluyen:

- Tasa de éxito.
- Tiempo promedio.
- Claridad de navegación.
- Comprensión de los estados.
- Facilidad para registrar reservas.
- Facilidad para gestionar reservas.
- Satisfacción general.

Entre las principales mejoras aplicadas se encuentran:

- Mayor contraste para el día seleccionado en el calendario.
- Uso del texto `Cerrar sesión` en lugar de una X.
- Reutilización automática de la fecha seleccionada en el calendario.
- Simplificación del formulario administrativo.
- Diferenciación entre cancelar y eliminar.
- Confirmación visual con código y mesa asignada.
- Conservación del historial de reservas.

---

## Diseño UX/UI

El proceso de diseño incluyó:

- Wireframes del flujo del cliente.
- Wireframes del flujo administrativo.
- Prototipo interactivo de alta fidelidad.
- Componentes visuales reutilizables.
- Microinteracciones.
- Modales y overlays.
- Estados visuales del calendario.
- Paleta relacionada con alimentación saludable.

### Organización del archivo de Figma

Debido a las limitaciones del plan gratuito de Figma, el archivo se organizó en tres páginas:

```text
01 - Wireframes
02 - Prototipo
03 - Componentes
```

### Paleta principal

```text
Verde principal:    #2E7D32
Verde secundario:   #A5D6A7
Fondo:              #F1F8E9
Texto principal:    #2D2D2D
Cumplida:           #1976D2
Cancelada:          #F9A825
Acción destructiva: #C62828
```

### Enlace de Figma

```text
https://www.figma.com/design/s5Dpa54wKBT6M2ElXG7wFR/Restaurante-Punto-Nutritivo?m=auto&t=KvHcBsXR4semko8m-1
```

---

## Repositorio

```text
https://github.com/Marcelobrde/Punto-Nutritivo
```

---

## Limitaciones

Esta aplicación es un prototipo funcional académico.

Actualmente:

- No utiliza una base de datos real.
- No dispone de backend.
- No envía correos electrónicos ni mensajes SMS reales.
- La autenticación administrativa es local.
- Los datos se almacenan solamente en el navegador.
- No permite sincronización entre dispositivos.
- No está preparada para múltiples administradores simultáneos.
- El acceso administrativo no utiliza cifrado ni tokens seguros.
- Las pruebas de usabilidad documentadas son simuladas.

---

## Mejoras futuras

- Implementar una API y una base de datos.
- Añadir autenticación segura y gestión de roles.
- Enviar confirmaciones reales por correo o SMS.
- Incorporar recuperación segura de contraseña.
- Añadir pruebas automatizadas.
- Mejorar la accesibilidad mediante teclado, ARIA y criterios WCAG.
- Adaptar y validar completamente la experiencia móvil.
- Permitir gestión multiusuario en tiempo real.
- Incorporar un plano visual de las mesas.
- Añadir búsqueda y filtros de reservas.
- Permitir exportar reportes mensuales.

---

## Accesibilidad futura

Como mejora futura, se propone:

- Permitir usar toda la aplicación mediante teclado.
- Mantener visible el foco al recorrer botones y campos.
- Añadir mensajes comprensibles para lectores de pantalla.
- Revisar el contraste de colores.
- Aplicar las recomendaciones internacionales WCAG.

---

## Autor

```text
Marcelo Briceño Delgado
```

Añadir aquí los demás integrantes del equipo, si corresponde.

---

## Propósito académico

Proyecto desarrollado con fines académicos para demostrar conocimientos de:

- Diseño de interfaces.
- Experiencia de usuario.
- Prototipado en Figma.
- Desarrollo con React.
- Gestión de estado.
- Componentes reutilizables.
- Persistencia local.
- Enrutamiento.
- Rutas protegidas.
- Pruebas funcionales.
- Pruebas de usabilidad.

---

## Licencia

Este proyecto fue desarrollado con fines educativos.

No está autorizado para uso comercial sin la revisión y autorización de sus autores.
