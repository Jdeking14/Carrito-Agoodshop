class Carrito {
    #productos;
    #carrito;
    #cantidad;

    constructor(productos) {
        this.#productos = productos;
        this.#carrito = [];
        this.#cantidad = 0;
    }

    anadirProductos(producto) {
        // Verificar si el producto ya está en el carrito
        const productoEncontrado = this.#carrito.find(p => p.SKU === producto.SKU);
        if (productoEncontrado) {
            // Incrementar la cantidad si el producto ya existe
            productoEncontrado.cantidad++;
        } else {
            // Agregar el producto al carrito con cantidad inicial
            this.#carrito.push({ ...producto, cantidad: 1 });
        }
    }

    quitarProducto(referencia) {
        this.#carrito = this.#carrito.filter(
            (producto) => producto.SKU !== referencia);
    }

    disminuirProducto(referencia) {
        const productoEncontrado = this.#carrito.find(p => p.SKU === referencia);
        if (productoEncontrado && productoEncontrado.cantidad > 1) {
            productoEncontrado.cantidad--;
        } else {
            this.#carrito = this.#carrito.filter(p => p.SKU !== referencia);
        }
    }

    obtenerProducto(referencia) {
        return this.#productos.products.find((producto) => producto.SKU === referencia);
    }

    calcularTotal(cantidad, precio) {
        return cantidad * precio;
    }

    calcularTotalGeneral() {
        return this.#carrito.reduce((total, producto) => {
            return total + this.calcularTotal(producto.cantidad, producto.price);
        }, 0);
    }

    actualizarCantidad() {
        this.#cantidad = this.#carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    }
}
