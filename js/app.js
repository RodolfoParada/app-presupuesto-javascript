import { Ingreso } from './Ingreso.js';
import { Egreso } from './Egreso.js';

// Datos iniciales
const ingresos = [
    new Ingreso('Salario', 1200.00),
    new Ingreso('Venta coches', 1200.00),
    new Ingreso('Nuevo Ingreso', 300.00),
];

const egresos = [
    new Egreso('Renta departamento', 900),
    new Egreso('Ropa', 400),
    new Egreso('Nuevo Ingreso', 300.00),
];

// Función para cargar el encabezado
let cargarCabecero = () => {
    const presupuesto = totalIngresos() - totalEgresos();
    const porcentajeEgreso = totalIngresos() > 0 ? (totalEgresos() / totalIngresos()) * 100 : 0;

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = porcentajeEgreso.toFixed(2) + '%';
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
};

// Formatear números como moneda
const formatoMoneda = (valor) => {
    return valor.toLocaleString('es-ES', { style: 'currency', currency: 'CLP' });
};

// Total de ingresos
let totalIngresos = () => {
    return ingresos.reduce((total, ingreso) => total + ingreso.valor, 0);
};

// Total de egresos
let totalEgresos = () => {
    return egresos.reduce((total, egreso) => total + egreso.valor, 0);
};

// Cargar ingresos
const cargarIngresos = () => {
    let ingresosHTML = '';
    ingresos.forEach((ingreso, index) => {
        ingresosHTML += crearIngresoHTML(ingreso, index);
    });
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};

// Crear HTML para un ingreso
const crearIngresoHTML = (ingreso, index) => {
    return `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${index})">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
};

// Eliminar ingreso
const eliminarIngreso = (index) => {
    ingresos.splice(index, 1);
    cargarCabecero();
    cargarIngresos();
};

// Cargar egresos
const cargarEgresos = () => {
    let egresosHTML = '';
    egresos.forEach((egreso, index) => {
        egresosHTML += crearEgresoHTML(egreso, index);
    });
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
};

// Crear HTML para un egreso
const crearEgresoHTML = (egreso, index) => {
    return `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${index})">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>`;
};

// Eliminar egreso
const eliminarEgreso = (index) => {
    egresos.splice(index, 1);
    cargarCabecero();
    cargarEgresos();
};


// Función para agregar datos (ingreso/egreso) desde el formulario
let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'].value; // Obtener el tipo de dato (ingreso o egreso)
    let descripcion = forma['descripcion'].value.trim(); // Descripción del ingreso/egreso
    let valor = parseFloat(forma['valor'].value); // Convertir el valor a número

    if (descripcion !== '' && !isNaN(valor)) {
        if (tipo === 'ingreso') {
            ingresos.push(new Ingreso(descripcion, valor));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo === 'egreso') {
            egresos.push(new Egreso(descripcion, valor));
            cargarCabecero();
            cargarEgresos();
        }
        // Limpiar el formulario después de agregar los datos
        forma['descripcion'].value = '';
        forma['valor'].value = '';
    }
};

// Cargar la aplicación
let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
    agregarDato();
};

// Asociar la función `agregarDato` al evento `onsubmit` del formulario
document.forms['forma'].onsubmit = (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    agregarDato();
};

window.cargarApp = cargarApp;
window.eliminarIngreso = eliminarIngreso;
window.eliminarEgreso = eliminarEgreso;

// Cargar la aplicación al inicio
cargarApp();
