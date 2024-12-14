////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
//Imports                                                                                                             //
const fs = require('fs');                                                                                             //
//Lectura del json y parseo. No uso require para poder actualizar posteriormente los datos de los productos.          //
const data = JSON.parse(fs.readFileSync('./productos.json', 'utf8'));    
const productos = data.PRODUCTOS;                                             //
                                                                                                                      //                                                                                                                                                                                                                       //
async function input(prompt) {                                                                                        //
    return new Promise(resolve => rl.question(prompt, resolve));                                                      //
}                                                                                                                     //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class GESTOR_INVENTARIO{    
    
    constructor(nombre, categoria, precio, stock){
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }

    agregar_producto(){
        
        const nuevo_producto = {
            nombre: this.nombre,
            categoria: this.categoria,
            precio: this.precio,
            stock: this.stock
        };

        //Pusheo el nuevo producto y lo guardo en el json
        data.PRODUCTOS.push(nuevo_producto);
        fs.writeFileSync('./productos.json', JSON.stringify(data, null, 4), 'utf8');
        console.log(`Producto: ${this.nombre} guardado correctamente.`);
    }

    static listar_producto(){ //Metodo estatico para poder ser llamado desde menu
        console.log(`
            === Gestor de Inventario ===
            === Listado de Productos ===
            `);
        if (productos.length != 0){
            productos.forEach(producto => {
                console.log(`
                Nombre: ${producto.nombre}
                Categoría: ${producto.categoria}
                Precio: ${producto.precio}
                Stock: ${producto.stock}
                `);
            });
        }
        else{
            console.log("No hay productos registrados.")
        }
    }

    buscar_producto_nombre(){
        const buscar_producto = {
            nombre: this.nombre,
        }
        if (productos.length != 0){
            productos.forEach(producto => {
                if(buscar_producto.nombre.toLowerCase() === producto.nombre.toLowerCase()){
                    console.clear();
                    console.log(`
            === Gestor de Inventario ===
             === Buscar por Nombre ===
                        `);
                    console.log(`
                Nombre: ${producto.nombre}
                Categoria: ${producto.categoria}
                Precio: ${producto.precio}
                Stock: ${producto.stock}
                `);
                }
            });
        }
        else{
            console.log("No se han encontrado productos con ese nombre.");
        }
    }
    
    buscar_producto_categoria(){
        const buscar_producto = {
            categoria: this.categoria,
        }
        if (productos.length != 0){
            productos.forEach(producto => {
                if(buscar_producto.categoria.toLowerCase() === producto.categoria.toLowerCase()){
                    console.clear();
                    console.log(`
            === Gestor de Inventario ===
            === Buscar por Categoria ===
                        `);
                    console.log(`
                Nombre: ${producto.nombre}
                Categoria: ${producto.categoria}
                Precio: ${producto.precio}
                Stock: ${producto.stock}
                `);
                }
            });
        }
        else{
            console.log("No se han encontrado productos con esa categoria.");
        }
    }

    static async actualizar_stock(){

    }
}

//Export de la clase
module.exports = GESTOR_INVENTARIO;