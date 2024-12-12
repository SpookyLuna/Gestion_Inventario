//Import de la case
const GESTOR_INVENTARIO = require('./gestor_inventario');
//Integracion de readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function input(prompt) {
    return new Promise(resolve => rl.question(prompt, resolve));
}

//Caracteres especiales
const regex = /[!@#$% ^&*()\-+={}[\]:;"'<>,.?\/ |\\]/

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
        agregar_producto();
        console.clear();
        break;
    case 2:
        console.clear();
        break;
    case 3:
        console.clear();
        break;
    case 4:
        console.clear();
        break;
    case 5:
        console.clear();
        break;
    case 6:
        console.clear();
        break;
    case 7:
        console.clear();
        break;
    default:
        console.log("Has seleccionado una opción inválida!");
        menu(); //Sustituyo bucle por volver a llamar la función.
        break;
    }
}
async function agregar_producto(){

    console.log(`
        === Gestor de Inventario ===
        ¿Quieres añadir un nuevo producto?`);
    let opcion = await input ("Introduce S para confirmar y N para volver atrás.");
    switch (opcion){
        case "S": case "s":
            console.clear();
            agregar_producto_nombre();
        case "N": case "n":
            console.clear();
            menu();
    }

    console.clear();

    // Llama a las funciones de forma asíncrona
    const nombre = await agregar_producto_nombre();
    const categoria = await agregar_producto_categoria();
    const precio = await agregar_producto_precio();
    const stock = await agregar_producto_stock();
    
    async function agregar_producto_nombre(){
        //Agregar nombre
        let nombre = await input ("Introduce el nombre del producto: ");
        while (nombre == "" || regex.test(nombre) == true){
            console.log("Has especificado un nombre vacio o inválido. No emplees caracteres especiales!");
            nombre = await input ("Introduce el nombre del producto: ");
        }
        return nombre;
    }
    async function agregar_producto_categoria(){
        //Agregar listado de gategorias
        console.log("Categorias existentes: ");
        for (let i = 0; productos.length; i++){
            console.log(`
                Categoría ${i}: ${productos[i].categoria}`);
        }
        let categoria = await input ("Introduce la categoría del producto: ");
        return categoria;
    }
    async function agregar_producto_precio(){
        //Agregar precio
        let precio = Number (await input("Introduce el precio para el artículo: "));
        while (isNaN(precio) || precio < 0){
            console.log("Has especificado un precio inválido!");
            precio = Number (await input("Introduce el precio para el artículo: "));
        }
        return precio;
    }
    async function agregar_producto_stock(){
        //Agregar stock
        let stock = Number (await input("Introduce el stock del producto: "));
        while (isNaN(precio) || stock < 0){
            console.log("Has especificado un stock inválido (El stock no puede ser negativo)");
            Number (await input("Introduce el stock del producto: "));
        }
        return stock;
    }
    const nuevo_producto = new GESTOR_INVENTARIO(nombre, categoria, precio, stock);
    
    //Guardado del producto
    nuevo_producto.agregar_producto();
    console.log(`Producto guardado correctamente.`);
}

menu();