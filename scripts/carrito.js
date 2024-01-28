class Carrito {
    #productos;
    #carrito;
    #cantidad;

    constructor(productos) {
        this.#productos = productos;
        this.#carrito = [];
        this.#cantidad = 0;
    }
/**
 * Metodo usado para obtener los datos del producto a traves de su SKU
 * @param {*} SKU sku del producto en cuestion
 * @returns retorna el producto en si
 */
    obtenerDatosDelProducto(SKU) {
        const producto = productos.products.find(p => p.SKU === SKU);
        if (!producto) {
            console.error('Producto no encontrado');
            return null;
        }
        return {
            SKU: producto.SKU,
            nombre: producto.title,
            precio: parseFloat(producto.price),
            cantidad: 1 
        };
    }
/**
 * Metodo usado para añadir mas cantidad al carrito de un producto especifico.
 * @param {*} producto 
 */
    addProductoAlCarrito(producto) {
        const indice = listaProductos.findIndex(p => p.SKU === producto.SKU);
        if (indice !== -1) {
            listaProductos[indice].cantidad++; // Si el producto ya está, incremento la cantidad
        } else {
            listaProductos.push({ ...producto, cantidad: 1 }); // Si no, añade el producto al carrito
        }
    }
/**
 * Metodo usado para añadir menos cantidad al carrito de un producto especifico.
 * @param {*} SKU 
 * @returns retorna un valor de control de unidades de producto 
 */
    restarProductoDelCarrito(SKU) {
        const indice = listaProductos.findIndex(p => p.SKU === SKU);
        var controlIndice = false;
        if (indice !== -1) {
            if (listaProductos[indice].cantidad > 1) {
                listaProductos[indice].cantidad--; // Si hay más de uno, resta cantidad
            } else {
                listaProductos.splice(indice, 1); // Si solo hay uno, elimina el producto
                controlIndice = true;
            }
        }
        return controlIndice; // Esto lo hago para que cuando la cantidad es de unidad 1 controle si hace falta indicarle al totalcantidad que sea 0
        
    }
}
