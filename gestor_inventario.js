////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
//Imports                                                                                                             //
const fs = require('fs');                                                                                             //
//Lectura del json y parseo. No uso require para poder actualizar posteriormente los datos de los productos.          //
const data = JSON.parse(fs.readFileSync('./productos.json', 'utf8'));                                                 //
const productos = data.PRODUCTOS;                                                                                     //
                                                                                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class GESTOR_INVENTARIO{    
    
    constructor(nombre, categoria, precio, stock){
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }

    //Metodo agregar producto
    agregar_producto(){
        
        const nuevo_producto = {
            nombre: this.nombre,
            categoria: this.categoria,
            precio: this.precio,
            stock: this.stock
        };

        let producto_duplicado = false;
        if (productos.length != 0){
            productos.forEach(producto => {
                if(nuevo_producto.nombre.toLowerCase === producto.nombre.toLowerCase){ //Comprueba que el producto no esté ya registrado
                    producto_duplicado = true;
                }
                else{
                    //Pusheo el nuevo producto y lo guardo en el json
                    data.PRODUCTOS.push(nuevo_producto);
                    fs.writeFileSync('./productos.json', JSON.stringify(data, null, 4), 'utf8');
                    console.log(`Producto: ${this.nombre} guardado correctamente.`);
                }
            });
        }
        if (producto_duplicado == true){
            console.log("Producto duplicado, se ha cancelado el agregado de producto!");
        }
    }

    //Metodo listar producto
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
                Precio: ${producto.precio}€
                Stock: ${producto.stock}
                `);
            });
        }
        else{
            console.log("No hay productos registrados.")
        }
    }

    //Metodos buscar producto
    buscar_producto_nombre(){
        const buscar_producto = {
            nombre: this.nombre,
        }
        let productos_encontrados = 0;
        if (productos.length != 0){
            productos.forEach(producto => {
                if(buscar_producto.nombre.toLowerCase() === producto.nombre.toLowerCase()){
                    console.clear();
                    productos_encontrados++;
                    console.log(`
            === Gestor de Inventario ===
             === Buscar por Nombre ===
                        `);
                    console.log(`

            Se han encontrado ${productos_encontrados} coincidencias:

                Nombre: ${producto.nombre}
                Categoria: ${producto.categoria}
                Precio: ${producto.precio}€
                Stock: ${producto.stock}
                `);
                }
            });
        }
        else{
            console.log("No hay productos registrados.");
        }
        if (productos_encontrados == 0){
            console.log("No se han encontrado coincidencias.")
        }
    }
    
    buscar_producto_categoria(){
        const buscar_producto = {
            categoria: this.categoria,
        }
        
        console.clear();
        console.log(`
            === Gestor de Inventario ===
            === Buscar por Categoría ===
                    `);
        let productos_encontrados = 0;
        if (productos.length != 0) {
            productos.forEach(producto => {
                if (buscar_producto.categoria.toLowerCase() === producto.categoria.toLowerCase()) {
                    productos_encontrados++;
                    console.log(`

                Nombre: ${producto.nombre}
                Categoría: ${producto.categoria}
                Precio: ${producto.precio}€
                Stock: ${producto.stock}
                `);
                }
            });
        }
        else {
            console.log("No hay productos registrados.");
        }
        if (productos_encontrados == 0){
            console.log("No se han encontrado coincidencias.")
        }
    }
    
    //Metodos actualizar productos
    actualizarStock(producto, nuevo_stock) {
        if (producto >= 0 && producto < productos.length) {
            productos[producto].stock = nuevo_stock;
            console.log(`Stock del producto "${productos[producto].nombre}" actualizado a ${nuevo_stock}.`);
            fs.writeFileSync("./productos.json", JSON.stringify(data, null, 4, 'utf8'));
        } else {
            console.log("Has seleccionado un producto inválido.");
        }
    }

    actualizarPrecio(producto, nuevo_precio) {
        if (producto >= 0 && producto < productos.length) {
            productos[producto].precio = nuevo_precio;
            console.log(`Precio del producto "${productos[producto].nombre}" actualizado a ${nuevo_precio}€.`);
            fs.writeFileSync("./productos.json", JSON.stringify(data, null, 4, 'utf8'));
        } else {
            console.log("Has seleccionado un producto inválido.");
        }
    }
    
    //Metodo eliminar producto
    eliminarProducto(producto) {
        if (producto >= 0 && producto < productos.length) {
            const productoEliminado = productos.splice(producto, 1); //Uso de splice para reindexar la cadena
            console.log(`Producto "${productoEliminado[0].nombre}" eliminado correctamente.`);
            fs.writeFileSync('./productos.json', JSON.stringify(data, null, 4), 'utf8');
        } else {
            console.log("Has seleccionado un producto inválido.");
        }
    }

    //Mostrar Estadisticas
    static mostrar_estadisticas(){ //Metodo estático para ser llamada directamente
        console.log(`
            === Gestor de Inventario ===
               === Estadísticas ===
            `);
        let contador_productos = 0;
        let categorias = [];
        let valor_total_stock = 0;
        if (productos.length != 0){
            productos.forEach(producto => {
                contador_productos++;
                valor_total_stock += producto.precio;
                if (producto.categoria != undefined && categorias.includes(producto.categoria)){
                }
                else{
                    categorias.push(producto.categoria);
                }
            });
            console.log(`
                Total de productos: ${contador_productos}
                Categorias existentes: ${categorias}
                Valor total de stock: ${valor_total_stock}€
            `)
        }
        else{
            console.log("No se han encontrado productos con ese nombre.");
        }
    }
}

//Export de la clase
module.exports = GESTOR_INVENTARIO;