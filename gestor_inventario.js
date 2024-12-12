class GESTOR_INVENTARIO{    constructor(nombre, categoria, precio, stock){
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }

    agregar_producto(nombre_producto, categoria_producto, precio_producto, stock_producto){
        
        const nuevoProducto = {
            nombre: this.nombre,
            categoria: this.categoria,
            precio: this.precio,
            stock: this.stock
        };

        //Lectura del json y parseo. No uso require para poder actualizar posteriormente los datos de los productos.
        const data = JSON.parse(fs.readFileSync('./productos.json', 'utf8'));

        //Pusheo el nuevo producto y lo guardo en el json
        data.PRODCUTOS.push(nuevoProducto);
        fs.writeFileSync('./productos.json', JSON.stringify(data, null, 4), 'utf8');
        console.log(`Producto: ${this.nombre} guardado correctamente.`);
    }
}

//Export de la clase
module.exports = GESTOR_INVENTARIO;