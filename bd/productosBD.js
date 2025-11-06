import Producto from "../models/productos.js";

export async function nuevoProducto({nombre, descripcion, precio, stock, categoria}) {
    // Asegurar tipos numéricos
    const p = {
        nombre,
        descripcion,
        precio: parseFloat(precio) || 0,
        stock: parseInt(stock) || 0,
        categoria,
    }
    const producto = new Producto(p);
    const respuestaMongo = await producto.save();
    return respuestaMongo;
}

export async function mostrarProductos() {
    const productosBD = await Producto.find({});
    return productosBD;
}

export async function buscarProductoPorNombre(nombre){
    const productosBD = await Producto.find({ nombre: { $regex: nombre, $options: 'i' } });
    return productosBD;
}

export async function buscarProductoPorID(id) {
    const productoBD = await Producto.findById(id);
    return productoBD;
}

export async function editarProducto({id,nombre,descripcion,precio,stock,categoria}){
    const update = {
        nombre,
        descripcion,
        precio: parseFloat(precio) || 0,
        stock: parseInt(stock) || 0,
        categoria,
    }
    const respuestaMongo = await Producto.findByIdAndUpdate(id, update, { new: true });
    return respuestaMongo;
}

export async function borrarProducto(id){
    const respuesta = await Producto.findByIdAndDelete(id);
    return respuesta;
}

export async function comprarProducto({id, cantidad}){
    const producto = await Producto.findById(id);
    if(!producto) throw new Error("Producto no encontrado");
    const q = parseInt(cantidad) || 1;
    if(producto.stock < q) throw new Error("Stock insuficiente");
    producto.stock = producto.stock - q;
    await producto.save();
    return producto;
}
