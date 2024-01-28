let carrito;
let productos;
let cantidad = 0;
let valor;
let listaProductos;


const init = (objProduc) => {
    productos = objProduc;

    //inicializar el carrito
    //pintar los productos
    carrito = new Carrito(productos);
    pintarProducto();

}


document.addEventListener("DOMContentLoaded", () => {    
    fetch("https://jsonblob.com/api/jsonBlob/1199404145575845888")
        .then((res) => res.json())
        .then(init)
});

const pintarProducto = () => {
    // Crear cabecera de la tabla
    const wrapper = document.querySelector("#w-tabla");
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.classList.add('tabla');
    thead.classList.add('tabla__head');
    wrapper.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);

    // Insertar datos en la tabla
    productos.products.forEach((element, index) => {
        const idUnico = `${element.SKU}`;
        const rowProducto = document.createElement('tr');
        rowProducto.setAttribute("name", `filaProducto-${idUnico}`);
        
        const datoProducto = document.createElement('td');
        datoProducto.classList.add('tabla__td_producto');
        datoProducto.innerHTML = element.title;
        datoProducto.setAttribute("name", `datoProducto-${idUnico}`);

        const datoCantidad = document.createElement('td');
        datoCantidad.setAttribute("name", `datoCantidad-${idUnico}`);

        const datoUnidad = document.createElement('td');
        datoUnidad.innerHTML = element.price + productos.currency;
        datoUnidad.setAttribute("name", `datoUnidad-${idUnico}`);

        const datoTotal = document.createElement('td');
        datoTotal.setAttribute("id", `datoTotal-${idUnico}`);
        datoTotal.setAttribute("name", `datoTotal-${idUnico}`);

        // Creación de botones y entrada de cantidad
        const textoCantidad = document.createElement('input');
        textoCantidad.setAttribute("type", "text");
        textoCantidad.setAttribute("id", `textoCantidad-${idUnico}`);
        textoCantidad.setAttribute("value", 0);                  
        textoCantidad.classList.add('inp');

        const botonMas = document.createElement('button');
        botonMas.classList.add('btn');
        botonMas.innerHTML = "+";
        botonMas.addEventListener("click", () => addCantidad(idUnico));
        botonMas.setAttribute("id", `btnMas-${idUnico}`);

        const botonMenos = document.createElement('button');
        botonMenos.classList.add('btn');
        botonMenos.innerHTML = "-";
        botonMenos.addEventListener("click", () => restarCantidad(idUnico));
        botonMenos.setAttribute("id", `btnMenos-${idUnico}`);

        datoCantidad.appendChild(botonMenos);
        datoCantidad.appendChild(textoCantidad);
        datoCantidad.appendChild(botonMas);

        // Agregar celdas a la fila
        rowProducto.appendChild(datoProducto);
        rowProducto.appendChild(datoCantidad);
        rowProducto.appendChild(datoUnidad);
        rowProducto.appendChild(datoTotal);
        tbody.appendChild(rowProducto);

        // Crear fila para referencia de producto
        const rowRef = document.createElement('tr');
        rowRef.classList.add('tabla__rowsRef');
        rowRef.setAttribute("name", `filaRef-${idUnico}`);

        const datoRef = document.createElement('td');
        datoRef.setAttribute("id", `refCod-${idUnico}`);
        datoRef.setAttribute("value", element.SKU);
        datoRef.classList.add('tabla__datoRef');
        datoRef.innerHTML = "Ref:" + element.SKU;

        rowRef.appendChild(datoRef);
        tbody.appendChild(rowRef);
    });
}




const addCantidad = (idProducto) => {
    let cantidad = parseInt(document.getElementById(`textoCantidad-${idProducto}`).value);
    cantidad++;
    document.getElementById(`textoCantidad-${idProducto}`).value = cantidad;

    const productoSeleccionado = carrito.obtenerProducto(idProducto);
    carrito.anadirProductos(productoSeleccionado);

    document.getElementById(`datoTotal-${idProducto}`).innerHTML = carrito.calcularTotal(cantidad, productoSeleccionado.price);
    
    document.getElementById("total").innerHTML = "TOTAL: " + carrito.calcularTotalGeneral();
    document.getElementById("listaProductos").innerHTML = document.getElementById("listaProductos").innerHTML + "<br>" + productoSeleccionado.title + " " + carrito.calcularTotal(cantidad, productoSeleccionado.price);
}

const restarCantidad = (idProducto) => {
    let cantidad = parseInt(document.getElementById(`textoCantidad-${idProducto}`).value);
    if (cantidad > 1) {
        cantidad--;
        document.getElementById(`textoCantidad-${idProducto}`).value = cantidad;

        // Disminuir la cantidad del producto en el carrito
        carrito.disminuirProducto(idProducto);

        // Actualizar la cantidad y el total en el DOM
        const productoSeleccionado = carrito.obtenerProducto(idProducto);
        document.getElementById(`datoTotal-${idProducto}`).innerHTML = carrito.calcularTotal(cantidad, productoSeleccionado.price);
        document.getElementById("total").innerHTML = "TOTAL: " + carrito.calcularTotalGeneral();
        document.getElementById("listaProductos").innerHTML = document.getElementById("listaProductos").innerHTML + productoSeleccionado.title + " " + carrito.calcularTotal(cantidad, productoSeleccionado.price);
    } else if (cantidad === 1) {
        // Tratamiento especial cuando la cantidad es 1 y se va a eliminar del carrito
        document.getElementById(`textoCantidad-${idProducto}`).value = 0;
        carrito.disminuirProducto(idProducto);
        document.getElementById(`datoTotal-${idProducto}`).innerHTML = '';
        document.getElementById("total").innerHTML = "TOTAL: " + carrito.calcularTotalGeneral();
        document.getElementById("listaProductos").innerHTML = "";
    }
}














