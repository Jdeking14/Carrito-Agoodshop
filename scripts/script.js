let carrito;
let productos;
let cantidad = 0;
let valor;
let listaProductos = [];

//Se inicializan los objetos y a la vez se pinta los productos justo despues de realizar la lamada a la api 
const init = (objProduc) => {
    productos = objProduc;
    carrito = new Carrito(productos);
    pintarProducto();
}

//aqui realizo la llamada a la api. como se puede ver los valores viajan como objeto al init el cual me renderiza la tabla
document.addEventListener("DOMContentLoaded", () => {    
    fetch("https://jsonblob.com/api/jsonBlob/1199404145575845888")
        .then((res) => res.json())
        .then(init)
});
//Esta es la funcion flecha encargada de renderizar el contenido. Dentro de esta funcion voy llamando a las funciones de dentro de la clase carrito que son las que se encargan de realizar los calculos necesarios
const pintarProducto = () => {
    // Se crea cabecera de la tabla
    const wrapper = document.querySelector("#w-tabla");
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.classList.add('tabla');
    thead.classList.add('tabla__head');
    wrapper.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);

    // se Insertan datos en la tabla
    productos.products.forEach((element, index) => {
        const idUnico = `${element.SKU}`;
        const rowProducto = document.createElement('tr');
        rowProducto.setAttribute("tabla-producto", `filaProducto-${idUnico}`);
        
        const datoProducto = document.createElement('td');
        datoProducto.classList.add('tabla__td_producto');
        datoProducto.innerHTML = element.title;
        datoProducto.setAttribute("titulo", `datoProducto-${idUnico}`);

        const datoCantidad = document.createElement('td');
        datoCantidad.setAttribute("cantidad", `datoCantidad-${idUnico}`);

        const datoUnidad = document.createElement('td');
        datoUnidad.innerHTML = element.price + productos.currency;
        datoUnidad.setAttribute("unidad", `datoUnidad-${idUnico}`);

        const datoTotal = document.createElement('td');
        datoTotal.setAttribute("id", `datoTotal-${idUnico}`);
        datoTotal.setAttribute("total", `datoTotal-${idUnico}`);

        // Creación de botones y entrada de cantidad
        const textoCantidad = document.createElement('input');
        textoCantidad.setAttribute("type", "text");
        textoCantidad.setAttribute("id", `textoCantidad-${idUnico}`);
        textoCantidad.setAttribute("value", 0);                  
        textoCantidad.classList.add('inp');

        const botonMas = document.createElement('button');
        botonMas.classList.add('btn');
        botonMas.innerHTML = "+";
        botonMas.addEventListener('click', () => {
            const producto = carrito.obtenerDatosDelProducto(idUnico);
            carrito.addProductoAlCarrito(producto);
            actualizarListaProductos();
        });
        botonMas.setAttribute("id", `btnMas-${idUnico}`);

        const botonMenos = document.createElement('button');
        botonMenos.classList.add('btn');
        botonMenos.innerHTML = "-";
       botonMenos.addEventListener('click', (event) => {
        const SKU = idUnico; 
        const controlCantidad = carrito.restarProductoDelCarrito(SKU);
        if(controlCantidad){
            document.querySelector(`#textoCantidad-${SKU}`).value = 0;
        }
        actualizarListaProductos();
    });
    
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

//En esta funciona actulizo la lista de productos con los datos que me llegan. De esta manera actualizo dinamicamente el contenedor de la lista de productos
function actualizarListaProductos() {
    const container = document.getElementById('listaProductos');
    container.innerHTML = '';
    let totalGeneral = 0;

    listaProductos.forEach(producto => {
        const totalProducto = producto.cantidad * producto.precio;
        totalGeneral += totalProducto;

        const elementoProducto = document.createElement('div');
        elementoProducto.innerHTML = `
            <div>Producto: ${producto.nombre}</div>
            <div>Cantidad: ${producto.cantidad}</div>
            <div>Total: ${totalProducto}</div>
        `;
        container.appendChild(elementoProducto);

        
        const cantidadElement = document.querySelector(`#textoCantidad-${producto.SKU}`);
        cantidadElement.value = producto.cantidad; // se Establece la cantidad en el elemento HTML como la cantidad del producto
        
    });

    // se actualiza el total general en el DOM
    const elementoTotalGeneral = document.getElementById('totalGeneral'); 
    elementoTotalGeneral.textContent = `TOTAL : ${totalGeneral}`;
}
















