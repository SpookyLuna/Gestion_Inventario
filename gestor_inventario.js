//Imports
const fs = require('fs');
//Lectura del json y parseo. No uso require para poder actualizar posteriormente los datos de los productos.
const data = JSON.parse(fs.readFileSync('./productos.json', 'utf8'));

class GESTOR_INVENTARIO{    constructor(nombre, categoria, precio, stock){
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }

    agregar_producto(){
        
        const nuevoProducto = {
            nombre: this.nombre,
            categoria: this.categoria,
            precio: this.precio,
            stock: this.stock
        };

        //Pusheo el nuevo producto y lo guardo en el json
        data.PRODCUTOS.push(nuevoProducto);
        fs.writeFileSync('./productos.json', JSON.stringify(data, null, 4), 'utf8');
        console.log(`Producto: ${this.nombre} guardado correctamente.`);
    }

    static listar_producto(){ //Metodo estatico para poder ser llamado desde menu
        console.log(`
            === Gestor de Inventario ===
            === Listado de Productos ===
            `)
        const productos = data.PRODCUTOS;
        if (productos.length != 0){
            productos.forEach(producto => {
                console.log(`
                    Nombre: ${producto.nombre}
                    Categoría: ${producto.categoria}
                    Precio: ${producto.precio}
                    Stock: ${producto.stock}
                    `)
            });
        }
        else{
            console.log("No hay productos registrados.")
        }
    }
}

//Export de la clase
module.exports = GESTOR_INVENTARIO;