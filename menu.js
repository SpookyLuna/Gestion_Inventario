
////////////////////////////////////////////////////////////////////////
                                                                      //
//Import de la case y llamada métodos                                 //
const GESTOR_INVENTARIO = require('./gestor_inventario');             //
                                                                      //
//Integracion de readline                                             //
const readline = require('readline');                                 //
const rl = readline.createInterface({                                 //
    input: process.stdin,                                             //
    output: process.stdout                                            //
});                                                                   //
                                                                      //
//Imports                                                             //
const fs = require('fs');                                             //
//Lectura del json y parseo.                                          //
const data = JSON.parse(fs.readFileSync('./productos.json', 'utf8')); //   
const productos = data.PRODUCTOS;                                     //
                                                                      //
async function input(prompt) {                                        //
    return new Promise(resolve => rl.question(prompt, resolve));      //
}                                                                     //
                                                                      //
//Caracteres especiales                                               //
const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/                   //
                                                                      //
////////////////////////////////////////////////////////////////////////

//Funcion menu
async function menu(){
    
    //Muestra opciones
    console.log(`

    === Gestor de Inventario ===

        1. Agregar producto
        2. Listar productos
        3. Buscar producto
        4. Actualizar producto
        5. Eliminar producto
        6. Mostrar estadísticas
        7. Salir
        
`)

let opcion = Number(await input ("Selecciona una opción: "));
switch (opcion){
    case 1:
        console.clear();
        agregar_producto();
        break;
    case 2:
        console.clear();
        GESTOR_INVENTARIO.listar_producto();
        await input ("Pulsa enter para volver...");
            console.clear();
            menu();
        break;
    case 3:
        console.clear();
        buscar_producto();
        break;
    case 4:
        console.clear();
        actualizar_producto();
        break;
    case 5:
        console.clear();
        eliminar_producto();
        break;
    case 6:
        console.clear();
        GESTOR_INVENTARIO.mostrar_estadisticas();
        await input ("Pulsa enter para volver...");
            console.clear();
            menu();
        break;
    case 7:
        console.clear();
        process.exit();
    default:
        console.log("Has seleccionado una opción inválida!");
        menu(); //Sustituyo bucle por volver a llamar la función.
        break;
    }
}
async function agregar_producto(){

    // Llama a las funciones de forma asíncrona
    const nombre = await agregar_producto_nombre();
    const categoria = await agregar_producto_categoria();
    const precio = await agregar_producto_precio();
    const stock = await agregar_producto_stock();
    
    async function agregar_producto_nombre(){
        //Agregar nombre
        console.log(`
            === Gestor de Inventario ===
               === Nuevo Producto ===
            `)
        let nombre = await input ("Introduce el nombre del producto: ");
        while (nombre == "" || regex.test(nombre) == true){ //Comprueba que no se empleen caracteres especiales
            console.log("Has especificado un nombre vacio o inválido. No emplees caracteres especiales!");
            nombre = await input ("Introduce el nombre del producto: ");
        }
        return nombre;
    }
    async function agregar_producto_categoria(){        
        //Agregar listado de gategorias
        console.clear();
        console.log(`
            === Gestor de Inventario ===
               === Nuevo Producto ===
            `)
        let categoria = await input ("Introduce la categoría del producto: ");
        return categoria;
    }
    async function agregar_producto_precio(){
        //Agregar precio
        console.clear();
        console.log(`
            === Gestor de Inventario ===
               === Nuevo Producto ===
            `)
        let precio = Number (await input("Introduce el precio para el artículo: "));
        while (isNaN(precio) || precio < 0){
            console.log("Has especificado un precio inválido!");
            precio = Number (await input("Introduce el precio para el artículo: "));
        }
        return precio;
    }
    async function agregar_producto_stock(){
        //Agregar stock
        console.clear();
        console.log(`
            === Gestor de Inventario ===
               === Nuevo Producto ===
            `);
        let stock = Number (await input("Introduce el stock del producto: "));
        while (isNaN(stock) || stock < 0){
            console.log("Has especificado un stock inválido (El stock no puede ser negativo)");
            Number (await input("Introduce el stock del producto: "));
        }
        return stock;
    }
    const nuevo_producto = new GESTOR_INVENTARIO(nombre, categoria, precio, stock);
    
    //Guardado del producto
    nuevo_producto.agregar_producto();
    menu();
}

async function buscar_producto(){
    //Buscar producto
    console.log(`
        === Gestor de Inventario ===
           === Buscar Producto ===

           1-Nombre
           2-Categoria
           3-Volver
        `);
    
    let opcion = Number(await input ("Selecciona el filtro de búsqueda: "));
    switch (opcion){
        case 1:
            let nombre = await input ("Introduce el nombre: ");
            const nombre_buscar = new GESTOR_INVENTARIO(nombre);
            nombre_buscar.buscar_producto_nombre();
            await input ("Pulsa enter para volver...");
                console.clear();
                menu();
            break;
        case 2:
            let categoria = await input ("Introduce la categoria: ");
            const categoria_buscar = new GESTOR_INVENTARIO(null, categoria); //Pasa valor nulo para evitar la asignacion de categoria en nombre y undefined en categoria
            categoria_buscar.buscar_producto_categoria();
            await input ("Pulsa enter para volver...");
                console.clear();
                menu();
            break;
        case 3:
            console.clear();
            menu();
            break;
        default:
            console.clear();
            buscar_producto();
            break;

    }
}

async function actualizar_producto(){
    //Actualizar producto
    console.log(`
        === Gestor de Inventario ===
           === Actualizar Producto ===

           1-Stock
           2-Precio
           3-Volver
        `);
    
    let opcion = Number(await input ("Selecciona una opción: "));
    let contador = 0;
    switch (opcion){
        case 1:
            if (productos.length != 0){
                productos.forEach((producto) => {
                    contador++;
                    console.log(`
                    Producto: ${contador-1}
                    Nombre: ${producto.nombre}
                    Categoría: ${producto.categoria}
                    Precio: ${producto.precio}€
                    Stock: ${producto.stock}
                    `);
                });

                let producto_nuevo_stock = Number(await input("Selecciona el producto: "));
                if (producto_nuevo_stock >= 0 && producto_nuevo_stock < productos.length){
                    let nuevo_stock = Number(await input("Introduce el nuevo stock: "));
                    if (nuevo_stock >= 0){
                        const gestor = new GESTOR_INVENTARIO();
                        gestor.actualizarStock(producto_nuevo_stock, nuevo_stock); //Envia la informacion a gestor inventario
                        menu(); //Regresa al menu
                    }
                }
                else{
                    console.log("Has seleccionado un producto inexistente.");
                    actualizar_producto();
                }
            }
            else{
                console.log("No hay productos registrados.");
            }
            break;
        case 2:
            if (productos.length != 0){
                productos.forEach((producto) => {
                    contador++;
                    console.log(`
                    Producto: ${contador-1}
                    Nombre: ${producto.nombre}
                    Categoría: ${producto.categoria}
                    Precio: ${producto.precio}€
                    Stock: ${producto.stock}
                    `);
                });

                let producto_nuevo_precio = Number(await input("Selecciona el producto: "));
                if (producto_nuevo_precio >= 0 && producto_nuevo_precio < productos.length){
                    let nuevo_precio = Number(await input("Introduce el nuevo precio: "));
                    if (nuevo_precio >= 0){
                        const gestor = new GESTOR_INVENTARIO();
                        gestor.actualizarPrecio(producto_nuevo_precio, nuevo_precio); //Envia la informacion a gestor inventario
                        menu(); //Regresa al menu
                    }
                }
                else{
                    console.log("Has seleccionado un producto inexistente.");
                    actualizar_producto();
                }
            }
            else{
                console.log("No hay productos registrados.");
            }
            break;
        case 3:
            console.clear();
            menu();
            break;
        default:
            console.clear();
            actualizar_producto();
            break;
    }
}

async function eliminar_producto(){
    //Eliminar producto
    console.log(`
        === Gestor de Inventario ===
          === Eliminar Producto ===
        `);
    if (productos.length != 0){
        let contador = 0;
        productos.forEach(producto => {
            contador++;
            console.log(`
            Producto: ${contador-1}
            Nombre: ${producto.nombre}
            Categoría: ${producto.categoria}
            Precio: ${producto.precio}€
            Stock: ${producto.stock}
            `);
        });

        let producto_eliminar = Number(await input ("Selecciona el producto a eliminar: "));
        if (producto_eliminar >= 0 && producto_eliminar <= productos.length){
            let confirmacion = await input (`¿Estás seguro de que quieres eliminar el producto ${productos[producto_eliminar].nombre}? (S/N): `);
            switch (confirmacion){
                case "s":  case "S":
                    const gestor = new GESTOR_INVENTARIO();
                    gestor.eliminarProducto(producto_eliminar); //Envia la informacion a gestor inventario
                    console.clear();
                    menu(); //Regresa al menu
                    break;
                case "n": case "N":
                    console.clear();
                    menu();
                    break;
                default:
                    console.clear();
                    eliminar_producto();
                    break;
            }
        }
        else{
            console.log("Has seleccionado un producto inexistente.");
            eliminar_producto();
        }
    }
    else{
        console.log("No hay productos registrados.");
        regreso = await input ("Pulsa enter para volver...");
        console.clear();
        menu();
    }
}

menu();